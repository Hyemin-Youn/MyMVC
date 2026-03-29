const express = require("express"); 
const cors = require("cors"); 
const pool = require("./config/db"); 
const empRoutes = require("./routes/empRoutes"); 
const app = express(); 
app.use(cors()); 
app.use(express.json()); 
async function testDB() { 
try { 
const [rows] = await pool.query("SELECT 1"); 
console.log("DB 연결 성공!"); 
} catch (err) { 
console.error("DB 연결 실패:", err); 
} 
} 
testDB(); 

app.get("/", (req, res) => { 
res.send("Express 서버 실행 중 (Promise 버전)"); 
}); 

app.use("/api", empRoutes); 
const PORT = 3001; 
app.listen(PORT, () => { 
console.log(`서버 실행: http://localhost:${PORT}`); 
});