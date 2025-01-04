import mongoose from "mongoose";

const facultySchema = new mongoose.Schema(
  {
    facultyName: String,
    department: String,
    email: String,
    phone: String,
    uniqueId: String,
    password: String,
  },
  { timestamps: true }
);

const facultyModel = mongoose.model("Faculty", facultySchema);

export default facultyModel;
