import programModel from "../models/programModel.js";
import { v4 as uuidv4 } from "uuid";

export const createProgram = async (req, res) => {
  try {
    const { programName, description, streams } = req.body;
    const uniqueId = uuidv4();
    const program = new programModel({
      programName,
      description,
      streams,
      uniqueId,
    });
    await program.save();
    res.json({ program });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllPrograms = async (req, res) => {
  try {
    const programs = await programModel.find({});
    if (programs) {
      res.status(200).json({ programs });
    } else {
      res.status(500).json({ error: "Programs Not found." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProgramById = async (req, res) => {
  try {
    const { id } = req.params;
    const program = await programModel.findById(id);

    if (program) {
      res.status(200).json({ program });
    } else {
      res.status(404).json({ error: "Program not found." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteProgramById = async (req, res) => {
  try {
    const { id } = req.params;
    const program = await programModel.findByIdAndDelete(id);
    if (program) {
      res.status(200).json({ message: "Program deleted successfully." });
    } else {
      res.status(404).json({ error: "Program not found." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProgramById = async (req, res) => {
  try {
    const { id } = req.params;
    const { programName, description, streams } = req.body;
    const program = await programModel.findByIdAndUpdate(
      id,
      { programName, description, streams },
      { new: true }
    );

    if (program) {
      res.status(200).json({ program });
    } else {
      res.status(404).json({ error: "Program not found." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
