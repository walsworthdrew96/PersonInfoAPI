import React from "react";
import { NavLink as RouterNavLink } from "react-router-dom";
import { Container, Nav, Navbar, NavItem } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./login-button";
import LogoutButton from "./logout-button";

const MainNav = () => (
  <Nav className="mr-auto">
    <Nav.Link
      as={RouterNavLink}
      to="/"
      exact
      activeClassName="router-link-exact-active"
    >
      Home
    </Nav.Link>
    <Nav.Link
      as={RouterNavLink}
      to="/profile"
      exact
      activeClassName="router-link-exact-active"
    >
      Profile
    </Nav.Link>
    <Nav.Link
      as={RouterNavLink}
      to="/person-api"
      exact
      activeClassName="router-link-exact-active"
    >
      Person API
    </Nav.Link>
    <NavItem>
      <a
        className="text-dark nav-link"
        href="https://github.com/walsworthdrew96"
        rel="noopener noreferrer"
        target="_blank"
      >
        My GitHub
      </a>
    </NavItem>
    <NavItem>
      <a
        className="text-dark nav-link"
        href="https://www.linkedin.com/in/drew-walsworth-423873183/"
        rel="noopener noreferrer"
        target="_blank"
      >
        My LinkedIn
      </a>
    </NavItem>
    <NavItem>
      <a
        className="text-dark nav-link"
        href="https://github.com/walsworthdrew96"
        rel="noopener noreferrer"
        target="_blank"
      >
        Project Repo
      </a>
    </NavItem>
    {/* <NavItem>
      <a
        className="text-dark nav-link"
        href="https://www.linkedin.com/in/drew-walsworth-423873183/"
        rel="noopener noreferrer"
        target="_blank"
      >
        About
      </a>
    </NavItem> */}
  </Nav>
);

const AuthNav = () => {
  const { isAuthenticated } = useAuth0();

  return <Nav>{isAuthenticated ? <LogoutButton /> : <LoginButton />}</Nav>;
};

const NavBar = () => {
  return (
    <Navbar bg="light" expand="md">
      <Container>
        <Navbar.Brand as={RouterNavLink} className="logo" to="/" />
        <MainNav />
        <AuthNav />
      </Container>
    </Navbar>
  );
};

export default NavBar;
