import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";

import Auth0ProviderWithHistory from "./Auth0ProviderWithHistory";
import "./index.css";

axios.defaults.baseURL = "https://drewapiwebapp.azurewebsites.net/";
axios.defaults.headers.post["Content-Type"] = "application/json";

axios.interceptors.request.use(
  (request) => {
    console.log(request);
    // Edit request config
    return request;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    console.log(response);
    // Edit request config
    return response;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

ReactDOM.render(
  <Router>
    <Auth0ProviderWithHistory>
      <App />
    </Auth0ProviderWithHistory>
  </Router>,
  document.getElementById("root")
);
