import { EmailService } from '../src/EmailService';
import { ProviderA } from '../src/providers/ProviderA';
import { ProviderB } from '../src/providers/ProviderB';
import { EmailRequest } from '../src/types';

describe('EmailService', () => {
  let emailService: EmailService;

  beforeEach(() => {
    emailService = new EmailService(
      new ProviderA(),
      new ProviderB(),
      3, // maxRetries
      2, // rateLimit
      1000, // rateLimitWindowMs
      5 // circuitBreakerThreshold
    );
  });

  test('sends email successfully with first provider', async () => {
    const email: EmailRequest = {
      id: 'email-1',
      to: 'user@example.com',
      subject: 'Test Email',
      body: 'Hello'
    };
    const result = await emailService.sendEmail(email);
    expect(result).toEqual({ status: 'sent' });
  });

  test('detects duplicate email and prevents re-sending', async () => {
    const email: EmailRequest = {
      id: 'email-dup',
      to: 'user@example.com',
      subject: 'Duplicate',
      body: 'Hello again'
    };
    await emailService.sendEmail(email);
    const result = await emailService.sendEmail(email);
    expect(result).toEqual({ status: 'duplicate' });
  });

  test('throws error when rate limit is exceeded', async () => {
    const emails: EmailRequest[] = [
      { id: 'rate-email-0', to: 'limited@example.com', subject: '', body: '' },
      { id: 'rate-email-1', to: 'limited@example.com', subject: '', body: '' },
      { id: 'rate-email-2', to: 'limited@example.com', subject: '', body: '' },
    ];

    for (let i = 0; i < emails.length - 1; i++) {
      const res = await emailService.sendEmail(emails[i]);
      expect(res).toEqual({ status: 'sent' });
    }

    await expect(emailService.sendEmail(emails[emails.length - 1])).rejects.toThrow(
      'Rate limit exceeded'
    );
  });
});
