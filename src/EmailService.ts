import { Email, EmailProvider } from './providers/EmailProvider';
import { RateLimiter } from './utils/RateLimiter';
import { Logger } from './utils/Logger';

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export class EmailService {
  private providers: EmailProvider[];
  private rateLimiter = new RateLimiter(5);
  private sentCache = new Set<string>();
  private statusMap = new Map<string, string>();

  constructor(providers: EmailProvider[]) {
    this.providers = providers;
  }

  async sendEmail(email: Email): Promise<boolean> {
    if (this.sentCache.has(email.id)) {
      Logger.log(`Duplicate email prevented: ${email.id}`);
      return true;
    }

    for (const [index, provider] of this.providers.entries()) {
      for (let attempt = 1; attempt <= 3; attempt++) {
        if (!this.rateLimiter.allow()) {
          Logger.log('Rate limit exceeded, delaying...');
          await delay(1000);
        }

        try {
          this.statusMap.set(email.id, `sending_with_provider_${index}`);
          await provider.send(email);
          this.statusMap.set(email.id, 'sent');
          this.sentCache.add(email.id);
          Logger.log(`Email sent via provider ${index}`);
          return true;
        } catch (err) {
          Logger.log(`Provider ${index} failed on attempt ${attempt}: ${err}`);
          await delay(2 ** attempt * 100);
        }
      }
    }

    this.statusMap.set(email.id, 'failed');
    Logger.log(`Email failed: ${email.id}`);
    return false;
  }

  getStatus(emailId: string): string | undefined {
    return this.statusMap.get(emailId);
  }
}
