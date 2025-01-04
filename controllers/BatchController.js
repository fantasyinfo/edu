import batchModel from "../models/batchesModel.js";
import { v4 as uuidv4 } from "uuid";
import subjectModel from "../models/subjectModel.js";

export const createBatch = async (req, res) => {
  try {
    const { batchName, description, term, subjects } = req.body;
    const uniqueId = uuidv4();
    const batch = new batchModel({
      batchName,
      description,
      term,
      uniqueId,
      subjects,
    });
    await batch.save();
    res.json({ batch });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllBatches = async (req, res) => {
  try {
    const batches = await batchModel.find({});
    if (batches) {
      res.status(200).json({ batches });
    } else {
      res.status(500).json({ error: "Batches Not found." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteBatchById = async (req, res) => {
  try {
    const { id } = req.params;
    const batch = await batchModel.findByIdAndDelete(id);
    if (batch) {
      res.status(200).json({ message: "Batch deleted successfully." });
    } else {
      res.status(404).json({ error: "Batch not found." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateBatchById = async (req, res) => {
  try {
    const { id } = req.params;
    const { batchName, description, term, subjects } = req.body;
    const batch = await batchModel.findByIdAndUpdate(
      id,
      { batchName, description, term, subjects },
      { new: true }
    );

    if (batch) {
      res.status(200).json({ batch });
    } else {
      res.status(404).json({ error: "Batch not found." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getBatchById = async (req, res) => {
  try {
    const { id } = req.params;
    const batch = await batchModel.findById(id);
    if (batch) {
      res.status(200).json({ batch });
    } else {
      res.status(404).json({ error: "Batch not found." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const promoteBatch = async (req, res) => {
  const { id } = req.params;
  try {
    const batch = await batchModel.findById(id);
    if (!batch) {
      return res.status(404).json({ error: "Batch not found." });
    }

    batch.term += 1;
    await batch.save();

    res.status(200).json({ batch });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const demoteBatch = async (req, res) => {
  const { id } = req.params;
  try {
    const batch = await batchModel.findById(id);
    if (!batch) {
      return res.status(404).json({ error: "Batch not found." });
    }
    if (batch.term > 0) {
      batch.term -= 1;
    }
    await batch.save();

    res.status(200).json({ batch });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllSubjectsOfBatch = async (req, res) => {
  try {
    const { id } = req.params;
    const batch = await batchModel.findById(id);
    if (batch) {
      const subjects = await subjectModel
        .find({ _id: { $in: batch.subjects } })
        .lean();

      // Handle potential string values in faculty field
      const processedSubjects = subjects.map((subject) => {
        if (typeof subject.faculty === "string") {
          return { ...subject, faculty: { facultyName: subject.faculty } };
        }
        return subject;
      });

      res.status(200).json({ subjects: processedSubjects });
    } else {
      res.status(404).json({ error: "Batch not found." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// add subjects to a batch
export const addSubjectsToBatch = async (req, res) => {
  try {
    const { id } = req.params;
    const { subjects } = req.body;
    const batch = await batchModel.findByIdAndUpdate(
      id,
      { $addToSet: { subjects: { $each: subjects } } },
      { new: true, runValidators: true }
    );
    if (batch) {
      res.status(200).json({ batch });
    } else {
      res.status(404).json({ error: "Batch not found." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// add timetable to batch
export const addTimetableToBatch = async (req, res) => {
  try {
    const { id } = req.params; // Get batch ID from URL params
    const { timetable } = req.body; // Extract timetable from request body

    console.log(req.body);

    if (!timetable || typeof timetable !== "object") {
      return res
        .status(400)
        .json({ error: "Invalid timetable data provided." });
    }

    // Find and update the batch by appending or overwriting the timetable
    const batch = await batchModel.findByIdAndUpdate(
      id,
      { $set: { timetable } }, // $set to replace existing timetable
      { new: true, runValidators: true } // Return updated document
    );

    if (batch) {
      res
        .status(200)
        .json({ message: "Timetable updated successfully.", batch });
    } else {
      res.status(404).json({ error: "Batch not found." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTimetableOfBatch = async (req, res) => {
  try {
    const { id } = req.params; // Batch ID from URL params

    // Find the batch by ID and select the timetable field
    const batch = await batchModel.findById(id, "timetable");

    if (batch) {
      res.status(200).json({ timetable: batch.timetable });
    } else {
      res.status(404).json({ error: "Batch not found." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
