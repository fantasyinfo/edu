import mongoose from "mongoose";

const { Schema } = mongoose;

const applicationSchema = new Schema(
  {
    studentDetails: {
      firstName: String,
      middleName: String,
      lastName: String,
      studentImage: String,
      dateOfBirth: String,
      caste: String,
      gender: String,
      maritalStatus: String,
      studentMobileNumber: String,
      emailAddress: String,
      nationality: String,
      religion: String,
      motherTongue: String,
    },
    communicationAddress: {
      addressLine1: String,
      addressLine2: String,
      landNumber: String,
      city: String,
      pincode: String,
      country: String,
      state: String,
      district: String,
    },
    permanentAddress: {
      addressLine1: String,
      addressLine2: String,
      landNumber: String,
      city: String,
      pincode: String,
      country: String,
      state: String,
      district: String,
    },
    familyBackground: {
      fatherName: String,
      fatherOccupation: String,
      fatherMobileNo: String,
      motherName: String,
      motherOccupation: String,
      motherMobileNo: String,
    },
    academicQualifications: {
      tenth: {
        boardStream: String,
        institution: String,
        percentage: Number,
        yearOfPassing: Number,
      },
      twelfth: {
        boardStream: String,
        institution: String,
        percentage: Number,
        yearOfPassing: Number,
      },
      ug: {
        boardStream: String,
        institution: String,
        percentage: Number,
        yearOfPassing: Number,
      },
    },
    competitiveExamScore: [{}],
    workExperience: [{}],
    hobbiesAwardsAchievements: [{}],
    certificates: [{}],
    applicationNumber: String,
    stage: {
      type: Number,
      enum: [1, 2, 3, 4],
      default: 1,
    },
    paymentStatus: Boolean,
    formMode: {
      type: String,
      enum: ["online", "offline"],
      default: "online",
    },
    loginStudentId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    formStatusFromAdmin: {
      type: String,
      enum: [
        "Pending",
        "Completed By Student",
        "View By Admin",
        "Reply",
        "Success",
        "Rejected",
      ],
      default: "Pending",
    },
    formName: String,
  },
  { timestamps: true }
);

export default mongoose.model("application", applicationSchema);
