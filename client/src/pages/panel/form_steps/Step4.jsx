import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { updateApplicationFormForAdmin } from "../../../utils/Api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Step4 = ({ setActiveStep, oldFormData }) => {
  const navigate = useNavigate();

  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: oldFormData,
  });

  const [filePreviews, setFilePreviews] = useState({});

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      setFilePreviews((prev) => ({
        ...prev,
        [field.name]: file.type.startsWith("image")
          ? URL.createObjectURL(file)
          : file.name,
      }));
      field.onChange(file);
    }
  };

  useEffect(() => {
    if (oldFormData?.certificates) {
      const previews = {};
      oldFormData.certificates.forEach((cert) => {
        previews[`certificates.${cert.type}`] = cert.fileUrl;
      });
      setFilePreviews(previews);
      reset(oldFormData);
    }
  }, [reset, oldFormData]);

  useEffect(() => {
    if (oldFormData?.certificates) {
      reset(oldFormData);
    }
  }, [oldFormData, reset]);

  const onSubmit = async (data) => {
    const formData = new FormData();

    if (data.certificates) {
      let index = 0;
      Object.entries(data.certificates).forEach(([key, value]) => {
        if (value !== undefined && !value?.fileUrl) {
          formData.append("certificates", value); // Append only the file
          formData.append(`certificateNames[${index}]`, key); // Append only the name
          index++;
        }
      });
    }

    if (!(data.stage > 4)) {
      formData.append("stage", 4);
    }
    formData.append("_id", data._id);
    formData.append("formStatusFromAdmin", "Completed By Student");
    try {
      const response = await updateApplicationFormForAdmin(formData);
      toast.success(`Step 4 Completed...`);
      console.log(response);
      navigate("/panel-admin/forms");
      //setActiveStep((prevStep) => prevStep + 1);
    } catch (error) {
      toast.error(`Try Again, ${error?.response?.data?.error}`);
    }
  };

  const certificateInputs = [
    { label: "Valid Score Card of Competitive Test", name: "validScoreCard" },
    { label: "Domicile Certificate", name: "domicileCertificate" },
    { label: "SSC Certificate", name: "sscCertificate" },
    { label: "HSC Certificate", name: "hscCertificate" },
    { label: "Graduation Marksheet Certificate", name: "graduationMarksheet" },
    {
      label: "Previous Year Marksheet Certificate",
      name: "previousYearMarksheet",
    },
    { label: "Provisional Certificate", name: "provisionalCertificate" },
    { label: "University Migration Certificate", name: "universityMigration" },
    { label: "Nationality Certificate", name: "nationalityCertificate" },
    { label: "Birth Certificate", name: "birthCertificate" },
    { label: "Hindi Language Certificate", name: "hindiLanguageCertificate" },
    { label: "Medical Fitness Certificate", name: "medicalFitnessCertificate" },
    { label: "Work Experience Certificate", name: "workExperienceCertificate" },
    { label: "Transfer Certificate", name: "transferCertificate" },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h4 className="text-light-black my-3">
        &larr; Certificates Upload &rarr;
      </h4>
      {certificateInputs.map((input, index) => (
        <div className="form-group" key={index}>
          <label>{input.label}</label>
          <Controller
            control={control}
            name={`certificates.${input.name}`}
            render={({ field }) => (
              <>
                <input
                  type="file"
                  className="form-control p_input"
                  onChange={(e) => handleFileChange(e, field)}
                />
                {filePreviews[`certificates.${input.name}`] && (
                  <div className="mt-2">
                    {filePreviews[`certificates.${input.name}`].endsWith(
                      ".pdf"
                    ) ? (
                      <a
                        href={filePreviews[`certificates.${input.name}`]}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {filePreviews[`certificates.${input.name}`]}
                      </a>
                    ) : (
                      <img
                        src={filePreviews[`certificates.${input.name}`]}
                        alt="Preview"
                        width="100"
                      />
                    )}
                  </div>
                )}
                {errors?.certificates?.[input.name] && (
                  <p className="text-danger">{`${input.label} is required`}</p>
                )}
              </>
            )}
          />
        </div>
      ))}

      {/* Navigation Buttons */}
      <div className="d-flex justify-content-between align-items-center">
        <div className="text-center">
          <button
            className="btn btn-light btn-block enter-btn"
            onClick={() => setActiveStep((prevStep) => prevStep - 1)}
            type="button"
          >
            Previous
          </button>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="btn btn-primary btn-block enter-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Please wait..." : "Submit"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Step4;
