import React from "react";
import "./App.css";
import Form from "./components/Signup/Form";
import LoginForm from "./components/Login/LoginForm";
import vendorLoginForm from "./components/vendorLogin/LoginForm"
import Checkout from "./components/Checkout/Checkout";
import Home from "./components/Home/Pages/Home/Home";
import Dashboard from "./components/Profile/DashBoard";
import VendorDashboard from "./components/vendorDashboard/Dashboard";
import Cart from "./components/Cart/Cart";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/Signup" component={Form}></Route>
          <Route exact path="/Login" component={LoginForm}></Route>
          <Route exact path="/Checkout" component={Checkout}></Route>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/Home" component={Home}></Route>
          <Route exact path="/Menu" component={Cart}></Route>
          <Route exact path="/Dashboard" component={Dashboard}></Route>
          <Route exact path="/vendor/Login" component={vendorLoginForm}></Route>
          <Route
            exact
            path="/vendor/Dashboard"
            component={VendorDashboard}
          ></Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;