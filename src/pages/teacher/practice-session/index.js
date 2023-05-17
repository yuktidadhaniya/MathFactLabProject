import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import ErrorBoundary from "components/ErrorBoundary";
import AuthHeader from "components/DashboardLayout/Header";
import PracticeSession from "./PracticeSession";
import {
  getPracticeTestQuestionList,
  addStudentOrderPracticeTestSubmission,
} from "store/action";
import { Prompt } from "react-router";

function TeacherPracticeSessionPage(props) {
  const dispatch = useDispatch();
  let location = useLocation();

  const query = new URLSearchParams(location.search);

  const learningMode = query.get("learning_mode");

  const levelIndex = query.get("level_index");

  const set_no = sessionStorage.getItem("question_set_no");

  const {
    // practiceTestQuestionList,
    fetchingPracticeTestQuestionListLoading,
  } = useSelector(({ strategy }) => strategy);

  const slug = encodeURI(query.get("strategy-type"));
  //Fetch Question list by strategy

  useEffect(() => {
    const orderType = sessionStorage.getItem("question_order");
    // Base on the level we need to fetch the questions if learning mode = 1 then level A to k - 10,  if learning mode = 2 then level A to k -13
    const levelByLearningMode = +learningMode === 1 ? 10 : 13;
    if (slug) {
      orderType !== "student"
        ? levelIndex <= levelByLearningMode
          ? dispatch(
              addStudentOrderPracticeTestSubmission(
                slug.replace("%20", "+"),
                learningMode,
                levelIndex,
                orderType,
              ),
            )
          : dispatch(
              getPracticeTestQuestionList(
                slug.replace("%20", "+"),
                learningMode,
                levelIndex,
                set_no,
                orderType,
              ),
            )
        : dispatch(
            getPracticeTestQuestionList(
              slug.replace("%20", "+"),
              learningMode,
              levelIndex,
              set_no,
              orderType,
            ),
          );
    }
  }, [slug]); // eslint-disable-line

  return (
    <>
      <Prompt
        message={(location, action) => {
          if (action === "POP") {
            return `Do you wish to return to the dashboard?`;
          }
        }}
      />

      {fetchingPracticeTestQuestionListLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100%",
          }}
        >
          <div className="lds-dual-ring"></div>

          {/* <Spinner color="primary" /> */}
        </div>
      ) : (
        <>
          <ErrorBoundary>
            <AuthHeader />
          </ErrorBoundary>
          <ErrorBoundary>
            <PracticeSession />
          </ErrorBoundary>
        </>
      )}
    </>
  );
}

export default TeacherPracticeSessionPage;
