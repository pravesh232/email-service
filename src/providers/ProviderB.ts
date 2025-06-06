import { Email, EmailProvider } from './EmailProvider';

export class ProviderB implements EmailProvider {
  async send(email: Email): Promise<void> {
    console.log('ProviderB: sending email to', email.to);
    if (Math.random() < 0.5) throw new Error('ProviderB failed');
  }
}
