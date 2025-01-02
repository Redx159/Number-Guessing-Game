const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

// CORS configuration to allow requests from the frontend
app.use(cors({
  origin: "https://numberguessinggamebyabdelouahed.netlify.app" // Your Netlify frontend URL
}));

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Store usernames and game data
let usernames = [];
let targetNumber = Math.floor(Math.random() * 100) + 1;

// Endpoint to receive username
app.post("/submit-username", (req, res) => {
  const username = req.body.username;
  if (username) {
    usernames.push(username);
    console.log("Received username:", username);
    res.status(200).send({ message: "Username received!" });
  } else {
    res.status(400).send({ message: "Username is required" });
  }
});

// Endpoint to make a guess
app.post("/make-guess", (req, res) => {
  const { guess } = req.body;
  if (guess == null || isNaN(guess)) {
    res.status(400).send({ message: "Invalid guess. Please enter a number." });
    return;
  }

  if (guess < targetNumber) {
    res.send({ message: "Too low!" });
  } else if (guess > targetNumber) {
    res.send({ message: "Too high!" });
  } else {
    res.send({ message: "Correct! You guessed the number!" });
    targetNumber = Math.floor(Math.random() * 100) + 1; // Reset the number
  }
});

// Endpoint to get all usernames
app.get("/get-usernames", (req, res) => {
  res.json(usernames);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
