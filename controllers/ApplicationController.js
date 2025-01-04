import applicationModel from "../models/applicationModel.js";
import counter from "../models/counterModel.js";

export const registerApplicationForm = async (req, res) => {
  try {
    let applicationData = req.body;
    const files = req.files;

    // set login user id via token
    applicationData.loginStudentId = req.user.userId;

    applicationData.applicationNumber = await getNextSequenceValue(
      "applicationNumber"
    );

    // Ensure studentDetails is defined
    if (!applicationData.studentDetails) {
      applicationData.studentDetails = {};
    }

    // Handle student image
    if (files.studentImage) {
      applicationData.studentDetails.studentImage =
        files.studentImage[0].filename;
    }

    // Handle certificates
    applicationData.certificates = [];
    if (files.certificates && applicationData.certificateNames) {
      files.certificates.forEach((file, index) => {
        applicationData.certificates.push({
          type: applicationData.certificateNames[index],
          fileUrl: file.filename,
        });
      });
    }

    const newRegistration = new applicationModel(applicationData);
    newRegistration
      .save()
      .then((savedData) => {
        res.status(201).json({
          message: "Form Submitted successfully",
          student: savedData,
        });
      })
      .catch((error) => {
        console.log(error);
        res
          .status(400)
          .json({ message: "Error saving data to the database", error });
      });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error submitting form", error });
  }
};

export const getApplicationforms = async (req, res) => {
  try {
    const loginStudentId = req.user.userId;

    const applications = await applicationModel.find({ loginStudentId });

    if (applications.length === 0) {
      return res.status(404).json({ message: "No application forms found" });
    }

    // Append full URLs
    applications.forEach((application) => {
      if (
        application.studentDetails &&
        application.studentDetails.studentImage
      ) {
        application.studentDetails.studentImage = `${req.protocol}://${req.get(
          "host"
        )}/uploads/images/${application.studentDetails.studentImage}`;
      }
      if (application.certificates) {
        application.certificates.forEach((certificate) => {
          certificate.fileUrl = `${req.protocol}://${req.get(
            "host"
          )}/uploads/certificates/${certificate.fileUrl}`;
        });
      }
    });

    res.status(200).json(applications);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error retrieving application forms", error });
  }
};

export const getSingleApplicationform = async (req, res) => {
  try {
    const { id } = req.params;
    const loginStudentId = req.user.userId;
    const application = await applicationModel.findOne({
      _id: id,
      loginStudentId,
    });

    if (!application) {
      return res.status(404).json({ message: "Application form not found" });
    }

    // Append full URLs
    if (application.studentDetails && application.studentDetails.studentImage) {
      application.studentDetails.studentImage = `${req.protocol}://${req.get(
        "host"
      )}/uploads/images/${application.studentDetails.studentImage}`;
    }
    if (application.certificates) {
      application.certificates.forEach((certificate) => {
        certificate.fileUrl = `${req.protocol}://${req.get(
          "host"
        )}/uploads/certificates/${certificate.fileUrl}`;
      });
    }

    res.status(200).json(application);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error retrieving application form", error });
  }
};

const getNextSequenceValue = async (sequenceName) => {
  const sequenceDocument = await counter.findOneAndUpdate(
    { sequenceName },
    { $inc: { sequenceValue: 1 } },
    { new: true, upsert: true }
  );
  return sequenceDocument.sequenceValue;
};

export const registerUpdateApplicationForm = async (req, res) => {
  try {
    let applicationData = req.body;
    const _id = req.body._id;
    const files = req.files;

    // Transform the null prototype object into a regular object
    applicationData = Object.keys(applicationData).reduce((acc, key) => {
      acc[key] = applicationData[key];
      return acc;
    }, {});

    // Prepare the update object with existing data
    let updateData = { ...applicationData };

    if (applicationData.stage == 1) {
      // Handle student image
      if (files && files.studentImage) {
        updateData["studentDetails.studentImage"] =
          files.studentImage[0].filename;
      }
    } else if (applicationData.stage == 2) {
      // handle competitive exam details
      const competitiveExamScores = [];

      for (
        let i = 0;
        applicationData[`competitiveExamScore[${i}].competativeName`];
        i++
      ) {
        competitiveExamScores.push({
          competativeName:
            applicationData[`competitiveExamScore[${i}].competativeName`],
          competativeDate:
            applicationData[`competitiveExamScore[${i}].competativeDate`],
          competativeObtMarks: parseInt(
            applicationData[`competitiveExamScore[${i}].competativeObtMarks`]
          ),
          competativeMaxMarks: parseInt(
            applicationData[`competitiveExamScore[${i}].competativeMaxMarks`]
          ),
        });
      }

      updateData.competitiveExamScore = competitiveExamScores;
    } else if (applicationData.stage == 3) {
      // handle workExperience details
      const workExperience = [];
      for (let i = 0; applicationData[`workExperience[${i}].company`]; i++) {
        workExperience.push({
          company: applicationData[`workExperience[${i}].company`],
          designation: applicationData[`workExperience[${i}].designation`],
          from: applicationData[`workExperience[${i}].from`],
          to: applicationData[`workExperience[${i}].to`],
        });
      }
      updateData.workExperience = workExperience;

      // handle hobbiesAwardsAchievements details
      const hobbiesAwardsAchievements = [];
      for (
        let i = 0;
        applicationData[`hobbiesAwardsAchievements[${i}].organization`];
        i++
      ) {
        hobbiesAwardsAchievements.push({
          organization:
            applicationData[`hobbiesAwardsAchievements[${i}].organization`],
          description:
            applicationData[`hobbiesAwardsAchievements[${i}].description`],
        });
      }

      updateData.hobbiesAwardsAchievements = hobbiesAwardsAchievements;
    } else if (applicationData.stage == 4) {
      // Fetch the existing application data
      const existingApplication = await applicationModel.findById(_id);
      if (!existingApplication) {
        return res.status(404).json({ message: "Application not found" });
      }

      // Handle certificates

      if (files && files.certificates && applicationData.certificateNames) {
        // Ensure updateData.certificates is initialized as an array if it doesn't exist
        if (!Array.isArray(updateData.certificates)) {
          updateData.certificates = existingApplication.certificates || [];
        }

        let temp = 0;
        const newCertificates = files.certificates
          .map((file, index) => {
            if (file?.filename) {
              const certificateName = applicationData.certificateNames[temp];
              temp++;
              return {
                type: certificateName,
                fileUrl: file.filename,
              };
            }
            return null; // Return null for entries that do not match criteria
          })
          .filter((certificate) => certificate !== null); // Filter out null entries

        // Update or add new certificates
        newCertificates.forEach((newCertificate) => {
          const existingIndex = updateData.certificates.findIndex(
            (cert) => cert.type == newCertificate.type
          );
          if (existingIndex > -1) {
            // Update existing certificate
            console.log(updateData.certificates);
            console.log(newCertificate);
            updateData.certificates[existingIndex] = newCertificate;
            console.log(updateData.certificates[existingIndex]);
          } else {
            // Add new certificate
            updateData.certificates.push(newCertificate);
          }
        });
      }
    }

    // Update the existing application
    const updatedRegistration = await applicationModel.findByIdAndUpdate(
      _id,
      { $set: updateData },
      { new: true, runValidators: true } // Return the updated document
    );

    if (!updatedRegistration) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.status(200).json({
      message: "Form updated successfully",
      student: updatedRegistration,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error updating form", error });
  }
};

// admin controllers

export const getApplicationFormsForAdmin = async (req, res) => {
  try {
    const applications = await applicationModel
      .find()
      .populate("loginStudentId");

    if (applications.length === 0) {
      return res.status(404).json({ message: "No application forms found" });
    }

    // Append full URLs
    applications.forEach((application) => {
      if (
        application.studentDetails &&
        application.studentDetails.studentImage
      ) {
        application.studentDetails.studentImage = `${req.protocol}://${req.get(
          "host"
        )}/uploads/images/${application.studentDetails.studentImage}`;
      }
      if (application.certificates) {
        application.certificates.forEach((certificate) => {
          certificate.fileUrl = `${req.protocol}://${req.get(
            "host"
          )}/uploads/certificates/${certificate.fileUrl}`;
        });
      }
    });

    res.status(200).json(applications);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error retrieving application forms", error });
  }
};

export const getSingleApplicationFormForAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const application = await applicationModel.findOne({
      _id: id,
    });

    if (!application) {
      return res.status(404).json({ message: "Application form not found" });
    }

    // Append full URLs
    if (application.studentDetails && application.studentDetails.studentImage) {
      application.studentDetails.studentImage = `${req.protocol}://${req.get(
        "host"
      )}/uploads/images/${application.studentDetails.studentImage}`;
    }
    if (application.certificates) {
      application.certificates.forEach((certificate) => {
        certificate.fileUrl = `${req.protocol}://${req.get(
          "host"
        )}/uploads/certificates/${certificate.fileUrl}`;
      });
    }

    res.status(200).json(application);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error retrieving application form", error });
  }
};

export const getApplicationFormsForAdminFilters = async (req, res) => {
  const { year, applicationNumber, caste, applicationStage, paymentStatus } =
    req.body;

    console.log(req.body)
  let filters = {};

  if (year) {
    const startDate = new Date(`${year}-01-01`);
    const endDate = new Date(`${year}-12-31`);
    filters.createdAt = { $gte: startDate, $lte: endDate };
  }

  if (applicationNumber) {
    filters.applicationNumber = applicationNumber;
  }

  if (caste) {
    filters["studentDetails.caste"] = caste;
  }

  if (applicationStage) {
    filters.stage = applicationStage;
  }

  if (paymentStatus != undefined && paymentStatus != '') {
    filters.paymentStatus = paymentStatus;
  }

  try {
    const applications = await applicationModel
      .find(filters)
      .populate("loginStudentId");

    if (applications.length === 0) {
      return res.status(200).json({ message: "No application forms found",applications });
    }

    // Append full URLs
    applications.forEach((application) => {
      if (
        application.studentDetails &&
        application.studentDetails.studentImage
      ) {
        application.studentDetails.studentImage = `${req.protocol}://${req.get(
          "host"
        )}/uploads/images/${application.studentDetails.studentImage}`;
      }
      if (application.certificates) {
        application.certificates.forEach((certificate) => {
          certificate.fileUrl = `${req.protocol}://${req.get(
            "host"
          )}/uploads/certificates/${certificate.fileUrl}`;
        });
      }
    });

    res.status(200).json({message: "Applications Lists",applications});
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error retrieving application forms", error });
  }
};
