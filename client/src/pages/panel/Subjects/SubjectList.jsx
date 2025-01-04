// import React, { useEffect, useState } from "react";
// import DataTable from "react-data-table-component";
// import { NavLink } from "react-router-dom";
// import CreateIcon from "@mui/icons-material/Create";
// import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
// import {
//   deleteSubjectViaAdmin,
//   getAllFacultiesViaAdmin,
//   getAllSubjectsViaAdmin,
// } from "../../../utils/Api";
// import { toast } from "react-toastify";

// const SubjectList = () => {
//   const [allSubjects, setAllSubjects] = useState([]);
//   const [allFaculties, setAllFaculties] = useState([]);

//   useEffect(() => {
//     fetchAllSubjects();
//     fetchAllFaculties();
//   }, [0]);

//   const fetchAllFaculties = async () => {
//     try {
//       const response = await getAllFacultiesViaAdmin();
//       setAllFaculties(response.faculties);
//     } catch (error) {}
//   };
//   const tableCustomStyles = {
//     headRow: {
//       style: {
//         color: "#fff",
//         backgroundColor: "#0F1015",
//       },
//     },
//     striped: {
//       default: "black",
//     },
//   };
//   const columns = [
//     {
//       name: "SL. No",
//       selector: (row, index) => ++index,
//       width: "40px",
//     },
//     {
//       name: "Subject Name",
//       selector: (row) => row?.subjectName,
//       sortable: true,
//       width: "170px",
//     },
//     {
//       name: "Subject Code",
//       selector: (row) => row?.subjectCode,
//       sortable: true,
//       width: "130px",
//     },
//     {
//       name: "Description",
//       selector: (row) => (
//         <div style={{ whiteSpace: "normal", wordWrap: "break-word" }}>
//           {row?.description}
//         </div>
//       ),
//       sortable: true,
//       width: "180px",
//     },
//     {
//       name: "Is elective",
//       selector: (row) => row?.isElective,
//       sortable: true,
//       width: "110px",
//     },
//     {
//       name: "Faculty",
//       selector: (row) => row?.faculty,
//       sortable: true,
//       width: "130px",
//     },
//     {
//       name: "Marking Scheme",
//       cell: (row) => (
//         <div>
//           {row?.markingScheme
//             ?.filter((item) => item.value)
//             ?.map((item, index) => (
//               <p key={index}>
//                 {item.name} : {item.value}
//               </p>
//             ))}
//         </div>
//       ),
//       width: "180px",
//     },
//     {
//       name: "Passing Criteria",
//       selector: (row) => row?.passCriteria,
//       sortable: true,
//       width: "150px",
//     },
//     {
//       name: "Actions",
//       cell: (row) => (
//         <div style={{ display: "flex", gap: "10px" }}>
//           <NavLink
//             className="text-warning"
//             title="Edit"
//             to={`/panel-admin/edit-subject-form/${row._id}`}
//           >
//             <CreateIcon />
//           </NavLink>
//           <button
//             className="text-danger bg-none outline-none border-none"
//             title="Delete"
//             onClick={(e) => deleteSubject(e, row._id)}
//           >
//             <DeleteForeverIcon />
//           </button>
//         </div>
//       ),
//     },
//   ];

//   const fetchAllSubjects = async () => {
//     try {
//       const response = await getAllSubjectsViaAdmin();
//       console.log(response.subjects);
//       setAllSubjects(response.subjects);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const deleteSubject = async (e, id) => {
//     e.preventDefault();

//     if (window.confirm("Are you sure you want to delete this subject?")) {
//       try {
//         const response = await deleteSubjectViaAdmin({ id });
//         console.log(`response:${response}`);
//         toast.success("Subject Deleted...");
//         fetchAllSubjects();
//       } catch (error) {
//         console.log("Error ", error);
//         toast.warning("Some Error happens Subject not Deleted...");
//       }
//     }
//   };

//   return (
//     <div>
//       <div className="col-lg-12 grid-margin stretch-card">
//         <div className="card">
//           <div className="card-body">
//             <h4 className="card-title">Subjects</h4>
//             <p className="card-description">All subjects are listed here...</p>
//             <div className="table-responsive">
//               <DataTable
//                 columns={columns}
//                 data={allSubjects}
//                 pagination={true}
//                 // highlightOnHover
//                 // striped
//                 customStyles={tableCustomStyles}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SubjectList;
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { NavLink } from "react-router-dom";
import CreateIcon from "@mui/icons-material/Create";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {
  deleteSubjectViaAdmin,
  getAllFacultiesViaAdmin,
  getAllSubjectsViaAdmin,
} from "../../../utils/Api";
import { toast } from "react-toastify";

const SubjectList = () => {
  const [allSubjects, setAllSubjects] = useState([]);
  const [allFaculties, setAllFaculties] = useState([]);

  useEffect(() => {
    fetchAllSubjects();
    fetchAllFaculties();
  }, []);

  const fetchAllFaculties = async () => {
    try {
      const response = await getAllFacultiesViaAdmin();
      setAllFaculties(response.faculties); // Store all faculties in state
    } catch (error) {
      console.error("Failed to fetch faculties:", error);
    }
  };

  const tableCustomStyles = {
    headRow: {
      style: {
        color: "#fff",
        backgroundColor: "#0F1015",
      },
    },
    striped: {
      default: "black",
    },
  };

  const columns = [
    {
      name: "SL. No",
      selector: (row, index) => ++index,
      width: "40px",
    },
    {
      name: "Subject Name",
      selector: (row) => row?.subjectName,
      sortable: true,
      width: "170px",
    },
    {
      name: "Subject Code",
      selector: (row) => row?.subjectCode,
      sortable: true,
      width: "130px",
    },
    {
      name: "Description",
      selector: (row) => (
        <div style={{ whiteSpace: "normal", wordWrap: "break-word" }}>
          {row?.description}
        </div>
      ),
      sortable: true,
      width: "180px",
    },
    {
      name: "Is Elective",
      selector: (row) => row?.isElective,
      sortable: true,
      width: "110px",
    },
    {
      name: "Faculty",
      selector: (row) => {
        const faculty = allFaculties.find((fac) => fac._id === row.faculty);
        return faculty ? faculty.facultyName : "Unknown"; // Display faculty name
      },
      sortable: true,
      width: "130px",
    },
    {
      name: "Marking Scheme",
      cell: (row) => (
        <div>
          {row?.markingScheme
            ?.filter((item) => item.value)
            ?.map((item, index) => (
              <p key={index}>
                {item.name} : {item.value}
              </p>
            ))}
        </div>
      ),
      width: "180px",
    },
    {
      name: "Passing Criteria",
      selector: (row) => row?.passCriteria,
      sortable: true,
      width: "150px",
    },
    {
      name: "Actions",
      cell: (row) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <NavLink
            className="text-warning"
            title="Edit"
            to={`/panel-admin/edit-subject-form/${row._id}`}
          >
            <CreateIcon />
          </NavLink>
          <button
            className="text-danger bg-none outline-none border-none"
            title="Delete"
            onClick={(e) => deleteSubject(e, row._id)}
          >
            <DeleteForeverIcon />
          </button>
        </div>
      ),
    },
  ];

  const fetchAllSubjects = async () => {
    try {
      const response = await getAllSubjectsViaAdmin();
      setAllSubjects(response.subjects);
    } catch (error) {
      console.log("Error fetching subjects:", error);
    }
  };

  const deleteSubject = async (e, id) => {
    e.preventDefault();

    if (window.confirm("Are you sure you want to delete this subject?")) {
      try {
        const response = await deleteSubjectViaAdmin({ id });
        toast.success("Subject Deleted...");
        fetchAllSubjects(); // Refresh the subject list
      } catch (error) {
        console.log("Error deleting subject:", error);
        toast.warning("Some Error occurred. Subject not deleted...");
      }
    }
  };

  return (
    <div>
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Subjects</h4>
            <p className="card-description">All subjects are listed here...</p>
            <div className="table-responsive">
              <DataTable
                columns={columns}
                data={allSubjects}
                pagination={true}
                customStyles={tableCustomStyles}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectList;
