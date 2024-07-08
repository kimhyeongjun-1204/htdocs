// 서버 사이드(Express) 통신 설정

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 1103;

// DB 연결 
const db = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "mydatabase",
  port: 3306
});


app.use(cors({
  origin: "*",
  credentials: true,
  optionsSuccessStatus: 200,
}));

app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})

/* GET 요청 처리하기 */
app.get('/pracs', (req, res) => {
  // MySQL 쿼리 작성
  const query = 'SELECT * FROM todolist';

  // 데이터베이스 쿼리 실행
  db.query(query, (err, results) => {
    if (err) {
      console.error('MySQL query error:', err);
      res.status(500).send('Internal server error');
      return;
    }

    // 결과를 JSON 형식으로 클라이언트에 응답
    res.json(results);
  });
});
w
  




