import express from "express";
import {
  createSubject,
  deleteSubjectById,
  getAllSubjects,
  getSubjectById,
  updateSubjectById,
} from "../controllers/SubjectController.js";

const subjectRouter = express.Router();

subjectRouter.post("/create-new-subject", createSubject);
subjectRouter.get("/get-all-subjects", getAllSubjects);
subjectRouter.get("/get-subject/:id", getSubjectById);
subjectRouter.delete("/delete-a-subject/:id", deleteSubjectById);
subjectRouter.put("/update-a-subject/:id", updateSubjectById);

export default subjectRouter;
