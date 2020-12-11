import React, { Fragment } from "react";

import LoginButton from "./LoginButton/LoginButton";
import LogoutButton from "./LogoutButton/LogoutButton";
import Profile from "./Profile/Profile";

import { NavItem } from "reactstrap";

import { useAuth0 } from "@auth0/auth0-react";

function Login() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Fragment>
      <Profile />
      <NavItem className="text-dark nav-link align-self-center">
        <LoginButton />
        <LogoutButton />
      </NavItem>
    </Fragment>
  );
}

export default Login;
