import React from "react";
import banner from "../../assets/banner.png";
import companies from "../../assets/comps.png";
import { Typography, Grid, Link, Container } from "@material-ui/core";
import { PlayCircleFilled, Star } from "@material-ui/icons";
import Button from "../../components/Button";

import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  title: {
    fontWeight: 700,
    lineHeight: 1,
    fontSize: "3rem",
  },
  form: {
    display: "flex",
  },
  grayText: {
    color: "#7f7f7f",
  },
  textCenter: {
    textAlign: "center",
  },
});
const Welcome = () => {
  const classes = useStyles();
  const preventDefault = (event) => event.preventDefault();
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item lg={5} md={5}>
          <Typography variant="h2" className={`mt-5 mb-3 ${classes.title}`}>
            Welcome to the future of email
          </Typography>

          <Typography variant="body1">
            Spike turns your email into simple, chat conversations, so you can
            work and collaborate seamlessly with clients and team members - in a
            more natural way.
          </Typography>

          <Typography className="my-3">
            <Link href="#" onClick={preventDefault}>
              See how Spike Works <PlayCircleFilled />
            </Link>
          </Typography>

          <form className={classes.form}>
            <input
              type="text"
              className="form-control me-2"
              placeholder="Enter your email"
              style={{
                width: "auto",
                backgroundColor: "#f2f2f2",
                borderStyle: "none",
              }}
            />
            <Button text="Get Started" />
          </form>
        </Grid>
        <Grid item lg={7} md={5}>
          <img
            src={banner}
            alt=""
            className="mt-3"
            style={{ width: "100%", height: "auto" }}
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <Typography
            variant="h6"
            className={`${classes.grayText} ${classes.textCenter}`}
          >
            TRUSTED BY OVER 100,000 TEAMS WHO ALREADY TRANSFORMED THEIR WORKFLOW
          </Typography>
          <img src={companies} alt="" className="d-flex mx-auto" />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Welcome;
