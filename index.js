import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import applicationRouter from "./routes/applicationRoutes.js";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes.js";
import authMiddleware from "./middlewares/AuthMiddleware.js";
import path from "path";
import { fileURLToPath } from "url";
import leadCaptureRouter from "./routes/leadCaptureRoutes.js";
import paymentRouter from "./routes/paymentsRoutes.js";
import landingPageRouter from "./routes/landingPageRoutes.js";
import departmentRouter from "./routes/departmentRoutes.js";
import programRouter from "./routes/programRoutes.js";
import batchRouter from "./routes/batchRoutes.js";
import facultyRouter from "./routes/facultyRoutes.js";
import subjectRouter from "./routes/subjectRoutes.js";
import gradeRouter from "./routes/gradeSchemeRoutes.js";
import studentRouter from "./routes/studentRoutes.js";
import eventRouter from "./routes/eventRoutes.js";
import { notificationEmail, transporter } from "./NodeMailer.js";
import feedbackRouter from "./routes/feedbackRoutes.js";
import attendanceRouter from "./routes/attendanceRoutes.js";
// config dotenv
dotenv.config();

// constants from .env
const PORT = 8000;
const mongoDBuri =
  process.env.MONGO_DB_URI || "mongodb://localhost:27017/data_db";
// "mongodb+srv://college:College@cluster0.4khnqr9.mongodb.net/dmtims";

// initlize app
const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// db connect
try {
  var db = mongoose.connect(mongoDBuri, {
    useNewUrlParser: true,
  });
  console.log("success connection");
} catch (error) {
  console.log("Error connection: " + error);
}

// Middleware to serve static files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// routes

app.get("/", (req, res) => {
  res.status(200).send("Welcome, Node API Server is running...");
});

// send mail
app.post("/api/sendmail", async (req, res) => {
  const { recipientEmails, subject, message } = req.body;
  console.log("Sending email to:", recipientEmails);
  const info = await transporter.sendMail({
    from: `${process.env.SMTP_COMPANY} < ${process.env.SMTP_FROM_EMAIL} >`,
    to: recipientEmails.join(","),
    subject,
    text: message,
    html: notificationEmail(message),
  });
  res.status(200).send("Mail Sent");
});

// form routes
app.use("/api/form", authMiddleware, applicationRouter);

// user routes
app.use("/api/user", userRouter);

// lead captures

app.use("/api/lead", authMiddleware, leadCaptureRouter);

// department
app.use("/api/department", authMiddleware, departmentRouter);

// program
app.use("/api/program", authMiddleware, programRouter);

// batches
app.use("/api/batch", batchRouter);

// faculty
app.use("/api/faculty", facultyRouter);

// attendance
app.use("/api/attendance", attendanceRouter);

// student
app.use("/api/students", studentRouter);

// subject
app.use("/api/subject", subjectRouter);

// grades
app.use("/api/grade", authMiddleware, gradeRouter);

// feedback
app.use("/api/feedback", feedbackRouter);

// events
app.use("/api/events", eventRouter);

// payment routes
app.use("/api/payments", authMiddleware, paymentRouter);

// landing page routes
app.use("/api/landing", landingPageRouter);

//server
app.listen(PORT, () => console.log(`Server is Running on ${PORT}`));
