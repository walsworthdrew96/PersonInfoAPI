import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import axios from "axios";
import { Auth0Provider } from "@auth0/auth0-react";
// import { Auth0Client } from "@auth0/auth0-spa-js";

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

// get the base url from the <base> element
// const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const baseUrl = "/";

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

const rootElement = document.getElementById("root");

ReactDOM.render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    redirectUri={window.location.origin}
  >
    <BrowserRouter basename={baseUrl}>
      <App />
    </BrowserRouter>
  </Auth0Provider>,
  rootElement
);

registerServiceWorker();
