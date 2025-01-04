/* eslint-disable react-hooks/exhaustive-deps */
// Import necessary libraries
import React, { useEffect, useState } from "react";
import {
  PDFDownloadLink,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";
import { getSingleFormDataForAdmin } from "../../../utils/Api";
import { useParams } from "react-router-dom";

// Create styles for the PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  section: {
    marginBottom: 10,
  },
  heading: {
    fontSize: 14,
    fontWeight: "bold",
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
});

// Define the PDF document component
const MyDocument = ({ data }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.heading}>
          DR. MAR THEOPHILUS INSTITUTE OF MANAGEMENT STUDIES
        </Text>
        <Text style={styles.text}>
          Vishweshwar Education society Plot no.2, Sector 09, Sanpada, Navi
          Mumbai 400705.
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.heading}>
          POST GRADUATION DIPLOMA IN MANAGEMENT STUDIES PGDM BATCH 2024-2026
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.heading}>Personal Details</Text>
        <Text style={styles.text}>
          Name: {data?.studentDetails?.firstName}{" "}
          {data?.studentDetails?.middleName} {data?.studentDetails?.lastName}
        </Text>
        <Text style={styles.text}>Gender: {data?.studentDetails?.gender}</Text>
        <Text style={styles.text}>
          Date of Birth: {data?.studentDetails?.dateOfBirth}
        </Text>
        <Text style={styles.text}>
          Religion: {data?.studentDetails?.religion}
        </Text>
        <Text style={styles.text}>
          Student E-mail: {data?.studentDetails?.emailAddress}
        </Text>
        <Text style={styles.text}>
          Student Contact No: {data?.studentDetails?.studentMobileNumber}
        </Text>
        <Text style={styles.text}>
          Mother Tongue: {data?.studentDetails?.motherTongue}
        </Text>
        <Text style={styles.text}>
          Nationality: {data?.studentDetails?.nationality}
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.heading}>Address</Text>
        <Text style={styles.text}>
          Permanent Address: {data?.permanentAddress?.addressLine1},{" "}
          {data?.permanentAddress?.addressLine2}, {data?.permanentAddress?.city}
          , {data?.permanentAddress?.state}, {data?.permanentAddress?.country},{" "}
          {data?.permanentAddress?.pincode}
        </Text>
        <Text style={styles.text}>
          Communication Address: {data?.communicationAddress?.addressLine1},{" "}
          {data?.communicationAddress?.addressLine2},{" "}
          {data?.communicationAddress?.city},{" "}
          {data?.communicationAddress?.state},{" "}
          {data?.communicationAddress?.country},{" "}
          {data?.communicationAddress?.pincode}
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.heading}>Family Background</Text>
        <Text style={styles.text}>
          Father's Name: {data?.familyBackground?.fatherName}
        </Text>
        <Text style={styles.text}>
          Father's Occupation: {data?.familyBackground?.fatherOccupation}
        </Text>
        <Text style={styles.text}>
          Father's Mobile No: {data?.familyBackground?.fatherMobileNo}
        </Text>
        <Text style={styles.text}>
          Mother's Name: {data?.familyBackground?.motherName}
        </Text>
        <Text style={styles.text}>
          Mother's Occupation: {data?.familyBackground?.motherOccupation}
        </Text>
        <Text style={styles.text}>
          Mother's Mobile No: {data?.familyBackground?.motherMobileNo}
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.heading}>Academic Qualifications</Text>
        <Text style={styles.text}>
          10th - Board Stream:{" "}
          {data?.academicQualifications?.tenth?.boardStream}, Institution:{" "}
          {data?.academicQualifications?.tenth?.institution}, Percentage:{" "}
          {data?.academicQualifications?.tenth?.percentage}, Year of Passing:{" "}
          {data?.academicQualifications?.tenth?.yearOfPassing}
        </Text>
        <Text style={styles.text}>
          12th - Board Stream:{" "}
          {data?.academicQualifications?.twelfth?.boardStream}, Institution:{" "}
          {data?.academicQualifications?.twelfth?.institution}, Percentage:{" "}
          {data?.academicQualifications?.twelfth?.percentage}, Year of Passing:{" "}
          {data?.academicQualifications?.twelfth?.yearOfPassing}
        </Text>
        <Text style={styles.text}>
          UG - Board Stream: {data?.academicQualifications?.ug?.boardStream},
          Institution: {data?.academicQualifications?.ug?.institution},
          Percentage: {data?.academicQualifications?.ug?.percentage}, Year of
          Passing: {data?.academicQualifications?.ug?.yearOfPassing}
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.heading}>Work Experience</Text>
        {data?.workExperience?.map((work, index) => (
          <Text key={index} style={styles.text}>
            {work?.company} - {work?.designation}, from {work?.from} to{" "}
            {work?.to}
          </Text>
        ))}
      </View>
      <View style={styles.section}>
        <Text style={styles.heading}>Hobbies, Awards, Achievements</Text>
        {data?.hobbiesAwardsAchievements?.map((hobby, index) => (
          <Text key={index} style={styles.text}>
            {hobby?.organization} - {hobby?.description}
          </Text>
        ))}
      </View>
      <View style={styles.section}>
        <Text style={styles.heading}>Competitive Exam Score</Text>
        {data?.competitiveExamScore?.map((exam, index) => (
          <Text key={index} style={styles.text}>
            {exam?.competativeName} - Obtained Marks:{" "}
            {exam?.competativeObtMarks}, Max Marks: {exam?.competativeMaxMarks},
            Year: {exam?.competativeDate}
          </Text>
        ))}
      </View>
      <View style={styles.section}>
        <Text style={styles.heading}>Certificates</Text>
        {data?.certificates?.map((certificate, index) => (
          <Text key={index} style={styles.text}>
            {certificate?.type ? certificate?.type : "Unknown"} -{" "}
            {certificate?.fileUrl}
          </Text>
        ))}
      </View>
    </Page>
  </Document>
);

// Main component to fetch data? and render the PDF download link
const PanelPrintForm = () => {
  const [data, setData] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      fetchSingleFormDataFromAPI();
    }
  }, []);

  const fetchSingleFormDataFromAPI = async () => {
    try {
      const response = await getSingleFormDataForAdmin(id);
      setData(response);
      // toast.success(`${response.message}`);
      // setActiveStep((prevStep) => prevStep + 1);
    } catch (error) {
      console.log(error);
      // toast.error(`Try Again, ${error?.response?.data?.error}`);
    }
  };

  return (
    <div>
      {data ? (
        <PDFDownloadLink
          document={<MyDocument data={data} />}
          fileName="student_form.pdf"
        >
          {({ blob, url, loading, error }) =>
            loading ? "Loading document..." : "Download PDF"
          }
        </PDFDownloadLink>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default PanelPrintForm;
