import { useContext, useEffect, useState } from "react";
import FacultyDashboardLayout from "../FacultyDashboardLayout";
import { getAllSubjectsViaAdmin } from "../../../utils/Api";
import { FacultyContext } from "../FacultyContext";

const MySubjects = () => {
  const [subjects, setSubjects] = useState([]);
  const faculty_data = useContext(FacultyContext).faculty;

  useEffect(() => {
    fetchAllSubjects();
  }, []);
  const fetchAllSubjects = async () => {
    try {
      const response = await getAllSubjectsViaAdmin();
      setSubjects(response.subjects);
    } catch (error) {
      console.log("Error ", error);
    }
  };
  console.log(faculty_data);
  const filteredSubjects = subjects.filter(
    (subject) => subject.faculty === faculty_data._id
  );
  console.log(filteredSubjects);
  return (
    <FacultyDashboardLayout>
      <h1>My Subjects</h1>
      <div>
        {filteredSubjects.map((subject) => (
          <div key={subject._id}>
            <h2 className="font-normal">1. {subject.subjectName}</h2>
            <p>{subject.description}</p>
          </div>
        ))}
      </div>
    </FacultyDashboardLayout>
  );
};

export default MySubjects;
