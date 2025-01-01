const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// Use the dynamic port provided by Render or default to 3000 for local testing
const port = process.env.PORT || 3000;

// Allow CORS from the front-end URL (Netlify)
app.use(cors({
  origin: 'https://numberguessinggamebyabdelouahed.netlify.app', // Replace with your front-end URL
}));

// Allow JSON body parsing
app.use(bodyParser.json());

// Serve static files from the 'public' folder (you can update this path as needed)
app.use(express.static('public')); // Correct path to serve your public folder

// Store usernames in an array
let usernames = [];

// Endpoint to receive username
app.post('/submit-username', (req, res) => {
    const username = req.body.username;
    if (username) {
        usernames.push(username);  // Store username in array
        console.log('Received username:', username);  // Log username to server console
        res.status(200).send({ message: 'Username received!' });
    } else {
        res.status(400).send({ message: 'Username is required' });
    }
});

// Endpoint to get all usernames
app.get('/get-usernames', (req, res) => 
