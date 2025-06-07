import { EmailRequest } from '../types';

export interface EmailProvider {
  send(email: EmailRequest): Promise<void>;
}
