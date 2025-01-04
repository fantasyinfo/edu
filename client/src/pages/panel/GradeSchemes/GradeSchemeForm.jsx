import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PanelDashboardLayout from "../PanelDashboardLayout";
import {
  getAllBatchesViaAdmin,
  getAllProgramsViaAdmin,
  getAllSubjectsViaAdmin,
} from "../../../utils/Api";

const GradeSchemeForm = () => {
  const [selectedProgram, setSelectedProgram] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [allPrograms, setAllPrograms] = useState([]);
  const [allSubjects, setAllSubjects] = useState([]);
  const [allBatches, setAllBatches] = useState([]);
  const [schemeName, setSchemeName] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchAllPrograms();
    fetchAllSubjects();
    fetchAllBatches();
  }, []);

  const fetchAllPrograms = async () => {
    try {
      const response = await getAllProgramsViaAdmin();
      setAllPrograms(response.programs);
    } catch (error) {}
  };
  const fetchAllSubjects = async () => {
    try {
      const response = await getAllSubjectsViaAdmin();
      console.log(response.subjects);
      setAllSubjects(response.subjects);
    } catch (error) {}
  };
  const fetchAllBatches = async () => {
    try {
      const response = await getAllBatchesViaAdmin();
      setAllBatches(response.batches);
    } catch (error) {}
  };

  const handleNext = () => {
    if (!selectedProgram || !selectedBatch || !selectedSubject || !schemeName) {
      alert("Please select Program, Batch, and Subject before proceeding.");
      return;
    }

    //create new grade scheme via admin
    // try {
    //   const response = createGradeSchemeViaAdmin({
    //     program: selectedProgram,
    //     batch: selectedBatch,
    //     subject: selectedSubject,
    //     gradeSchemeName: schemeName,
    //   });
    //   console.log(response);
    // } catch (error) {
    //   console.log(error);
    // }

    navigate("/panel-admin/add-grades", {
      state: {
        selectedProgram,
        selectedBatch,
        selectedSubject,
        schemeName,
      },
    });
  };

  return (
    <PanelDashboardLayout>
      <div className="p-2">
        <h1 className="text-2xl font-bold mb-6">Grade Scheme Form</h1>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="program"
          >
            Program:
          </label>
          <select
            required
            id="program"
            value={selectedProgram}
            onChange={(e) => setSelectedProgram(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="" disabled>
              Select Program
            </option>
            {allPrograms.map((program) => (
              <option key={program._id} value={program.programName}>
                {program.programName}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="batch"
          >
            Batch:
          </label>
          <select
            required
            id="batch"
            value={selectedBatch}
            onChange={(e) => setSelectedBatch(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="" disabled>
              Select Batch
            </option>
            {allBatches.map((batch) => (
              <option key={batch._id} value={batch.batchName}>
                {batch.batchName}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="subject"
          >
            Subject:
          </label>
          <select
            required
            id="subject"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="" disabled>
              Select Subject
            </option>
            {allSubjects.map((subject) => (
              <option key={subject._id} value={subject.subjectName}>
                {subject.subjectName}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="schemeName"
          >
            Scheme Name:
          </label>
          <input
            required
            id="schemeName"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Scheme Name"
            onChange={(e) => setSchemeName(e.target.value)}
          />
        </div>
        <button
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </PanelDashboardLayout>
  );
};

export default GradeSchemeForm;
