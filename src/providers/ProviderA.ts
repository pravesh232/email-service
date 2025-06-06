import { Email, EmailProvider } from './EmailProvider';

export class ProviderA implements EmailProvider {
  async send(email: Email): Promise<void> {
    console.log('ProviderA: sending email to', email.to);
    if (Math.random() < 0.5) throw new Error('ProviderA failed');
  }
}
