// fullTest.mjs

const baseUrl = 'http://localhost:3000/send';

async function sendEmail(id) {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id,
      to: 'test@example.com',
      subject: 'Test Email',
      body: `This is test email ${id}`
    })
  });

  const data = await response.json().catch(() => ({}));
  return { status: response.status, data };
}

(async () => {
  console.log('\n✅ Test 1: Normal Email Send');
  let res1 = await sendEmail('email-001');
  console.log(res1);

  console.log('\n✅ Test 2: Duplicate Email ID');
  let res2 = await sendEmail('email-001'); // same ID again
  console.log(res2);

  console.log('\n✅ Test 3: Rate Limit Exceeded (sending 6 emails quickly)');
  for (let i = 2; i <= 7; i++) {
    const res = await sendEmail(`email-00${i}`);
    console.log(`email-00${i}:`, res);
  }

  console.log('\n✅ All tests finished');
})();
