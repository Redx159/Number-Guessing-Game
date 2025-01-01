const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;  // Ensure the port is dynamically set for deployments
const cors = require('cors');

// Enable CORS for the deployed front-end (Netlify)
app.use(cors({
  origin: 'https://numberguessinggamebyabdelouahed.netlify.app', // Your Netlify front-end URL
}));

// Allow JSON body parsing
app.use(bodyParser.json());

// Serve static files from the 'public' folder (ensure your 'public' folder is correctly set up)
app.use(express.static('public')); 

// Store usernames
let usernames = [];

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

// Endpoint to get all usernames
app.get('/get-usernames', (req, res) => {
    res.json(usernames);
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
