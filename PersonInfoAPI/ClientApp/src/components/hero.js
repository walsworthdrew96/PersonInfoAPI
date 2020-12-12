import React from "react";
import logo from "../assets/logo.svg";

const Hero = () => (
  <div className="text-center hero my-5">
    <img className="mb-3 app-logo" src={logo} alt="React logo" width="120" />
    <h1 className="mb-4">Person Info API</h1>

    <p className="lead">
      This is a React.js application that demonstrates token-based access to a
      Web API which can Create, Read, Update, and Delete a Person.
    </p>
  </div>
);

export default Hero;
