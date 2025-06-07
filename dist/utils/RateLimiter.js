"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RateLimiter = void 0;
class RateLimiter {
    constructor(limit, intervalMs) {
        this.limit = limit;
        this.intervalMs = intervalMs;
        this.timestamps = new Map();
    }
    allow(recipient) {
        const now = Date.now();
        const times = this.timestamps.get(recipient) ?? [];
        const recent = times.filter(t => now - t < this.intervalMs);
        recent.push(now);
        this.timestamps.set(recipient, recent);
        return recent.length <= this.limit;
    }
}
exports.RateLimiter = RateLimiter;
