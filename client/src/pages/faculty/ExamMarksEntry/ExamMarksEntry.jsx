import React, { useState } from "react";
import FacultyDashboardLayout from "../FacultyDashboardLayout";
import Regular from "./Regular";
import Supplementary from "./Supplementary";

const ExamMarksEntry = () => {
  const [selectedSection, setSelectedSection] = useState("regular");
  return (
    <>
      <FacultyDashboardLayout>
        <h1>Exam Marks Entry</h1>
        <div className="flex gap-4">
          <div
            className={`${
              selectedSection === "regular" ? "bg-blue-500 rounded-lg" : ""
            } p-2 cursor-pointer`}
            onClick={() => setSelectedSection("regular")}
          >
            Regular Section
          </div>
          <div
            className={`${
              selectedSection === "supplementary"
                ? "bg-blue-500 rounded-lg"
                : ""
            } p-2 cursor-pointer`}
            onClick={() => setSelectedSection("supplementary")}
          >
            Supplementary Section
          </div>
        </div>
        <div>
          {selectedSection === "regular" ? <Regular /> : <Supplementary />}
        </div>
      </FacultyDashboardLayout>
      ;
    </>
  );
};

export default ExamMarksEntry;
