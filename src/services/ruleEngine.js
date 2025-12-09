const faqData = require('../data/faq.json');

/**
 * Simple Rule Engine
 * Checks if user input matches any keywords in the FAQ database.
 * @param {string} userMessage - The raw user input.
 * @returns {string|null} - The matched answer or null if no match found.
 */
function getRuleBasedResponse(userMessage) {
    if (!userMessage) return null;

    const lowerCaseMessage = userMessage.toLowerCase();

    // Iterate through FAQs to find a match
    for (const entry of faqData) {
        // Check if ANY of the keywords exist in the user message
        // Using 'some' checks if at least one keyword is present
        const isMatch = entry.keywords.some(keyword =>
            lowerCaseMessage.includes(keyword.toLowerCase())
        );

        if (isMatch) {
            return entry.answer;
        }
    }

    return null; // No rule match found
}

module.exports = { getRuleBasedResponse };
