import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { loginAPI } from "../../../utils/Api";
import { toast } from "react-toastify";
import { StudentContext } from "../StudentContext";
const Login = () => {
  const navigate = useNavigate();
  const { setStudent } = useContext(StudentContext);

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm();

  // onformsubmit
  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await loginAPI(data);

      if (response?.isAdmin) {
        localStorage.setItem("isAdmin", response?.isAdmin);
        localStorage.setItem("adminToken", response?.token);
      } else {
        localStorage.setItem("studentToken", response?.token);
      }

      if (response?.isAdmin) {
        navigate("/panel-admin/dashboard");
      } else {
        setStudent(response.data);
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error(`Try Again, ${error?.response?.data?.message}`);
    }
  };

  const formInputs = [
    {
      label: "Email",
      type: "email",
      name: "email",
      required: true,
      pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      errorMessage: "Invalid email address",
    },
    {
      label: "Password",
      type: "password",
      name: "password",
      required: true,
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
                    <h3 className="card-title text-left mb-3">Login</h3>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      {formInputs.map((input, index) => (
                        <div className="form-group" key={index}>
                          <label>{input.label}</label>
                          {input.type === "password" && (
                            <input
                              className="form-control p_input"
                              type="password"
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
                        </div>
                      ))}
                      <div className="form-group d-flex align-items-center justify-content-between">
                        <NavLink to="/forgot-pass" className="forgot-pass">
                          Forgot password
                        </NavLink>
                      </div>
                      <div className="text-center">
                        <button
                          type="submit"
                          className="btn btn-primary btn-block enter-btn"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Please wait..." : "Login"}
                        </button>
                      </div>
                      <p className="sign-up text-center">
                        Don't have an Account?
                        <NavLink to="/register"> Register</NavLink>
                      </p>
                      <p className="text-center">
                        Faculty Login-
                        <NavLink to="/faculty/login"> Login</NavLink>
                      </p>
                      <p className="text-center">
                        Student Login-
                        <NavLink to="/student/login"> Student Login</NavLink>
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

export default Login;
