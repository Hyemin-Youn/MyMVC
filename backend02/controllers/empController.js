const empModel = require("../models/empModel");

// 1. 전체 조회 (Promise 버전)
exports.getEmpList = async (req, res) => {
  try {
    const results = await empModel.findAll();
    res.json(results);
  } catch (err) {
    console.error("전체 조회 실패:", err);
    res.status(500).json({ error: "전체 조회 실패" });
  }
};

// 2. 단건 조회 (에러 수정 및 async 추가)
exports.getEmpById = async (req, res) => {
  try {
    const empno = req.params.empno;
    const results = await empModel.findById(empno);
    res.json(results);
  } catch (err) {
    console.error("상세 조회 실패:", err);
    res.status(500).json({ error: "상세 조회 실패" });
  }
};

// 3. 등록 (요청하신 중심 코드)
exports.insertEmp = async (req, res) => { 
  try { 
    const empData = req.body; 
 
    const errors = validateEmp(empData, false); 
    if (errors.length > 0) { 
      return res.status(400).json({ errors }); 
    } 
 
    const result = await empModel.create(empData); 
 
    res.status(201).json({ 
      message: "사원 등록 성공", 
      result: result 
    }); 
  } catch (err) { 
    console.error("등록 실패:", err); 
    res.status(500).json({ error: "등록 실패" }); 
  } 
}; 


// 4. 수정 (Promise 버전으로 변경)
exports.updateEmp = async (req, res) => { 
  try { 
    const empno = req.params.empno; 
    const empData = req.body; 
 
    const errors = validateEmp(empData, true); 
    if (errors.length > 0) { 
      return res.status(400).json({ errors }); 
    } 
 
    const result = await empModel.update(empno, empData); 
 
    res.json({ 
      message: "사원 수정 성공", 
      result: result 
    }); 
  } catch (err) { 
    console.error("수정 실패:", err); 
    res.status(500).json({ error: "수정 실패" }); 
  } 
}; 

// 5. 삭제 (Promise 버전으로 변경)
exports.deleteEmp = async (req, res) => {
  try {
    const empno = req.params.empno;
    const results = await empModel.remove(empno);
    res.json({
      message: "사원 삭제 성공",
      result: results
    });
  } catch (err) {
    console.error("삭제 실패:", err);
    res.status(500).json({ error: "삭제 실패" });
  }
};


// 6.  Validation //강사님이 주심
function validateEmp(emp, isUpdate = false) {
  const errors = [];
  if (!isUpdate) {
    if (!emp.empno || isNaN(emp.empno)) {
      errors.push("empno는 숫자여야 합니다.");
    }
  }

  if (!emp.ename) errors.push("ename 필수");
  if (!emp.job) errors.push("job 필수");

  if (emp.sal && isNaN(emp.sal)) errors.push("sal 숫자");
  if (emp.deptno && isNaN(emp.deptno)) errors.push("deptno 숫자");
  return errors;
}

// 검색 및 페이징 (기존 코드 유지)
exports.searchEmp = async (req, res) => {
  try {
    const results = await empModel.search(req.query);
    res.json(results);
  } catch (err) {
    console.error("검색 실패:", err);
    res.status(500).json({ error: "검색 실패" });
  }
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
