"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProviderB {
    async send(email) {
        console.log(`ProviderB: Sending email ${email.id}`);
        return { success: true, provider: 'ProviderB' };
    }
}
exports.default = ProviderB;
