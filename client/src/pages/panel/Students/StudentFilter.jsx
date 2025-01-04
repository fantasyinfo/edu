import React from "react";

const StudentFilter = ({
  filters,
  setFilters,
  onSearch,
  onReset,
  isVisible,
  toggleVisibility,
}) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  return (
    <div
      className={`p-4 bg-gray-100 rounded-lg shadow-md mb-6 ${
        isVisible ? "" : "hidden"
      }`}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Student Filter Types*
          </label>
          <select
            name="filterType"
            value={filters.filterType}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          >
            <option value="active">Active Students</option>
            <option value="inactive">Inactive Students</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Program
          </label>
          <select
            name="program"
            value={filters.program}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          >
            <option value="">Select Program</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Mechanical Engineering">
              Mechanical Engineering
            </option>
            <option value="Electrical Engineering">
              Electrical Engineering
            </option>
            <option value="Civil Engineering">Civil Engineering</option>
            <option value="Chemical Engineering">Chemical Engineering</option>
            <option value="Biotechnology">Biotechnology</option>
            <option value="Information Technology">
              Information Technology
            </option>
            <option value="Electronics and Communication">
              Electronics and Communication
            </option>
            <option value="Aerospace Engineering">Aerospace Engineering</option>
            <option value="Biomedical Engineering">
              Biomedical Engineering
            </option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Batch
          </label>
          <select
            name="batch"
            value={filters.batch}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          >
            <option value="">Select Batch</option>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Term
          </label>
          <select
            name="term"
            value={filters.term}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          >
            <option value="">Select Term</option>
            <option value="Spring">Spring</option>
            <option value="Summer">Summer</option>
            <option value="Fall">Fall</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Search Type
          </label>
          <select
            name="searchType"
            value={filters.searchType}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          >
            <option value="Student Name">Student Name</option>
            <option value="Register No">Register No</option>
            <option value="Roll No">Roll No</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Search Text
          </label>
          <input
            type="text"
            name="searchText"
            value={filters.searchText}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            placeholder="Enter search text"
          />
        </div>
        <div className="flex items-end justify-end space-x-4 col-span-full md:col-span-3">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-md"
            onClick={onReset}
          >
            Reset
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={onSearch}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentFilter;
