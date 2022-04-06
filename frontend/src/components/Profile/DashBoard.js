import React, { useEffect } from "react";
import CustomizedTables from "./CustomizedTables";
import Navbar from "../Extras/Header/navBar";
import Demo from "./Demo";
import Footer from "../Extras/Footer/Footer";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
function DashBoard() {
  const user = useSelector((state) => state.Login.items);
  const history = useHistory();
  useEffect(() => {
    if (user.length === 0 && !localStorage.getItem("user")) {
      history.push("/Login");
    }
  }, [user]); 

  return (
    <>
      <Navbar />
      <br />
      <br />
      <Demo />
      <br />
      <br />
      <CustomizedTables />
      <br />
      <Footer />
    </>
  );
}

export default DashBoard;
