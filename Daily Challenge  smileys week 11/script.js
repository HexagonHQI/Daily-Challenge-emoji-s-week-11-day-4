const express = require('express');
const app = express();
const port = 3000;

// emojis
const emojis = [
    { emoji: '😀', name: 'Smile' },
    { emoji: '🐶', name: 'Dog' },
    { emoji: '🌮', name: 'Taco' },
   
];

// emoji options
function generateQuestion() {
    const randomIndex = Math.floor(Math.random() * emojis.length);
    const correctEmoji = emojis[randomIndex];

    // Generate random incorrect options
    const incorrectOptions = emojis
        .filter(emoji => emoji !== correctEmoji)
        .map(emoji => emoji.name)
        .slice(0, 3);

    const options = [...incorrectOptions, correctEmoji.name];
    shuffleArray(options); 

    return { emoji: correctEmoji.emoji, options };
}

//array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


let currentQuestion;
let score = 0;

// Serve static files
app.use(express.static('public'));

// API endpoint
app.get('/api/question', (req, res) => {
    currentQuestion = generateQuestion();
    res.json(currentQuestion);
});

// API 
app.post('/api/guess', (req, res) => {
    const guess = req.body.guess;
    if (guess === currentQuestion.emoji.name) {
        score++;
        res.json({ correct: true, score });
    } else {
        res.json({ correct: false, score });
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
