import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactGA from "react-ga";
// import useKeypress from "react-use-keypress";
import beakerImg from "assets/images/other/beaker.svg";
import studentWelcomeImgOne from "assets/images/student-welcome-1.svg";
import studentWelcomeImgTwo from "assets/images/student-welcome-2.svg";
import studentWelcomeImgThree from "assets/images/student-welcome-3.svg";
import studentWelcomeImgFour from "assets/images/student-welcome-4.svg";
import arrowBlueImg from "assets/images/other/arrow-blue.svg";
import { createNewSubmission, getSubmissionDetails } from "store/action";

const BeginTest = props => {
  const dispatch = useDispatch();
  const { userDetails } = useSelector(({ auth }) => auth);
  const handleFetchLastSubmissionDetails = () => {
    dispatch(getSubmissionDetails(userDetails));
    props.isShowTest();
  };

  // Key press Event
  // useKeypress("Enter", () => {
  //   // Do something when the user has pressed the Space and Enter key
  //   handleClickBeginTest();
  // });

  const handleClickBeginTest = () => {
    const body = {
      status_id: "pss_28a554bd3456204632dde438",
      assigned_level_id: "1",
      title: "dummxaaysas1",
    };
    async function fetchData() {
      // You can await here
      await dispatch(
        createNewSubmission(body, handleFetchLastSubmissionDetails),
      );
      // ...
    }
    fetchData();
    if (
      process.env.REACT_APP_ENV !== "development" ||
      process.env.REACT_APP_ENV !== "staging"
    ) {
      ReactGA.event({
        category: `${process.env.REACT_APP_ENV}: Placement test`,
        action: `Student clicked Begin  Placement test`,
        label: "Student page",
      });
    }
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = function() {
      window.history.pushState(null, "", window.location.href);
    };
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
                    <span className="watermark-text op-8">Welcome</span>
                    <p className="spotlight-text">
                      <span>Welcome to</span>
                    </p>
                    <h1 className="bigger-text">MathFactLab!</h1>
                    <div className="student-welcome-grid">
                      <div className="student-welcome-grid-cols">
                        <div className="student-welcome-grid-inner">
                          <div className="student-welcome-grid-image first">
                            <img
                              src={studentWelcomeImgOne}
                              alt="Student-1"
                              className="student-img"
                            />
                            <div className="animated-arrow">
                              <div className="borderAnim"></div>
                              <img
                                src={arrowBlueImg}
                                className="arrow-right first"
                                alt="Arrow"
                              />
                            </div>
                          </div>
                          <div className="student-welcome-grid-text first">
                            You’ll begin with a warm-up to help us find your
                            ‘just right’ level.
                          </div>
                        </div>
                      </div>

                      <div className="student-welcome-grid-cols">
                        <div className="student-welcome-grid-inner">
                          <div className="student-welcome-grid-image second">
                            <img
                              src={studentWelcomeImgTwo}
                              alt="Student-1"
                              className="student-img"
                            />
                            <div className="animated-arrow">
                              <div className="borderAnim"></div>
                              <img
                                src={arrowBlueImg}
                                className="arrow-right second"
                                alt="Arrow"
                              />
                            </div>
                          </div>
                          <div className="student-welcome-grid-text second">
                            At each level, you’ll practice using several
                            different strategies.
                          </div>
                        </div>
                      </div>

                      <div className="student-welcome-grid-cols">
                        <div className="student-welcome-grid-inner">
                          <div className="student-welcome-grid-image third">
                            <img
                              src={studentWelcomeImgThree}
                              alt="Student-1"
                              className="student-img"
                            />
                            <div className="animated-arrow">
                              <div className="borderAnim"></div>
                              <img
                                src={arrowBlueImg}
                                className="arrow-right third"
                                alt="Arrow"
                              />
                            </div>
                          </div>
                          <div className="student-welcome-grid-text third">
                            Complete each strategy at least once and you can
                            take the Level Lifter.
                          </div>
                        </div>
                      </div>

                      <div className="student-welcome-grid-cols">
                        <div className="student-welcome-grid-inner">
                          <div className="student-welcome-grid-image fourth">
                            <img
                              src={studentWelcomeImgFour}
                              alt="Student-1"
                              className="student-img "
                            />
                          </div>
                          <div className="student-welcome-grid-text fourth">
                            Score well on the Level Lifter, and you’ll level up!
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="test-button-wrap wrap mt-5 mb-0">
                      <button
                        className="btn btn-test start-button-fade-in"
                        onClick={() => handleClickBeginTest()}
                      >
                        Let’s get started!
                      </button>
                    </div>
                  </div>
                </div>
                <div className="main-test-right main-test-cols">
                  <div className="test-vector">
                    <img src={beakerImg} className="vec-img" alt="beakerImg" />
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

// import React from "react";
// import beakerImg from "assets/images/beaker.svg";
// import { createNewSubmission, getSubmissionDetails } from "store/action";
// import { useDispatch, useSelector } from "react-redux";
// const BeginTest = props => {
//   const dispatch = useDispatch();
//   const { userDetails } = useSelector(({ auth }) => auth);
//   const handleFetchLastSubmissionDetails = () => {
//     dispatch(getSubmissionDetails(userDetails));
//     props.isShowTest();
//   };
//   const handleClickBeginTest = () => {
//     const body = {
//       status_id: "pss_28a554bd3456204632dde438",
//       assigned_level_id: "1",
//       title: "dummxaaysas1",
//     };
//     async function fetchData() {
//       // You can await here
//       await dispatch(
//         createNewSubmission(body, handleFetchLastSubmissionDetails),
//       );
//       // ...
//     }
//     fetchData();
//   };

//   return (
//     <>
//       <section className="main-test-screen">
//         <div className="col-xs-12">
//           <div className="row">
//             <div className="container">
//               <div className="main-test-wrap">
//                 <div className="main-test-left main-test-cols">
//                   <div className="centered-wrap wrap position-relative">
//                     <span className="watermark-text op-8">Welcome</span>
//                     <p className="spotlight-text">
//                       <span>Welcome to</span>
//                     </p>
//                     <h1 className="bigger-text">MathFactLab!</h1>
//                     <div className="test-button-wrap">
//                       <button
//                         className="btn btn-test"
//                         onClick={() => handleClickBeginTest()}
//                       >
//                         Begin
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="main-test-right main-test-cols">
//                   <div className="test-vector">
//                     <img src={beakerImg} className="vec-img" alt="vec-img" />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//     </>
//   );
// };

// export default BeginTest;
