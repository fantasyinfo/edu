import React, { useState } from "react";

const PanelFormListFilters = ({ onFilterChange, resetFilter }) => {
  const [year, setYear] = useState("");
  const [applicationNumber, setApplicationNumber] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [caste, setCaste] = useState("");
  const [applicationStage, setApplicationStage] = useState("");

  const handleFilterChange = () => {
    onFilterChange({
      year,
      applicationNumber,
      paymentStatus,
      caste,
      applicationStage,
    });
  };

  const resetForm = () => {
    setYear("");
    setApplicationNumber("");
    setPaymentStatus("");
    setCaste("");
    setApplicationStage("");

    resetFilter({
      year,
      applicationNumber,
      paymentStatus,
      caste,
      applicationStage,
    });
  };
  const years = [2021, 2022, 2023, 2024, 2025];
  const casts = ["general", "obc", "sc", "st", "other"];
  const stages = [1, 2, 3, 4];
  const paymentMode = [true, false];

  return (
    <div className="row">
      <div className="form-group col-md-4 mb-3">
        <label htmlFor="year">Select Year</label>
        <select
          className="form-control"
          onChange={(e) => setYear(e.target.value)}
          value={year}
        >
          <option value="">Select Year</option>
          {years.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group col-md-4 mb-3">
        <label htmlFor="applicationNumber">Application Number</label>
        <input
          className="form-control"
          onChange={(e) => setApplicationNumber(e.target.value)}
          value={applicationNumber}
        />
      </div>

      <div className="form-group col-md-4 mb-3">
        <label htmlFor="year">Select Caste</label>

        <select
          className="form-control"
          onChange={(e) => setCaste(e.target.value)}
          value={caste}
        >
          <option value="">Select Caste</option>
          {casts.map((option, index) => (
            <option key={index} value={option}>
              {option.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group col-md-4 mb-3">
        <label htmlFor="paymentMode">Select Payment Status</label>

        <select
          id="paymentMode"
          className="form-control"
          onChange={(e) => setPaymentStatus(e.target.value)}
          value={paymentStatus}
        >
          <option value="">Select Payment Status</option>
          {paymentMode.map((option, index) => (
            <option key={index} value={option}>
              {option == true ? "PAID" : "UNPAID"}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group col-md-4 mb-3">
        <label htmlFor="stage">Select Stage</label>
        <select
          className="form-control"
          onChange={(e) => setApplicationStage(e.target.value)}
          value={applicationStage}
        >
          <option value="">Select Stage</option>
          {stages.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="col-md-4  d-flex justify-content-start align-items-center">
        <button
          onClick={handleFilterChange}
          className="btn  btn-primary create-new-button"
        >
          Apply Filters
        </button>
        <button
          onClick={resetForm}
          className="btn ml-4 btn-info create-new-button"
        >
          Reset (Double Click)
        </button>
      </div>
    </div>
  );
};

export default PanelFormListFilters;
