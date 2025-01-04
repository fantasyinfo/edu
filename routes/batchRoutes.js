import express from "express";
import {
  addSubjectsToBatch,
  addTimetableToBatch,
  createBatch,
  deleteBatchById,
  demoteBatch,
  getAllBatches,
  getAllSubjectsOfBatch,
  getBatchById,
  getTimetableOfBatch,
  promoteBatch,
  updateBatchById,
} from "../controllers/BatchController.js";

const batchRouter = express.Router();

batchRouter.post("/create-new-batch", createBatch);
batchRouter.get("/get-all-batches", getAllBatches);
batchRouter.get("/get-batch/:id", getBatchById);
batchRouter.delete("/delete-a-batch/:id", deleteBatchById);
batchRouter.put("/promote-batch/:id", promoteBatch);
batchRouter.put("/demote-batch/:id", demoteBatch);
batchRouter.put("/update-a-batch/:id", updateBatchById);
batchRouter.put("/add-subjects-to-batch/:id", addSubjectsToBatch);
batchRouter.get("/get-all-subjects-of-batch/:id", getAllSubjectsOfBatch);
batchRouter.put("/add-timetable-to-batch/:id", addTimetableToBatch);
batchRouter.get("/get-timetable-of-batch/:id", getTimetableOfBatch);

export default batchRouter;
