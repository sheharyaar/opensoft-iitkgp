import React, { useState } from "react";
import "./Form.css";
import validateL from "./validateLogin";
import useFormL from "./useFormL";
import signinimg from "../images/2.jpeg";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Vendors } from "../../state/action-creators";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const LoginForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.vendor.items);
  useEffect(() => {
    if (user === "success") {
      history.push("/vendor/Dashboard");
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
    localStorage.setItem("vendor", values.number);
    dispatch(Vendors(parseInt(values.number), values.password));
  }

  return (
    <>
      <div className="form-container">
        <span className="close-btn">×</span>
        <div className="form-content-left">
          <img className="form-img" src={signinimg} alt="spaceship" />
        </div>
        <div className="form-content-right">
          <form onSubmit={handleSubmit} className="form" noValidate>
            <h1>Already a Vendor</h1>
            <div className="form-inputs">
              <label className="form-label"></label>
              <input
                className="form-input"
                type="number"
                name="number"
                placeholder="Store Id"
                value={values.number}
                onChange={handleChange}
              />
              {errors.number && <p>{errors.number}</p>}
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
            <button className="form-input-btn" type="submit" onClick={login}>
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
