import React from "react";
import logo from "assets/images/logo.svg";
// import "assets/sass/main.scss";
function Header(props) {
  return (
    <>
      <header className="header">
        <div className="header-flex">
          <div className="header-cols head-col-left">
            <span className="logo-wrapper">
              <a href="https://www.mathfactlab.com/">
                <img src={logo} alt="MathFactLab" className="login-logo" />
              </a>
            </span>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
