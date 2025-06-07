"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ProviderA_1 = __importDefault(require("./providers/ProviderA"));
const ProviderB_1 = __importDefault(require("./providers/ProviderB"));
const EmailService_1 = __importDefault(require("./EmailService"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const emailService = new EmailService_1.default(new ProviderA_1.default(), new ProviderB_1.default());
app.post('/send', async (req, res) => {
    try {
        const result = await emailService.sendEmail(req.body);
        res.status(200).json(result);
    }
    catch (err) {
        res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
});
app.get('/', (_req, res) => {
    res.send('Email Service is up and running! 🚀');
});
app.listen(3000, () => console.log('🚀 Server running on port 3000'));
