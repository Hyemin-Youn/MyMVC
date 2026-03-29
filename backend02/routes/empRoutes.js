const express = require("express");
const router = express.Router();
const empController = require("../controllers/empController");


router.get("/emps/search", empController.searchEmp); 
router.get("/emps/page", empController.getEmpPage);

router.get("/emps", empController.getEmpList);
router.get("/emps/:empno", empController.getEmpById);
router.post("/emps", empController.insertEmp);

router.put("/emps/:empno", empController.updateEmp);
router.delete("/emps/:empno", empController.deleteEmp);



module.exports = router;