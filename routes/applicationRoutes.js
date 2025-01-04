import express from "express";
import { getApplicationFormsForAdmin, getApplicationFormsForAdminFilters, getApplicationforms, getSingleApplicationFormForAdmin, getSingleApplicationform, registerApplicationForm, registerUpdateApplicationForm } from "../controllers/ApplicationController.js";
import { upload } from "../middlewares/Multer.js";


const applicationRouter = express.Router();

applicationRouter.post(
  "/register-application",
  upload.fields([
    { name: "studentImage", maxCount: 1 },
    { name: "certificates", maxCount: 14 },
  ]),
  registerApplicationForm
);
applicationRouter.post(
  "/update-application",
  upload.fields([
    { name: "studentImage", maxCount: 1 },
    { name: "certificates", maxCount: 14 },
  ]),
  registerUpdateApplicationForm
);


applicationRouter.get('/get-applications', getApplicationforms)
applicationRouter.get('/get-single-application/:id', getSingleApplicationform)

// admin routes
applicationRouter.get('/get-applications-for-admin', getApplicationFormsForAdmin)
applicationRouter.get('/get-single-application-for-admin/:id', getSingleApplicationFormForAdmin)
applicationRouter.post('/get-applications-for-admin-filters', getApplicationFormsForAdminFilters)

export default applicationRouter;
