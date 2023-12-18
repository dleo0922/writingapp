// src/App.js
import React, { useEffect, useState } from 'react';
import FileSaver from 'file-saver'; // FileSaver.js 라이브러리 사용

function App() {
  const [serverMessage, setServerMessage] = useState('');
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    // 서버로 요청 보내기 (글 불러오기)
    fetch('http://localhost:3002/load')
      .then(response => response.text())
      .then(data => setServerMessage(data))
      .catch(error => console.error('Error:', error));
  }, []);

  // 글 저장 함수
  const saveText = () => {
    // 서버로 요청 보내기 (글 저장)
    fetch('http://localhost:3002/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: inputText }),
    })
      .then(response => response.text())
      .then(data => setServerMessage(data))
      .catch(error => console.error('Error:', error));
  };

  // 글자가 20초 이상 입력되지 않으면 글자가 점점 연해지다가 내용이 날아가는 효과 구현
  useEffect(() => {
    let timer;
    if (inputText) {
      timer = setTimeout(() => {
        setInputText('');
      }, 20000); // 20초
    }
    return () => clearTimeout(timer);
  }, [inputText]);

  // 현재까지 작성한 글을 파일로 다운로드하는 함수
  const downloadText = () => {
    const blob = new Blob([inputText], { type: 'text/plain;charset=utf-8' });
    FileSaver.saveAs(blob, 'myTextFile.txt');
  };

  return (
    <div>
      <h1>Hello, Writing App!</h1>
      <div>
        <textarea value={inputText} onChange={e => setInputText(e.target.value)} />
      </div>
      <button onClick={saveText}>Save Text</button>
      <button onClick={downloadText}>Download Text</button>
      <p>Message from server: {serverMessage}</p>
    </div>
  );
}

export default App;