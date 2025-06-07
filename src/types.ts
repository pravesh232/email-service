export interface EmailPayload {
  id: string;
  to: string;
  subject: string;
  body: string;
}

export interface EmailProvider {
  send(email: EmailPayload): Promise<{ success: boolean; provider: string }>;
}