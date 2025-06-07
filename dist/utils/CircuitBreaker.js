"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CircuitBreaker = void 0;
class CircuitBreaker {
    constructor(failureThreshold, resetTime) {
        this.failureThreshold = failureThreshold;
        this.resetTime = resetTime;
        this.failures = new Map();
        this.openUntil = new Map();
    }
    isOpen(providerName) {
        const until = this.openUntil.get(providerName);
        if (!until)
            return false;
        if (Date.now() > until) {
            this.openUntil.delete(providerName);
            this.failures.set(providerName, 0);
            return false;
        }
        return true;
    }
    recordFailure(providerName) {
        const count = (this.failures.get(providerName) ?? 0) + 1;
        this.failures.set(providerName, count);
        if (count >= this.failureThreshold) {
            this.openUntil.set(providerName, Date.now() + this.resetTime);
        }
    }
    reset(providerName) {
        this.failures.set(providerName, 0);
        this.openUntil.delete(providerName);
    }
}
exports.CircuitBreaker = CircuitBreaker;
