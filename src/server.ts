import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Root route handler
app.get('/', (req, res) => {
  res.send('Email Service is up and running! 🚀');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
