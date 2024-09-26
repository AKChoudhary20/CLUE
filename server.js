const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { exec } = require('child_process');
// Create an Express application
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/relationship_app', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define a schema for scores
const scoreSchema = new mongoose.Schema({
    userId: String,
    score: Number,
    comment: String,
    date: {
        type: Date,
        default: Date.now
    }
});

// Create a model for scores
const Score = mongoose.model('Score', scoreSchema);

// POST endpoint to save scores
app.post('/api/scores', (req, res) => {
    const { userId, score, comment } = req.body; // Include comment here

    const newScore = new Score({
        userId,
        score,
        comment, // Store the comment
        date: new Date()
    });

    newScore.save()
        .then(() => res.status(201).json({ message: 'Score saved successfully!' }))
        .catch(err => res.status(500).json({ error: 'Failed to save score.', details: err }));
});
app.post('/api/report', async (req, res) => {
    const { comment } = req.body;

    // Call the LSTM model to analyze the comment
    exec(`python3 path/to/your/lstm_script.py "${comment}"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return res.status(500).json({ error: 'Error generating report.' });
        }
        res.status(200).json({ report: stdout.trim() }); // Return the report
    });
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
