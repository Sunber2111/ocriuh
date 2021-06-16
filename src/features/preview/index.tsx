import React from "react";
import { Container, Grid } from "semantic-ui-react";
import PreviewChecks from "./PreviewChecks";
import PreviewInfoCommon from "./PreviewInfoCommon";
import PreviewSendBar from "./PreviewSendBar";
import "./styles.scss";
import Header from "features/header";

const Preview = () => {
  return (
    <div>
      <Header/>
      <div className="preview-page">
        <Container fluid>
          <PreviewInfoCommon />
          <Grid>
            <PreviewChecks />
          </Grid>
        </Container>
        <PreviewSendBar />
      </div>
    </div>
  );
};

export default Preview;
