import { v4 as uuidv4 } from "uuid";
import facultyModel from "../models/facultyModel.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import {
  formattedDate,
  newUserFacultyRegisterEmailWithLoginDetails,
  transporter,
} from "../NodeMailer.js";

const generatePassword = () => {
  return crypto.randomBytes(6).toString("hex");
};

export const createFaculty = async (req, res) => {
  try {
    const { facultyName, department, email, phone } = req.body;
    const uniqueId = uuidv4();
    const password = generatePassword();
    console.log(password);
    const hashedPassword = await bcrypt.hash(password, 10);

    const faculty = new facultyModel({
      facultyName,
      department,
      email,
      phone,
      password: hashedPassword,
      uniqueId,
    });

    await faculty.save();
    res.json({ faculty });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const facultyLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const faculty = await facultyModel.findOne({ email });
    if (!faculty) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, faculty.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const secretToken =
      process.env.JWT_SECRET || "1EfJJMlS7VIMS6xS7RjY1eT2UBW9CAn2";

    const token = jwt.sign({ facultyId: faculty._id }, secretToken, {
      expiresIn: "12h",
    });
    res.status(200).json({
      token,
      data: {
        _id: faculty._id,
        facultyName: faculty.facultyName,
        email: faculty.email,
        department: faculty.department,
        phone: faculty.phone,
        uniqueId: faculty.uniqueId,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const updateFacultyById = async (req, res) => {
  try {
    const { id } = req.params;
    const { facultyName, department, email, phone } = req.body;

    const faculty = await facultyModel.findByIdAndUpdate(
      id,
      { facultyName, department, email, phone },
      { new: true }
    );

    if (!faculty) {
      return res.status(404).json({ error: "Faculty not found" });
    }

    res.json({ faculty });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteFacultyById = async (req, res) => {
  try {
    const { id } = req.params;

    const faculty = await facultyModel.findByIdAndDelete(id);

    if (!faculty) {
      return res.status(404).json({ error: "Faculty not found" });
    }

    res.json({ message: "Faculty deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllFaculties = async (req, res) => {
  try {
    const faculties = await facultyModel.find();
    res.json({ faculties });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getFacultyById = async (req, res) => {
  try {
    const { id } = req.params;

    const faculty = await facultyModel.findById(id);

    if (!faculty) {
      return res.status(404).json({ error: "Faculty not found" });
    }

    res.json({ faculty });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const mailFacultyLoginDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const faculty = await facultyModel.findById(id);
    if (!faculty) {
      return res.status(404).json({ error: "Faculty not found" });
    }
    const password = generatePassword();
    console.log(password);
    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedFaculty = await facultyModel.findByIdAndUpdate(id, {
      password: hashedPassword,
    });
    const info = await transporter.sendMail({
      from: `${process.env.SMTP_COMPANY} < ${process.env.SMTP_FROM_EMAIL} >`,
      to: faculty.email,
      subject: `Hey, ${faculty.facultyName} Register ...`,
      text: "New Faculty Register",
      html: newUserFacultyRegisterEmailWithLoginDetails(
        faculty.facultyName,
        faculty.email,
        password,
        formattedDate
      ),
    });
    res.json({ message: "Mail sent successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
