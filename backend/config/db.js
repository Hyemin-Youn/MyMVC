const mysql = require("mysql2"); 
 
// DB 연결 객체 생성 
const conn = mysql.createConnection({ 
  host: "localhost",     // DB 서버 주소 
  user: "root",          // MySQL 사용자 
  password: "Bai0304@#",      // 비밀번호 
  database: "my_emp"      // 사용할 DB 
}); 
 
// 연결 확인 
conn.connect((err) => { 
  if (err) { 
    console.error("MySQL 연결 실패:", err); 
    return; 
  } 
  console.log("MySQL 연결 성공!"); 
}); 
module.exports = conn;