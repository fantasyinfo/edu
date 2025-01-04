import Student from "../models/studentModel.js";
import Application from "../models/applicationModel.js";
import { v4 as uuidv4 } from "uuid";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import {
  formattedDate,
  newUserStudentPasswordEmailWithLoginDetails,
  newUserStudentRegisterEmailWithLoginDetails,
  transporter,
} from "../NodeMailer.js";
const generatePassword = () => {
  return crypto.randomBytes(6).toString("hex");
};

export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find({});
    res.status(200).json({ students });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const application = await Application.findById(id);

    const uniqueId = uuidv4();
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }
    let password = "";
    password = generatePassword();

    const hashedPassword = await bcrypt.hash(password, 10);

    if (application.paymentStatus !== true) {
      return res.status(400).json({ message: "Payment not successful" });
    }

    const newStudent = new Student({
      studentDetails: application.studentDetails,
      communicationAddress: application.communicationAddress,
      permanentAddress: application.permanentAddress,
      familyBackground: application.familyBackground,
      competitiveExamScore: application.competitiveExamScore,
      workExperience: application.workExperience,
      hobbiesAwardsAchievements: application.hobbiesAwardsAchievements,
      certificates: application.certificates,
      loginStudentId: application.loginStudentId,
      academicDetails: {
        program: req.body.program,
        batch: req.body.batch,
        registerNumber: req.body.registerNumber,
        rollNumber: req.body.rollNumber,
        subjects: [],
      },
      status: "active",
      password: hashedPassword,
      studentId: uniqueId,
    });

    const savedStudent = await newStudent.save();

    console.log(savedStudent);
    // Update the application status
    application.formStatusFromAdmin = "Success";
    await application.save();
    console.log(password);

    // const info = await transporter.sendMail({
    //   from: `${process.env.SMTP_COMPANY} < ${process.env.SMTP_FROM_EMAIL} >`,
    //   to: email,
    //   subject: "Hey, Student Register ...",
    //   text: "New Student Register",
    //   html: newUserStudentRegisterEmailWithLoginDetails(
    //     name,
    //     email,
    //     password,
    //     formattedDate
    //   ),
    // });
    res
      .status(201)
      .json({ student: savedStudent, message: "Student created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const loginStudent = async (req, res) => {
  const { email, password } = req.body;

  try {
    const student = await Student.findOne({
      "studentDetails.emailAddress": email,
    });
    // console.log(student);
    if (!student) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const secretToken =
      process.env.JWT_SECRET || "1EfJJMlS7VIMS6xS7RjY1eT2UBW9CAn2";

    const token = jwt.sign({ studentId: student._id }, secretToken, {
      expiresIn: "12h",
    });
    res.status(200).json({ token, isAdmin: false });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get all students for a batch by using the batch name
export const getAllStudentsForABatch = async (req, res) => {
  try {
    const { batchName, subjectId } = req.query;
    const students = await Student.find({
      "academicDetails.batch": batchName,
    }).populate("academicDetails.subjects.subject");

    // Filter and format the student data to include only the relevant subject marks
    const formattedStudents = students.map((student) => {
      const subjectData = student.academicDetails.subjects.find(
        (subject) => subject.subject.$oid === subjectId
      );

      return {
        _id: student._id,
        studentDetails: student.studentDetails,
        marks: subjectData ? subjectData.marks : [],
      };
    });
    console.log(formattedStudents);
    res.status(200).json({ students: formattedStudents });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateAStudentMarks = async (req, res) => {
  try {
    const { studentId, subjectId, marks } = req.body;

    // Ensure studentId and subjectId are valid ObjectId strings
    if (
      !mongoose.Types.ObjectId.isValid(studentId) ||
      !mongoose.Types.ObjectId.isValid(subjectId)
    ) {
      return res
        .status(400)
        .json({ message: "Invalid studentId or subjectId" });
    }

    // Cast studentId and subjectId to ObjectId
    const studentObjectId = new mongoose.Types.ObjectId(studentId);
    const subjectObjectId = new mongoose.Types.ObjectId(subjectId);

    // Find the student by ID
    const student = await Student.findById(studentObjectId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Find the subject in the student's academic details
    const subjectIndex = student.academicDetails.subjects.findIndex(
      (subjectItem) =>
        subjectItem.subject &&
        subjectItem.subject.toString() === subjectObjectId.toString()
    );

    // Prepare the marks data
    const marksData = marks.map((mark) => ({
      schemeName: mark.schemeName,
      obtainedMarks: Number(mark.obtainedMarks),
    }));

    // If subject doesn't exist in academicDetails, create it
    if (subjectIndex === -1) {
      student.academicDetails.subjects.push({
        subject: subjectObjectId,
        marks: marksData,
      });
    } else {
      // If the subject exists, update its marks
      student.academicDetails.subjects[subjectIndex].marks = marksData;
    }

    // Use findOneAndUpdate instead of save()
    const updatedStudent = await Student.findOneAndUpdate(
      { _id: studentObjectId },
      {
        $set: { "academicDetails.subjects": student.academicDetails.subjects },
      },
      { new: true, runValidators: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: "Failed to update student" });
    }

    return res.status(200).json({ message: "Marks updated successfully" });
  } catch (error) {
    console.error("Error updating marks:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

//------------------------------------------------------------

// import dotenv from "dotenv";

// dotenv.config();

// export const register = async (req, res) => {
//   const { name, gender, email, mobile, isAdmin, pass } = req.body;

//   const adminIs = isAdmin || false;
//   let password = "";

//   if (!adminIs) {
//     password = generatePassword();
//     // password = pass;
//   } else {
//     password = pass || "Admin";
//   }
//   console.log(password);
//   const hashedPassword = await bcrypt.hash(password, 10);
//   try {
//     const newUser = await User.create({
//       name,
//       gender,
//       email,
//       mobile,
//       password: hashedPassword,
//       isAdmin: adminIs,
//     });
//     // send welcome email to normal studnets only
//     if (!adminIs) {
//       const info = await transporter.sendMail({
//         from: `${process.env.SMTP_COMPANY} < ${process.env.SMTP_FROM_EMAIL} >`,
//         to: email,
//         subject: "Hey, User/Student Register ...",
//         text: "New User/Student Register",
//         html: newUserStudentRegisterEmailWithLoginDetails(
//           name,
//           email,
//           password,
//           formattedDate
//         ),
//       });
//     }

//     res.status(201).json({ message: "User registered successfully!" });
//   } catch (error) {
//     console.error(error);
//     if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
//       res.status(400).json({
//         error: "Duplicate Account, Email is Already Register with us",
//       });
//     } else if (
//       error.code === 11000 &&
//       error.keyPattern &&
//       error.keyPattern.mobile
//     ) {
//       res.status(400).json({
//         error: "Duplicate Account, Mobile Number is Already Register with us",
//       });
//     } else {
//       res.status(500).json({ error: "Internal server error" });
//     }
//   }
// };

// export const forgotPassword = async (req, res) => {
//   const { email } = req.body;
//   const newPassword = generatePassword();
//   const hashedPassword = await bcrypt.hash(newPassword, 10);

//   try {
//     let findUser = await User.findOne({ email });
//     if (findUser.isAdmin) {
//       return res
//         .status(400)
//         .json({ message: "Admin's Can not use this feature, sorry." });
//     }

//     const user = await User.findOneAndUpdate(
//       { email },
//       { password: hashedPassword }
//     );
//     if (!user) {
//       return res.status(400).json({ message: "User not found" });
//     }

//     const info = await transporter.sendMail({
//       from: `${process.env.SMTP_COMPANY} < ${process.env.SMTP_FROM_EMAIL} >`,
//       to: email,
//       subject: "New Password",
//       text: "Your new password for login",
//       html: newUserStudentPasswordEmailWithLoginDetails(
//         user.name,
//         email,
//         newPassword,
//         formattedDate
//       ),
//     });

//     res.status(200).json({ message: "Password reset successfully!" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
