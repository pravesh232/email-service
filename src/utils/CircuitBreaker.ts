export class CircuitBreaker {
  private failures: Map<string, number> = new Map();
  private openUntil: Map<string, number> = new Map();

  constructor(private failureThreshold: number, private resetTime: number) {}

  isOpen(providerName: string): boolean {
    const until = this.openUntil.get(providerName);
    if (!until) return false;

    if (Date.now() > until) {
      this.openUntil.delete(providerName);
      this.failures.set(providerName, 0);
      return false;
    }

    return true;
  }

  recordFailure(providerName: string) {
    const count = (this.failures.get(providerName) ?? 0) + 1;
    this.failures.set(providerName, count);

    if (count >= this.failureThreshold) {
      this.openUntil.set(providerName, Date.now() + this.resetTime);
    }
  }

  reset(providerName: string) {
    this.failures.set(providerName, 0);
    this.openUntil.delete(providerName);
  }
}
