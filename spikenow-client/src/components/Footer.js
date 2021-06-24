import React from "react";
import { Container, Grid, Typography } from "@material-ui/core";
import Placeholder from "./Placeholder";

const Footer = () => {
  return (
    <footer>
      <Container>
        <Grid container>
          <Typography variant="h1" className="text-center">
            Footer
          </Typography>
        </Grid>
        <Placeholder theme="light" />
      </Container>
    </footer>
  );
};

export default Footer;
