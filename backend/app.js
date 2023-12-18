const express = require('express');
const bodyParser = require('body-parser');
const apiRouter = require('./routes/api');
const cors = require('cors');
app.use(cors());

const app = express();
const port = 3002;

app.use(bodyParser.json());
app.use('/api', apiRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


// 글 저장 API 추가 :
const bodyParser = require('body-parser');
app.use(bodyParser.json());

let savedText = '';

app.post('/save', (req, res) => {
  const newText = req.body.text;
  savedText = newText;
  res.send('Text saved successfully!');
});

// 글 불러오기 API 추가: 
app.get('/load', (req, res) => {
  res.send(savedText);
});