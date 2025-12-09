const chatWidget = document.getElementById('chatWidget');
const chatToggleBtn = document.getElementById('chatToggleBtn');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const chatBody = document.getElementById('chatBody');

let isOpen = false;
let isTyping = false;

// --- UI Logic ---

function toggleChat() {
    isOpen = !isOpen;
    if (isOpen) {
        chatWidget.classList.add('open');
        chatToggleBtn.classList.add('hidden');
        userInput.focus();
    } else {
        chatWidget.classList.remove('open');
        chatToggleBtn.classList.remove('hidden');
    }
}

function appendMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
    messageDiv.textContent = text;
    chatBody.appendChild(messageDiv);

    // Scroll to bottom
    chatBody.scrollTop = chatBody.scrollHeight;
}

function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.id = 'typingIndicator';
    typingDiv.classList.add('typing-indicator');
    typingDiv.textContent = 'Support Bot is typing...';
    chatBody.appendChild(typingDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function removeTypingIndicator() {
    const typingDiv = document.getElementById('typingIndicator');
    if (typingDiv) {
        typingDiv.remove();
    }
}

// --- API Logic ---

async function sendMessage() {
    const text = userInput.value.trim();
    if (!text || isTyping) return;

    // 1. Display User Message
    appendMessage(text, 'user');
    userInput.value = '';

    // 2. Disable input while waiting
    isTyping = true;
    userInput.disabled = true;
    sendBtn.disabled = true;
    showTypingIndicator();

    try {
        // 3. Call Backend API
        const response = await fetch('http://localhost:3000/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: text })
        });

        const data = await response.json();

        // 4. Handle Response
        removeTypingIndicator();

        if (response.ok) {
            appendMessage(data.response, 'bot');
        } else {
            appendMessage("⚠️ Oops! Something went wrong. Please try again.", 'bot');
            console.error('API Error:', data.error);
        }

    } catch (error) {
        removeTypingIndicator();
        appendMessage("⚠️ Network error. Please check your connection.", 'bot');
        console.error('Network Error:', error);
    } finally {
        // 5. Re-enable Input
        isTyping = false;
        userInput.disabled = false;
        sendBtn.disabled = false;
        userInput.focus();
    }
}

// --- Event Listeners ---

userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});
