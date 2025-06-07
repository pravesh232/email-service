import { EmailPayload } from '../types';

export interface EmailProvider {
  send(email: EmailPayload): Promise<{ success: boolean; provider: string }>;
}
  