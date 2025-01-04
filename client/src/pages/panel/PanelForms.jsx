import React from "react";
import { NavLink } from "react-router-dom";
import PanelDashboardLayout from "./PanelDashboardLayout";
import PanelFormList from "./form_list/PanelFormList";

const PanelForms = () => {
  return (
    <PanelDashboardLayout>
      <div>
        <button className="btn btn-success my-3 create-new-button d-flex align-items-center justify-content-end">
          <NavLink
            to="/panel-admin/add-new-application-form"
            className='text-white'
          >
            + Add New Application
          </NavLink>
        </button>

        <PanelFormList />
      </div>
    </PanelDashboardLayout>
  );
};

export default PanelForms;
