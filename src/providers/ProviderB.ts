import { EmailProvider, EmailPayload } from '../types';

export default class ProviderB implements EmailProvider {
  async send(email: EmailPayload): Promise<{ success: boolean; provider: string }> {
    console.log(`ProviderB: Sending email ${email.id}`);
    return { success: true, provider: 'ProviderB' };
  }
}
