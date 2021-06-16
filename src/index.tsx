import React from "react";
import ReactDOM from "react-dom";
import App from "./app/layout/App";
import { createBrowserHistory } from "history";
import { Router } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "semantic-ui-css/semantic.min.css";
import store from "app/store";
import { Provider } from "react-redux";
import ScrollToTop from "app/layout/ScrollToTop";

export const history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
    <Provider store={store}>
      <ScrollToTop>
        <App />
      </ScrollToTop>
    </Provider>
  </Router>,
  document.getElementById("root")
);
