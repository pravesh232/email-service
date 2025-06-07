"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const EmailService_1 = __importDefault(require("./EmailService"));
const ProviderA_1 = require("./providers/ProviderA");
const ProviderB_1 = require("./providers/ProviderB");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const emailService = new EmailService_1.default(new ProviderA_1.ProviderA(), new ProviderB_1.ProviderB());
app.post('/send-email', async (req, res) => {
    try {
        await emailService.sendEmail(req.body);
        res.status(200).send({ status: 'sent' });
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        res.status(500).send({ status: 'failed', error: errorMessage });
    }
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
