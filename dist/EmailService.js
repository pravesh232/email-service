"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EmailService {
    constructor(primary, secondary) {
        this.sentEmails = new Set(); // For idempotency
        this.requestTimestamps = []; // For rate limiting
        this.failureCount = 0; // For circuit breaker
        this.circuitOpen = false;
        this.circuitResetTimeout = null;
        this.primary = primary;
        this.secondary = secondary;
    }
    isRateLimited() {
        const now = Date.now();
        this.requestTimestamps = this.requestTimestamps.filter(t => now - t < 10000);
        if (this.requestTimestamps.length >= 5)
            return true;
        this.requestTimestamps.push(now);
        return false;
    }
    async trySend(provider, email, retries = 3) {
        for (let i = 0; i < retries; i++) {
            try {
                const result = await provider.send(email);
                if (result.success)
                    return result;
            }
            catch (err) {
                await new Promise(res => setTimeout(res, Math.pow(2, i) * 100));
            }
        }
        return { success: false };
    }
    openCircuitBreaker() {
        this.circuitOpen = true;
        this.circuitResetTimeout = setTimeout(() => {
            this.failureCount = 0;
            this.circuitOpen = false;
        }, 30000);
    }
    async sendEmail(email) {
        if (this.isRateLimited())
            return { status: 'rate_limited' };
        if (this.sentEmails.has(email.id))
            return { status: 'duplicate' };
        if (this.circuitOpen)
            return { status: 'circuit_open' };
        let result = await this.trySend(this.primary, email);
        if (!result.success) {
            this.failureCount++;
            result = await this.trySend(this.secondary, email);
        }
        if (!result.success) {
            this.failureCount++;
            if (this.failureCount >= 3)
                this.openCircuitBreaker();
            return { status: 'failed' };
        }
        this.sentEmails.add(email.id);
        return { status: 'sent', provider: result.provider };
    }
}
exports.default = EmailService;
