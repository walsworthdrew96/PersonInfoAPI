import React from "react";
import { Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";

import { NavBar, Footer, Loading, PrivateRoute } from "./components";
import { Home, Profile, PersonAPI } from "./views";
import { useAuth0 } from "@auth0/auth0-react";

import "./app.css";

const App = () => {
  const { isLoading } = useAuth0();
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div id="app" className="d-flex flex-column h-100">
      <NavBar />
      <Container className="flex-grow-1 mt-5">
        <Switch>
          <Route path="/" exact component={Home} />
          <PrivateRoute path="/profile" component={Profile} />
          <Route path="/person-api" exact component={PersonAPI} />
        </Switch>
      </Container>
      <Footer />
    </div>
  );
};

export default App;
