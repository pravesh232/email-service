export class RateLimiter {
  private maxRequests: number;
  private interval: number;
  private timestamps: number[] = [];

  constructor(maxRequests: number, intervalMs: number = 1000) {
    this.maxRequests = maxRequests;
    this.interval = intervalMs;
  }

  allow(): boolean {
    const now = Date.now();
    this.timestamps = this.timestamps.filter(t => now - t < this.interval);
    if (this.timestamps.length < this.maxRequests) {
      this.timestamps.push(now);
      return true;
    }
    return false;
  }
}
