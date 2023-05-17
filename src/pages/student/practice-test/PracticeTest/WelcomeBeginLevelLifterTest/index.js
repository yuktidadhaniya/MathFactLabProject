import React, { useState } from "react";
import calcAdditionImg from "assets/images/other/calc-addition.svg";
import calcDivisionImg from "assets/images/other/calc-division.svg";
import calcMultiplicationImg from "assets/images/other/calc-multiplication.svg";
import calcSubtractionImg from "assets/images/other/calc-subtraction.svg";
import { useDispatch, useSelector } from "react-redux";
import Timer from "components/Timer";
import Button from "components/Button";
import {
  getLevelLifterQuestionList,
  createNewLevelLifterSubmission,
} from "store/action";
import ReactGA from "react-ga";
const BeginTest = props => {
  const { handleShowQuestion } = props;
  const dispatch = useDispatch();
  const [isShowTimer, setIsShowTimer] = useState(false);

  const { userDetails } = useSelector(({ auth }) => auth);
  let activeMathOperation =
    userDetails.profile.student_learning_mode_id === 1
      ? "Addition"
      : "Multiplication";

  const handleFetchLevelLifterSubmissionDetails = () => {
    dispatch(getLevelLifterQuestionList());
    props.isShowTest();
  };

  // Key press Event
  // useKeypress("Enter", () => {
  //   // Do something when the user has pressed the Space and Enter key
  //   handleClickBeginTest();
  // });

  //please change second timer as per timer component timers countdonw* 5 -500 , ex. 1000 * 5 -500 = 4500
  const handleClickBeginTest = () => {
    setIsShowTimer(true);
    // history
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = function() {
      window.history.pushState(null, "", window.location.href);
    };
    setTimeout(() => {
      handleFetchData();
    }, 4000);
    if (
      process.env.REACT_APP_ENV !== "development" ||
      process.env.REACT_APP_ENV !== "staging"
    ) {
      ReactGA.event({
        category: `${process.env.REACT_APP_ENV}: Level Lifter  test `,
        action: `Student clicked Begin  ${activeMathOperation} Test`,
        label: "Student page",
      });
    }
  };
  const mathOprationList = {
    Addition: {
      title: "addition",
      img: calcAdditionImg,
    },

    Subtracton: {
      title: "subtracton",
      img: calcSubtractionImg,
    },
    Multiplication: {
      title: "multiplication",
      img: calcMultiplicationImg,
    },
    Division: {
      title: "division",
      img: calcDivisionImg,
    },
  };
  const handleShowQuestionDeck = () => {
    dispatch(getLevelLifterQuestionList());
    handleShowQuestion();
  };
  // const handleStartTimer = () => {
  //   setIsShowTimer(true);
  // };

  const handleFetchData = () => {
    const body = {
      status_id: "lss_20c437727b4f974676da2386",
      title: "dummy1",
      session_id: sessionStorage.getItem("session_id"),
    };
    async function fetchData() {
      // You can await here
      await dispatch(
        createNewLevelLifterSubmission(
          body,
          handleFetchLevelLifterSubmissionDetails,
        ),
      );
      // ...
    }
    fetchData();
  };

  const handleCloseTimer = () => {
    setIsShowTimer(false);
  };

  return (
    <>
      <section className="main-test-screen">
        <div className="col-xs-12">
          <div className="row">
            <div className="container">
              <div className="main-test-wrap">
                <div className="main-test-left main-test-cols">
                  <div className="centered-wrap wrap position-relative">
                    {/* <span className="watermark-text op-8">Try your best</span> */}
                    <span className="watermark-text op-8">Level Lifter</span>

                    <div className="assessment-content">
                      <div className="level-lifter-wrap">
                        <i className="icon-levellifter"></i>{" "}
                        <span className="btn-text">Level Lifter</span>
                      </div>

                      <p className="mt-5 mb-0">
                        {/* {activeMathOprationIndex !== 0 ? "Good work. " : ""}{" "} */}
                        Now get ready for some <br />
                        <span>
                          {Object.keys(userDetails).length &&
                            mathOprationList[activeMathOperation].title}
                        </span>{" "}
                        problems.
                        <br />
                        <p className="mt-5 mb-0 level-lifter-desc">
                          {" "}
                          Level Lifter questions do not have models or hints.
                        </p>
                      </p>

                      <p className="mb-0">
                        Press <b>‘Begin’</b> when you are ready.
                      </p>
                    </div>

                    <div
                      className="test-button-wrap"
                      style={{ height: "80px" }}
                    >
                      {isShowTimer ? (
                        <>
                          <Timer closeTimer={handleCloseTimer} />
                        </>
                      ) : (
                        <Button
                          className="btn btn-test"
                          name={"Begin"}
                          onClick={() => {
                            handleClickBeginTest();
                          }}
                        />
                      )}
                    </div>
                    {/* Only show question in development and staging */}
                    {(process.env.REACT_APP_ENV === "development" ||
                      process.env.REACT_APP_ENV === "staging") && (
                      <div
                        style={{
                          position: "absolute",
                          bottom: 0,
                          right: 0,
                        }}
                      >
                        <button
                          className="btn btn-test"
                          onClick={() => handleShowQuestionDeck()}
                        >
                          Show Qns
                        </button>
                      </div>
                    )}
                  </div>

                  {/* <p className="bottom-no-hint-text">
                    • Level Lifter questions do not have models or hints.
                  </p> */}
                </div>

                <div className="main-test-right main-test-cols">
                  <div className="test-vector">
                    <img
                      src={mathOprationList[activeMathOperation].img}
                      className="vec-img"
                      alt="vec-img"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BeginTest;
