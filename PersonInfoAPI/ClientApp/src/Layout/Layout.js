import React from "react";
import { Container } from "reactstrap";
import { NavMenu } from "../NavMenu/NavMenu";

const Layout = ({ children }) => {
  return (
    <div>
      <NavMenu />
      <Container>{children}</Container>
    </div>
  );
};

export default Layout;
