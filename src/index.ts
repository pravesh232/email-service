import { EmailService } from './EmailService';
import { ProviderA } from './providers/ProviderA';
import { ProviderB } from './providers/ProviderB';

const emailService = new EmailService([new ProviderA(), new ProviderB()]);

(async () => {
  const email = {
    id: 'email-123',
    to: 'user@example.com',
    subject: 'Test Email',
    body: 'This is a test email.'
  };

  const result = await emailService.sendEmail(email);
  console.log('Send result:', result);
  console.log('Status:', emailService.getStatus(email.id));
})();
