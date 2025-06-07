import express from 'express';
import EmailService from './EmailService';
import { ProviderA } from './providers/ProviderA';
import { ProviderB } from './providers/ProviderB';

const app = express();
app.use(express.json());

const emailService = new EmailService(new ProviderA(), new ProviderB());

app.post('/send-email', async (req, res) => {
  try {
    await emailService.sendEmail(req.body);
    res.status(200).send({ status: 'sent' });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).send({ status: 'failed', error: errorMessage });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
