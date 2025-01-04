import Attendance from "../models/attendanceModel.js";

export const markAttendance = async (req, res) => {
  const { batch, subjectId, date, attendance } = req.body;
  try {
    const attendanceRecord = new Attendance({
      batch,
      subjectId,
      date,
      attendance,
    });
    await attendanceRecord.save();
    res.status(201).json({ attendanceRecord });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// fetch attendance of a batch
export const fetchAttendanceOfABatch = async (req, res) => {
  const { batchId, date, subjectId } = req.query;
  try {
    const attendance = await Attendance.find({
      "batch.batchId": batchId,
      date,
      subjectId,
    });
    console.log("Attendance: ", attendance);
    res.json({ attendance });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
