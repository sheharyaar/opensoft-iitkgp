import React, { useState } from "react";
import "./Form.css";
import validateL from "./validateLogin";
import useFormL from "./useFormL";
import signinimg from "../images/2.jpeg";
import { Button, Typography } from "@mui/material";
import CottageIcon from "@mui/icons-material/Cottage";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Login } from "../../state/action-creators";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const LoginForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.Login.items);
  const userError = useSelector((state)=>state.Login.error)
  useEffect(() => {
    if (user.length !== 0) {
      localStorage.setItem('user',true)
      history.push("/Dashboard");
    }
  }, [user]);   

  const { handleChange, handleSubmit, values, errors } = useFormL(
    submitForm,
    validateL
  );
  const [isSubmitted, setIsSubmitted] = useState(false); 
  function submitForm() {
    setIsSubmitted(true);
  }

  function login() {
    dispatch(Login(values.email, values.password));
  }
  return (
    <>
      <div className="form-container">
        <div className="form-content-left">
          <img className="form-img" src={signinimg} alt="spaceship" />
        </div>
        <div className="form-content-right">
          <div className="homenav">
            <a href="/Home">
              <Button
                sx={{
                  my: 1,
                  color: "white",
                  border: "0px solid black",
                  bgcolor: "#A0140A",
                }}
                variant="contained"
                className="home-btn"
              >
                <CottageIcon />
              </Button>
            </a>
          </div>
          <form onSubmit={handleSubmit} className="form" noValidate>
            <h1>Already Have an Account</h1>
            <div className="form-inputs">
              <label className="form-label"></label>
              <input
                className="form-input"
                type="email"
                name="email"
                placeholder="Email"
                value={values.email}
                onChange={handleChange}
              />
              {errors.email && <p>{errors.email}</p>}
            </div>
            <div className="form-inputs">
              <label className="form-label"></label>
              <input
                className="form-input"
                type="password"
                name="password"
                placeholder="Password"
                value={values.password}
                onChange={handleChange}
              />
              {errors.password && <p>{errors.password}</p>}
            </div>
            {userError !== null && (
              <Typography color="red" fontSize={'14px'}>Invalid Email or password</Typography>
            )}
            <button className="form-input-btn" type="submit" onClick={login}>
              Login
            </button>
            <span className="form-input-login">
              New User? Signup <a href="/Signup">here</a>
            </span>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
