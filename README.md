# G Bot - Premium Customer Support Chatbot

An production-ready, hybrid chatbot architecture designed for customer support. It combines deterministic rule-based logic for FAQs with an LLM fallback for conversational queries.

![Status](https://img.shields.io/badge/Status-Production%20Ready-success)
![Stack](https://img.shields.io/badge/Stack-Node.js%20%7C%20Express%20%7C%20Vanilla%20JS-blue)

## 🏗️ Architecture

The system uses a **Hybrid Intelligence** approach:
1.  **Incoming Message** -> Sanitize & Rate Limit
2.  **Rule Engine** -> Check `faq.json` for exact keyword matches (Speed + Accuracy).
3.  **LLM Service** -> If no rule matches, fallback to AI model (Flexibility).

```mermaid
[User] -> [Frontend Widget] -> [Node API] -> [Rule Engine] --(No Match)--> [LLM Service]
```

## 🚀 fast Setup

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Start Server**
    ```bash
    node server.js
    ```

3.  **View App**
    Open `http://localhost:3000` in your browser.

## 🧠 Managing Knowledge

### Adding FAQs
Edit `src/data/faq.json`. No code changes needed.
```json
{
  "keywords": ["pricing", "cost"],
  "answer": "Our Pro plan starts at $29/mo."
}
```

### Connecting Real AI (OpenAI/Gemini)
The current `src/services/llmService.js` is a mock. To make it real:

1.  Install OpenAI: `npm install openai`
2.  Update `src/services/llmService.js`:
    ```javascript
    const OpenAI = require('openai');
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    async function getLLMResponse(message) {
        const completion = await openai.chat.completions.create({
            messages: [{ role: "user", content: message }],
            model: "gpt-3.5-turbo",
        });
        return completion.choices[0].message.content;
    }
    ```

## 🧪 Testing
Run the automated test suite to verify logic and security:
```bash
node tests/test_scenarios.js
```

## 🔒 Security Features
*   **Rate Limiting:** Prevents spam (10 req/min).
*   **XSS Sanitization:** Filters malicious script tags.
*   **Input Validation:** Rejects empty or overly long messages.

## 📦 Deployment
Ready for deployment on:
*   **Vercel/Netlify:** (Frontend only, if separated)
*   **Heroku/Render/Railway:** (Full Stack - Recommended)
    *   Build Command: `npm install`
    *   Start Command: `node server.js`

---
*Created by Antigravity*
