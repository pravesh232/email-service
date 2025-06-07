"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProviderA {
    async send(email) {
        console.log(`ProviderA: Sending email ${email.id}`);
        return { success: true, provider: 'ProviderA' };
    }
}
exports.default = ProviderA;
