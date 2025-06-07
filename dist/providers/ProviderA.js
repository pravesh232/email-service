"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderA = void 0;
class ProviderA {
    async send(email) {
        console.log(`ProviderA sending email to ${email.to}`);
    }
}
exports.ProviderA = ProviderA;
