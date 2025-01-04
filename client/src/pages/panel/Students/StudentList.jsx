import React, { useEffect, useState } from "react";
import StudentCard from "./StudentCard"; // Import the StudentCard component
import StudentFilter from "./StudentFilter";
import StudentDetailsModal from "./StudentDetailsModal"; // Import the StudentDetailsModal component

const StudentList = () => {
  const [allStudents, setAllStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [expandedDetails, setExpandedDetails] = useState([]);
  const [filters, setFilters] = useState({
    filterType: "Active Students",
    program: "",
    batch: "",
    term: "",
    searchType: "Student Name",
    searchText: "",
  });
  const [isFilterVisible, setIsFilterVisible] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studentDetails, setStudentDetails] = useState(null);

  const students = [
    {
      id: "1",
      name: "John Doe",
      username: "john.doe",
      email: "john.doe@example.com",
      phone: "123-456-7890",
      gender: "Male",
      program: "Computer Science",
      batch: "2020",
      registerNo: "REG123460",
      rollNo: "ROLL005",
      status: "active",
    },
    {
      id: "2",
      name: "Fiona Clark",
      username: "fiona.clark",
      email: "fiona.clark@example.com",
      phone: "123-456-7891",
      gender: "Female",
      program: "Electronics and Communication",
      batch: "2023",
      registerNo: "REG323460",
      rollNo: "ROLL002",
      status: "active",
    },
    {
      id: "3",
      name: "George Lewis",
      username: "george.lewis",
      email: "george.lewis@example.com",
      phone: "123-456-7892",
      gender: "Male",
      program: "Aerospace Engineering",
      batch: "2020",
      registerNo: "REG123440",
      rollNo: "ROLL003",
      status: "active",
    },
    {
      id: "4",
      name: "Hannah Martinez",
      username: "hannah.martinez",
      email: "hannah.martinez@example.com",
      phone: "123-456-7893",
      gender: "Female",
      program: "Biomedical Engineering",
      batch: "2022",
      registerNo: "REG123476",
      rollNo: "ROLL006",
      status: "inactive",
    },
    {
      id: "5",
      name: "Bob Brown",
      username: "bob.brown",
      email: "bob.brown@example.com",
      phone: "123-456-7894",
      gender: "Male",
      program: "Civil Engineering",
      batch: "2022",
      registerNo: "REG123445",
      rollNo: "ROLL007",
      status: "active",
    },
    {
      id: "6",
      name: "Charlie Davis",
      username: "charlie.davis",
      email: "charlie.davis@example.com",
      phone: "123-456-7895",
      gender: "Male",
      program: "Chemical Engineering",
      batch: "2021",
      registerNo: "REG127460",
      rollNo: "ROLL008",
      status: "active",
    },
    {
      id: "7",
      name: "Diana Evans",
      username: "diana.evans",
      email: "diana.evans@example.com",
      phone: "123-456-7896",
      gender: "Female",
      program: "Biotechnology",
      batch: "2020",
      registerNo: "REG163460",
      rollNo: "ROLL009",
      status: "inactive",
    },
    {
      id: "8",
      name: "Ethan Harris",
      username: "ethan.harris",
      email: "ethan.harris@example.com",
      phone: "123-456-7897",
      gender: "Male",
      program: "Information Technology",
      batch: "2020",
      registerNo: "REG145460",
      rollNo: "ROLL010",
      status: "inactive",
    },
  ];

  useEffect(() => {
    setAllStudents(students);
    setFilteredStudents(students);
  }, []);

  const handleToggleSelect = (student) => {
    setSelectedStudents((prev) =>
      prev.includes(student)
        ? prev.filter((s) => s !== student)
        : [...prev, student]
    );
  };

  const handleToggleDetails = (student) => {
    setExpandedDetails((prev) =>
      prev.includes(student)
        ? prev.filter((s) => s !== student)
        : [...prev, student]
    );
  };

  const handleToggleInfo = (student) => {
    setStudentDetails(student);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setStudentDetails(null);
  };

  const handleSearch = () => {
    const filtered = allStudents.filter((student) => {
      const searchField =
        filters.searchType === "Student Name"
          ? student.name
          : filters.searchType === "Register No"
          ? student.registerNo
          : student.rollNo;
      return (
        searchField.toLowerCase().includes(filters.searchText.toLowerCase()) &&
        student.program.toLowerCase().includes(filters.program.toLowerCase()) &&
        student.batch.includes(filters.batch) &&
        student.registerNo.includes(filters.term) &&
        student.status === filters.filterType.toLowerCase()
      );
    });
    setFilteredStudents(filtered);
  };

  const handleReset = () => {
    setFilters({
      filterType: "Active Students",
      program: "",
      batch: "",
      term: "",
      searchType: "Student Name",
      searchText: "",
    });
    setFilteredStudents(allStudents);
  };

  const toggleFilterVisibility = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  return (
    <div className="p-4">
      <button
        className="text-blue-500 font-bold mb-4"
        onClick={toggleFilterVisibility}
      >
        {isFilterVisible ? "Hide Filters" : "Show Filters"}
      </button>
      <StudentFilter
        filters={filters}
        setFilters={setFilters}
        onSearch={handleSearch}
        onReset={handleReset}
        isVisible={isFilterVisible}
        toggleVisibility={toggleFilterVisibility}
      />
      <h4 className="text-lg font-bold mb-2">
        Total Students: {allStudents.length}
      </h4>
      <p className="text-gray-600 mb-4">
        Selected {selectedStudents.length} students out of {allStudents.length}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {filteredStudents.map((student) => (
          <StudentCard
            key={student.id}
            student={student}
            onToggleSelect={handleToggleSelect}
            isSelected={selectedStudents.includes(student)}
            onToggleDetails={handleToggleDetails}
            showDetails={expandedDetails.includes(student)}
            onToggleInfo={handleToggleInfo}
          />
        ))}
      </div>
      {studentDetails && (
        <StudentDetailsModal
          open={isModalOpen}
          onClose={handleCloseModal}
          student={studentDetails}
        />
      )}
    </div>
  );
};

export default StudentList;
