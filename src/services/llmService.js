/**
 * Mock LLM Service
 * Simulates a call to an AI model (e.g., OpenAI GPT-4 or Gemini).
 * In a real app, you would use 'axios' or an SDK here.
 */

async function getLLMResponse(userMessage) {
    // Simulate network delay (1-2 seconds) to feel like "thinking"
    const delay = Math.floor(Math.random() * 1000) + 1000;
    await new Promise(resolve => setTimeout(resolve, delay));

    console.log(`[LLM Service] Processing: "${userMessage}"`);

    // In a real scenario, this would be an API call.
    // For now, we return a generic polite fallback that implies intelligence.

    // logic to make it essentially a slightly smarter wildcard
    // We can add simple heuristics here if we want, but keeping it generic is safer for a mock.

    return "I'm not exactly sure about that based on my current training, but I'd love to help! Could you try asking in a different way, or would you like to speak to a human agent?";
}

module.exports = { getLLMResponse };
