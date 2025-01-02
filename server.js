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

// Store usernames in memory
let usernames = [];

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

// Endpoint to get all usernames
app.get("/get-usernames", (req, res) => {
  res.json(usernames);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
