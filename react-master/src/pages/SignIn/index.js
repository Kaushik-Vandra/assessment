import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginAction } from "../../Redux/AuthSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./signin.scss";
import { Input } from "../../components/common/FormField";

const schema = yup
  .object({
    email: yup.string().email("Please enter valid email").required(),
    password: yup.string().required().min(6),
  })
  .required();

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: "all", resolver: yupResolver(schema) });

  const handleClick = (data) => {
    let requestPayload = {
      email: data.email,
      password: data.password,
    };

    // console.log('data: ', data);

    // let requestPayload = {
    //   email: 'admin@clefill.com',
    //   password: "123456",
    //   deviceId: '12',
    //   deviceType: "web",
    //   fcmToken: ''
    // }

    dispatch(loginAction(requestPayload))
      .then((res) => navigate("/dashboard"))
      .catch((err) => alert(err?.message || "Please try agian!"));
  };

  return (
    <>
      {/* <div>
        <h2 style={{ textAlign: "center" }}>In SignIn</h2>
      </div>
      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button type="button" onClick={handleClick}>
          Login Test
        </button>
      </div> */}

      <section className="text-center">
        <div
          className="p-5 bg-image"
          style={{
            backgroundImage:
              'url("https://mdbootstrap.com/img/new/textures/full/171.jpg")',
            height: "300px",
          }}
        ></div>

        <div
          className="card mx-5 mx-md-5 shadow-5-strong"
          style={{
            marginTop: "-100px",
            background: "hsla(0, 0%, 100%, 0.8)",
            backdropFilter: "blur(50px)",
          }}
        >
          <div className="card-body py-5 px-md-5">
            <div className="row d-flex justify-content-center">
              <div className="col-lg-8">
                <h2 className="fw-bold mb-5">Sign In</h2>
                <form onSubmit={handleSubmit(handleClick)}>
                  <div className="mb-4">
                    <Input
                      label="Email"
                      name="email"
                      register={register}
                      type="email"
                      errors={errors}
                    />
                  </div>

                  <div className="mb-4">
                    <Input
                      label="Password"
                      name="password"
                      register={register}
                      type="password"
                      errors={errors}
                    />
                  </div>

                  <div className="form-check d-flex justify-content-center mb-4">
                    <Link to="/forgotPassword">Forgot Password</Link>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-block mb-4"
                  >
                    Sign In
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignIn;
