const express = require('express');
const router = express.Router();

let savedText = '';

router.post('/save', (req, res) => {
  const newText = req.body.text;
  savedText = newText;
  res.send('Text saved successfully!');
});

router.get('/load', (req, res) => {
  res.send(savedText);
});

module.exports = router;