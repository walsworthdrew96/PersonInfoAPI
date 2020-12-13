import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import Auth0ProviderWithHistory from "./auth0-provider-with-history";
import axios from "axios";


import "./index.css";

// get the base url from the <base> element
// const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
// const baseUrl = "/";

// axios.defaults.baseURL = "https://localhost:5001";
// axios.defaults.baseURL = "https://personinfoappservice.azurewebsites.net/";
axios.defaults.baseURL = "https://drewapiwebapp.azurewebsites.net/";
// axios.defaults.headers.common["Authorization"] = "AUTH TOKEN";
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

// const rootElement = document.getElementById("root");


ReactDOM.render(
  <Router>
    <Auth0ProviderWithHistory>
      <App />
    </Auth0ProviderWithHistory>
  </Router>,
  document.getElementById("root")
);
