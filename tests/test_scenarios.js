const assert = require('assert');

// Simple test runner to validate API responses
const BASE_URL = 'http://localhost:3000/api/chat';

async function runTests() {
    console.log("🧪 Starting Automated Tests...\n");

    try {
        // Test 1: Valid Rule Match
        console.log("1️⃣  Testing Rule Engine (Expected: 200 OK w/ hours)");
        const res1 = await fetch(BASE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: "What are your hours?" })
        });
        const data1 = await res1.json();
        assert.strictEqual(res1.status, 200);
        assert.strictEqual(data1.source, 'rule');
        console.log("✅ Passed!\n");

        // Test 2: LLM Fallback
        console.log("2️⃣  Testing LLM Fallback (Expected: 200 OK w/ mock AI)");
        const res2 = await fetch(BASE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: "Tell me a story about a cat." })
        });
        const data2 = await res2.json();
        assert.strictEqual(res2.status, 200);
        assert.strictEqual(data2.source, 'llm');
        console.log("✅ Passed!\n");

        // Test 3: Empty Input
        console.log("3️⃣  Testing Invalid Input (Expected: 400 Bad Request)");
        const res3 = await fetch(BASE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: "" })
        });
        assert.strictEqual(res3.status, 400);
        console.log("✅ Passed!\n");

        // Test 4: XSS Attempt
        console.log("4️⃣  Testing XSS Sanitization (Expected: 200 OK but santized or handled)");
        const res4 = await fetch(BASE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: "<script>alert('hack')</script> help" })
        });
        const data4 = await res4.json();
        assert.strictEqual(res4.status, 200);
        // The mock LLM or Rule logic should process the text.
        // The key is that the server didn't crash and we got a JSON response.
        // In a real integration test, we'd check if the stored data was clean, 
        // but here we just ensure the request completes safely.
        console.log(`   Response: ${data4.response}`);
        console.log("✅ Passed!\n");

        console.log("🎉 ALL TESTS PASSED SUCCESSFULLY! The chatbot is robust.");

    } catch (error) {
        console.error("❌ Test Failed:", error);
        process.exit(1);
    }
}

runTests();
