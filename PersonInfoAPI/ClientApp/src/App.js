import React from "react";
import { Route, Switch } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

// Components
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Loading from "./components/Loading";
import PrivateRoute from "./components/PrivateRoute";

// Views
import Home from "./views/Home";
import Profile from "./views/Profile";
import PersonAPI from "./views/PersonAPI";

import "./App.css";

const App = () => {
  const { isLoading } = useAuth0();
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div id="app" className="d-flex flex-column h-100">
      <NavBar />
      <Switch>
        <Route path="/" exact component={Home} />
        <PrivateRoute path="/profile" component={Profile} />
        <PrivateRoute path="/person-api" exact component={PersonAPI} />
      </Switch>
      <Footer />
    </div>
  );
};

export default App;
