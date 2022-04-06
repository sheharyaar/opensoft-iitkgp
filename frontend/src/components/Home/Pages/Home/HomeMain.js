import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import GlobalStyles from "@mui/material/GlobalStyles";
import Container from "@mui/material/Container";
import SearchBar from "../../Components/Other/Search";
import "./HomeMain.css";

function HomeText() {
  return (
    <React.Fragment className="Home__text">
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <CssBaseline />
      <div className="Home__div">
        <Container
          disableGutters
          maxWidth="sm"
          component="main"
          sx={{ pt: 8, pb: 6 }}
          className="Home__textdiv"
        >
          <Typography
            className="text--left"
            component="h1"
            variant="h2"
            align="left"
            color="text.primary"
            gutterBottom
          >
            Our Food site makes it easy to find local food.
          </Typography>
          <Typography
            variant="h5"
            align="left"
            className="text--left"
            color="text.secondary"
            component="p"
          >
            Imagine you don't need a diet because we provide healthy and
            delicious today for you! We are providing the best food delivery
            services.
          </Typography>
          <SearchBar />
        </Container>
      </div>
    </React.Fragment>
  );
}

export default function HomeMain() {
  return (
    <div className="Home__grid">
      <HomeText />
      <img src={require("./India.png")} className="Home__img" alt="map" />
    </div>
  );
}
