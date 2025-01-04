import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:8000/api",
  baseURL: "https://lms-backend-8uf4.onrender.com/api",
  // baseURL: "https://dmtims.edu.in/lmsnodeapi/",
});

export const registerAPI = async (userData) => {
  try {
    const response = await instance.post("/user/register", userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const loginAPI = async (userData) => {
  try {
    const response = await instance.post("/user/login", userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// student API
export const studentLoginAPI = async (userData) => {
  try {
    const response = await instance.post("/students/login", userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const forgotPassAPI = async (userData) => {
  try {
    const response = await instance.post("/user/forgot-password", userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// form
export const submitStep1 = async (userData) => {
  try {
    const response = await instance.post(
      "/form/register-application",
      userData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("studentToken"),
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getFormLists = async (userData) => {
  try {
    const response = await instance.get("/form/get-applications", {
      params: userData,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("studentToken"),
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getSingleFormData = async (id) => {
  try {
    const response = await instance.get(`/form/get-single-application/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("studentToken"),
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateApplicationForm = async (userData) => {
  try {
    const response = await instance.post("/form/update-application", userData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + localStorage.getItem("studentToken"),
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// admin routes
export const getFormListsForAdmin = async (userData) => {
  try {
    const response = await instance.get("/form/get-applications-for-admin", {
      params: userData,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("adminToken"),
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getSingleFormDataForAdmin = async (id) => {
  try {
    const response = await instance.get(
      `/form/get-single-application-for-admin/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("adminToken"),
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const submitStep1ForAdmin = async (userData) => {
  try {
    const response = await instance.post(
      "/form/register-application",
      userData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("adminToken"),
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateApplicationFormForAdmin = async (userData) => {
  try {
    const response = await instance.post("/form/update-application", userData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + localStorage.getItem("adminToken"),
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// leads
export const createLeadCaptureLinkViaAdmin = async (userData) => {
  try {
    const response = await instance.post("/lead/create-new-link", userData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("adminToken"),
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getAllLinkViaAdmin = async (userData) => {
  try {
    const response = await instance.get("/lead/get-all-links", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("adminToken"),
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSingleLinkViaAdmin = async (userData) => {
  try {
    const response = await instance.get(`/lead/get-link/${userData.id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("adminToken"),
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const UpdateLinkViaAdmin = async (userData) => {
  try {
    const response = await instance.put(
      `/lead/update-link/${userData.id}`,
      userData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("adminToken"),
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteLinkViaAdmin = async (userData) => {
  try {
    const response = await instance.delete(`/lead/delete-link/${userData.id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("adminToken"),
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSingleLinkForLandingWithIdAndUniqueId = async (userData) => {
  try {
    const response = await instance.get(
      `/lead/get-link-with-id-unique/${userData.id}/${userData.uniqueId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("adminToken"),
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getFormListsForAdminFilters = async (userData) => {
  try {
    const response = await instance.post(
      "/form/get-applications-for-admin-filters",
      userData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("adminToken"),
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// razorpay
export const getRazorPayACCKey = async (userData) => {
  try {
    const response = await instance.post(`/payments/get-key`, userData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("studentToken"),
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createCheckoutOfRazorPay = async (userData) => {
  try {
    const response = await instance.post(
      `/payments/create-checkout`,
      userData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("studentToken"),
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const capturePaymentOfRazorPay = async (userData) => {
  try {
    const response = await instance.post(
      `/payments/capture-payment`,
      userData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("studentToken"),
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// landing page
export const captureLead = async (userData) => {
  try {
    const response = await instance.post(
      `/landing/capture-landing-page-lead`,
      userData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAdmissionLeadsForAdmin = async (userData) => {
  try {
    const response = await instance.post(
      `/landing/get-all-landing-page-leads`,
      userData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("adminToken"),
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// ----------------------------------------
export const createDepartmentViaAdmin = async (userData) => {
  try {
    const response = await instance.post(
      "/department/create-new-department",
      userData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("adminToken"),
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllDepartmentsViaAdmin = async (userData) => {
  try {
    const response = await instance.get("/department/get-all-departments", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("adminToken"),
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteDepartmentViaAdmin = async (userData) => {
  try {
    const response = await instance.delete(
      `/department/delete-a-department/${userData.id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("adminToken"),
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const UpdateDepartmentViaAdmin = async (userData) => {
  try {
    const response = await instance.put(
      `/department/update-a-department/${userData.id}`,
      userData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("adminToken"),
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getSingleDepartmentViaAdmin = async (userData) => {
  try {
    const response = await instance.get(
      `/department/get-department/${userData.id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("adminToken"),
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

//-----------------------
export const createProgramViaAdmin = async (userData) => {
  try {
    const response = await instance.post(
      "/program/create-new-program",
      userData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("adminToken"),
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getAllProgramsViaAdmin = async (userData) => {
  try {
    const response = await instance.get("/program/get-all-programs", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("adminToken"),
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteProgramViaAdmin = async (userData) => {
  try {
    const response = await instance.delete(
      `/program/delete-a-program/${userData.id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("adminToken"),
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const UpdateProgramViaAdmin = async (userData) => {
  try {
    const response = await instance.put(
      `/program/update-a-program/${userData.id}`,
      userData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("adminToken"),
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSingleProgramViaAdmin = async (userData) => {
  try {
    const response = await instance.get(`/program/get-program/${userData.id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("adminToken"),
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
//-----------------
export const createBatchViaAdmin = async (userData) => {
  try {
    const response = await instance.post("/batch/create-new-batch", userData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("adminToken"),
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllBatchesViaAdmin = async (userData) => {
  try {
    const response = await instance.get("/batch/get-all-batches", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("adminToken"),
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteBatchViaAdmin = async (userData) => {
  try {
    console.log(userData.id);
    const response = await instance.delete(
      `/batch/delete-a-batch/${userData.id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("adminToken"),
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const UpdateBatchViaAdmin = async (userData) => {
  try {
    const response = await instance.put(
      `/batch/update-a-batch/${userData.id}`,
      userData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("adminToken"),
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSingleBatchViaAdmin = async (userData) => {
  try {
    const response = await instance.get(`/batch/get-batch/${userData.id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("adminToken"),
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const promoteBatchById = async (userData) => {
  try {
    const response = await instance.put(
      `/batch/promote-batch/${userData.id}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("adminToken"),
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const demoteBatchById = async (userData) => {
  try {
    const response = await instance.put(
      `/batch/demote-batch/${userData.id}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("adminToken"),
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

//-----------------------
// similar add update delete faculty
export const facultyLoginAPI = async (userData) => {
  try {
    const response = await instance.post("/faculty/login", userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const facultyForgotPassAPI = async (userData) => {
  try {
    const response = await instance.post("/faculty/forgot-password", userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createFacultyViaAdmin = async (userData) => {
  try {
    console.log(userData);
    const response = await instance.post(
      "/faculty/create-new-faculty",
      userData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("adminToken"),
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getAllFacultiesViaAdmin = async (userData) => {
  try {
    const response = await instance.get("/faculty/get-all-faculties", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("adminToken"),
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const deleteFacultyViaAdmin = async (userData) => {
  try {
    const response = await instance.delete(
      `/faculty/delete-a-faculty/${userData.id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("adminToken"),
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const UpdateFacultyViaAdmin = async (userData) => {
  try {
    const response = await instance.put(
      `/faculty/update-a-faculty/${userData.id}`,
      userData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("adminToken"),
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getSingleFacultyViaAdmin = async (userData) => {
  try {
    const response = await instance.get(`/faculty/get-faculty/${userData.id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("adminToken"),
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const mailFacultyLoginDetailsViaAdmin = async (id) => {
  try {
    const response = await instance.post(
      `/faculty/mail-details-faculty/${id}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("adminToken"),
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

//-----------------------------
// similar add update delete subject
export const createSubjectViaAdmin = async (userData) => {
  try {
    const response = await instance.post(
      "/subject/create-new-subject",
      userData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("adminToken"),
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getAllSubjectsViaAdmin = async (userData) => {
  try {
    const response = await instance.get("/subject/get-all-subjects", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("adminToken"),
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const deleteSubjectViaAdmin = async (userData) => {
  try {
    const response = await instance.delete(
      `/subject/delete-a-subject/${userData.id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("adminToken"),
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const UpdateSubjectViaAdmin = async (userData) => {
  try {
    const response = await instance.put(
      `/subject/update-a-subject/${userData.id}`,
      userData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("adminToken"),
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getSingleSubjectViaAdmin = async (userData) => {
  try {
    const response = await instance.get(`/subject/get-subject/${userData.id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("adminToken"),
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

//----------------------------------------
// similar add update delete grade
export const createGradeSchemeViaAdmin = async (userData) => {
  try {
    const response = await instance.post("/grade/create-new-scheme", userData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("adminToken"),
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const addGradeToSchemeViaAdmin = async (userData) => {
  try {
    const response = await instance.post(
      `/grade/add-new-grade/${userData.id}`,
      userData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("adminToken"),
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getAllGradeSchemesViaAdmin = async () => {
  try {
    const response = await instance.get("/grade/get-all-gradeSchemes", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("adminToken"),
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getGradeSchemeByIdViaAdmin = async (id) => {
  try {
    const response = await instance.get(`/grade/get-gradeScheme/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("adminToken"),
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const updateGradeSchemeViaAdmin = async (id, data) => {
  try {
    const response = await instance.put(
      `/grade/update-gradeScheme/${id}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("adminToken"),
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const deleteGradeSchemeViaAdmin = async (id) => {
  try {
    const response = await instance.delete(`/grade/delete-gradeScheme/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("adminToken"),
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// -----------------------------

// Admit Student
export const admitStudentViaAdmin = async (id) => {
  try {
    const response = await instance.post(`/students/admitStudent/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("adminToken"),
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// get all subjects of a batch
export const getAllSubjectsOfBatchViaAdmin = async (id) => {
  try {
    const response = await instance.get(
      `/batch/get-all-subjects-of-batch/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("adminToken"),
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// get all students for a batch
export const getAllStudentsForABatchViaAdmin = async (batchName) => {
  try {
    const response = await instance.get(
      `/students/students-for-batch?batchName=${batchName}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("adminToken"),
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// get all students
export const getAllStudentsViaAdmin = async () => {
  try {
    const response = await instance.get("/students", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("adminToken"),
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// update student marks

export const updateStudentMarksViaAdmin = async (marksData) => {
  try {
    const response = await instance.post(
      "/students/update-student-marks",
      marksData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("adminToken"),
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error updating student marks:",
      error.response || error.message
    );
    throw error;
  }
};

// add timetable to batch
export const addTimetableToBatchViaAdmin = async (id, timetableData) => {
  try {
    const response = await instance.put(
      `/batch/add-timetable-to-batch/${id}`, // PUT request as it's updating existing data
      { timetable: timetableData }, // Wrap timetableData inside a 'timetable' key
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`, // Use template literals for cleaner token insertion
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding timetable to batch:", error);
    throw error;
  }
};

export const fetchTimetableOfBatchViaAdmin = async (batchId) => {
  try {
    const response = await instance.get(
      `/batch/get-timetable-of-batch/${batchId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`, // Token for authentication
        },
      }
    );

    return response.data.timetable;
  } catch (error) {
    console.error("Error fetching timetable for batch:", error);
    throw error;
  }
};

// fetch all events
export const fetchAllEventsViaAdmin = async () => {
  try {
    const response = await instance.get("/events/get-all-events", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// create event
export const createEventViaAdmin = async (eventData) => {
  try {
    const response = await instance.post(
      "/events/create-new-event",
      eventData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// send mail
export const sendMailViaAdmin = async ({
  subject,
  message,
  recipientEmails,
}) => {
  try {
    const response = await instance.post(
      "/sendmail",
      { subject, message, recipientEmails },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// add feedback question
export const addQuestionViaAdmin = async ({ question, feedbackType }) => {
  try {
    const response = await instance.post(
      "/feedback/add-question",
      { question, feedbackType },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// remove feedback question
export const removeQuestionViaAdmin = async ({ question, feedbackType }) => {
  try {
    const response = await instance.put(
      "/feedback/remove-question",
      { question, feedbackType },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// get all feedback questions
export const getAllFacultyFeedbackQuestionsViaAdmin = async () => {
  try {
    const response = await instance.get("/feedback/get-faculty-questions", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// get all feedback questions
export const getAllSubjectFeedbackQuestionsViaAdmin = async () => {
  try {
    const response = await instance.get("/feedback/get-subject-questions", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// // add subjects to a batch
// export const addSubjectsToBatchViaAdmin = async (batchId, subjects) => {
//   try {
//     const response = await instance.put(
//       `/batch/add-subjects-to-batch/${batchId}`,
//       { subjects },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
//         },
//       }
//     );
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// mark attendance via admin
export const markAttendanceViaAdmin = async ({
  batch,
  subjectId,
  date,
  attendance,
}) => {
  try {
    const response = await instance.post(
      "/attendance/mark-attendance",
      { batch, subjectId, date, attendance },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// fetch attendance via admin
export const fetchAttendanceViaAdmin = async ({ batchId, date, subjectId }) => {
  try {
    const response = await instance.get("/attendance/fetch-attendance", {
      params: { batchId, date, subjectId },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
