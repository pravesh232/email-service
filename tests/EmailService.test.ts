import { EmailService } from '../src/EmailService';
import { Email } from '../src/providers/EmailProvider';

const createMockProvider = (failTimes = 0): any => {
  let attempts = 0;
  return {
    send: jest.fn(async (email: Email) => {
      if (attempts < failTimes) {
        attempts++;
        throw new Error('Mock failure');
      }
    })
  };
};

test('EmailService retries and falls back correctly', async () => {
  const providerA = createMockProvider(3);
  const providerB = createMockProvider(0);
  const service = new EmailService([providerA, providerB]);
  const email: Email = { id: 'test-1', to: 'x', subject: 'y', body: 'z' };

  const result = await service.sendEmail(email);
  expect(result).toBe(true);
  expect(service.getStatus('test-1')).toBe('sent');
});
