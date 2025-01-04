import subjectModel from "../models/subjectModel.js";
import { v4 as uuidv4 } from "uuid";

export const createSubject = async (req, res) => {
  try {
    const {
      subjectName,
      subjectCode,
      description,
      isElective,
      faculty,
      passCriteria,
      markingScheme,
    } = req.body;
    const uniqueId = uuidv4();
    const subject = new subjectModel({
      subjectName,
      subjectCode,
      description,
      isElective,
      faculty,
      passCriteria,
      markingScheme,
      uniqueId,
    });
    await subject.save();
    res.json({ subject });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllSubjects = async (req, res) => {
  try {
    const subjects = await subjectModel.find({});
    if (subjects) {
      res.status(200).json({ subjects });
    } else {
      res.status(500).json({ error: "Subjects Not found." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteSubjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const subject = await subjectModel.findByIdAndDelete(id);
    if (subject) {
      res.status(200).json({ message: "Subject deleted successfully." });
    } else {
      res.status(404).json({ error: "Subject not found." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateSubjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      subjectName,
      subjectCode,
      description,
      isElective,
      faculty,
      passCriteria,
      markingScheme,
    } = req.body;
    const subject = await subjectModel.findByIdAndUpdate(
      id,
      {
        subjectName,
        subjectCode,
        description,
        isElective,
        faculty,
        passCriteria,
        markingScheme,
      },
      { new: true }
    );

    if (subject) {
      res.status(200).json({ subject });
    } else {
      res.status(404).json({ error: "Subject not found." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSubjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const subject = await subjectModel.findById(id);
    if (subject) {
      res.status(200).json({ subject });
    } else {
      res.status(404).json({ error: "Subject not found." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
