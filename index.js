const express = require("express");
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const TOKENS_FILE = "./data/token.json";

// Pastikan folder data dan file token.json ada
if (!fs.existsSync("./data")) fs.mkdirSync("./data");
if (!fs.existsSync(TOKENS_FILE)) fs.writeFileSync(TOKENS_FILE, "[]");

app.get("/", (req, res) => {
  res.send("Token Manager is running");
});

app.post("/add-token", (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(400).json({ error: "Token is required" });

  const tokens = JSON.parse(fs.readFileSync(TOKENS_FILE));
  tokens.push(token);
  fs.writeFileSync(TOKENS_FILE, JSON.stringify(tokens, null, 2));

  res.json({ message: "Token added", token });
});

app.get("/get-tokens", (req, res) => {
  const tokens = JSON.parse(fs.readFileSync(TOKENS_FILE));
  res.json(tokens);
});

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});

module.exports = app;
