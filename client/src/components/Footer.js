import React from "react";
// import { MDBContainer, MDBFooter } from "mdbreact";

const FooterPage = () => {
  return (
    <div className="footer">
      &copy; {new Date().getFullYear()} Copyright.{" "}
      <a href="https://github.com/DavidLuong98/VirtualChef"> VirtualChef </a>
    </div>
  );
};

export default FooterPage;