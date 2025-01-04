import express from "express";
import {
  fetchAttendanceOfABatch,
  markAttendance,
} from "../controllers/AttendanceController.js";

const attendanceRouter = express.Router();

attendanceRouter.post("/mark-attendance", markAttendance);
attendanceRouter.get("/fetch-attendance", fetchAttendanceOfABatch);

export default attendanceRouter;
