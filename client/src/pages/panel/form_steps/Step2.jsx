import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { updateApplicationFormForAdmin } from "../../../utils/Api";
import { toast } from "react-toastify";

const Step2 = ({ setActiveStep, oldFormData }) => {
  const {
    register,
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: oldFormData,
  });

  useEffect(() => {
    if (oldFormData && oldFormData?.applicationNumber) {
      reset(oldFormData);
    }
  }, [reset, oldFormData]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "competitiveExamScore",
  });

  const onSubmit = async (data) => {
    console.log(data);

    const formData = new FormData();

    // Define fields and their corresponding sections
    const fields = [
      {
        section: "academicQualifications.tenth",
        inputs: ["boardStream", "institution", "percentage", "yearOfPassing"],
      },
      {
        section: "academicQualifications.twelfth",
        inputs: ["boardStream", "institution", "percentage", "yearOfPassing"],
      },
      {
        section: "academicQualifications.ug",
        inputs: ["boardStream", "institution", "percentage", "yearOfPassing"],
      },
    ];

    // Append form data
    fields.forEach(({ section, inputs }) => {
      const sectionData = section
        .split(".")
        .reduce((obj, key) => obj && obj[key], data);
      if (sectionData) {
        inputs.forEach((input) => {
          if (sectionData[input] !== undefined) {
            formData.append(`${section}.${input}`, sectionData[input]);
          }
        });
      } else {
        console.warn(`Section ${section} not found in data`);
      }
    });

    // Append competitive exams data
    data.competitiveExamScore.forEach((exam, index) => {
      Object.keys(exam).forEach((key) => {
        formData.append(`competitiveExamScore[${index}].${key}`, exam[key]);
      });
    });

    // Set additional form data for new submissions
    if (!(data.stage > 2)) {
      formData.append("stage", 2);
    }
    formData.append("_id", data._id);

    try {
      let response = "";
      response = await updateApplicationFormForAdmin(formData);

      console.log(response);
      console.log(response.data);
      toast.success(`Step 2 Completed... `);
      setActiveStep((prevStep) => prevStep + 1);
    } catch (error) {
      console.log(error);
      toast.error(`Try Again, ${error?.response?.data?.error}`);
    }
  };

  const formInputsAcademic10 = [
    {
      label: "10th Board Stream",
      type: "text",
      name: "academicQualifications.tenth.boardStream",
      required: true,
      placeholder: "Hindi, English...",
    },
    {
      label: "10th Institution",
      type: "text",
      name: "academicQualifications.tenth.institution",
      required: true,
      placeholder: "ABC College, XYZ School...",
    },
    {
      label: "10th Percentage",
      type: "percentage",
      name: "academicQualifications.tenth.percentage",
      required: true,
      placeholder: "80%, 99.9%...",
    },
    {
      label: "10th Year of Passing",
      type: "year",
      name: "academicQualifications.tenth.yearOfPassing",
      required: true,
      placeholder: "2021,2020,2022...",
    },
  ];
  const formInputsAcademic12 = [
    {
      label: "12th Board Stream",
      type: "text",
      name: "academicQualifications.twelfth.boardStream",
      required: true,
      placeholder: "Science, Maths, Commerce...",
    },
    {
      label: "12th Institution",
      type: "text",
      name: "academicQualifications.twelfth.institution",
      required: true,
      placeholder: "ABC College, XYZ School...",
    },
    {
      label: "12th Percentage",
      type: "percentage",
      name: "academicQualifications.twelfth.percentage",
      required: true,
      placeholder: "80%, 99.9%...",
    },
    {
      label: "12th Year of Passing",
      type: "year",
      name: "academicQualifications.twelfth.yearOfPassing",
      required: true,
      placeholder: "2021,2020,2022...",
    },
  ];
  const formInputsAcademicUG = [
    {
      label: "UG Board Stream",
      type: "text",
      name: "academicQualifications.ug.boardStream",
      required: true,
      placeholder: "English, Maths, History...",
    },
    {
      label: "UG Institution",
      type: "text",
      name: "academicQualifications.ug.institution",
      required: true,
      placeholder: "ABC College...",
    },
    {
      label: "UG Percentage",
      type: "percentage",
      name: "academicQualifications.ug.percentage",
      required: true,
      placeholder: "80%, 99.9%...",
    },
    {
      label: "UG Year of Passing",
      type: "year",
      name: "academicQualifications.ug.yearOfPassing",
      required: true,
      placeholder: "2021,2020,2022...",
    },
  ];

  const formInputsAcademicCompetitive = [
    {
      label: "Competative Name",
      type: "text",
      name: "competativeName",
      required: false,
      placeholder: "CAT/MAT...",
    },
    {
      label: "Passing Month & Year",
      type: "text",
      name: "competativeDate",
      required: false,
      placeholder: "01/12/2021, 01/06/2020",
    },
    {
      label: "Marks Obtained",
      type: "text",
      name: "competativeObtMarks",
      required: false,
      placeholder: "80,90,95...",
    },
    {
      label: "Maximum Marks",
      type: "text",
      name: "competativeMaxMarks",
      required: false,
      placeholder: "100,150,200...",
    },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* 10th details */}
      <h4 className="text-light-black my-3">
        &larr; 10th Standard Details &rarr;
      </h4>
      {formInputsAcademic10.map((input, index) => (
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
                errors?.academicQualifications?.tenth?.[
                  input.name.split(".").pop()
                ]
                  ? "true"
                  : "false"
              }
            />
          )}
          {input.type === "percentage" && (
            <input
              className="form-control p_input"
              placeholder={input?.placeholder}
              type="number"
              min="0"
              step="0.01"
              max="100"
              inputMode="decimal"
              {...register(input.name, {
                required: input.required,
                pattern: input.pattern && {
                  value: input.pattern,
                  message: input.errorMessage,
                },
              })}
              aria-invalid={
                errors?.academicQualifications?.tenth?.[
                  input.name.split(".").pop()
                ]
                  ? "true"
                  : "false"
              }
            />
          )}
          {input.type === "year" && (
            <input
              className="form-control p_input"
              type="text"
              placeholder={input?.placeholder}
              {...register(input.name, {
                required: input.required,
                pattern: {
                  value: /^(19|20)\d{2}$/,
                  message: "Enter a valid year between 1900 and 2099",
                },
              })}
              aria-invalid={
                errors?.academicQualifications?.tenth?.[
                  input.name.split(".").pop()
                ]
                  ? "true"
                  : "false"
              }
            />
          )}

          {errors?.academicQualifications?.tenth?.[input.name.split(".").pop()]
            ?.type === "required" && (
            <p className="text-danger">{`${input.label} is required`}</p>
          )}
          {errors?.academicQualifications?.tenth?.[input.name.split(".").pop()]
            ?.type === "pattern" && (
            <p className="text-danger">
              {
                errors?.academicQualifications?.tenth?.[
                  input.name.split(".").pop()
                ]?.message
              }
            </p>
          )}
        </div>
      ))}

      {/* 12th details */}
      <h4 className="text-light-black my-3">
        &larr; 12th Standard Details &rarr;
      </h4>
      {formInputsAcademic12.map((input, index) => (
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
                errors?.academicQualifications?.twelfth?.[
                  input.name.split(".").pop()
                ]
                  ? "true"
                  : "false"
              }
            />
          )}
          {input.type === "percentage" && (
            <input
              className="form-control p_input"
              placeholder={input?.placeholder}
              type="number"
              min="0"
              step="0.01"
              max="100"
              inputMode="decimal"
              {...register(input.name, {
                required: input.required,
                pattern: input.pattern && {
                  value: input.pattern,
                  message: input.errorMessage,
                },
              })}
              aria-invalid={
                errors?.academicQualifications?.twelfth?.[
                  input.name.split(".").pop()
                ]
                  ? "true"
                  : "false"
              }
            />
          )}
          {input.type === "year" && (
            <input
              className="form-control p_input"
              type="text"
              placeholder={input?.placeholder}
              {...register(input.name, {
                required: input.required,
                pattern: {
                  value: /^(19|20)\d{2}$/,
                  message: "Enter a valid year between 1900 and 2099",
                },
              })}
              aria-invalid={
                errors?.academicQualifications?.twelfth?.[
                  input.name.split(".").pop()
                ]
                  ? "true"
                  : "false"
              }
            />
          )}

          {errors?.academicQualifications?.twelfth?.[
            input.name.split(".").pop()
          ]?.type === "required" && (
            <p className="text-danger">{`${input.label} is required`}</p>
          )}
          {errors?.academicQualifications?.twelfth?.[
            input.name.split(".").pop()
          ]?.type === "pattern" && (
            <p className="text-danger">
              {
                errors?.academicQualifications?.twelfth?.[
                  input.name.split(".").pop()
                ]?.message
              }
            </p>
          )}
        </div>
      ))}

      {/* UG details */}
      <h4 className="text-light-black my-3">
        &larr; Under Graduate (UG) Details &rarr;
      </h4>
      {formInputsAcademicUG.map((input, index) => (
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
                errors?.academicQualifications?.ug?.[
                  input.name.split(".").pop()
                ]
                  ? "true"
                  : "false"
              }
            />
          )}
          {input.type === "percentage" && (
            <input
              className="form-control p_input"
              placeholder={input?.placeholder}
              type="number"
              min="0"
              step="0.01"
              max="100"
              inputMode="decimal"
              {...register(input.name, {
                required: input.required,
                pattern: input.pattern && {
                  value: input.pattern,
                  message: input.errorMessage,
                },
              })}
              aria-invalid={
                errors?.academicQualifications?.ug?.[
                  input.name.split(".").pop()
                ]
                  ? "true"
                  : "false"
              }
            />
          )}
          {input.type === "year" && (
            <input
              className="form-control p_input"
              type="text"
              placeholder={input?.placeholder}
              {...register(input.name, {
                required: input.required,
                pattern: {
                  value: /^(19|20)\d{2}$/,
                  message: "Enter a valid year between 1900 and 2099",
                },
              })}
              aria-invalid={
                errors?.academicQualifications?.ug?.[
                  input.name.split(".").pop()
                ]
                  ? "true"
                  : "false"
              }
            />
          )}

          {errors?.academicQualifications?.ug?.[input.name.split(".").pop()]
            ?.type === "required" && (
            <p className="text-danger">{`${input.label} is required`}</p>
          )}
          {errors?.academicQualifications?.ug?.[input.name.split(".").pop()]
            ?.type === "pattern" && (
            <p className="text-danger">
              {
                errors?.academicQualifications?.ug?.[
                  input.name.split(".").pop()
                ]?.message
              }
            </p>
          )}
        </div>
      ))}

      {/* competitiveExamScore */}
      <h4 className="text-light-black my-3">
        &larr; Competitive Exam Details &rarr;
      </h4>
      {fields.map((field, index) => (
        <div key={field.id} className="row my-2">
          {formInputsAcademicCompetitive.map((input) => (
            <div className="col-md-3" key={input.name}>
              <div className="form-group">
                <label>
                  {input.label}{" "}
                  <span className="text-danger">
                    {input.required ? "*" : ""}
                  </span>
                </label>
                <input
                  className="form-control p_input"
                  placeholder={input?.placeholder}
                  type="text"
                  {...register(`competitiveExamScore[${index}].${input.name}`)}
                  aria-invalid={
                    errors?.competitiveExamScore?.[index]?.[
                      input.name.split(".").pop()
                    ]
                      ? "true"
                      : "false"
                  }
                />
                {errors?.competitiveExamScore?.[index]?.[
                  input.name.split(".").pop()
                ]?.type === "required" && (
                  <p className="text-danger">{`${input.label} is required`}</p>
                )}
                {errors?.competitiveExamScore?.[index]?.[
                  input.name.split(".").pop()
                ]?.type === "pattern" && (
                  <p className="text-danger">
                    {
                      errors?.competitiveExamScore?.[index]?.[
                        input.name.split(".").pop()
                      ]?.message
                    }
                  </p>
                )}
              </div>
            </div>
          ))}
          <div className="col-md-3 d-flex align-items-end">
            <button
              type="button"
              className="btn btn-danger btn-sm"
              onClick={() => remove(index)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
      <button
        type="button"
        className="btn btn-secondary btn-sm mb-3"
        onClick={() =>
          append({
            competativeName: "",
            competativeDate: "",
            competativeObtMarks: "",
            competativeMaxMarks: "",
          })
        }
      >
        Add Competitive Exam
      </button>

      <div className="d-flex justify-content-between align-items-center">
        <div className="text-center">
          <button
            className="btn btn-light btn-block enter-btn"
            onClick={() => setActiveStep((prevStep) => prevStep - 1)}
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
            {isSubmitting ? "Please wait..." : "Next"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Step2;
