// import React, { useEffect, useState } from "react";
// import PanelDashboardLayout from "../PanelDashboardLayout";
// import { useNavigate, useParams } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import {
//   UpdateBatchViaAdmin,
//   createBatchViaAdmin,
//   getAllSubjectsViaAdmin,
//   getSingleBatchViaAdmin,
// } from "../../../utils/Api";
// import { toast } from "react-toastify";

// const BatchForm = () => {
//   const [batchData, setBatchData] = useState({});
//   const [subjects, setSubjects] = useState([]);

//   const navigate = useNavigate();
//   const { id } = useParams();

//   const {
//     register,
//     formState: { errors, isSubmitting },
//     handleSubmit,
//     reset,
//   } = useForm();

//   useEffect(() => {
//     fetchSubjects();
//     if (id) {
//       fetchOldData();
//     }
//   }, [0]);
//   useEffect(() => {
//     if (id) {
//       fetchOldData();
//     }
//   }, [reset, id]);

//   const fetchSubjects = async () => {
//     const response = await getAllSubjectsViaAdmin();
//     setSubjects(response?.subjects);
//   };
//   console.log(subjects);

//   const fetchOldData = async () => {
//     const response = await getSingleBatchViaAdmin({ id });
//     setBatchData(response?.batch);
//     reset(response?.batch);
//   };

//   const onSubmit = async (data) => {
//     console.log(data);
//     try {
//       let response;
//       if (id !== undefined) {
//         // call update method

//         data.id = id;
//         response = await UpdateBatchViaAdmin(data);
//         toast.success(`Batch Updated...`);
//       } else {
//         // create
//         response = await createBatchViaAdmin(data);
//         toast.success(`Batch Created...`);
//       }
//       navigate("/panel-admin/batches");
//     } catch (error) {
//       toast.error(`Try Again, ${error?.response?.data?.error}`);
//     }
//   };
//   const formInputs = [
//     {
//       label: "Batch Name",
//       type: "text",
//       name: "batchName",
//       required: true,
//     },
//     {
//       label: "Batch Description",
//       type: "text",
//       name: "description",
//       required: true,
//       isEmpty: true,
//     },
//     {
//       label: "Term",
//       type: "number",
//       name: "term",
//       required: true,
//     },
//   ];
//   return (
//     <PanelDashboardLayout>
//       <div className="card col-lg-4 mx-auto">
//         <div className="card-body px-5 py-5">
//           <div className="mb-3">
//             <h3 className="alert alert-warning">
//               {id != undefined ? "Update" : "Create"} Batch
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
//                 {input.type === "number" && (
//                   <input
//                     className="form-control p_input"
//                     type="number"
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

// export default BatchForm;

import React, { useEffect, useState } from "react";
import PanelDashboardLayout from "../PanelDashboardLayout";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  UpdateBatchViaAdmin,
  createBatchViaAdmin,
  getAllSubjectsViaAdmin,
  getSingleBatchViaAdmin,
} from "../../../utils/Api";
import { toast } from "react-toastify";
import Multiselect from "multiselect-react-dropdown";

const BatchForm = () => {
  const [batchData, setBatchData] = useState({});
  const [subjects, setSubjects] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
    setValue,
  } = useForm();

  useEffect(() => {
    fetchSubjects();
    if (id) {
      fetchOldData();
    }
  }, []);

  useEffect(() => {
    if (id && batchData.subjects) {
      // When batchData is loaded, map the subjects correctly for selected values
      const selected = batchData.subjects.map((subjectId) => {
        return subjects.find((subject) => subject._id === subjectId);
      });
      setSelectedSubjects(selected);
    }
  }, [batchData, subjects]);

  const fetchSubjects = async () => {
    const response = await getAllSubjectsViaAdmin();
    setSubjects(response?.subjects);
  };

  const fetchOldData = async () => {
    const response = await getSingleBatchViaAdmin({ id });
    setBatchData(response?.batch);
    reset(response?.batch);
    setValue("subjects", response?.batch?.subjects || []);
  };

  const onSubmit = async (data) => {
    try {
      let response;
      if (id !== undefined) {
        data.id = id;
        response = await UpdateBatchViaAdmin(data);
        toast.success(`Batch Updated...`);
      } else {
        response = await createBatchViaAdmin(data);
        toast.success(`Batch Created...`);
      }
      navigate("/panel-admin/batches");
    } catch (error) {
      toast.error(`Try Again, ${error?.response?.data?.error}`);
    }
  };

  return (
    <PanelDashboardLayout>
      <div className="card col-lg-4 mx-auto">
        <div className="card-body px-5 py-5">
          <div className="mb-3">
            <h3 className="alert alert-warning">
              {id !== undefined ? "Update" : "Create"} Batch
            </h3>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Input fields */}
            {[
              { label: "Batch Name", name: "batchName", type: "text" },
              { label: "Batch Description", name: "description", type: "text" },
              { label: "Term", name: "term", type: "number" },
            ].map((input, index) => (
              <div className="form-group" key={index}>
                <label>{input.label}</label>
                <input
                  className="form-control p_input"
                  type={input.type}
                  {...register(input.name, { required: true })}
                  aria-invalid={errors[input.name] ? "true" : "false"}
                />
                {errors[input.name] && (
                  <p className="text-danger">{`${input.label} is required`}</p>
                )}
              </div>
            ))}

            {/* Multi-select for Subjects */}
            <div className="form-group">
              <label>Select Subjects</label>
              <Multiselect
                className="border rounded-lg"
                options={subjects} // Full list of subjects
                selectedValues={selectedSubjects} // Pre-selected subjects
                onSelect={(selectedList) => {
                  const values = selectedList.map((option) => option._id);
                  setValue("subjects", values); // Set selected subject IDs
                }}
                onRemove={(selectedList) => {
                  const values = selectedList.map((option) => option._id);
                  setValue("subjects", values); // Update on deselect
                }}
                displayValue="subjectName" // Display subject name in the dropdown
              />
              {errors.subjects && (
                <p className="text-danger">At least one subject is required</p>
              )}
            </div>

            {/* Submit Button */}
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

export default BatchForm;
