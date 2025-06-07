"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderB = void 0;
class ProviderB {
    async send(email) {
        console.log(`ProviderB sending email to ${email.to}`);
    }
}
exports.ProviderB = ProviderB;
