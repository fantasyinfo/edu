import React, { useContext, useEffect, useState } from "react";
import { FacultyContext } from "../FacultyContext";
import {
  getAllBatchesViaAdmin,
  getAllStudentsForABatchViaAdmin,
  getAllSubjectsOfBatchViaAdmin,
  updateStudentMarksViaAdmin,
} from "../../../utils/Api";

const Regular = () => {
  const [subjects, setSubjects] = useState([]);
  const faculty_data = useContext(FacultyContext).faculty;
  const [selectedSubject, setSelectedSubject] = useState("");
  const [students, setStudents] = useState([]);
  const [allBatches, setAllBatches] = useState([]);
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [marksData, setMarksData] = useState({});

  useEffect(() => {
    fetchAllBatches();
  }, []);

  const fetchSubjects = async (id) => {
    try {
      const response = await getAllSubjectsOfBatchViaAdmin(id);
      setSubjects(response.subjects);
    } catch (error) {
      console.log("Error ", error);
    }
  };
  console.log(subjects);

  console.log(faculty_data);
  useEffect(() => {
    if (subjects.length > 0 && faculty_data) {
      const filtered = subjects.filter(
        (subject) => subject.faculty === faculty_data._id
      );
      setFilteredSubjects(filtered);
    }
  }, [subjects, faculty_data]);

  console.log(filteredSubjects);

  const fetchAllBatches = async () => {
    try {
      const response = await getAllBatchesViaAdmin();
      setAllBatches(response.batches);
    } catch (error) {
      console.log("Error ", error);
    }
  };

  const fetchStudents = async (batchName) => {
    try {
      const response = await getAllStudentsForABatchViaAdmin(
        batchName,
        selectedSubject
      );
      setStudents(response.students);

      // Initialize marksData with existing marks
      const initialMarksData = {};
      response.students.forEach((student) => {
        initialMarksData[student._id] = {};
        student.marks.forEach((mark) => {
          initialMarksData[student._id][mark.schemeName] = mark.obtainedMarks;
        });
      });
      setMarksData(initialMarksData);
    } catch (error) {
      console.log("Error ", error);
    }
  };
  console.log(marksData);

  const handleMarksChange = (studentId, schemeName, value) => {
    setMarksData((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [schemeName]: value,
      },
    }));
  };

  const handleSubmitMarks = async (studentId) => {
    try {
      const selectedSubjectObj = subjects.find(
        (subject) => subject._id === selectedSubject
      );
      const marks = selectedSubjectObj.markingScheme.map((scheme) => ({
        schemeName: scheme.name,
        obtainedMarks: Number(marksData[studentId]?.[scheme.name] || 0),
      }));

      const marksPayload = {
        studentId: studentId,
        subjectId: selectedSubject,
        marks: marks,
      };

      const response = await updateStudentMarksViaAdmin(marksPayload);
      if (response.message === "Marks updated successfully") {
        alert("Marks saved successfully!");
      } else {
        throw new Error("Failed to save marks");
      }
    } catch (error) {
      console.error("Error saving marks: ", error);
      alert("Failed to save marks. Please try again.");
    }
  };

  return (
    <section className="my-3 flex flex-col gap-3">
      <div className="flex gap-3">
        <select
          name="batch"
          id="batch"
          onChange={(e) => {
            const batch = allBatches.find(
              (batch) => batch._id === e.target.value
            );
            setSelectedBatch(batch);
            fetchSubjects(batch._id);
          }}
          className="rounded-md p-2 text-lg shadow-md"
        >
          <option value="">Select Batch</option>
          {allBatches.map((batch) => (
            <option key={batch._id} value={batch._id}>
              {batch.batchName}
            </option>
          ))}
        </select>

        <select
          name="subject"
          id="subject"
          value={selectedSubject}
          onChange={(e) => {
            setSelectedSubject(e.target.value);
            fetchStudents(selectedBatch.batchName);
          }}
          className="rounded-md p-2 text-lg shadow-md"
        >
          <option value="">Select Subject</option>
          {filteredSubjects.map((subject) => (
            <option key={subject._id} value={subject._id}>
              {subject.subjectName}
            </option>
          ))}
        </select>
      </div>

      <div>
        {selectedSubject ? (
          <table className="w-full border border-gray-300 mt-4 shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2">Student Name</th>
                {subjects
                  .find((subject) => subject._id === selectedSubject)
                  ?.markingScheme.map((scheme, index) => (
                    <th key={index} className="border border-gray-300 p-2">
                      {scheme.name}
                    </th>
                  ))}
                <th className="border border-gray-300 p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id}>
                  <td className="border border-gray-300 p-2 text-black">
                    {student.studentDetails.firstName}{" "}
                    {student.studentDetails.middleName}{" "}
                    {student.studentDetails.lastName}
                  </td>
                  {subjects
                    .find((subject) => subject._id === selectedSubject)
                    ?.markingScheme.map((scheme, index) => (
                      <td key={index} className="border border-gray-300 p-2">
                        <input
                          type="number"
                          className="w-full p-1"
                          min="0"
                          max={scheme.maxMarks}
                          value={marksData[student._id]?.[scheme.name] || ""}
                          onChange={(e) =>
                            handleMarksChange(
                              student._id,
                              scheme.name,
                              e.target.value
                            )
                          }
                        />
                      </td>
                    ))}
                  <td className="border border-gray-300 p-2 text-center">
                    <button
                      className="bg-blue-500 text-white py-1 px-3 rounded"
                      onClick={() => handleSubmitMarks(student._id)}
                    >
                      Save
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center text-gray-500 mt-3">
            No subject selected
          </div>
        )}
      </div>
    </section>
  );
};

export default Regular;
