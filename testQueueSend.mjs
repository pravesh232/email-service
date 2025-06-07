// testQueueSend.mjs
import fetch from 'node-fetch';

async function sendEmail(email) {
  const response = await fetch('http://localhost:3000/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(email),
  });
  const data = await response.json();
  console.log(`Email ID=${email.id} Response:`, data);
}

async function testQueue() {
  console.log('Sending 10 emails quickly to test queue...');
  const emails = [];
  for (let i = 1; i <= 10; i++) {
    emails.push({
      id: `queue-email-${i}`,
      to: `test${i}@example.com`,
      subject: `Test Email ${i}`,
      body: `This is test email number ${i}`,
    });
  }

  // Send all emails almost at once
  await Promise.all(emails.map(email => sendEmail(email)));

  console.log('All emails sent. Check server logs to see they were processed sequentially.');
}

testQueue().catch(console.error);
