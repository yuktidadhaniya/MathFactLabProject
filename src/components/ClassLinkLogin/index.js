import React from "react";

export default function ClassLinkLogin() {
  return (
    <>
      <ul className="social-login-buttons flex">
        <li className="social-lb-item flex-grow-1">
          <a
            className="btn-icon btn-class-link with-text"
            href={`https://launchpad.classlink.com/cltest`}
            rel="noreferrer"
          >
            <i className="icon-color-class-link" aria-hidden="true"></i>
            Sign in with Class link
          </a>
        </li>
      </ul>
    </>
  );
}
