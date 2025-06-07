import { EmailProvider } from './EmailProvider';
import { EmailRequest } from '../types';

export class ProviderA implements EmailProvider {
  async send(email: EmailRequest): Promise<void> {
    console.log(`ProviderA sending email to ${email.to}`);
  }
}
