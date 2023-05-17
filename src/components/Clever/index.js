import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Loader from "components/Loader";
import { useLocation, useHistory } from "react-router-dom";

import { teacherLoginClever } from "store/action";

const Clever = props => {
  let location = useLocation();
  let history = useHistory();
  const dispatch = useDispatch();

  const query = new URLSearchParams(location.search);

  const code = query.get("code");

  const handleSuccess = () => {
    history.push("/teacher/student");
  };
  const handleFailed = () => {
    history.push("/teacher/login");
  };
  useEffect(() => {
    if (code) {
      const body = { code: code };
      dispatch(teacherLoginClever(body, handleSuccess, handleFailed));
    }
  }, [code]); // eslint-disable-line

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "calc(100vh - 244px)",
          width: "100%",
        }}
      >
        <Loader />
      </div>
    </>
  );
};

export default Clever;
