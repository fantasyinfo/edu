import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import PanelDashboardLayout from "../PanelDashboardLayout";
import { toast } from "react-toastify";
import {
  getGradeSchemeByIdViaAdmin,
  createGradeSchemeViaAdmin,
  updateGradeSchemeViaAdmin, // Ensure this function is implemented in your API utils
} from "../../../utils/Api";

const GradesEntry = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const initialData = location.state || {};
  console.log(initialData);
  const [program, setProgram] = useState(
    initialData.program || initialData.selectedProgram
  );
  const [batch, setBatch] = useState(
    initialData.batch || initialData.selectedBatch
  );
  const [subject, setSubject] = useState(
    initialData.subject || initialData.selectedSubject
  );
  const [name, setSchemeName] = useState(
    initialData.gradeSchemeName || initialData.schemeName
  );
  const initialGrades = initialData.grades || [
    {
      rangeFrom: 0,
      rangeTo: 0,
      grade: "",
      className: "",
      gradePoint: 0,
      isFail: false,
    },
  ];
  const [grades, setGrades] = useState(initialGrades);

  useEffect(() => {
    if (id && !location.state) {
      fetchGradeScheme();
    }
  }, [id]);

  const fetchGradeScheme = async () => {
    try {
      const response = await getGradeSchemeByIdViaAdmin(id);
      const { program, batch, subject, gradeSchemeName, grades } = response;
      setProgram(program);
      setBatch(batch);
      setSubject(subject);
      setSchemeName(gradeSchemeName);
      setGrades(grades);
    } catch (error) {
      toast.error("Failed to fetch grade scheme data.");
    }
  };

  const handleGradeChange = (index, field, value) => {
    const newGrades = [...grades];
    newGrades[index][field] = value;
    setGrades(newGrades);
  };

  const addGradeRow = () => {
    setGrades([
      ...grades,
      {
        rangeFrom: 0,
        rangeTo: 0,
        grade: "",
        className: "",
        gradePoint: 0,
        isFail: false,
      },
    ]);
  };

  const handleSubmit = async () => {
    try {
      if (id) {
        // Update existing grade scheme
        const updatedGradeScheme = {
          program,
          batch,
          subject,
          gradeSchemeName: name,
          grades,
        };
        await updateGradeSchemeViaAdmin(id, updatedGradeScheme);
        toast.success("Grade scheme updated successfully.");
      } else {
        // Create new grade scheme
        const newGradeScheme = {
          program,
          batch,
          subject,
          gradeSchemeName: name,
          grades,
        };
        await createGradeSchemeViaAdmin(newGradeScheme);
        toast.success("Grade scheme created successfully.");
      }
      navigate("/panel-admin/grade-schemes");
    } catch (error) {
      toast.error("Failed to save grade scheme.");
    }
  };

  return (
    <PanelDashboardLayout>
      <div className="p-2">
        <h1 className="text-2xl font-bold mb-6">
          {id ? "Edit" : "Add"} Grade Scheme Form
        </h1>
        <div>
          <div className="mb-2 flex gap-3">
            <p className="text-gray-700 text-xl font-semibold">Program:</p>
            {!id ? (
              <p className="text-lg">{program}</p>
            ) : (
              <input
                type="text"
                className="text-lg"
                value={program}
                onChange={(e) => setProgram(e.target.value)}
              />
            )}
          </div>
          <div className="mb-2 flex gap-3">
            <p className="text-gray-700 text-xl font-semibold">Batch:</p>
            {!id ? (
              <p className="text-lg">{batch}</p>
            ) : (
              <input
                type="text"
                className="text-lg"
                value={batch}
                onChange={(e) => setBatch(e.target.value)}
              />
            )}
          </div>
          <div className="mb-2 flex gap-3">
            <p className="text-gray-700 text-xl font-semibold">Subject:</p>
            {!id ? (
              <p className="text-lg">{subject}</p>
            ) : (
              <input
                type="text"
                className="text-lg"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            )}
          </div>
        </div>
        <h2 className="text-xl font-bold mb-2">Grades</h2>
        <table className="table-auto w-full mb-4">
          <thead>
            <tr>
              <th>#</th>
              <th>Range From</th>
              <th>Range To</th>
              <th>Grade</th>
              <th>Class Name</th>
              <th>Grade Point</th>
              <th>Is Fail</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {grades &&
              grades.map((grade, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <input
                      type="number"
                      value={grade.rangeFrom}
                      onChange={(e) =>
                        handleGradeChange(index, "rangeFrom", e.target.value)
                      }
                      className="shadow appearance-none border rounded py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={grade.rangeTo}
                      onChange={(e) =>
                        handleGradeChange(index, "rangeTo", e.target.value)
                      }
                      className="shadow appearance-none border rounded py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={grade.grade}
                      onChange={(e) =>
                        handleGradeChange(index, "grade", e.target.value)
                      }
                      className="shadow appearance-none border rounded py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={grade.className}
                      onChange={(e) =>
                        handleGradeChange(index, "className", e.target.value)
                      }
                      className="shadow appearance-none border rounded py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={grade.gradePoint}
                      onChange={(e) =>
                        handleGradeChange(index, "gradePoint", e.target.value)
                      }
                      className="shadow appearance-none border rounded py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={grade.isFail}
                      onChange={(e) =>
                        handleGradeChange(index, "isFail", e.target.checked)
                      }
                      className="leading-tight"
                    />
                  </td>
                  <td>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() =>
                        setGrades(grades.filter((_, i) => i !== index))
                      }
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-3 rounded focus:outline-none focus:shadow-outline"
          onClick={addGradeRow}
        >
          Add Grade
        </button>
        <button
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </PanelDashboardLayout>
  );
};

export default GradesEntry;
