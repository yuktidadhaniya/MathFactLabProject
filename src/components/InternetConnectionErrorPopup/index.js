import React from "react";
import { ExclamationCircleOutlined } from "@ant-design/icons";

// close session dialog
const InternetConnectionErrorPopup = props => {
  return (
    <>
      <>
        {/* <!-- Add " open " className in backdrop and custom-popup while open  --> */}
        <div className="custom-popup open " style={{ zIndex: "1555555" }}>
          <div
            className="popup"
            style={{ maxWidth: "500px", padding: "12PX", marginTop: "20px" }}
          >
            <div className="modal-content-text">
              {/* <img src={congratulationImg} alt="bubbles" /> */}
              <h3 className="" style={{ marginBottom: "40px" }}>
                <ExclamationCircleOutlined
                  style={{ color: "#c9302c", marginRight: "6px" }}
                />{" "}
                You are offline
              </h3>
              <h4 className="" style={{ marginBottom: "40px" }}>
                Please check your internet connection.
              </h4>
            </div>
          </div>
        </div>

        <div className="popup-backface open" style={{ zIndex: "999999" }}></div>
      </>
    </>
  );
};

export default InternetConnectionErrorPopup;
