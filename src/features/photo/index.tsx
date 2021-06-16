import React from "react";
import { Switch, useRouteMatch } from "react-router";
import { Route } from "react-router-dom";
import TakePicture from "./pages/takepicture";

const PhotoPage = () => {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route path={`${match.url}/takepicture/:practice`} component={TakePicture} />
    </Switch>
  );
};

export default PhotoPage;
