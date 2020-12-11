import React, { Fragment } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  return (
    !isAuthenticated && (
      <Fragment>
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => loginWithRedirect()}
        >
          Log In
        </button>
      </Fragment>
    )
  );
};

export default LoginButton;
