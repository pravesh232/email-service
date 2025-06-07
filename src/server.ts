import express from 'express';
import ProviderA from './providers/ProviderA';
import ProviderB from './providers/ProviderB';
import EmailService from './EmailService';

const app = express();
app.use(express.json());

const emailService = new EmailService(new ProviderA(), new ProviderB());

app.post('/send', async (req, res) => {
  try {
    const result = await emailService.sendEmail(req.body);
    res.status(200).json(result);
  } catch (err: any) {
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
});

app.get('/', (_req, res) => {
  res.send('Email Service is up and running! 🚀');
});

app.listen(3000, () => console.log('🚀 Server running on port 3000'));
