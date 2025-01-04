/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  submitStep1ForAdmin,
  updateApplicationFormForAdmin,
} from "../../../utils/Api";
import { toast } from "react-toastify";

const Step1 = ({ setActiveStep, oldFormData }) => {
  const [isImage, setIsImage] = useState(false);
  const [imgPath, setImgPath] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
    setValue,
    watch,
  } = useForm({
    defaultValues: oldFormData,
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (oldFormData?.studentDetails?.studentImage) {
      setImagePreview(oldFormData.studentDetails.studentImage);
    }
  }, [oldFormData]);

  useEffect(() => {
    if (oldFormData && oldFormData?.applicationNumber) {
      if (oldFormData?.studentDetails?.studentImage) {
        setIsImage(true);
        setImgPath(oldFormData?.studentDetails?.studentImage);
      }
      reset(oldFormData);
    }
  }, [reset, oldFormData]);

  const formsNameList = [
    "Master's in Arts",
    "Master's in Commerce",
    "PGDMCA in Computer Science",
    "M. Tech",
  ];

  const onSubmit = async (data) => {
    const formData = new FormData();

    // Define fields and their corresponding sections
    const fields = [
      {
        section: "studentDetails",
        inputs: [
          "firstName",
          "middleName",
          "lastName",
          "dateOfBirth",
          "caste",
          "gender",
          "maritalStatus",
          "studentMobileNumber",
          "emailAddress",
          "nationality",
          "religion",
          "motherTongue",
        ],
      },
      {
        section: "communicationAddress",
        inputs: [
          "addressLine1",
          "addressLine2",
          "landNumber",
          "city",
          "district",
          "state",
          "pincode",
          "country",
        ],
      },
      {
        section: "permanentAddress",
        inputs: [
          "addressLine1",
          "addressLine2",
          "landNumber",
          "city",
          "district",
          "state",
          "pincode",
          "country",
        ],
      },
      {
        section: "familyBackground",
        inputs: [
          "fatherName",
          "fatherOccupation",
          "fatherMobileNo",
          "motherName",
          "motherOccupation",
          "motherMobileNo",
        ],
      },
    ];

    // Append form data
    fields.forEach(({ section, inputs }) => {
      inputs.forEach((input) => {
        formData.append(`${section}.${input}`, data[section][input]);
      });
    });

    // Append extras
    formData.append("studentImage", data.studentImage?.[0]);
    formData.append("formName", data.formName);

    // Set additional form data for new submissions

    if (!data?._id) {
      formData.append("stage", 1);
      formData.append("formMode", "offline");
      formData.append("paymentStatus", true);
    } else {
      if (!(data.stage > 1)) {
        formData.append("stage", 1);
      }
      formData.append("_id", data._id);
    }

    try {
      let response = "";
      if (!data?._id) {
        response = await submitStep1ForAdmin(formData);
      } else {
        response = await updateApplicationFormForAdmin(formData);
      }
      console.log(response);
      toast.success(`Step 1 Completed... `);
      setActiveStep((prevStep) => prevStep + 1);
    } catch (error) {
      console.log(error);
      toast.error(`Try Again, ${error?.response?.data?.error}`);
    }
  };

  const formInputsStudents = [
    {
      label: "First Name",
      type: "text",
      name: "studentDetails.firstName",
      required: true,
      placeholder: "Amit, Sumit, Anuj...",
    },
    {
      label: "Middle Name",
      type: "text",
      name: "studentDetails.middleName",
      required: false,
      placeholder: "Kumar...",
    },
    {
      label: "Last Name",
      type: "text",
      name: "studentDetails.lastName",
      required: true,
      placeholder: "Sharma, Verma, Jain...",
    },
    {
      label: "Student Image",
      type: "file",
      name: "studentImage",
      required: true,
    },
    {
      label: "Date of Birth",
      type: "date",
      name: "studentDetails.dateOfBirth",
      required: true,
      placeholder: "Date of Birth",
    },
    {
      label: "Caste",
      type: "select",
      name: "studentDetails.caste",
      required: true,
      isEmpty: true,
      emptyOption: "Please Select Caste/Category",
      options: [
        { value: "general", label: "General" },
        { value: "obc", label: "OBC" },
        { value: "sc", label: "SC" },
        { value: "st", label: "ST" },
        { value: "other", label: "Other" },
      ],
      placeholder: "General...",
    },
    {
      label: "Gender",
      type: "select",
      name: "studentDetails.gender",
      required: true,
      isEmpty: true,
      emptyOption: "Please Select Gender",
      options: [
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
        { value: "others", label: "Others" },
      ],
      placeholder: "Male, Female, Others",
    },
    {
      label: "Marital Status",
      type: "select",
      name: "studentDetails.maritalStatus",
      required: true,
      isEmpty: true,
      emptyOption: "Please Select Marital Status",
      options: [
        { value: "married", label: "Married" },
        { value: "unmarried", label: "Unmarried" },
        { value: "others", label: "Others" },
      ],
      placeholder: "Married, Unmarried...",
    },
    {
      label: "Mobile",
      type: "text",
      name: "studentDetails.studentMobileNumber",
      required: true,
      pattern: /^[0-9]{10}$/,
      errorMessage: "Invalid mobile number, must be 10 digits.",
      placeholder: "9639639632...",
    },
    {
      label: "Email",
      type: "email",
      name: "studentDetails.emailAddress",
      required: true,
      pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      errorMessage: "Invalid email address",
      placeholder: "amitji@email.com...",
    },
    {
      label: "Nationality",
      type: "text",
      name: "studentDetails.nationality",
      required: true,
      placeholder: "India, Nepal, Bhutan, Pakistan...",
    },
    {
      label: "Religion",
      type: "select",
      name: "studentDetails.religion",
      required: true,
      isEmpty: true,
      emptyOption: "Please Select Religion",
      options: [
        { value: "buddhism", label: "Buddhism" },
        { value: "christian", label: "Christian" },
        { value: "hindu", label: "Hindu" },
        { value: "islam", label: "Islam" },
        { value: "jainism", label: "Jainism" },
        { value: "sikhism", label: "Sikhism" },
        { value: "other", label: "Other" },
      ],
      placeholder: "Hindi, Islam/Muslim ...",
    },
    {
      label: "Mother Tongue",
      type: "text",
      name: "studentDetails.motherTongue",
      required: true,
      placeholder: "Hindi, English, Urdu, Tamil...",
    },
  ];

  const formInputsCommunications = [
    {
      label: "Address Line 1",
      type: "text",
      name: "communicationAddress.addressLine1",
      required: true,
      placeholder: "Abc Building...",
    },
    {
      label: "Address Lin 2",
      type: "text",
      name: "communicationAddress.addressLine2",
      required: false,
      placeholder: "House No 12/54 ...",
    },
    {
      label: "Land Number",
      type: "text",
      name: "communicationAddress.landNumber",
      required: true,
      placeholder: "220...",
    },
    {
      label: "City",
      type: "text",
      name: "communicationAddress.city",
      required: true,
      placeholder: "Delhi, Mumbai...",
    },
    {
      label: "District",
      type: "text",
      name: "communicationAddress.district",
      required: true,
      placeholder: "Chandni Chowk...",
    },
    {
      label: "State",
      type: "text",
      name: "communicationAddress.state",
      required: true,
      placeholder: "New Delhi, Uttar Pradesh",
    },
    {
      label: "Pincode",
      type: "number",
      name: "communicationAddress.pincode",
      required: true,
      placeholder: "123654",
    },
    {
      label: "Country",
      type: "text",
      name: "communicationAddress.country",
      required: true,
      placeholder: "India, USA",
    },
  ];

  const formInputsPermanent = [
    {
      label: "Address Line 1",
      type: "text",
      name: "permanentAddress.addressLine1",
      required: true,
      placeholder: "Abc Building...",
    },
    {
      label: "Address Line 2",
      type: "text",
      name: "permanentAddress.addressLine2",
      required: false,
      placeholder: "House No 12/54 ...",
    },
    {
      label: "Land Number",
      type: "text",
      name: "permanentAddress.landNumber",
      required: true,
      placeholder: "220...",
    },
    {
      label: "City",
      type: "text",
      name: "permanentAddress.city",
      required: true,
      placeholder: "Delhi, Mumbai...",
    },
    {
      label: "District",
      type: "text",
      name: "permanentAddress.district",
      required: true,
      placeholder: "Chandni Chowk...",
    },
    {
      label: "State",
      type: "text",
      name: "permanentAddress.state",
      required: true,
      placeholder: "New Delhi, Uttar Pradesh",
    },
    {
      label: "Pincode",
      type: "number",
      name: "permanentAddress.pincode",
      required: true,
      placeholder: "123654",
    },
    {
      label: "Country",
      type: "text",
      name: "permanentAddress.country",
      required: true,
      placeholder: "India, USA",
    },
  ];

  const formInputsFamilyBackground = [
    {
      label: "Father's Name",
      type: "text",
      name: "familyBackground.fatherName",
      required: true,
      placeholder: "Mr. Ram Sharma...",
    },
    {
      label: "Father's Occupation",
      type: "text",
      name: "familyBackground.fatherOccupation",
      required: true,
      placeholder: "Doctor, Master, Engineer...",
    },
    {
      label: "Father's Mobile Number",
      type: "text",
      name: "familyBackground.fatherMobileNo",
      required: true,
      pattern: /^[0-9]{10}$/,
      errorMessage: "Invalid mobile number, must be 10 digits.",
      placeholder: "9639639632...",
    },
    {
      label: "Mother's Name",
      type: "text",
      name: "familyBackground.motherName",
      required: true,
      placeholder: "Mr. Sita Sharma...",
    },
    {
      label: "Mother's Occupation",
      type: "text",
      name: "familyBackground.motherOccupation",
      required: true,
      placeholder: "Doctor, Master, Engineer...",
    },
    {
      label: "Mother's Mobile Number",
      type: "text",
      name: "familyBackground.motherMobileNo",
      required: true,
      pattern: /^[0-9]{10}$/,
      errorMessage: "Invalid mobile number, must be 10 digits.",
      placeholder: "9639639632...",
    },
  ];

  const handleAddressCheckbox = (e) => {
    if (e.target.checked) {
      const communicationAddress = watch("communicationAddress");
      Object.keys(communicationAddress).forEach((key) => {
        setValue(`permanentAddress.${key}`, communicationAddress[key]);
      });
    } else {
      formInputsPermanent.forEach((input) => {
        setValue(input.name, "");
      });
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h4 className=" my-3 text-light-black">&larr; Select Course &rarr;</h4>
      <div className="form-group">
        <label>
          Please Selection Course
          <span className="text-danger">*</span>
        </label>
        <select
          className="form-control p_input"
          {...register("formName", {
            required: true,
          })}
          aria-invalid={errors?.formName ? "true" : "false"}
        >
          <option value="">Please Select Application Form</option>
          {formsNameList.map((option, index) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {errors.formName?.type === "required" && (
          <p className="text-danger">{`Course Name is required`}</p>
        )}
      </div>

      <h4 className="text-light-black my-3">&larr; Student Details &rarr;</h4>
      {formInputsStudents.map((input, index) => (
        <div className="form-group" key={index}>
          <label>
            {input.label}{" "}
            <span className="text-danger">{input.required ? "*" : ""}</span>
          </label>
          {input.type === "text" && (
            <input
              className="form-control p_input"
              placeholder={input?.placeholder}
              type="text"
              {...register(input.name, {
                required: input.required,
                pattern: input.pattern && {
                  value: input.pattern,
                  message: input.errorMessage,
                },
              })}
              aria-invalid={
                errors?.studentDetails?.[input.name.split(".").pop()]
                  ? "true"
                  : "false"
              }
            />
          )}
          {input.type === "date" && (
            <input
              className="form-control p_input"
              type="date"
              placeholder={input?.placeholder}
              {...register(input.name, {
                required: input.required,
              })}
              aria-invalid={
                errors?.studentDetails?.[input.name.split(".").pop()]
                  ? "true"
                  : "false"
              }
            />
          )}
          {input.type === "select" && (
            <select
              className="form-control p_input"
              {...register(input.name, {
                required: input.required,
              })}
              aria-invalid={
                errors?.studentDetails?.[input.name.split(".").pop()]
                  ? "true"
                  : "false"
              }
            >
              {input?.isEmpty && <option value="">{input?.emptyOption}</option>}
              {input.options.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          )}
          {input.type === "email" && (
            <input
              className="form-control p_input"
              placeholder={input?.placeholder}
              type="email"
              {...register(input.name, {
                required: input.required,
                pattern: input.pattern && {
                  value: input.pattern,
                  message: input.errorMessage,
                },
              })}
              aria-invalid={
                errors?.studentDetails?.[input.name.split(".").pop()]
                  ? "true"
                  : "false"
              }
            />
          )}
          {input.type === "file" && (
            <div>
              <input
                className="form-control p_input"
                placeholder={input?.placeholder}
                type="file"
                {...register(input.name, {
                  required: input.required && !imagePreview, // Make it required only if no image preview is available
                })}
                onChange={handleImageChange}
                aria-invalid={errors?.studentDetails?.image ? "true" : "false"}
              />
              {imagePreview && (
                <div className="mt-2">
                  <img src={imagePreview} alt="Preview" width="100" />
                </div>
              )}
              {errors?.studentDetails?.image?.type === "required" && (
                <p className="text-danger">Image is required</p>
              )}
            </div>
          )}

          {errors[input.name]?.type === "required" && (
            <p className="text-danger">{`${input.label} is required`}</p>
          )}
          {errors[input.name]?.type === "pattern" && (
            <p className="text-danger">{errors[input.name].message}</p>
          )}

          {errors?.studentDetails?.[input.name.split(".").pop()]?.type ===
            "required" && (
            <p className="text-danger">{`${input.label} is required`}</p>
          )}
          {errors?.studentDetails?.[input.name.split(".").pop()]?.type ===
            "pattern" && (
            <p className="text-danger">
              {errors?.studentDetails?.[input.name.split(".").pop()]?.message}
            </p>
          )}
        </div>
      ))}

      {/* communicationAddress */}
      <h4 className=" my-3 text-light-black">
        &larr; Communication Details &rarr;
      </h4>
      {formInputsCommunications.map((input, index) => (
        <div className="form-group" key={index}>
          <label>
            {input.label}{" "}
            <span className="text-danger">{input.required ? "*" : ""}</span>
          </label>
          {input.type === "text" && (
            <input
              className="form-control p_input"
              placeholder={input?.placeholder}
              type="text"
              {...register(input.name, {
                required: input.required,
              })}
              aria-invalid={
                errors?.communicationAddress?.[input.name.split(".").pop()]
                  ? "true"
                  : "false"
              }
            />
          )}
          {input.type === "number" && (
            <input
              className="form-control p_input"
              placeholder={input?.placeholder}
              type="number"
              {...register(input.name, {
                required: input.required,
              })}
              aria-invalid={
                errors?.communicationAddress?.[input.name.split(".").pop()]
                  ? "true"
                  : "false"
              }
            />
          )}

          {errors?.communicationAddress?.[input.name.split(".").pop()]?.type ===
            "required" && (
            <p className="text-danger">{`${input.label} is required`}</p>
          )}
        </div>
      ))}

      {/* permanentAddress */}
      <h4 className="my-3 text-light-black">
        &larr; Permanent Address Details &rarr;
      </h4>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          id="addressSame"
          onChange={(e) => handleAddressCheckbox(e)}
        />
        <label className="form-check-label" htmlFor="addressSame">
          Permanent Address is Same as Communication Address?
        </label>
      </div>
      {formInputsPermanent.map((input, index) => (
        <div className="form-group" key={index}>
          <label>
            {input.label}{" "}
            <span className="text-danger">{input.required ? "*" : ""}</span>
          </label>
          {input.type === "text" && (
            <input
              className="form-control p_input"
              placeholder={input?.placeholder}
              type="text"
              {...register(input.name, {
                required: input.required,
              })}
              aria-invalid={
                errors?.permanentAddress?.[input.name.split(".").pop()]
                  ? "true"
                  : "false"
              }
            />
          )}
          {input.type === "number" && (
            <input
              className="form-control p_input"
              placeholder={input?.placeholder}
              type="number"
              {...register(input.name, {
                required: input.required,
              })}
              aria-invalid={
                errors?.permanentAddress?.[input.name.split(".").pop()]
                  ? "true"
                  : "false"
              }
            />
          )}

          {errors?.permanentAddress?.[input.name.split(".").pop()]?.type ===
            "required" && (
            <p className="text-danger">{`${input.label} is required`}</p>
          )}
        </div>
      ))}

      {/* familyBackground */}
      <h4 className="my-3 text-light-black">&larr; Family Background &rarr;</h4>
      {formInputsFamilyBackground.map((input, index) => (
        <div className="form-group" key={index}>
          <label>
            {input.label}{" "}
            <span className="text-danger">{input.required ? "*" : ""}</span>
          </label>
          {input.type === "text" && (
            <input
              className="form-control p_input"
              placeholder={input?.placeholder}
              type="text"
              {...register(input.name, {
                required: input.required,
                pattern: input.pattern && {
                  value: input.pattern,
                  message: input.errorMessage,
                },
              })}
              aria-invalid={
                errors?.familyBackground?.[input.name.split(".").pop()]
                  ? "true"
                  : "false"
              }
            />
          )}

          {errors?.familyBackground?.[input.name.split(".").pop()]?.type ===
            "required" && (
            <p className="text-danger">{`${input.label} is required`}</p>
          )}
          {errors?.familyBackground?.[input.name.split(".").pop()]?.type ===
            "pattern" && (
            <p className="text-danger">
              {errors?.familyBackground?.[input.name.split(".").pop()]?.message}
            </p>
          )}
        </div>
      ))}

      <div className="text-center">
        <button
          type="submit"
          className="btn btn-primary btn-block enter-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Please wait..." : "Next"}
        </button>
      </div>
    </form>
  );
};

export default Step1;
