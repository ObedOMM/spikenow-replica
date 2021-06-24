import React from "react";
import { Grid, Container, Typography } from "@material-ui/core";

const Placeholder = ({ theme, title }) => {
  let items = [];

  for (let index = 0; index < 13; index++) {
    items.push(
      <Grid
        item
        key={index}
        style={{
          height: "10px",
          backgroundColor: theme === "light" ? "lightgrey" : "white",
        }}
        className="my-3"
      ></Grid>
    );
  }

  return (
    <Container>
      {title ? (
        <Grid container style={{ marginTop: "100px" }}>
          <Typography variant="h1" className="text-center text-dark">
            {title}
          </Typography>
        </Grid>
      ) : (
        ""
      )}
      <Grid container className="my-5" spacing={5}>
        <Grid item lg={6}>
          <Grid container direction="column">
            <Grid
              item
              style={{
                height: "500px",
                backgroundColor: theme === "light" ? "lightgrey" : "white",
              }}
            ></Grid>
            <Grid
              item
              style={{
                height: "10px",
                backgroundColor: theme === "light" ? "lightgrey" : "white",
              }}
              className="my-4"
            ></Grid>
          </Grid>
        </Grid>
        <Grid item lg={6}>
          <Grid container direction="column">
            {items}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Placeholder;
