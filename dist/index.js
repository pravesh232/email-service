"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProviderA_1 = __importDefault(require("./providers/ProviderA"));
const ProviderB_1 = __importDefault(require("./providers/ProviderB"));
const EmailService_1 = __importDefault(require("./EmailService"));
const primaryProvider = new ProviderA_1.default();
const secondaryProvider = new ProviderB_1.default();
const emailService = new EmailService_1.default(primaryProvider, secondaryProvider);
// Example usage
emailService.sendEmail({
    id: 'test1',
    to: 'user@example.com',
    subject: 'Hello',
    body: 'Test email',
});
