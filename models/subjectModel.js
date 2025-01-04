import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema(
  {
    subjectName: { type: String, unique: true },
    subjectCode: String,
    description: String,
    isElective: String,
    passCriteria: String,
    markingScheme: [{ name: String, value: Number }],
    faculty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Faculty",
    },
    uniqueId: String,
  },
  { timestamps: true }
);

const subjectModel = mongoose.model("Subject", subjectSchema);

export default subjectModel;
