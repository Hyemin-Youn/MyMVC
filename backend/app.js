const express = require("express");
const cors = require("cors");
require("./config/db");

// 라우터 가져오기
const empRoutes = require("./routes/empRoutes");

const app = express();
app.use(cors()); // 미들웨어 설정
app.use(express.json()); // JSON 데이터 받기 (POST/PUT 필수)

// 기본 테스트 URL
app.get("/", (req, res) => {
  res.send("Express 서버 실행 중");
});

// 라우터 등록
app.use("/api", empRoutes);

// 서버 실행
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`서버 실행: http://localhost:${PORT}`);
});