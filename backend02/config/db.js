const mysql = require("mysql2/promise");  // Promise + async/await 사용  
 
// 커넥션 풀 생성 
const pool = mysql.createPool({ 
  host: "localhost",     // DB 서버 
  user: "root",          // 계정 
  password: "Bai0304@#",      // 비밀번호 
  database: "my_emp",     // DB명 
  waitForConnections: true, // 기다릴 지 유무  
  connectionLimit: 10, //동시 연결 수   
  queueLimit: 0   // queue에 쌓을 수 있는 요청 개수 제한,  0은 무한대기  
}); 
 
module.exports = pool;