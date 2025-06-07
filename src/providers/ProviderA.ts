import { EmailProvider, EmailPayload } from '../types';

export default class ProviderA implements EmailProvider {
  async send(email: EmailPayload): Promise<{ success: boolean; provider: string }> {
    console.log(`ProviderA: Sending email ${email.id}`);
    return { success: true, provider: 'ProviderA' };
  }
}
