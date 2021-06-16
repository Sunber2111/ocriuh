import HomePage from "features/home";
import ModalContainer from "features/modal/ModalContainer";
import PhotoPage from "features/photo";
import Preview from "features/preview";
import ThanksPage from "features/thanks";
import React, { Fragment } from "react";
import { Switch, withRouter } from "react-router";
import { Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./styles.scss";

const App = () => {
  return (
    <Fragment>
      <div className="app">
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/photo" component={PhotoPage} />
          <Route path="/thanks" component={ThanksPage} exact />
          <Route path="/preview" component={Preview} />
        </Switch>
        <ModalContainer />
      </div>
      <ToastContainer />
    </Fragment>
  );
};

export default withRouter(App);
