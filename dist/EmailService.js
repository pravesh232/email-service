"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EmailService {
    constructor(primaryProvider, secondaryProvider) {
        this.primaryProvider = primaryProvider;
        this.secondaryProvider = secondaryProvider;
    }
    async sendEmail(email) {
        try {
            await this.primaryProvider.send(email);
            console.log('Email sent by primary provider');
        }
        catch (err) {
            if (err instanceof Error) {
                console.error(`Primary provider failed: ${err.message}`);
            }
            else {
                console.error('Primary provider failed: Unknown error');
            }
            try {
                await this.secondaryProvider.send(email);
                console.log('Email sent by secondary provider');
            }
            catch (err) {
                if (err instanceof Error) {
                    console.error(`Secondary provider failed: ${err.message}`);
                }
                else {
                    console.error('Secondary provider failed: Unknown error');
                }
                throw new Error('Both providers failed to send email');
            }
        }
    }
}
exports.default = EmailService;
