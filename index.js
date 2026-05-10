const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());

const FILE = "mts.txt";
const DEFAULT_TEXT = "(private) m";

// اذا الملف ما موجود، نسويه
if (!fs.existsSync(FILE)) {
  fs.writeFileSync(FILE, DEFAULT_TEXT);
}

// Health check endpoint
app.get("/", (req, res) => {
  res.status(200).send("ok");
});

// LAS او اي GET
app.get("/mts.txt", (req, res) => {
  const text = fs.readFileSync(FILE, "utf8");
  res.set("Content-Type", "text/plain");
  res.send(text);
});

// تحديث النص من البوت
app.post("/update", (req, res) => {
  const { text, seconds } = req.body;
  if (!text) return res.status(400).send("no text");

  fs.writeFileSync(FILE, text);

  setTimeout(() => {
    fs.writeFileSync(FILE, DEFAULT_TEXT);
  }, (seconds || 1) * 1000);

  res.send("ok");
});

const PORT = 3000;
app.listen(PORT, () => console.log("تم شغيل البوت"));
