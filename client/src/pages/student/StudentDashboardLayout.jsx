import React, { useEffect } from "react";

import TopHeader from "./TopHeader";
import Footer from "./Footer";
import StudentNavbar from "./StudentNavbar";

const StudentDashboardLayout = ({ children }) => {
  // check if user is login or not

  useEffect(() => {
    if (!localStorage.getItem("studentToken")) {
      window.location.href = "/";
    }
  }, []);

  return (
    <div className="container-scroller">
      <StudentNavbar />
      <div className="container-fluid page-body-wrapper">
        <TopHeader />
        <div className="main-panel">
          <div className="content-wrapper">{children}</div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default StudentDashboardLayout;
