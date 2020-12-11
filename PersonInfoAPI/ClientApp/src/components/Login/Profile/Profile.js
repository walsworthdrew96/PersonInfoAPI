import React, { Fragment } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
// import JSONPretty from "react-json-pretty";

import { NavItem } from "reactstrap";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <Fragment>
        <NavItem className="align-self-center">
          <img
            className="align-self-center"
            src={user.picture}
            alt={user.name}
            style={{ width: "32px", height: "32px", alignContent: "center" }}
          />
        </NavItem>
        <NavItem className="align-self-center">
          <a
            className="text-dark nav-link"
            style={{ marginRight: "10px" }}
            href={axios.defaults.baseURL}
            rel="noopener noreferrer"
          >
            {user.name.trim()}
          </a>
        </NavItem>
        {/* <p>{user.email}</p>
        <JSONPretty data={user} /> */}
      </Fragment>
    )
  );
};

export default Profile;
