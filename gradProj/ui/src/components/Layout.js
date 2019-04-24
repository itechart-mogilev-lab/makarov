import React from "react";
import "../App";
import DrawerContainer from "../containers/DrawerContainer";

const Layout = Component => props => {
  return (
    <>
      <DrawerContainer />
      <main className="main">
        <Component {...props} />
      </main>
    </>
  );
};

export default Layout;
