import React from "react";
import { Container, Typography } from "@material-ui/core";
import Placeholder from "../../components/Placeholder";

const Third = () => {
  return (
    <>
      <Container className="my-5">
        <Typography variant="h1" style={{ textAlign: "center" }}>
          Third Container
        </Typography>
      </Container>
      <Placeholder theme="light" />
    </>
  );
};

export default Third;
