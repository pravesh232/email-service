import ProviderA from './providers/ProviderA';
import ProviderB from './providers/ProviderB';
import EmailService from './EmailService';

const primaryProvider = new ProviderA();
const secondaryProvider = new ProviderB();

const emailService = new EmailService(primaryProvider, secondaryProvider);

// Example usage
emailService.sendEmail({
  id: 'test1',
  to: 'user@example.com',
  subject: 'Hello',
  body: 'Test email',
});
