import mongoose from "mongoose";

const { Schema } = mongoose;

const studentSchema = new Schema(
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
    status: {
      type: String,
      enum: ["active", "inactive", "graduated"],
      default: "active",
    },
    academicDetails: {
      program: String,
      batch: String,
      registerNumber: String,
      rollNumber: String,
      subjects: [
        {
          subject: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Subject",
          },
          marks: [
            {
              schemeName: String, // Corresponding to marking scheme component in the Subject model
              obtainedMarks: {
                type: Number,
                validate: {
                  validator: function (value) {
                    // Ensure subject and markingScheme exist before validating
                    if (!this.subject || !this.subject.markingScheme) {
                      return true; // Skip validation if no markingScheme is found
                    }

                    const scheme = this.subject.markingScheme.find(
                      (s) => s.schemeName === this.schemeName
                    );
                    return scheme ? value <= scheme.value : true;
                  },
                  message:
                    "Marks cannot exceed the maximum allowed for this component",
                },
              },
            },
          ],
        },
      ],
    },
    competitiveExamScore: [{}], // Same as in the application model
    workExperience: [{}], // Same as in the application model
    hobbiesAwardsAchievements: [{}], // Same as in the application model
    certificates: [{}], // Same as in the application model
    studentId: String, // New ID generated for the student
    loginStudentId: String, // Linking to user login
    password: String,
  },
  { timestamps: true }
);

export default mongoose.model("Student", studentSchema);
