import React from "react";
import { Grid, Typography, Container } from "@material-ui/core";
import video1 from "../../assets/01_Hero_Convo_.webm";

import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  root: {
    color: "white",
  },
  title: {
    fontWeight: 700,
    lineHeight: 1,
    textAlign: "center",
    fontSize: "4.5rem",
  },
});

const Second = () => {
  const classes = useStyles();
  return (
    <Container className={`mt-5 ${classes.root}`}>
      <Grid container justify="center">
        <Grid item lg={10} className="py-5">
          <Typography className={classes.title}>
            Email that puts people first
          </Typography>
          <Typography variant="body1" className="mt-5 text-center">
            Conversational email removes stiff formalities, letting you
            communicate like a human again. No more confusing threads—just
            natural, flowing dialogue for an improved workflow. It's email, but
            as easy as chat.
          </Typography>
        </Grid>
      </Grid>
      <Grid container justify="center">
        <Grid item lg={10} className="py-5">
          <Grid container>
            <Grid item lg={6}>
              <video src={video1} playsInline loop></video>
            </Grid>
            <Grid item lg={6}>
              <Typography variant="h2">Talk to people. </Typography>
              <Typography variant="h2">Not threads. </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Second;
