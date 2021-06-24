import React from "react";
import { Grid } from "@material-ui/core";
import Welcome from "./Welcome";
import Second from "./Second";
import Third from "./Third";

const Home = () => {
  return (
    <>
      <Grid container className="mt-5">
        <Welcome />
      </Grid>
      <Grid container style={{ backgroundColor: "black" }}>
        <Second />
      </Grid>
      <Grid>
        <Third />
      </Grid>
    </>
  );
};

export default Home;
