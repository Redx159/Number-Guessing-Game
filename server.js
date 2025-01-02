const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const cors = require('cors');

// Configure CORS to allow requests from your Netlify front-end
app.use(cors({
    origin: 'https://numberguessinggamebyabdelouahed.netlify.app'
}));

// Allow JSON body parsing
app.use(bodyParser.json());

// Store usernames and game logic
let usernames = [];
let randomNumber = Math.floor(Math.random() * 100) + 1; // Generate a random number between 1 and 100

// Endpoint to receive username
app.post('/submit-username', (req, res) => {
    const username = req.body.username;
    if (username) {
        usernames.push(username);  // Store username
        console.log('Received username:', username);  // Log the username to console
        res.status(200).send({ message: 'Username received!' });
    } else {
        res.status(400).send({ message: 'Username is required' });
    }
});

// Endpoint to make a guess
app.post('/make-guess', (req, res) => {
    const guess = req.body.guess;
    if (!guess || isNaN(guess)) {
        return res.status(400).send({ message: 'Invalid guess' });
    }
    if (guess < randomNumber) {
        res.status(200).send({ message: 'Too low, try again!' });
    } else if (guess > randomNumber) {
        res.status(200).send({ message: 'Too high, try again!' });
    } else {
        res.status(200).send({ message: 'Congratulations, you guessed it!' });
        randomNumber = Math.floor(Math.random() * 100) + 1; // Reset the number for the next round
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
