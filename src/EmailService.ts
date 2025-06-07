import { EmailPayload, EmailProvider } from './types';

export default class EmailService {
  private primary: EmailProvider;
  private secondary: EmailProvider;
  private sentEmails = new Set<string>(); // For idempotency
  private requestTimestamps: number[] = []; // For rate limiting
  private failureCount = 0; // For circuit breaker
  private circuitOpen = false;
  private circuitResetTimeout: NodeJS.Timeout | null = null;

  constructor(primary: EmailProvider, secondary: EmailProvider) {
    this.primary = primary;
    this.secondary = secondary;
  }

  private isRateLimited(): boolean {
    const now = Date.now();
    this.requestTimestamps = this.requestTimestamps.filter(t => now - t < 10000);
    if (this.requestTimestamps.length >= 5) return true;
    this.requestTimestamps.push(now);
    return false;
  }

  private async trySend(provider: EmailProvider, email: EmailPayload, retries = 3): Promise<{ success: boolean; provider?: string }> {
    for (let i = 0; i < retries; i++) {
      try {
        const result = await provider.send(email);
        if (result.success) return result;
      } catch (err) {
        await new Promise(res => setTimeout(res, Math.pow(2, i) * 100));
      }
    }
    return { success: false };
  }

  private openCircuitBreaker() {
    this.circuitOpen = true;
    this.circuitResetTimeout = setTimeout(() => {
      this.failureCount = 0;
      this.circuitOpen = false;
    }, 30000);
  }

  async sendEmail(email: EmailPayload): Promise<{ status: string; provider?: string }> {
    if (this.isRateLimited()) return { status: 'rate_limited' };
    if (this.sentEmails.has(email.id)) return { status: 'duplicate' };
    if (this.circuitOpen) return { status: 'circuit_open' };

    let result = await this.trySend(this.primary, email);
    if (!result.success) {
      this.failureCount++;
      result = await this.trySend(this.secondary, email);
    }

    if (!result.success) {
      this.failureCount++;
      if (this.failureCount >= 3) this.openCircuitBreaker();
      return { status: 'failed' };
    }

    this.sentEmails.add(email.id);
    return { status: 'sent', provider: result.provider };
  }
}
