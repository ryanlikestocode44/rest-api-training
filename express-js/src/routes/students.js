const express = require("express");
const { 
  validateGetStudents,
  validateGetStudentById,
  validateAddStudent,
  validateUpdateStudent,
  validateDeleteStudentById
} = require("../middlewares/students");
const { 
  getStudents,
  getStudentById,
  addStudent,
  updateStudent,
  deleteStudentById
} = require("../controllers/students");

const router = express.Router();

router.get("/", validateGetStudents, getStudents);
router.get("/:id", validateGetStudentById, getStudentById);
router.post("/", validateAddStudent, addStudent);
router.put("/:id", validateUpdateStudent, updateStudent);
router.delete("/:id", validateDeleteStudentById, deleteStudentById);

module.exports = router;
