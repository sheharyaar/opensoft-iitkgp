import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";

function Copyright(props) {
  return (
    <Typography variant="body2" color="white" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" href="#">
        Anytime Foods
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const footers = [
  {
    title: "Anytime Foods",
    description: [
      "ATF serves across 250 cities in India and have 7000+ restaurants.",
    ],
  },
  {
    title: "Contact Us",
    description: [
      "Anytime Foods",
      "anytimefoods@gmail.com",
      "India",
      "+91 12345 69870",
    ],
  },
  {
    title: "Social Media",
    description: ["Facebook", "Twitter", "Instagram"],
  },
];

function FooterBody() {
  return (
    <React.Fragment>
      <Container
        component="footer"
        sx={{
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          backgroundColor: "black",
          color: "white",
          mt: 8,
          py: [3, 6],
          marginLeft: "0px",
          maxHeight: { xs: 1000, md: 1000 },
          maxWidth: { xs: 5000, md: 2000 },
        }}
      >
        <Grid container spacing={4} justifyContent="space-evenly">
          {footers.map((footer) => (
            <Grid item xs={6} sm={3} key={footer.title}>
              <Typography variant="h6" color="white" gutterBottom>
                {footer.title}
              </Typography>
              <ul>
                {footer.description.map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      variant="subtitle1"
                      sx={{ color: "white", textDecoration: "none" }}
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </React.Fragment>
  );
}

export default function Footer() {
  return (
    <div className="Footer__main">
      <FooterBody />
    </div>
  );
}
