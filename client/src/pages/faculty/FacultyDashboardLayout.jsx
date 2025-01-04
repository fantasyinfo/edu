import React, { useEffect } from "react";
import Navbar from "./Navbar";
import TopHeader from "./TopHeader";
import Footer from "./Footer";

const FacultyDashboardLayout = ({ children }) => {
  // check if user is login or not

  useEffect(() => {
    if (!localStorage.getItem("facultyToken")) {
      window.location.href = "/faculty/dashboard";
    }
  }, []);

  return (
    <div className="container-scroller">
      <Navbar />
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

export default FacultyDashboardLayout;
