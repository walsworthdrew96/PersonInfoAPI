import React, { Fragment } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <Fragment>
        <button
          className="btn btn-secondary align-middle"
          onClick={() => logout({ returnTo: window.location.origin })}
        >
          Log Out
        </button>
      </Fragment>
    )
  );
};

export default LogoutButton;
