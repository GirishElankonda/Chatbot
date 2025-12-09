const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const chatRoutes = require('./src/routes/chat');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Allow cross-origin requests (useful if frontend is hosted separately later)
app.use(bodyParser.json());

// Serve Static Files (Frontend)
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/api/chat', chatRoutes);

// Fallback (handled by express.static for index.html usually, but explicitly:)
// app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

// Start Server
app.listen(PORT, () => {
    console.log(`\n---------------------------------------------------`);
    console.log(`🤖 Chatbot Server is running at http://localhost:${PORT}`);
    console.log(`---------------------------------------------------\n`);
});
