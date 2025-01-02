const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const cors = require('cors');

// Allow CORS requests from your front-end domain
app.use(cors({
  origin: 'https://numberguessinggamebyabdelouahed.netlify.app'
}));

// Body parsing middleware
app.use(bodyParser.json());

// Store usernames and game logic
let usernames = [];
let randomNumber = Math.floor(Math.random() * 100) + 1; // Random number for guessing

// Endpoint for submitting username
app.post('/submit-username', (req, res) => {
  const username = req.body.username;
  if (username) {
    usernames.push(username);  // Store the username
    console.log('Received username:', username);  // Log it
    res.status(200).send({ message: 'Username received!' });
  } else {
    res.status(400).send({ message: 'Username is required' });
  }
});

// Endpoint for making guesses
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
    randomNumber = Math.floor(Math.random() * 100) + 1; // Reset number after correct guess
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
