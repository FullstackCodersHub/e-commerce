import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import getGoogleOAuthUrl from "../services/googleService";
import { useDispatch } from "react-redux";

import "./CSS/LoginSignup.css";
import { loginUser } from "../reducers/userReducer";

export const SignIn = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    try {
      dispatch(
        loginUser({
          email: data.email,
          password: data.password,
        })
      );

      reset();
      //dispatch(currentUser());
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
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="loginsignup-fields">
            <input
              type="email"
              placeholder="Email address"
              {...register("email", { required: true })}
            />
            {errors.email && <span>Email is required</span>}
            <input
              type="password"
              placeholder="password"
              {...register("password", { required: true })}
            />
            {errors.email && <span>Email is required</span>}
          </div>
          <button type="submit" className="btn">
            Login
          </button>
        </form>
        <button className="google-api" onClick={handleGoogleButtonClick}>
          Google
        </button>
        <p className="loginsignup-login">
          Not registered yet? <Link to="/register">Signup here</Link>
        </p>
        {/* <p>
          <a href={getGoogleOAuthUrl()}>login with google</a>
        </p> */}
        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p>By continuing,i agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  );
};
