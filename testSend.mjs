// testSend.mjs

const response = await fetch('http://localhost:3000/send', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    id: 'email-001',
    to: 'test@example.com',
    subject: 'Hello',
    body: 'This is a test email'
  })
});

const data = await response.json();
console.log(data);
