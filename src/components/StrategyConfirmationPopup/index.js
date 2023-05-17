import React from "react";
import { editUser } from "store/action";
import { useDispatch } from "react-redux";
import Button from "components/Button";

function StrategyConfirmationPopup(props) {
  const { user } = props;

  const dispatch = useDispatch();

  const handleClose = () => {
    props.close();
  };

  const handleChangeDisabledStrategy = () => {
    let updatedStrategyList = [];
    if (
      user.profile.disable_strategies_slug &&
      user.profile.disable_strategies_slug.includes("fingers-trick")
    ) {
      updatedStrategyList.push("dice-9=10-1");
    } else {
      updatedStrategyList.push("fingers-trick");
    }

    const body = {
      disable_strategies_slug: updatedStrategyList,
    };

    dispatch(editUser(user.id, body, handleClose));
  };

  return (
    <>
      <>
        {/* <!-- Add " open " className in backdrop and custom-popup while open  --> */}
        <div className="custom-popup open">
          <div className="popup">
            <div className="popup-header">
              <h3 className="popup-title">Strategy</h3>
              <span className="close" onClick={() => handleClose()}>
                <i className="icon-close" aria-hidden="true"></i>
              </span>
            </div>

            <div className="popup-content">
              <h4 style={{ marginLeft: "15px" }} className="popup-sub-title">
                Are you sure you want to change strategy visibility?
              </h4>
            </div>
            <div className="popup-footer">
              <div className="button-wrap">
                <div className="button-cols">
                  <Button
                    className="btn btn-gray"
                    name={"No, cancel"}
                    onClick={() => handleClose()}
                  ></Button>
                </div>
                <div className="button-cols">
                  <Button
                    className="btn btn-secondary"
                    name={" Yes, Change"}
                    onClick={() => handleChangeDisabledStrategy()}
                  ></Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="popup-backface open"></div>
      </>
    </>
  );
}

export default StrategyConfirmationPopup;
