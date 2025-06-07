# 📧 Resilient Email Sending Service

A simple and robust **TypeScript-based email service** with retry, fallback, rate limiting, idempotency, and status tracking.  
This project uses **mock email providers** for demonstration and testing purposes.

---

## 🚀 Features

- 🔁 Retry logic with exponential backoff  
- 🔄 Fallback between two mock email providers  
- ✅ Idempotency to avoid duplicate sends  
- 📉 Rate limiting per recipient  
- 📊 Status tracking of email attempts  
- 🧯 Circuit breaker (optional, prevents repeated failures)  
- 🧪 Unit tests covering core functionality  
- 🧾 Console-based logging (debugging)

---

## 🛠️ Getting Started

### ✅ Prerequisites

- Node.js (v14+ recommended)  
- npm (Node Package Manager)

---

### 📦 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/pravesh232/email-service.git
   cd email-service

2. Install dependencies:
  npm install

3. Run the service locally:
  npm start

4. Run unit tests:
  npm test

## 📬 API Usage
  Endpoint
    POST /send-email

  Request Body (JSON)

      {
    "id": "unique-email-id-001",
    "to": "recipient@example.com",
    "subject": "Hello!",
    "body": "This is a test email."
  }

## Responses

  ✅ 200 OK – { "status": "sent" }

  🔁 200 OK – { "status": "duplicate" }

  🚫 429 Too Many Requests – Rate limit exceeded

  ❌ 500 Internal Server Error – All providers failed

## 📌 Assumptions
 -> Mock providers are used — no real email is sent

 -> Rate limit: 5 emails per recipient per minute

 -> Circuit breaker trips after 3 consecutive failures

 -> Email ID must be unique (for idempotency)    

## 🗂️ Project Structure

  src/
  ├── providers/            # Mock email providers
  ├── utils/                # Rate limiter & circuit breaker
  ├── EmailService.ts       # Main service class
  ├── index.ts              # Entry point (optional)
  tests/
  ├── EmailService.test.ts  # Unit tests
  README.md

## 🧪 Bonus Features
  
  🧯 Circuit breaker

  📋 Simple console logging

  ✅ Jest-based unit testing

## 🌱 Future Improvements
 
  🔗 Integrate with real providers (SendGrid, SES, etc.)

  🧠 Add persistent storage for idempotency & rate limits

  🧵 Add distributed queue for async processing

## 👤 Author
  Pravesh Kumar Pathak
  GitHub: @pravesh232

  Feel free to raise issues or contribute!  