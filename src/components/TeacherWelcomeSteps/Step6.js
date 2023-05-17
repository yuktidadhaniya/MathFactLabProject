import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "components/Loader";
import { ArrowRightOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { updateTeacher } from "store/action";
const Step6 = props => {
  const dispatch = useDispatch();
  const { handleNextNewUser, handleBackNewUser } = props;

  const { userDetails } = useSelector(({ auth }) => auth);
  const [isShowIframeLoading, setIsShowIframeLoading] = useState(true);

  const handleFirstNext = () => {
    handleNextNewUser();
    <script>
      {
        (window.usetifulTags = {
          isShowCheckList: "ON",
        })
      }
    </script>;
    const body = {
      profile: {
        is_welcome_close: 1,
      },
    };
    dispatch(updateTeacher(body));
    // window.USETIFUL.reinitialize();
  };

  const handleNext = () => {
    handleNextNewUser();
  };
  const handleBack = () => {
    handleBackNewUser();
  };
  const handleHideLoading = () => {
    setIsShowIframeLoading(false);
  };
  return (
    <>
      <div className="step-6">
        <div className="step-6-header-text">You're almost there!</div>
        <div className="step-6-sub-title-text">
          Watching this brief video will really help you to get the most out of
          MathFactLab.
        </div>
        <div className="step-6-iframe-wrapper">
          {isShowIframeLoading ? (
            <div className="iframe-loader-wrapper">
              <Loader />
            </div>
          ) : (
            " "
          )}
          <iframe
            className="welcome-popup-iframe"
            title="welcome_popup"
            src="https://player.vimeo.com/video/793753544?h=69ed5603ed"
            // width="640"
            // height="60%"
            onLoad={() => handleHideLoading()}
            frameBorder="0"
            allow="autoplay; fullscreen"
            allowfullscreen
          ></iframe>
        </div>
      </div>
      <div className="welcome-step-popup-footer">
        <div className="back-nav-btn" onClick={handleBack}>
          <ArrowLeftOutlined /> Back
        </div>

        {userDetails.login_count <= 1 &&
        localStorage.getItem("is_show_student_step_popup") !== "true" ? (
          <div
            className="next-nav-btn"
            id="welcomePopupExitBtn"
            // eslint-disable-next-line react/no-unknown-property
            useful="welcomePopupExitBtn"
            onClick={handleFirstNext}
          >
            Exit <ArrowRightOutlined />
          </div>
        ) : (
          <div className="next-nav-btn" onClick={handleNext}>
            Exit <ArrowRightOutlined />
          </div>
        )}
      </div>
    </>
  );
};

export default Step6;
