/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleFormData } from "../../../utils/Api";
import { toast } from "react-toastify";
import DashboardLayout from "../DashboardLayout";

import InfoIcon from "@mui/icons-material/Info";
import PersonIcon from "@mui/icons-material/Person";
import HouseIcon from "@mui/icons-material/House";
import WorkIcon from "@mui/icons-material/Work";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import TopicIcon from "@mui/icons-material/Topic";
import SchoolIcon from "@mui/icons-material/School";

const Preview = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [tabIndex, setTabIndex] = useState("formDetails");

  useEffect(() => {
    if (id) {
      fetchSingleFormDataFromAPI();
    }
  }, [id]);

  const fetchSingleFormDataFromAPI = async () => {
    try {
      const response = await getSingleFormData(id);
      console.log(response);
      setData(response);
    } catch (error) {
      console.log(error);
      toast.error(`Try Again, ${error?.response?.data?.error}`);
    }
  };

  const renderFormDetails = () => (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">Form Details</h5>
        <p className="card-text">
          Application Number: {data.applicationNumber}
        </p>
        <p className="card-text">Form Mode: {data.formMode}</p>
        <p className="card-text">Form Name: {data.formName}</p>
        <p className="card-text">Form Status: {data.formStatusFromAdmin}</p>
        <p className="card-text">
          Payment Status: {data.paymentStatus ? "Completed" : "Pending"}
        </p>
        <p className="card-text">
          Last Updated: {new Date(data.updatedAt).toLocaleString()}
        </p>
      </div>
    </div>
  );

  const renderStudentDetails = () => (
    <div className="card mb-3">
      <div className="card-body">
        <div className="row">
          <div className="col-sm-4">
            <img
              alt={data.studentDetails?.firstName}
              src={data.studentDetails?.studentImage}
              className="img-fluid rounded-circle mb-3"
              style={{ width: "150px", height: "150px" }}
            />
          </div>
          <div className="col-sm-8">
            <h5 className="card-title">Student Information</h5>
            <p className="card-text">
              Name:{" "}
              {`${data.studentDetails?.firstName} ${data.studentDetails?.middleName} ${data.studentDetails?.lastName}`}
            </p>
            <p className="card-text">
              Date of Birth: {data.studentDetails?.dateOfBirth}
            </p>
            <p className="card-text">Gender: {data.studentDetails?.gender}</p>
            <p className="card-text">
              Marital Status: {data.studentDetails?.maritalStatus}
            </p>
            <p className="card-text">
              Mobile Number: {data.studentDetails?.studentMobileNumber}
            </p>
            <p className="card-text">
              Email: {data.studentDetails?.emailAddress}
            </p>
            <p className="card-text">
              Nationality: {data.studentDetails?.nationality}
            </p>
            <p className="card-text">
              Religion: {data.studentDetails?.religion}
            </p>
            <p className="card-text">
              Mother Tongue: {data.studentDetails?.motherTongue}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAddressDetails = () => (
    <div>
      <div className="card mb-3">
        <div className="card-body">
          <h5 className="card-title">Communication Address</h5>
          <p className="card-text">
            Address Line 1: {data.communicationAddress?.addressLine1}
          </p>
          <p className="card-text">
            Address Line 2: {data.communicationAddress?.addressLine2}
          </p>
          <p className="card-text">City: {data.communicationAddress?.city}</p>
          <p className="card-text">
            Country: {data.communicationAddress?.country}
          </p>
          <p className="card-text">
            District: {data.communicationAddress?.district}
          </p>
          <p className="card-text">
            Land Number: {data.communicationAddress?.landNumber}
          </p>
          <p className="card-text">
            Pincode: {data.communicationAddress?.pincode}
          </p>
          <p className="card-text">State: {data.communicationAddress?.state}</p>
        </div>
      </div>
      <div className="card mb-3">
        <div className="card-body">
          <h5 className="card-title">Permanent Address</h5>
          <p className="card-text">
            Address Line 1: {data.permanentAddress?.addressLine1}
          </p>
          <p className="card-text">
            Address Line 2: {data.permanentAddress?.addressLine2}
          </p>
          <p className="card-text">City: {data.permanentAddress?.city}</p>
          <p className="card-text">Country: {data.permanentAddress?.country}</p>
          <p className="card-text">
            District: {data.permanentAddress?.district}
          </p>
          <p className="card-text">
            Land Number: {data.permanentAddress?.landNumber}
          </p>
          <p className="card-text">Pincode: {data.permanentAddress?.pincode}</p>
          <p className="card-text">State: {data.permanentAddress?.state}</p>
        </div>
      </div>
    </div>
  );

  const renderAcademicQualifications = () => (
    <div>
      {Object.keys(data.academicQualifications || {}).map((key) => (
        <div className="card mb-3" key={key}>
          <div className="card-body">
            <h5 className="card-title">{key.toUpperCase()}</h5>
            <p className="card-text">
              Board Stream: {data.academicQualifications[key].boardStream}
            </p>
            <p className="card-text">
              Institution: {data.academicQualifications[key].institution}
            </p>
            <p className="card-text">
              Percentage: {data.academicQualifications[key].percentage}%
            </p>
            <p className="card-text">
              Year of Passing: {data.academicQualifications[key].yearOfPassing}
            </p>
          </div>
        </div>
      ))}
    </div>
  );

  const renderFamilyBackground = () => (
    <div>
      <div className="card mb-3">
        <div className="card-body">
          <h5 className="card-title">Father's Information</h5>
          <p className="card-text">Name: {data.familyBackground?.fatherName}</p>
          <p className="card-text">
            Mobile No: {data.familyBackground?.fatherMobileNo}
          </p>
          <p className="card-text">
            Occupation: {data.familyBackground?.fatherOccupation}
          </p>
        </div>
      </div>
      <div className="card mb-3">
        <div className="card-body">
          <h5 className="card-title">Mother's Information</h5>
          <p className="card-text">Name: {data.familyBackground?.motherName}</p>
          <p className="card-text">
            Mobile No: {data.familyBackground?.motherMobileNo}
          </p>
          <p className="card-text">
            Occupation: {data.familyBackground?.motherOccupation}
          </p>
        </div>
      </div>
    </div>
  );

  const renderWorkExperience = () => (
    <div>
      {data.workExperience?.map((work, index) => (
        <div className="card mb-3" key={index}>
          <div className="card-body">
            <h5 className="card-title">Company: {work.company}</h5>
            <p className="card-text">Designation: {work.designation}</p>
            <p className="card-text">From: {work.from}</p>
            <p className="card-text">To: {work.to}</p>
          </div>
        </div>
      ))}
    </div>
  );

  const renderHobbiesAchievements = () => (
    <div>
      {data.hobbiesAwardsAchievements?.map((item, index) => (
        <div className="card mb-3" key={index}>
          <div className="card-body">
            <h5 className="card-title">Organization: {item.organization}</h5>
            <p className="card-text">Description: {item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );

  const renderCertificates = () => (
    <div>
      {data.certificates?.map((certificate, index) => (
        <div className="card mb-3" key={index}>
          <div className="card-body">
            <h5 className="card-title">{certificate.type}</h5>
            {certificate.fileUrl.endsWith(".pdf") ? (
              <a
                href={certificate.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                View PDF
              </a>
            ) : (
              <img
                src={certificate.fileUrl}
                alt={certificate.type}
                style={{ width: "100px", height: "100px" }}
                className="img-fluid"
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <DashboardLayout>
      <div className="container-fluid">
        <h3 className="text-center my-4">{data.formName}</h3>
        <div className="row">
          <div className="col-sm-3">
            <ul className="nav flex-column nav-pills">
              <li className="nav-item text-white">
                <a
                  className={`nav-link ${
                    tabIndex === "formDetails" ? "active" : ""
                  }`}
                  href="#formDetails"
                  onClick={() => setTabIndex("formDetails")}
                >
                  <InfoIcon /> Form Details
                </a>
              </li>
              <li className="nav-item ">
                <a
                  className={`nav-link text-white ${
                    tabIndex === "studentDetails" ? "active" : ""
                  }`}
                  href="#studentDetails"
                  onClick={() => setTabIndex("studentDetails")}
                >
                  <PersonIcon /> Student Details
                </a>
              </li>
              <li className="nav-item ">
                <a
                  className={`nav-link text-white ${
                    tabIndex === "addressDetails" ? "active" : ""
                  }`}
                  href="#addressDetails"
                  onClick={() => setTabIndex("addressDetails")}
                >
                  <HouseIcon /> Address Details
                </a>
              </li>
              <li className="nav-item ">
                <a
                  className={`nav-link text-white ${
                    tabIndex === "academicQualifications" ? "active" : ""
                  }`}
                  href="#academicQualifications"
                  onClick={() => setTabIndex("academicQualifications")}
                >
                  <SchoolIcon /> Academic Qualifications
                </a>
              </li>
              <li className="nav-item ">
                <a
                  className={`nav-link text-white ${
                    tabIndex === "familyBackground" ? "active" : ""
                  }`}
                  href="#familyBackground"
                  onClick={() => setTabIndex("familyBackground")}
                >
                  <PeopleAltIcon /> Family Background
                </a>
              </li>
              <li className="nav-item ">
                <a
                  className={`nav-link text-white ${
                    tabIndex === "workExperience" ? "active" : ""
                  }`}
                  href="#workExperience"
                  onClick={() => setTabIndex("workExperience")}
                >
                  <WorkIcon /> Work Experience
                </a>
              </li>
              <li className="nav-item ">
                <a
                  className={`nav-link text-white ${
                    tabIndex === "hobbiesAchievements" ? "active" : ""
                  }`}
                  href="#hobbiesAchievements"
                  onClick={() => setTabIndex("hobbiesAchievements")}
                >
                  <MilitaryTechIcon /> Hobbies & Achievements
                </a>
              </li>
              <li className="nav-item ">
                <a
                  className={`nav-link text-white ${
                    tabIndex === "certificates" ? "active" : ""
                  }`}
                  href="#certificates"
                  onClick={() => setTabIndex("certificates")}
                >
                  <TopicIcon /> Certificates
                </a>
              </li>
            </ul>
          </div>
          <div className="col-sm-9">
            <div className="tab-content">
              {tabIndex === "formDetails" && renderFormDetails()}
              {tabIndex === "studentDetails" && renderStudentDetails()}
              {tabIndex === "addressDetails" && renderAddressDetails()}
              {tabIndex === "academicQualifications" &&
                renderAcademicQualifications()}
              {tabIndex === "familyBackground" && renderFamilyBackground()}
              {tabIndex === "workExperience" && renderWorkExperience()}
              {tabIndex === "hobbiesAchievements" &&
                renderHobbiesAchievements()}
              {tabIndex === "certificates" && renderCertificates()}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Preview;
