/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  admitStudentViaAdmin,
  getFormListsForAdminFilters,
} from "../../../utils/Api";
import { NavLink } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import CreateIcon from "@mui/icons-material/Create";
import DataTable from "react-data-table-component";
import PanelFormListFilters from "./PanelFormListFilters";
const PanelFormList = () => {
  const [allForms, setAllForms] = useState([]);
  const [filters, setFilters] = useState({});

  function formatDateTime(isoString) {
    const date = new Date(isoString);

    // Extracting individual components
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";

    // Converting to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const formattedHours = String(hours).padStart(2, "0");

    return `${month}-${day}-${year} ${formattedHours}:${minutes}:${seconds} ${ampm}`;
  }

  const fetchAllForms = async () => {
    try {
      // const response = await getFormListsForAdmin();
      const response = await getFormListsForAdminFilters(filters);
      // console.log(response.applications[0]._id);
      setAllForms(response?.applications);
    } catch (error) {
      toast.warn("");
    }
  };

  useEffect(() => {
    fetchAllForms();
  }, []);

  useEffect(() => {
    fetchAllForms();
  }, [filters]);

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

  const admitStudent = async (id) => {
    try {
      const response = await admitStudentViaAdmin(id);
      console.log(response);
      toast.success("Student Admitted Successfully...");
    } catch (error) {
      toast.warn("");
    }
  };

  console.log(allForms);

  const columns = [
    {
      name: "SL. No",
      selector: (row, index) => ++index,
      width: "70px",
    },
    {
      name: "Student Name",
      selector: (row) => row?.loginStudentId?.name,
      sortable: true,
    },
    // {
    //   name: "Student Mobile No",
    //   selector: (row) => row?.loginStudentId?.mobile,
    //   sortable: true,
    // },
    // {
    //   name: "Student Email",
    //   selector: (row) => row?.loginStudentId?.email,
    //   sortable: true,
    // },
    {
      name: "Form Name",
      selector: (row) => row?.formName,
      sortable: true,
    },
    {
      name: "Application Number",
      selector: (row) => row?.applicationNumber,
      sortable: true,
      width: "100px",
    },
    {
      name: "Status",
      selector: (row) => row?.formStatusFromAdmin,
      sortable: true,
    },
    {
      name: "Stage",
      selector: (row) => row?.stage,
      sortable: true,
      width: "120px",
    },
    {
      name: "Applied Date",
      selector: (row) => formatDateTime(row?.updatedAt),
      sortable: true,
    },
    {
      name: "Payment Status",
      selector: (row) =>
        row?.paymentStatus === true ? "Completed" : "Pending...",
      sortable: true,
    },

    {
      name: "Actions",
      cell: (row) => (
        <div className="flex gap-3 items-center align-middle">
          <NavLink
            className="text-info"
            title="Preview"
            to={`/panel-admin/preview-application-form/${row._id}`}
          >
            <VisibilityIcon />
          </NavLink>
          <NavLink
            className="text-warning"
            title="dark"
            to={`/panel-admin/edit-application-form/${row._id}`}
          >
            <CreateIcon />
          </NavLink>
          <NavLink
            className="text-success"
            title="info"
            to={`/panel-admin/print-form/${row._id}`}
          >
            <LocalPrintshopIcon htmlColor="gray" />
          </NavLink>
          <button
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-2 me-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            title="Increment Term"
            onClick={() => admitStudent(row._id)}
          >
            Admit
          </button>
        </div>
      ),
      width: "230px",
    },
  ];

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };
  const resetFilter = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div>
      <div className="mb-5">
        <PanelFormListFilters
          onFilterChange={handleFilterChange}
          resetFilter={resetFilter}
        />
      </div>
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">
              Application Forms (Students Applications)
            </h4>
            <p className="card-description">
              All Students forms are listed here...
            </p>
            <div className="table-responsive">
              <DataTable
                columns={columns}
                data={allForms}
                pagination={true}
                // highlightOnHover
                // striped
                customStyles={tableCustomStyles}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PanelFormList;
