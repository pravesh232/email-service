import { EmailProvider } from './EmailProvider';
import { EmailRequest } from '../types';

export class ProviderB implements EmailProvider {
  async send(email: EmailRequest): Promise<void> {
    console.log(`ProviderB sending email to ${email.to}`);
  }
}
