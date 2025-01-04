import mongoose from "mongoose";

const programSchema = new mongoose.Schema(
  {
    programName: { type: String, unique: true },
    description: String,
    streams: [
      {
        streamName: String,
        terms: Number,
        vision: String,
        mission: String,
      },
    ],
    uniqueId: String,
  },
  { timestamps: true }
);

const programModel = mongoose.model("Program", programSchema);

export default programModel;
