import * as React from "react";
import HomeMain from "./HomeMain";
import BestSeller from "../../Components/Cards/BestSeller";
import Footer from "../../../Extras/Footer/Footer";
import ResponsiveAppBar from "../../../Extras/Header/navBar";

export default function Home() {
  return (
    <div>
      <ResponsiveAppBar />
      <HomeMain />
      <BestSeller />
      <Footer />
    </div>
  );
}
