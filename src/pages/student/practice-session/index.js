import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useBeforeunload } from "react-beforeunload";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import ErrorBoundary from "components/ErrorBoundary";
import AuthHeader from "components/student/StudentHeader";
import PracticeSession from "./PracticeSession";

import { getPracticeTestQuestionList } from "store/action";
import { Prompt } from "react-router";

function PracticeSessionPage(props) {
  const dispatch = useDispatch();
  let location = useLocation();
  const query = new URLSearchParams(location.search);
  const { userDetails } = useSelector(({ auth }) => auth);

  const { fetchingPracticeTestQuestionListLoading } = useSelector(
    ({ strategy }) => strategy,
  );

  //For Reset data on page reload or tab close
  useBeforeunload(() => "You'll lose your data!");

  const slug = encodeURI(query.get("strategy-type"));
  //Fetch Question list by strategy

  useEffect(() => {
    slug &&
      dispatch(
        getPracticeTestQuestionList(
          slug.replace("%20", "+"),
          userDetails.profile.student_learning_mode_id,
        ),
      );
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
        </div>
      ) : (
        <>
          <ErrorBoundary>
            <AuthHeader />
          </ErrorBoundary>

          <ErrorBoundary>
            <PracticeSession strategySlug={slug} />
          </ErrorBoundary>
        </>
      )}
    </>
  );
}

export default PracticeSessionPage;
