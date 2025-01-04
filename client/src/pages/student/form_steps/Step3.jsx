import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { updateApplicationForm } from "../../../utils/Api";
import { toast } from "react-toastify";

const Step3 = ({ setActiveStep, oldFormData }) => {
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

  const {
    fields: workExperienceFields,
    append: appendWorkExperience,
    remove: removeWorkExperience,
  } = useFieldArray({
    control,
    name: "workExperience",
  });

  const {
    fields: hobbiesFields,
    append: appendHobbies,
    remove: removeHobbies,
  } = useFieldArray({
    control,
    name: "hobbiesAwardsAchievements",
  });

  const onSubmit = async (data) => {
    console.log(data);
    const formData = new FormData();

    data.workExperience.forEach((experience, index) => {
      Object.keys(experience).forEach((key) => {
        formData.append(`workExperience[${index}].${key}`, experience[key]);
      });
    });

    data.hobbiesAwardsAchievements.forEach((hobby, index) => {
      Object.keys(hobby).forEach((key) => {
        formData.append(
          `hobbiesAwardsAchievements[${index}].${key}`,
          hobby[key]
        );
      });
    });

    if(!(data.stage > 3)) {
      formData.append("stage", 3);
    }
    formData.append("_id", data._id);

    try {
      const response = await updateApplicationForm(formData);
      console.log(response);
      toast.success(`Step 3 Completed... `);
      setActiveStep((prevStep) => prevStep + 1);
    } catch (error) {
      console.log(error);
      toast.error(`Try Again, ${error?.response?.data?.error}`);
    }
  };

  const formInputsWorkExperience = [
    {
      label: "Company Name",
      type: "text",
      name: "company",
      required: false,
      placeholder: "ABC Ltd...",
    },
    {
      label: "Designation",
      type: "text",
      name: "designation",
      required: false,
      placeholder: "HR, Manager, JE...",
    },
    {
      label: "Starting Date",
      type: "date",
      name: "from",
      required: false,
      placeholder: "01/04/2020",
    },
    {
      label: "Ending Date",
      type: "date",
      name: "to",
      required: false,
      placeholder: "31/03/2021",
    },
  ];

  const formInputsHobbiesAwardsAchievement = [
    {
      label: "Organization",
      type: "text",
      name: "organization",
      required: false,
      placeholder: "City tournament...",
    },
    {
      label: "Description",
      type: "text",
      name: "description",
      required: false,
      placeholder: "For Playing Cricket...",
    },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Work Experience */}
      <h4 className="text-light-black my-3">
        &larr; Work Experience Details &rarr;
      </h4>
      {workExperienceFields.map((field, index) => (
        <div key={field.id} className="row my-2">
          {formInputsWorkExperience.map((input) => (
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
                  placeholder={input.placeholder}
                  type={input.type}
                  {...register(`workExperience[${index}].${input.name}`)}
                  aria-invalid={
                    errors?.workExperience?.[index]?.[
                      input.name.split(".").pop()
                    ]
                      ? "true"
                      : "false"
                  }
                />
                {errors?.workExperience?.[index]?.[input.name.split(".").pop()]
                  ?.type === "required" && (
                  <p className="text-danger">{`${input.label} is required`}</p>
                )}
              </div>
            </div>
          ))}
          <div className="col-md-3 d-flex align-items-center">
            <button
              type="button"
              className="btn btn-danger btn-sm"
              onClick={() => removeWorkExperience(index)}
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
          appendWorkExperience({
            company: "",
            designation: "",
            from: "",
            to: "",
          })
        }
      >
        Add Work Experience
      </button>

      {/* Hobbies */}
      <h4 className="text-light-black my-3">
        &larr; Hobbies & Achievement Details &rarr;
      </h4>
      {hobbiesFields.map((field, index) => (
        <div key={field.id} className="row my-2">
          {formInputsHobbiesAwardsAchievement.map((input) => (
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
                  placeholder={input.placeholder}
                  type={input.type}
                  {...register(
                    `hobbiesAwardsAchievements[${index}].${input.name}`
                  )}
                  aria-invalid={
                    errors?.hobbiesAwardsAchievements?.[index]?.[
                      input.name.split(".").pop()
                    ]
                      ? "true"
                      : "false"
                  }
                />
                {errors?.hobbiesAwardsAchievements?.[index]?.[
                  input.name.split(".").pop()
                ]?.type === "required" && (
                  <p className="text-danger">{`${input.label} is required`}</p>
                )}
              </div>
            </div>
          ))}
          <div className="col-md-3 d-flex align-items-center">
            <button
              type="button"
              className="btn btn-danger btn-sm"
              onClick={() => removeHobbies(index)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
      <button
        type="button"
        className="btn btn-secondary btn-sm mb-3"
        onClick={() => appendHobbies({ organization: "", description: "" })}
      >
        Add Hobby
      </button>

      {/* Navigation Buttons */}
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

export default Step3;
