import React, { useState, useEffect } from "react";
import CookieConsent from "react-cookie-consent";

const CookieBanner = () => {
  const [isShowCookiesConsent, setIsShowCookiesConsent] = useState(false);

  //show cookies consent after time interval
  useEffect(() => {
    setTimeout(() => {
      setIsShowCookiesConsent(true);
    }, 2000);
  }, []);

  const handleDeclineCookiesPermission = () => {
    setIsShowCookiesConsent(false);
  };
  return (
    <CookieConsent
      visible={isShowCookiesConsent ? "byCookieValue" : "hidden"}
      location="bottom"
      buttonText="Continue"
      cookieName="myAwesomeCookieName2"
      buttonClasses="btn btn-secondary"
      declineButtonClasses="btn btn-secondary"
      style={{ background: "#273d58" }}
      buttonStyle={{
        background: "#78c043",
        color: "#FFFFFF",
        fontSize: "13px",
        borderRadius: "4px",
        minHeight: "36px",
      }}
      declineButtonStyle={{
        fontSize: "13px",
        minWidth: "40px",
        borderRadius: "4px",
        minHeight: "32px",
        background: "#2b95f9",
      }}
      onDecline={() => handleDeclineCookiesPermission()}
      expires={365}
      setDeclineCookie={false}
    >
      We use cookies on this website to improve performance, enhance
      functionality, and analyze traffic to the website. <br />
      By continuing to use this website, you agree to the use of cookies. To
      learn more, please see our Cookies Policy.
    </CookieConsent>
  );
};

export default CookieBanner;
