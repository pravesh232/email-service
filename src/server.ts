import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Example root route
app.get('/', (req, res) => {
  res.send('Email Service is up and running! 🚀');
});

// You can add your other API routes here...

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
