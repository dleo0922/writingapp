// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 3002;

app.use(cors()); // CORS 미들웨어 추가
app.use(express.json()); // JSON 파싱 미들웨어 추가

// MongoDB 연결 설정
mongoose.connect('mongodb://localhost:27017/writingapp', { useNewUrlParser: true, useUnifiedTopology: true });

// 글 스키마 정의
const textSchema = new mongoose.Schema({
  content: String,
});

const TextModel = mongoose.model('Text', textSchema);

// 글 저장 엔드포인트
app.post('/save', async (req, res) => {
  const newText = req.body.text;

  try {
    // MongoDB에 저장
    const savedText = new TextModel({ content: newText });
    await savedText.save();
    res.send('Text saved successfully!');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

// 글 불러오기 엔드포인트
app.get('/load', async (req, res) => {
  try {
    // MongoDB에서 가장 최근에 저장된 글 불러오기
    const lastSavedText = await TextModel.findOne().sort({ _id: -1 });
    res.send(lastSavedText ? lastSavedText.content : '');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
