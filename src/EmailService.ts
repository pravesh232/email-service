import { EmailProvider } from './providers/EmailProvider';

export interface EmailRequest {
  id: string;
  to: string;
  subject: string;
  body: string;
}

export default class EmailService {
  private primaryProvider: EmailProvider;
  private secondaryProvider: EmailProvider;

  constructor(primaryProvider: EmailProvider, secondaryProvider: EmailProvider) {
    this.primaryProvider = primaryProvider;
    this.secondaryProvider = secondaryProvider;
  }

  async sendEmail(email: EmailRequest): Promise<void> {
    try {
      await this.primaryProvider.send(email);
      console.log('Email sent by primary provider');
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(`Primary provider failed: ${err.message}`);
      } else {
        console.error('Primary provider failed: Unknown error');
      }
      try {
        await this.secondaryProvider.send(email);
        console.log('Email sent by secondary provider');
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error(`Secondary provider failed: ${err.message}`);
        } else {
          console.error('Secondary provider failed: Unknown error');
        }
        throw new Error('Both providers failed to send email');
      }
    }
  }
}
