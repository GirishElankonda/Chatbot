const express = require('express');
const router = express.Router();
const xss = require('xss');
const rateLimit = require('express-rate-limit');
const { getRuleBasedResponse } = require('../services/ruleEngine');
const { getLLMResponse } = require('../services/llmService');

// Rate Limiter: Max 10 requests per minute per IP
const chatLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 10,
    message: { error: "Too many requests, please try again later." }
});

// POST /api/chat
router.post('/', chatLimiter, async (req, res) => {
    try {
        const { message } = req.body;

        // 1. Input Validation
        if (!message || typeof message !== 'string' || message.trim().length === 0) {
            return res.status(400).json({ error: 'Message is required and cannot be empty.' });
        }

        if (message.length > 500) {
            return res.status(400).json({ error: 'Message is too long. Please look for a shorter query.' });
        }

        // 2. Sanitization (Prevent XSS)
        // Even though we display text safely in frontend, it's good practice to sanitize input.
        const cleanMessage = xss(message.trim());

        // 3. Rule Engine (Priority 1)
        const ruleResponse = getRuleBasedResponse(cleanMessage);

        if (ruleResponse) {
            console.log(`[Rule Match] Input: "${cleanMessage}" -> Answer: "${ruleResponse}"`);
            return res.json({
                source: 'rule',
                response: ruleResponse
            });
        }

        // 4. LLM Service (Priority 2 - Fallback)
        // If no rule matches, we ask the "AI"
        const llmResponse = await getLLMResponse(cleanMessage);

        return res.json({
            source: 'llm',
            response: llmResponse
        });

    } catch (error) {
        console.error('Error in chat route:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
