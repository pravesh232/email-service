import express from 'express';
import { Request, Response } from 'express';
import { EmailService } from './EmailService';
import { ProviderA } from './providers/ProviderA';
import { ProviderB } from './providers/ProviderB';
import { Email } from './providers/EmailProvider';

const app = express();
app.use(express.json());

const emailService = new EmailService([new ProviderA(), new ProviderB()]);

// Email sending endpoint
app.post('/send-email', async (req: Request, res: Response): Promise<void> => {
  const { id, to, subject, body } = req.body as Email;

  if (!id || !to || !subject || !body) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  const result = await emailService.sendEmail({ id, to, subject, body });

  res.json({
    success: result,
    status: emailService.getStatus(id),
  });
});

// Status tracking endpoint
app.get('/email-status/:id', (req: Request, res: Response): void => {
  const status = emailService.getStatus(req.params.id);
  res.json({ status });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
