import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import getGoogleOAuthUrl from "../services/googleService";
import "./CSS/LoginSignup.css";
import { useRef } from "react";
import { creatUser } from "../reducers/userReducer";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const password = useRef({});
  password.current = watch("password", "");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    try {
      dispatch(
        creatUser({
          email: data.email,
          name: data.name,
          password: data.password,
        })
      );
      reset();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleGoogleButtonClick = () => {
    const googleOAuthUrl = getGoogleOAuthUrl();

    // Redirect to the Google OAuth URL
    window.location.href = googleOAuthUrl;
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="loginsignup-fields">
            <input
              type="email"
              placeholder="Email address"
              {...register("email", { required: true })}
            />
            {errors.email && <span>Email is required</span>}
            <input
              type="name"
              placeholder="Name"
              {...register("name", { required: true })}
            />
            {errors.name && <span>name is required</span>}
            <input
              type="password"
              placeholder="Password"
              {...register("password", { required: true })}
            />
            {errors.password && <span>Password is required</span>}

            <input
              type="password"
              placeholder="Confirm Password"
              {...register("confirmPassword", {
                required: true,
                validate: (value) =>
                  value === password.current || "The passwords do not match",
              })}
            />
            {errors.confirmPassword && (
              <span>{errors.confirmPassword.message}</span>
            )}
          </div>
          <button type="submit" className="btn">
            Continue
          </button>
        </form>

        <button className="google-api" onClick={handleGoogleButtonClick}>
          Google
        </button>
        <p className="loginsignup-login">
          Already have an account? <Link to="/login">Login here</Link>
        </p>

        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p>By continuing,i agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  );
};
