import React, { useState, useEffect } from "react";
import validate from "./validateInfo";
import useForm from "./useForm";
import "./Form.css";
import signupimg from "../images/1.jpeg";
import { Button } from "@mui/material";
import CottageIcon from "@mui/icons-material/Cottage";
import { useDispatch, useSelector } from "react-redux";
import { Customers } from "../../state/action-creators";
import { useHistory } from "react-router-dom";

const Form = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const signUp = useSelector((state) => state.customer);
  useEffect(() => {
    if (signUp.items === "success") {
      history.push("/Login");
    }
  }, [signUp]);

  const { handleChange, handleSubmit, values, errors } = useForm(
    submitForm,
    validate
  );
  const [isSubmitted, setIsSubmitted] = useState(false);

  function submitForm() {
    setIsSubmitted(true);
    dispatch(
      Customers(
        values.username,
        values.number,
        values.email,
        values.password,
        values.address,
        values.city
      )
    );
  }
  return (
    <>
      <div className="form-container">
        <div className="form-content-left">
          <img className="form-img" src={signupimg} alt="spaceship" />
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
            <h1>Create your account</h1>
            <div className="form-inputs">
              <input
                className="form-input"
                type="text"
                name="username"
                placeholder="Username"
                value={values.username}
                onChange={handleChange}
              />
              {errors.username && <p>{errors.username}</p>}
            </div>
            <div className="form-inputs">
              <input
                className="form-input"
                type="number"
                name="number"
                placeholder="Phone Number"
                value={values.number}
                onChange={handleChange}
              />
              {errors.number && <p>{errors.number}</p>}
            </div>
            <div className="form-inputs">
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
              <input
                className="form-input"
                type="text"
                name="address"
                placeholder="Address"
                value={values.address}
                onChange={handleChange}
              />
              {errors.address && <p>{errors.address}</p>}
            </div>
            <div className="form-inputs">
              <input
                className="form-input"
                type="text"
                name="city"
                placeholder="City"
                value={values.city}
                onChange={handleChange}
              />
              {errors.city && <p>{errors.city}</p>}
            </div>
            <div className="form-inputs">
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
            <div className="form-inputs">
              <input
                className="form-input"
                type="password"
                name="password2"
                placeholder="Confirm Password"
                value={values.password2}
                onChange={handleChange}
              />
              {errors.password2 && <p>{errors.password2}</p>}
            </div>
            <button className="form-input-btn" type="submit">
              Sign up
            </button>
            <span className="form-input-login">
              Existing User? Login <a href="/Login">here</a>
            </span>
          </form>
        </div>
      </div>
    </>
  );
};

export default Form;
