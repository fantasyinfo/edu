import express from "express";
import {
  createStudent,
  getAllStudents,
  getAllStudentsForABatch,
  loginStudent,
  updateAStudentMarks,
} from "../controllers/studentController.js";

const studentRouter = express.Router();

studentRouter.get("/", getAllStudents);
studentRouter.post("/login", loginStudent);
studentRouter.post("/admitStudent/:id", createStudent);
studentRouter.get("/students-for-batch", getAllStudentsForABatch);
studentRouter.post("/update-student-marks", updateAStudentMarks);

export default studentRouter;
