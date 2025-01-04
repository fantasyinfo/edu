// import mongoose from "mongoose";

// const batchSchema = new mongoose.Schema(
//   {
//     batchName: String,
//     description: String,
//     term: Number,
//     uniqueId: String,
//     subjects: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Subject", // Reference to the Subject model
//       },
//     ],
//   },

//   { timestamps: true }
// );

// const batchModel = mongoose.model("Batch", batchSchema);

// export default batchModel;
import mongoose from "mongoose";

const batchSchema = new mongoose.Schema(
  {
    batchName: String,
    description: String,
    term: Number,
    uniqueId: String,
    subjects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject", // Reference to the Subject model
      },
    ],
    timetable: {
      type: Map, // A map to store timetable slots (e.g., 'Monday-Hour 1')
      of: new mongoose.Schema({
        subjectName: String,
        subjectCode: String,
        faculty: String,
        from: String, // Time slot start
        to: String, // Time slot end
      }),
    },
  },
  { timestamps: true }
);

const batchModel = mongoose.model("Batch", batchSchema);

export default batchModel;
