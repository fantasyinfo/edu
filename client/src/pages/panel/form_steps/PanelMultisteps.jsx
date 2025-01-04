import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";

import { useNavigate } from "react-router-dom";
import {  getSingleFormDataForAdmin } from "../../../utils/Api";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import PanelDashboardLayout from "../PanelDashboardLayout";
const steps = [
  "Student Details",
  "Academic Details",
  "Other Details",
  "Certificates",
];

export default function PanelMultisteps() {
  const { id } = useParams();
  const [oldFormData, setOldFormData] = useState({});
  const [oldDataCame, setOldDataCame] = useState(false);

  console.log(id);
  useEffect(() => {
    if (id) {
      fetchSingleFormDataFromAPI();
    }
  },[]);

  const fetchSingleFormDataFromAPI = async () => {
    try {
      const response = await getSingleFormDataForAdmin(id);
      // if(response?.stage == 4 ){
      //   toast.error(`Don't try to hack..`);
      //   window.location.href = '/forms';
      // }
      setOldFormData(response);
      setOldDataCame(true)
      // toast.success(`${response.message}`);
      // setActiveStep((prevStep) => prevStep + 1);
    } catch (error) {
      console.log(error);
      // toast.error(`Try Again, ${error?.response?.data?.error}`);
    }
  };

  const navigate = useNavigate();

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const stepsToRender = [
    <Step1 activeStep={activeStep} setActiveStep={setActiveStep} oldFormData={oldFormData} oldDataCame={oldDataCame} />,
    <Step2 activeStep={activeStep} setActiveStep={setActiveStep} oldFormData={oldFormData} oldDataCame={oldDataCame} />,
    <Step3 activeStep={activeStep} setActiveStep={setActiveStep} oldFormData={oldFormData} oldDataCame={oldDataCame} />,
    <Step4 activeStep={activeStep} setActiveStep={setActiveStep} oldFormData={oldFormData} oldDataCame={oldDataCame}/>,
  ];

  return (
    <PanelDashboardLayout>
      <div className="row">
        <div className="col-md-8 mx-auto">
          <Box sx={{ width: "100%" }}>
            <Stepper activeStep={activeStep}>
              {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};

                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>

            <>
              <div className="my-5">
                {/* // render steps */}
                {stepsToRender[activeStep]}
              </div>
            </>
          </Box>
        </div>
      </div>
    </PanelDashboardLayout>
  );
}
