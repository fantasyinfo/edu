import React, { useEffect, useState } from "react";
import { getFormLists } from "../../../utils/Api";
import { NavLink } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import CreateIcon from "@mui/icons-material/Create";
import DataTable from "react-data-table-component";

import HideSourceIcon from "@mui/icons-material/HideSource";
import { payFees } from "../../../utils/RazorpayCheckout";

const FormList = () => {
  const [allForms, setAllForms] = useState([]);

  useEffect(() => {
    fetchAllForms();
  }, []);

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

  const fetchAllForms = async () => {
    try {
      const response = await getFormLists();
      console.log(response);
      setAllForms(response);
    } catch (error) {}
  };

  const columns = [
    {
      name: "SL. No",
      selector: (row, index) => ++index,
    },
    {
      name: "Form Name",
      selector: (row) => row?.formName,
      sortable: true,
    },
    {
      name: "Application Number",
      selector: (row) => row?.applicationNumber,
      sortable: true,
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
    },
    {
      name: "Pay Fees",
      cell: (row) => {
        if (row?.paymentStatus === true) {
          return "Completed.";
        } else {
          if (row?.stage === 4) {
            return (
              <button
                className="btn btn-warning"
                onClick={() => payFees(row._id)}
              >
                Pay Fees
              </button>
            );
          } else {
            return <>Unpaid</>;
          }
        }
      },
    },
    {
      name: "Payment Status",
      selector: (row) =>
        row?.paymentStatus === true ? (
          <span className="badge badge-success">Completed</span>
        ) : (
          <span className="badge badge-danger">Pending</span>
        ),
      sortable: true,
    },

    {
      name: "Actions",
      cell: (row) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <NavLink
            className="text-info"
            title="View"
            to={`/preview-application-form/${row._id}`}
          >
            <VisibilityIcon />
          </NavLink>

          {row?.stage !== 4 ? (
            <NavLink
              className="text-warning"
              title="Update"
              to={`/edit-application-form/${row._id}`}
            >
              <CreateIcon />
            </NavLink>
          ) : (
            <>
              <NavLink
                className="text-danger"
                title="form submited, now its disbaled."
              >
                <HideSourceIcon />{" "}
              </NavLink>
            </>
          )}

          <NavLink
            className="text-success"
            title="print"
            to={`/print-form/${row._id}`}
          >
            <LocalPrintshopIcon />
          </NavLink>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Application Forms</h4>
            <p className="card-description">
              Your All forms are listed here...
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

export default FormList;
