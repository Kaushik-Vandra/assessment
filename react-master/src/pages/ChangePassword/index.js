import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../../Redux/AuthSlice";

const schema = yup
  .object({
    currentPassword: yup
      .string()
      .required("Required")
      .min(6, "Minimum 6 characters required"),
    newPassword: yup
      .string()
      .required("Required")
      .min(6, "Minimum 6 characters required"),
      // .password(),
      // .minUppercase(1, "password must contain at least 1 upper case letter")
      // .minNumbers(1, "password must contain at least 1 number")
      // .minSymbols(1, "password must contain at least 1 special character"),
    changepassword: yup
      .string()
      .oneOf([yup.ref("newPassword"), null], "Passwords don't match!")
      .required("Required")
      .min(6, "Minimum 6 characters required"),
  })
  .required();

const ChangePassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: "all", resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    console.log("data: ", data);

    dispatch(changePassword(data))
      .then((res) => navigate("/dashboard"))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="card w-50 m-auto my-5">
        <div className="card-header h5 text-white bg-primary text-center">
          {" "}
          change Password
        </div>
        <div className="card-body px-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              {/* <Input
                label="Old Password"
                name="currentPassword"
                register={register}
                type="password"
                errors={errors}
              /> */}
              <input
                type="password"
                {...register("currentPassword")}
                placeholder="Old Password"
                className="form-control"
              />
              {errors.currentPassword && (
                <p className="text-danger fw-light fst-italic">
                  {errors.currentPassword.message}
                </p>
              )}
            </div>{" "}
            <br />
            <div>
              {/* <Input
                label="New Password"
                name="newPassword"
                register={register}
                type="password"
                errors={errors}
              /> */}
              <input
                type="password"
                {...register("newPassword")}
                placeholder="New Password"
                className="form-control"
              />
              {errors.newPassword && (
                <p className="text-danger fw-light fst-italic">
                  {errors.newPassword.message}
                </p>
              )}
            </div>{" "}
            <br />
            <div>
              {/* <Input
                label="Repeat Password"
                name="changepassword"
                register={register}
                type="password"
                errors={errors}
              /> */}
              <input
                type="password"
                {...register("changepassword")}
                placeholder="Repeat Password"
                className="form-control"
              />
              {errors.changepassword && (
                <p className="text-danger fw-light fst-italic">
                  {errors.changepassword.message}
                </p>
              )}
            </div>{" "}
            <br />
            <button type="submit" className="btn btn-primary w-100 my-3">
              change password
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
