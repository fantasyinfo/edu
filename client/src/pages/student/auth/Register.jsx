import React from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { registerAPI } from "../../../utils/Api";
import { toast } from "react-toastify";
const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm();

  // onformsubmit
  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await registerAPI(data);
      toast.success(`${response.message}`);
      navigate("/");
    } catch (error) {
      toast.error(`Try Again, ${error?.response?.data?.error}`);
    }
  };

  const formInputs = [
    {
      label: "Name",
      type: "text",
      name: "name",
      required: true,
    },
    {
      label: "Gender",
      type: "select",
      name: "gender",
      required: true,
      isEmpty: true,
      emptyOption: "Please Select Gender",
      options: [
        {
          male: "Male",
        },
        {
          female: "Female",
        },
        {
          others: "Others",
        },
      ],
    },
    {
      label: "Email",
      type: "email",
      name: "email",
      required: true,
      pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      errorMessage: "Invalid email address",
    },
    {
      label: "Mobile",
      type: "text",
      name: "mobile",
      required: true,
      pattern: /^[0-9]{10}$/,
      errorMessage: "Invalid mobile number must be 10 digit.",
    },
  ];

  return (
    <>
      <div>
        <div className="container-scroller">
          <div className="container-fluid page-body-wrapper full-page-wrapper">
            <div className="row w-100 m-0">
              <div className="content-wrapper full-page-wrapper d-flex align-items-center auth login-bg">
                <div className="card col-lg-4 mx-auto">
                  <div className="card-body px-5 py-5">
                    <h3 className="card-title text-left mb-3">Register</h3>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      {formInputs.map((input, index) => (
                        <div className="form-group" key={index}>
                          <label>{input.label}</label>
                          {input.type === "text" && (
                            <input
                              className="form-control p_input"
                              type="text"
                              {...register(input.name, {
                                required: input.required,
                                pattern: {
                                  value: input?.pattern,
                                  message: input?.errorMessage,
                                },
                              })}
                              aria-invalid={
                                errors[input.name] ? "true" : "false"
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
                                errors[input.name] ? "true" : "false"
                              }
                            >
                              {input?.isEmpty && (
                                <option>{input?.emptyOption}</option>
                              )}
                              {input.options.map((option, index) => {
                                const [key, value] = Object.entries(option)[0];
                                return (
                                  <option key={index} value={key}>
                                    {value}
                                  </option>
                                );
                              })}
                            </select>
                          )}
                          {input.type === "email" && (
                            <input
                              className="form-control p_input"
                              type="email"
                              {...register(input.name, {
                                required: input.required,
                                pattern: {
                                  value: input?.pattern,
                                  message: input?.errorMessage,
                                },
                              })}
                              aria-invalid={
                                errors[input.name] ? "true" : "false"
                              }
                            />
                          )}
                          {errors[input.name]?.type === "required" && (
                            <p className="text-danger">{`${input.label} is required`}</p>
                          )}
                          {errors[input.name]?.type === "pattern" && (
                            <p className="text-danger">
                              {errors[input.name].message}
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
                          {isSubmitting ? "Please wait..." : "Register"}
                        </button>
                      </div>
                      <p className="sign-up text-center">
                        Already have an Account?<NavLink to="/"> Login</NavLink>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
