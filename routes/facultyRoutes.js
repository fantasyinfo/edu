import express from "express";
import {
  createFaculty,
  deleteFacultyById,
  facultyLogin,
  getAllFaculties,
  getFacultyById,
  mailFacultyLoginDetails,
  updateFacultyById,
} from "../controllers/facultyController.js";

const facultyRouter = express.Router();

facultyRouter.post("/login", facultyLogin);
facultyRouter.post("/create-new-faculty", createFaculty);
facultyRouter.get("/get-all-faculties", getAllFaculties);
facultyRouter.get("/get-faculty/:id", getFacultyById);
facultyRouter.delete("/delete-a-faculty/:id", deleteFacultyById);
facultyRouter.put("/update-a-faculty/:id", updateFacultyById);
facultyRouter.post("/mail-details-faculty/:id", mailFacultyLoginDetails);

export default facultyRouter;
