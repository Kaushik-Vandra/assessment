import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "../../components/common/FormField";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../Redux/AuthSlice";
import { useDispatch } from "react-redux";

const schema = yup
  .object({
    email: yup.string().email("Please enter valid email").required(),
  })
  .required();

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: "all", resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    console.log("data: ", data);

    dispatch(forgotPassword(data))
      .then((res) => navigate("/signin"))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="card text-center w-50 m-auto my-5">
        <div className="card-header h5 text-white bg-primary">
          {" "}
          Forgot Password
        </div>
        <div className="card-body px-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Input
                label="Email"
                name="email"
                register={register}
                type="email"
                errors={errors}
              />
            </div>
            <button type="submit" className="btn btn-primary w-100 my-3">
              Forgot password
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
