# 📧 Resilient Email Sending Service (TypeScript)

A robust and fault-tolerant email delivery system built in **TypeScript**. This service uses mock providers, retry logic, fallback mechanisms, idempotency, rate limiting, and supports status tracking. Bonus features include circuit breaker, simple logging, and a basic queue system.

---

## 🚀 Features

- ✅ Retry with exponential backoff  
- ✅ Provider fallback mechanism  
- ✅ Idempotent email sending  
- ✅ Basic rate limiting  
- ✅ Email status tracking  
- ✅ Circuit breaker (bonus)  
- ✅ Logging (bonus)  
- ✅ Basic queue system (bonus)  

---

## 🏗️ Project Structure

email-service/
├── src/
│ ├── EmailService.ts # Main EmailService class
│ ├── providers/
│ │ ├── EmailProvider.ts # Base Email interface
│ │ ├── ProviderA.ts # Mock Provider A
│ │ └── ProviderB.ts # Mock Provider B
│ ├── utils/
│ │ ├── RateLimiter.ts # Simple in-memory rate limiter
│ │ ├── CircuitBreaker.ts # Optional circuit breaker logic
│ │ └── Logger.ts # Basic logging utility
│ └── server.ts # Express API endpoint
├── tests/
│ └── EmailService.test.ts # Unit tests
├── package.json
├── tsconfig.json
└── README.md


---

## ▶️ Run Locally

```bash

npx ts-node src/server.ts

📍 The API will be available at:

http://localhost:3000/send-email

🧪 Run Tests

npm test

🧪 API Endpoint
POST /send-email
Request Body:
{
  "id": "email-001",
  "to": "someone@example.com",
  "subject": "Hello",
  "body": "This is a test email"
}
Response:
{
  "status": "success",
  "provider": "ProviderA",
  "message": "Email sent successfully"
}

⚙️ Tech Stack
Language: TypeScript

Runtime: Node.js

Framework: Express

Testing: Jest

Tooling: ts-node, nodemon

📁 Setup Instructions

git clone https://github.com/pravesh232/email-service
cd email-service
npm install

Start the server:
npx ts-node src/server.ts

Run tests:
npm test

📦 Assumptions
Email sending is mocked, no real emails are dispatched.

All providers implement the same interface.

In-memory structures (Map/Set) used for rate limiting and idempotency.

✅ Deliverables
✅ Full source code (this repo)

✅ Unit tests with Jest

✅ Local API for testing

🔜 Screencast explanation (with face shown)

🔜 Deployed cloud version (optional: Render/Glitch/Vercel)

🙌 Author
Pravesh Pathak
Fresher Developer – Passionate about backend systems, clean code, and scalable design.

📄 License
MIT License – Use freely with credit.


