//https://nodejs.org/api/modules.html dao를 node.js 코드로 사용하겠다.
//exports : node.js에서 현재 파일에 정의된 함수나 객체를 다른 파일에서 사용할 수 있도록 내보내는 키워드
const conn = require("../config/db");

const pool = require("../config/db"); // 이미 Promise 기반 pool일 거예요.

// 1. 전체 조회 (수정 후)
exports.findAll = async () => {
  const sql = "SELECT * FROM emp ORDER BY empno";
  // 콜백 (err, rows) => { } 를 지우고 아래처럼 한 줄로!
  const [rows] = await pool.query(sql); 
  return rows; 
};

// 2. 단건 조회 (수정 후)
exports.findById = async (empno) => {
  const sql = "SELECT * FROM emp WHERE empno = ?";
  const [rows] = await pool.query(sql, [empno]);
  return rows;
};

// 3. 등록 (혜민님이 가장 중요하게 생각하시는 부분!)
exports.create = async (empData) => {
  const sql = "INSERT INTO emp SET ?";
  // rows가 아니라 결과 정보가 오므로 [result]로 받습니다.
  const [result] = await pool.query(sql, empData);
  return result;

    conn.query(
    sql,
    [
      emp.empno,
      emp.ename,
      emp.job,
      emp.mgr || null,
      emp.hiredate || null,
      emp.sal || null,
      emp.comm || null,
      emp.deptno || null
    ],
    (err, results) => {
      callback(err, results);
    }
  );
};




// 4. 업데이트 수정
exports.update = (empno, emp, callback) => {
  const sql = `
    UPDATE emp
    SET ename = ?, job = ?, mgr = ?, hiredate = ?, sal = ?, comm = ?, deptno = ?
    WHERE empno = ?
  `;

  conn.query(
    sql,
    [
      emp.ename,
      emp.job,
      emp.mgr || null,
      emp.hiredate || null,
      emp.sal || null,
      emp.comm || null,
      emp.deptno || null,
      empno // WHERE 절에 들어갈 조건값
    ],
    (err, results) => {
      callback(err, results);
    }
  );
};

// 5. 삭제
exports.remove = (empno, callback) => {
  const sql = "DELETE FROM emp WHERE empno=?";
  conn.query(sql, [empno], (err, results) => {
    callback(err, results);
  });
};

exports.search = async (query) => { 
  let sql = "SELECT * FROM my_emp WHERE 1=1"; 
  const params = []; 
 
  if (query.ename) { 
    sql += " AND ename LIKE ?"; 
    params.push(`%${query.ename}%`); 
  } 
 
  if (query.job) { 
    sql += " AND job LIKE ?"; 
    params.push(`%${query.job}%`); 
  } 
 
  if (query.deptno) { 
    sql += " AND deptno = ?"; 
    params.push(query.deptno); 
  } 
 
  sql += " ORDER BY empno"; 
 
  const [rows] = await pool.query(sql, params); 
  return rows; 
};

exports.findPage = async (page, size) => { 
const offset = (page - 1) * size; 
const sql = "SELECT * FROM my_emp ORDER BY empno LIMIT ?, ?"; 
const [rows] = await pool.query(sql, [offset, Number(size)]); 
const [countRows] = await pool.query("SELECT COUNT(*) AS total FROM my_emp"); 

return { 
page: Number(page), 
size: Number(size), 
total: countRows[0].total, 
data: rows 
}; 
};

exports.getEmpPage = async (req, res) => { 
try { 
const page = Number(req.query.page) || 1; 
const size = Number(req.query.size) || 5; 
const result = await empModel.findPage(page, size); 
res.json(result); 
} catch (err) { 
console.error("페이징 조회 실패:", err); 
res.status(500).json({ error: "페이징 조회 실패" }); 
} 
}; 