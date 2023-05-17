import React, { useState } from "react";
import ReactGA from "react-ga";
import Timer from "components/Timer";
import Button from "components/Button";
import warmUp38Img from "assets/images/warmup-38.svg";
import calcAdditionImg from "assets/images/other/calc-addition.svg";
import calcDivisionImg from "assets/images/other/calc-division.svg";
import calcMultiplicationImg from "assets/images/other/calc-multiplication.svg";
import calcSubtractionImg from "assets/images/other/calc-subtraction.svg";
// import KeyPressHook from "./KeyPressHook";
const LevelDirections = props => {
  const {
    upcomingLevelIndex,
    activeMathOperation,
    activeMathOperationIndex,
  } = props;

  const [isShowTimer, setIsShowTimer] = useState(false);
  // const [isKeyPressEnable, setIsKeyPressEnable] = useState(true);
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     console.log("seconds", seconds);
  //     if (seconds > 0) {
  //       setSeconds(seconds => seconds - 1);
  //     }
  //     if (seconds === 1) {
  //       props.closeLevelUpDirections();
  //       clearInterval(interval);
  //     }
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, [seconds, props]);
  // const handleCloseLevelupTimer = () => {
  //   props.closeLevelUpDirections()
  // }
  const images = {
    addition: calcAdditionImg,
    subtraction: calcSubtractionImg,
    multiplication: calcMultiplicationImg,
    division: calcDivisionImg,
  };

  // // Key press Event
  // useKeypress("Enter", () => {
  //   // Do something when the user has pressed the Space and Enter key
  //   handleStartTimer();
  // });

  const handleStartTimer = () => {
    setIsShowTimer(true);
    if (
      process.env.REACT_APP_ENV !== "development" ||
      process.env.REACT_APP_ENV !== "staging"
    ) {
      // GA EVENT
      ReactGA.event({
        category: `${process.env.REACT_APP_ENV}: Placement test`,
        action: `Student clicked Begin ${activeMathOperation} Placement test`,
        label: "Student page",
      });
    }
  };
  const handleCloseTimer = () => {
    setIsShowTimer(false);
    props.closeLevelUpDirections();
  };

  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsKeyPressEnable(true);
  //   }, 2000);
  //   return () => clearTimeout();
  // }, []);

  return (
    <>
      {/* {isKeyPressEnable && <KeyPressHook startTimer={handleStartTimer} />} */}
      <section className="main-test-screen">
        <div className="col-xs-12">
          <div className="row">
            <div className="container">
              <div className="main-test-wrap">
                <div className="main-test-left main-test-cols">
                  <div className="centered-wrap wrap position-relative">
                    {upcomingLevelIndex === 0 ? (
                      <>
                        <span className="watermark-text op-8">Warm Up</span>
                        <div className="assessment-content">
                          <p>Let’s start by warming up our fingers.</p>
                          <p>
                            <span> Type each number you see. </span>
                          </p>
                          <p>
                            Hit <b>‘enter’</b> or the <b>‘space bar’</b> after
                            each entry.
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <span className="watermark-text op-8">
                          {activeMathOperation.toLowerCase()}
                        </span>
                        <div className="assessment-content">
                          <p>
                            {activeMathOperationIndex !== 0
                              ? "Good work. "
                              : ""}{" "}
                            Now get ready for some{" "}
                            <span>{activeMathOperation.toLowerCase()}</span>{" "}
                            problems.
                          </p>
                          <p>
                            Press <b>‘Begin’</b> when you are ready.
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                  <div style={{ height: "80px", width: "100%" }}>
                    {isShowTimer ? (
                      <>
                        <Timer closeTimer={handleCloseTimer} />
                      </>
                    ) : (
                      <div className="test-button-wrap">
                        <Button
                          className="btn btn-test"
                          name={
                            upcomingLevelIndex === 0
                              ? "Let’s Get Started"
                              : "Begin"
                          }
                          onClick={() => handleStartTimer()}
                        />
                      </div>
                    )}{" "}
                  </div>
                </div>
                <div className="main-test-right main-test-cols">
                  <div className="test-vector">
                    {upcomingLevelIndex === 0 ? (
                      <img
                        src={warmUp38Img}
                        className="vec-img"
                        alt="vec-img"
                      />
                    ) : (
                      <img
                        src={images[activeMathOperation.toLowerCase()]}
                        className="vec-img"
                        alt="vec-img"
                      />
                    )}
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

export default LevelDirections;
