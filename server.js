const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Allow JSON body parsing
app.use(bodyParser.json());

// Serve static files from the 'public' folder
app.use(express.static('public')); // Correct path to serve your public folder

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
