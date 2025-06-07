export class RateLimiter {
  private timestamps: Map<string, number[]> = new Map();

  constructor(private limit: number, private intervalMs: number) {}

  allow(recipient: string): boolean {
    const now = Date.now();
    const times = this.timestamps.get(recipient) ?? [];

    const recent = times.filter(t => now - t < this.intervalMs);
    recent.push(now);
    this.timestamps.set(recipient, recent);

    return recent.length <= this.limit;
  }
}
