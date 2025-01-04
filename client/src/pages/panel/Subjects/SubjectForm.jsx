// import React, { useEffect, useState } from "react";
// import PanelDashboardLayout from "../PanelDashboardLayout";
// import { useNavigate, useParams } from "react-router-dom";
// import { useFieldArray, useForm } from "react-hook-form";
// import {
//   UpdateSubjectViaAdmin,
//   createSubjectViaAdmin,
//   getAllFacultiesViaAdmin,
//   getSingleSubjectViaAdmin,
// } from "../../../utils/Api";
// import { toast } from "react-toastify";

// const SubjectForm = () => {
//   const [subjectData, setSubjectData] = useState({});
//   const [allFaculties, setAllFaculties] = useState([]);

//   const navigate = useNavigate();
//   const { id } = useParams();
//   useEffect(() => {
//     fetchAllFaculties();
//   }, [0]);
//   const {
//     register,
//     formState: { errors, isSubmitting },
//     handleSubmit,
//     reset,
//   } = useForm();

//   useEffect(() => {
//     if (id) {
//       fetchOldData();
//     }
//   }, [0]);
//   useEffect(() => {
//     if (id) {
//       fetchOldData();
//     }
//   }, [reset, id]);

//   const fetchOldData = async () => {
//     const response = await getSingleSubjectViaAdmin({ id });
//     const faculties = await getAllFacultiesViaAdmin();
//     setAllFaculties(faculties?.faculties);
//     setSubjectData(response?.subject);
//     reset(response?.subject);
//   };
//   console.log(allFaculties);

//   const onSubmit = async (data) => {
//     // Filter out marking schemes with empty names
//     data.markingScheme = data.markingScheme.filter(
//       (scheme) => scheme.name && scheme.value
//     );

//     if (data.markingScheme.length === 0) {
//       toast.error("At least one marking scheme must be filled.");
//       return;
//     }

//     console.log(data);
//     try {
//       let response;
//       if (id !== undefined) {
//         // call update method
//         data.id = id;
//         response = await UpdateSubjectViaAdmin(data);
//         toast.success(`Subject Updated...`);
//       } else {
//         // create
//         response = await createSubjectViaAdmin(data);
//         toast.success(`Subject Created...`);
//       }
//       navigate("/panel-admin/subjects");
//     } catch (error) {
//       toast.error(`Try Again, ${error?.response?.data?.error}`);
//     }
//   };
//   const formInputs = [
//     {
//       label: "Subject Name",
//       type: "text",
//       name: "subjectName",
//       required: true,
//     },
//     {
//       label: "Subject Code",
//       type: "text",
//       name: "subjectCode",
//       required: true,
//       isEmpty: true,
//     },
//     {
//       label: "Description",
//       type: "text",
//       name: "description",
//       required: true,
//       isEmpty: true,
//     },
//     {
//       label: "Faculty",
//       type: "select",
//       name: "faculty",
//       required: true,
//     },
//     {
//       label: "Is Elective",
//       type: "checkbox",
//       name: "isElective",
//       required: false,
//     },
//     {
//       label: "Passing Criteria",
//       type: "text",
//       name: "passCriteria",
//       required: true,
//     },
//   ];
//   const fetchAllFaculties = async () => {
//     try {
//       const response = await getAllFacultiesViaAdmin();
//       setAllFaculties(response.faculties);
//     } catch (error) {}
//   };
//   return (
//     <PanelDashboardLayout>
//       <div className="card col-lg-4 mx-auto">
//         <div className="card-body px-5 py-5">
//           <div className="mb-3">
//             <h3 className="alert alert-warning">
//               {id != undefined ? "Update" : "Create"} Subject
//             </h3>
//           </div>
//           <form onSubmit={handleSubmit(onSubmit)}>
//             {formInputs.map((input, index) => (
//               <div className="form-group" key={index}>
//                 <label>{input.label}</label>
//                 {input.type === "text" && (
//                   <input
//                     className="form-control p_input"
//                     type="text"
//                     {...register(input.name, {
//                       required: input.required,
//                       pattern: {
//                         value: input?.pattern,
//                         message: input?.errorMessage,
//                       },
//                     })}
//                     aria-invalid={errors[input.name] ? "true" : "false"}
//                   />
//                 )}
//                 {input.type === "select" && (
//                   <select
//                     className="form-control p_input"
//                     {...register(input.name, {
//                       required: input.required,
//                       pattern: {
//                         value: input?.pattern,
//                         message: input?.errorMessage,
//                       },
//                     })}
//                     aria-invalid={errors[input.name] ? "true" : "false"}
//                   >
//                     <option value="">Select Faculty</option>
//                     {allFaculties.map((faculty) => (
//                       <option key={faculty._id} value={faculty.facultyName}>
//                         {faculty.facultyName}
//                       </option>
//                     ))}
//                   </select>
//                 )}
//                 {input.type === "checkbox" && (
//                   <input
//                     className="form-control p_input"
//                     type="checkbox"
//                     {...register(input.name, {
//                       required: input.required,
//                       pattern: {
//                         value: input?.pattern,
//                         message: input?.errorMessage,
//                       },
//                     })}
//                     aria-invalid={errors[input.name] ? "true" : "false"}
//                   />
//                 )}
//                 {errors[input.name]?.type === "required" && (
//                   <p className="text-danger">{`${input.label} is required`}</p>
//                 )}
//                 {errors[input.name]?.type === "pattern" && (
//                   <p className="text-danger">{errors[input.name].message}</p>
//                 )}
//               </div>
//             ))}

//             <div className="form-group">
//               <label>Marking Scheme</label>
//               {[...Array(6)].map((_, index) => (
//                 <div key={index} className="d-flex mb-2">
//                   <input
//                     className="form-control p_input mr-2"
//                     type="text"
//                     placeholder="Scheme Name"
//                     {...register(`markingScheme[${index}].name`, {
//                       required: index === 0,
//                     })}
//                     aria-invalid={
//                       errors?.markingScheme?.[index]?.name ? "true" : "false"
//                     }
//                   />
//                   <input
//                     className="form-control p_input"
//                     type="text"
//                     placeholder="Value"
//                     {...register(`markingScheme[${index}].value`, {
//                       required: index === 0,
//                     })}
//                     aria-invalid={
//                       errors?.markingScheme?.[index]?.value ? "true" : "false"
//                     }
//                   />
//                 </div>
//               ))}
//               {errors.markingScheme && (
//                 <p className="text-danger">
//                   At least one marking scheme must be filled.
//                 </p>
//               )}
//             </div>
//             <div className="text-center">
//               <button
//                 type="submit"
//                 className="btn btn-success btn-block enter-btn"
//                 disabled={isSubmitting}
//               >
//                 {isSubmitting
//                   ? "Please wait..."
//                   : id !== undefined
//                   ? "Update"
//                   : "Create"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </PanelDashboardLayout>
//   );
// };

// export default SubjectForm;

import React, { useEffect, useState } from "react";
import PanelDashboardLayout from "../PanelDashboardLayout";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  UpdateSubjectViaAdmin,
  createSubjectViaAdmin,
  getAllFacultiesViaAdmin,
  getSingleSubjectViaAdmin,
} from "../../../utils/Api";
import { toast } from "react-toastify";

const SubjectForm = () => {
  const [subjectData, setSubjectData] = useState({});
  const [allFaculties, setAllFaculties] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState(null); // New state to store selected faculty object

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchAllFaculties();
  }, []);

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm();

  useEffect(() => {
    if (id) {
      fetchOldData();
    }
  }, [id]);

  const fetchOldData = async () => {
    const response = await getSingleSubjectViaAdmin({ id });
    const faculties = await getAllFacultiesViaAdmin();
    setAllFaculties(faculties?.faculties);
    setSubjectData(response?.subject);
    reset(response?.subject);
    // Set the selected faculty object based on the fetched subject data
    const faculty = faculties?.faculties.find(
      (f) => f.facultyName === response?.subject.facultyName
    );
    setSelectedFaculty(faculty); // Set the entire faculty object
  };

  const onSubmit = async (data) => {
    // Filter out marking schemes with empty names
    data.markingScheme = data.markingScheme.filter(
      (scheme) => scheme.name && scheme.value
    );

    if (data.markingScheme.length === 0) {
      toast.error("At least one marking scheme must be filled.");
      return;
    }

    // Add the selected faculty object to the subject data
    if (selectedFaculty) {
      data.faculty = selectedFaculty; // Store the whole faculty object
    }
    console.log(data);
    try {
      let response;
      if (id !== undefined) {
        // Call update method
        data.id = id;
        response = await UpdateSubjectViaAdmin(data);
        toast.success(`Subject Updated...`);
      } else {
        // Create new subject
        response = await createSubjectViaAdmin(data);
        toast.success(`Subject Created...`);
      }
      navigate("/panel-admin/subjects");
    } catch (error) {
      toast.error(`Try Again, ${error?.response?.data?.error}`);
    }
  };

  const fetchAllFaculties = async () => {
    try {
      const response = await getAllFacultiesViaAdmin();
      setAllFaculties(response.faculties);
    } catch (error) {}
  };

  const handleFacultyChange = (e) => {
    const selectedFacultyId = e.target.value;
    const faculty = allFaculties.find((f) => f._id === selectedFacultyId);
    setSelectedFaculty(faculty); // Update the selected faculty object
  };

  const formInputs = [
    {
      label: "Subject Name",
      type: "text",
      name: "subjectName",
      required: true,
    },
    {
      label: "Subject Code",
      type: "text",
      name: "subjectCode",
      required: true,
    },
    {
      label: "Description",
      type: "text",
      name: "description",
      required: true,
    },
    {
      label: "Faculty",
      type: "select",
      name: "faculty", // This will remain here for form submission, but we use the whole object
      required: true,
    },
    {
      label: "Is Elective",
      type: "checkbox",
      name: "isElective",
      required: false,
    },
    {
      label: "Passing Criteria",
      type: "text",
      name: "passCriteria",
      required: true,
    },
  ];

  return (
    <PanelDashboardLayout>
      <div className="card col-lg-4 mx-auto">
        <div className="card-body px-5 py-5">
          <div className="mb-3">
            <h3 className="alert alert-warning">
              {id !== undefined ? "Update" : "Create"} Subject
            </h3>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            {formInputs.map((input, index) => (
              <div className="form-group" key={index}>
                <label>{input.label}</label>
                {input.type === "text" && (
                  <input
                    className="form-control p_input"
                    type="text"
                    {...register(input.name, {
                      required: input.required,
                    })}
                    aria-invalid={errors[input.name] ? "true" : "false"}
                  />
                )}
                {input.type === "select" && (
                  <select
                    className="form-control p_input"
                    onChange={handleFacultyChange} // Capture faculty selection
                    aria-invalid={errors[input.name] ? "true" : "false"}
                  >
                    <option value="">Select Faculty</option>
                    {allFaculties.map((faculty) => (
                      <option key={faculty._id} value={faculty._id}>
                        {faculty.facultyName}
                      </option>
                    ))}
                  </select>
                )}
                {input.type === "checkbox" && (
                  <input
                    className="form-control p_input"
                    type="checkbox"
                    {...register(input.name, {
                      required: input.required,
                    })}
                    aria-invalid={errors[input.name] ? "true" : "false"}
                  />
                )}
                {errors[input.name]?.type === "required" && (
                  <p className="text-danger">{`${input.label} is required`}</p>
                )}
              </div>
            ))}

            <div className="form-group">
              <label>Marking Scheme</label>
              {[...Array(6)].map((_, index) => (
                <div key={index} className="d-flex mb-2">
                  <input
                    className="form-control p_input mr-2"
                    type="text"
                    placeholder="Scheme Name"
                    {...register(`markingScheme[${index}].name`, {
                      required: index === 0,
                    })}
                    aria-invalid={
                      errors?.markingScheme?.[index]?.name ? "true" : "false"
                    }
                  />
                  <input
                    className="form-control p_input"
                    type="text"
                    placeholder="Value"
                    {...register(`markingScheme[${index}].value`, {
                      required: index === 0,
                    })}
                    aria-invalid={
                      errors?.markingScheme?.[index]?.value ? "true" : "false"
                    }
                  />
                </div>
              ))}
              {errors.markingScheme && (
                <p className="text-danger">
                  At least one marking scheme must be filled.
                </p>
              )}
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="btn btn-success btn-block enter-btn"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "Please wait..."
                  : id !== undefined
                  ? "Update"
                  : "Create"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </PanelDashboardLayout>
  );
};

export default SubjectForm;
