import React from "react";
import { useSelector } from "react-redux";
import { mathOperationTitleList } from "config/const";

const UnlockLevelLifterRequirement = () => {
  const { strategyList, levelLifterSubmissionCount } = useSelector(
    ({ strategy }) => strategy,
  );
  const { userDetails } = useSelector(({ auth }) => auth);

  //For redirection if level is 12 (mastered) so  redirected to mastered page

  let firstMathOperation;
  let secondMathOperation;
  if (Object.keys(userDetails)) {
    if (userDetails.profile.student_learning_mode_id === 1) {
      firstMathOperation = 1;
      secondMathOperation = 2;
    } else {
      firstMathOperation = 3;
      secondMathOperation = 4;
    }
  }

  let userAssignedMulDivLevel;
  let userAssignedAddSubLevel;
  if (Object.keys(userDetails)) {
    if (userDetails.profile.student_learning_mode_id === 2) {
      userAssignedMulDivLevel = +userDetails.profile.mul_div_level_id;
    }
  }

  if (Object.keys(userDetails)) {
    if (userDetails.profile.student_learning_mode_id === 1) {
      userAssignedAddSubLevel = +userDetails.profile.add_sub_level_id;
    }
  }

  const visitedStrategyList = strategyList.length
    ? strategyList.filter(strategy => {
        return strategy.visited;
      })
    : [];

  const firstMathOperationVisitedStrategy = visitedStrategyList.length
    ? visitedStrategyList.filter(
        strategy =>
          strategy.score >= 900 &&
          +strategy.math_operation === firstMathOperation &&
          !(
            (
              strategy.slug.includes("nines-patterns-stage-1") ||
              strategy.slug.includes("nines-patterns-stage-2") ||
              strategy.slug.includes("nines-patterns-stage-3") ||
              strategy.slug.includes("eleven-patterns-stage-1")
            )
            // strategy.slug.includes("eleven-patterns-stage-2")
          ),
      )
    : [];

  const secondMathOperationVisitedStrategy = visitedStrategyList.length
    ? visitedStrategyList.filter(
        strategy =>
          strategy.score >= 900 &&
          +strategy.math_operation === secondMathOperation,
      )
    : [];

  const tenFramesSubtractionVisitedStrategy = visitedStrategyList.length
    ? visitedStrategyList.filter(
        strategy =>
          strategy.score >= 900 &&
          strategy.slug.includes("ten-frames-subtraction"),
      )
    : [];

  const findDifferenceVisitedStrategy = visitedStrategyList.length
    ? visitedStrategyList.filter(
        strategy =>
          strategy.score >= 900 && strategy.slug.includes("find-difference"),
      )
    : [];

  const ninePatternsStrategyList = strategyList.length
    ? strategyList.filter(strategy => {
        return strategy.slug.includes("nines-patterns");
      })
    : [];

  const ninePatternsStrategyVisited = strategyList.length
    ? strategyList.filter(strategy => {
        return strategy.visited && strategy.slug.includes("nines-patterns");
      })
    : [];

  const elevenPatternsStrategyList = strategyList.length
    ? strategyList.filter(strategy => {
        return strategy.slug.includes("eleven-patterns");
      })
    : [];

  const elevenPatternsStrategyVisited = strategyList.length
    ? strategyList.filter(strategy => {
        return strategy.visited && strategy.slug.includes("eleven-patterns");
      })
    : [];

  const trainerStrategyVisited = strategyList.length
    ? strategyList.filter(strategy => {
        return (
          strategy.visited &&
          strategy.flag &&
          strategy.flag.includes("trainer") &&
          strategy.score >= 950
        );
      })
    : [];

  const reviewStrategyVisited = strategyList.length
    ? strategyList.filter(strategy => {
        return (
          strategy.visited &&
          strategy.flag &&
          strategy.flag.includes("review") &&
          strategy.score >= 900
        );
      })
    : [];

  const renderInitialLevelLifterUnlockRequirements = level => {
    // if level lifter not taken yet else multiple times given level lifter
    if (levelLifterSubmissionCount === 0) {
      switch (true) {
        // Learning mode graduate level
        // case userAssignedAddSubLevel === 14:
        //   return (
        //     <div className="activity-checkgroup-wrapper">
        //       <div className="activity-checkgroup">
        //         <span className="activity-checkgroup-title">
        //           To unlock the Level Lifter again
        //         </span>
        //         <div className="flex justify-content-center">
        //           <div className="flex-column align-items-start">
        //             <div className="activity-checkbox">
        //               <input
        //                 className="mfl-input-checkbox"
        //                 type="checkbox"
        //                 id="checki-1"
        //                 disabled
        //                 checked={firstMathOperationVisitedStrategy.length}
        //               />
        //               <label
        //                 className="mfl-input-checkbox-label"
        //                 htmlFor="checki-1"
        //               >
        //                 Score <span className="font-bold">900 </span> or more
        //                 points on{" "}
        //                 {mathOperationTitleList[firstMathOperation] ===
        //                 "Addition"
        //                   ? "an"
        //                   : "a"}{" "}
        //                 <span
        //                   className="font-bold"
        //                   style={{
        //                     textTransform: "lowercase",
        //                   }}
        //                 >
        //                   {mathOperationTitleList[firstMathOperation]}{" "}
        //                 </span>{" "}
        //                 .
        //               </label>
        //             </div>
        //             <div className="activity-checkbox">
        //               <input
        //                 className="mfl-input-checkbox"
        //                 type="checkbox"
        //                 id="checki-2"
        //                 checked={secondMathOperationVisitedStrategy.length}
        //                 disabled
        //               />
        //               <label
        //                 className="mfl-input-checkbox-label"
        //                 htmlFor="checki-2"
        //               >
        //                 Score <span className="font-bold">900 </span> or more
        //                 points on a{" "}
        //                 <span
        //                   className="font-bold"
        //                   style={{
        //                     textTransform: "lowercase",
        //                   }}
        //                 >
        //                   {mathOperationTitleList[secondMathOperation]}{" "}
        //                 </span>{" "}
        //                 .
        //               </label>
        //             </div>
        //           </div>{" "}
        //         </div>
        //       </div>
        //     </div>
        //   );

        // case userAssignedAddSubLevel >= 13: {
        //   const visitedStrategyList = strategyList.filter(strategy => {
        //     return strategy.visited && strategy.score >= 900;
        //   });

        //   return (
        //     <>
        //       <div className="mfl-input-wrap">
        //         <input
        //           type="checkbox"
        //           id="chkbox-score-3"
        //           className="mfl-input-checkbox"
        //           name="mfl-input-checkbox-3"
        //           checked={visitedStrategyList.length === 3}
        //           disabled
        //         />
        //         <label
        //           className="mfl-input-checkbox-label"
        //           htmlFor="chkbox-score-3"
        //         >
        //           <span>
        //             Score <span className="font-bold">900</span> or more points
        //             on the all <span className="font-bold">3 activities</span>
        //           </span>
        //         </label>
        //       </div>
        //     </>
        //   );
        // }

        // Level J exception case
        case userAssignedMulDivLevel === 9:
          if (
            ninePatternsStrategyList.length ===
            ninePatternsStrategyVisited.length
          ) {
            return (
              <span className="initial-lifter-title">
                Complete each activity at least once to unlock the Level Lifter.
              </span>
            );
          } else {
            return (
              <span className="initial-lifter-title">
                Complete all four stages of Nines Patterns to unlock the other
                activities.
              </span>
            );
          }

        // Level M exception case
        case userAssignedMulDivLevel === 12:
          if (
            elevenPatternsStrategyList.length ===
            elevenPatternsStrategyVisited.length
          ) {
            return (
              <span className="initial-lifter-title">
                Complete each activity at least once to unlock the Level Lifter.
              </span>
            );
          } else {
            return (
              <span className="initial-lifter-title">
                Complete both stages of Elevens Patterns to unlock the other
                activities.
              </span>
            );
          }
        // Level O
        case userAssignedMulDivLevel === 14:
          if (trainerStrategyVisited.length) {
            const uniqueStrategyByLevel = strategyList.filter(strategy => {
              return (
                strategy.visited &&
                strategy.slug.includes("dice-11=10+1") &&
                strategy.score >= 900
              );
            });
            return (
              <>
                <div className="mfl-input-wrap">
                  <input
                    type="checkbox"
                    id="chkbox-score-3"
                    className="mfl-input-checkbox"
                    name="mfl-input-checkbox-3"
                    checked={uniqueStrategyByLevel.length}
                    disabled
                  />
                  <label
                    className="mfl-input-checkbox-label"
                    htmlFor="chkbox-score-3"
                  >
                    Score <span className="font-bold">900</span> or more points
                    on
                  </label>
                  <div className="frame-input-wrap">
                    <input
                      type="number"
                      value="11"
                      className="input-control sm"
                    />{" "}
                    =
                    <input
                      type="number"
                      value="10"
                      className="input-control sm"
                    />{" "}
                    +
                    <input
                      type="number"
                      value="1"
                      className="input-control sm"
                    />
                  </div>
                </div>
                <div className="mfl-input-wrap">
                  <input
                    type="checkbox"
                    id="chkbox-score-2"
                    className="mfl-input-checkbox"
                    name="mfl-input-checkbox-2"
                    checked={reviewStrategyVisited.length}
                    disabled
                  />
                  <label
                    className="mfl-input-checkbox-label"
                    htmlFor="chkbox-score-2"
                  >
                    <span>
                      Score <span className="font-bold">900</span> or more
                      points on the <span className="font-bold">review.</span>
                    </span>
                  </label>
                </div>
              </>
            );
          } else {
            return (
              <>
                Score 950 points on the <b>Trainer</b> to unlock the other
                strategies.
              </>
            );
          }
        // Level P
        case userAssignedMulDivLevel === 15:
          if (trainerStrategyVisited.length) {
            const uniqueStrategyByLevel = strategyList.filter(strategy => {
              return (
                strategy.visited &&
                strategy.slug.includes("dice-12=10+2") &&
                strategy.score >= 900
              );
            });

            return (
              <>
                <div className="mfl-input-wrap">
                  <input
                    type="checkbox"
                    id="chkbox-score-3"
                    className="mfl-input-checkbox"
                    name="mfl-input-checkbox-3"
                    checked={uniqueStrategyByLevel.length}
                    disabled
                  />
                  <label
                    className="mfl-input-checkbox-label"
                    htmlFor="chkbox-score-3"
                  >
                    Score <span className="font-bold">900</span> or more points
                    on
                  </label>
                  <div className="frame-input-wrap">
                    <input
                      type="number"
                      value="12"
                      className="input-control sm"
                    />{" "}
                    =
                    <input
                      type="number"
                      value="10"
                      className="input-control sm"
                    />{" "}
                    +
                    <input
                      type="number"
                      value="2"
                      className="input-control sm"
                    />
                  </div>
                </div>
                <div className="mfl-input-wrap">
                  <input
                    type="checkbox"
                    id="chkbox-score-2"
                    className="mfl-input-checkbox"
                    name="mfl-input-checkbox-2"
                    checked={reviewStrategyVisited.length}
                    disabled
                  />
                  <label
                    className="mfl-input-checkbox-label"
                    htmlFor="chkbox-score-2"
                  >
                    <span>
                      Score <span className="font-bold">900</span> or more
                      points on the <span className="font-bold">review.</span>
                    </span>
                  </label>
                </div>
              </>
            );
          } else {
            return (
              <>
                Score <b>950</b> points on the <b>Trainer</b> to unlock the
                other strategies
              </>
            );
          }
        // Level Q
        case userAssignedMulDivLevel === 16:
          if (trainerStrategyVisited.length) {
            const uniqueStrategyBasicGroupByLevel = strategyList.filter(
              strategy => {
                return (
                  strategy.visited &&
                  strategy.slug.includes("dice-50=5x10") &&
                  strategy.score >= 900
                );
              },
            );

            return (
              <>
                <div className="mfl-input-wrap">
                  <input
                    type="checkbox"
                    id="chkbox-score-3"
                    className="mfl-input-checkbox"
                    name="mfl-input-checkbox-3"
                    checked={uniqueStrategyBasicGroupByLevel.length === 3}
                    disabled
                  />
                  <label
                    className="mfl-input-checkbox-label"
                    htmlFor="chkbox-score-3"
                  >
                    <span>
                      Score <span className="font-bold">900</span> or more
                      points on all 3 stages of
                    </span>
                  </label>
                  <div className="frame-input-wrap">
                    <input
                      type="number"
                      value="50"
                      className="input-control sm"
                    />{" "}
                    =
                    <input
                      type="number"
                      value="5"
                      className="input-control sm"
                    />{" "}
                    x
                    <input
                      type="number"
                      value="10"
                      className="input-control sm"
                    />
                  </div>
                </div>
                <div className="mfl-input-wrap">
                  <input
                    type="checkbox"
                    id="chkbox-score-2"
                    className="mfl-input-checkbox"
                    name="mfl-input-checkbox-2"
                    checked={reviewStrategyVisited.length}
                    disabled
                  />
                  <label
                    className="mfl-input-checkbox-label"
                    htmlFor="chkbox-score-2"
                  >
                    <span>
                      Score <span className="font-bold">900</span> or more
                      points on the <span className="font-bold">review.</span>
                    </span>
                  </label>
                </div>
              </>
            );
          } else {
            return (
              <>
                Score 950 points on the <b>Trainer</b> to unlock the other
                strategies.
              </>
            );
          }
        // Level R
        case userAssignedMulDivLevel === 17:
          if (trainerStrategyVisited.length) {
            const uniqueStrategyBasicGroupByLevel = strategyList.filter(
              strategy => {
                return (
                  strategy.visited &&
                  strategy.slug.includes("dice-15=10+5") &&
                  strategy.score >= 900
                );
              },
            );

            return (
              <>
                <div className="mfl-input-wrap">
                  <input
                    type="checkbox"
                    id="chkbox-score-3"
                    className="mfl-input-checkbox"
                    name="mfl-input-checkbox-3"
                    checked={uniqueStrategyBasicGroupByLevel.length === 3}
                    disabled
                  />
                  <label
                    className="mfl-input-checkbox-label"
                    htmlFor="chkbox-score-3"
                  >
                    <span>
                      Score <span className="font-bold">900</span> or more
                      points on all 3 stages of
                    </span>
                  </label>
                  <div className="frame-input-wrap">
                    <input
                      type="number"
                      value="15"
                      className="input-control sm"
                    />{" "}
                    =
                    <input
                      type="number"
                      value="10"
                      className="input-control sm"
                    />{" "}
                    +
                    <input
                      type="number"
                      value="5"
                      className="input-control sm"
                    />
                  </div>
                </div>
                <div className="mfl-input-wrap">
                  <input
                    type="checkbox"
                    id="chkbox-score-2"
                    className="mfl-input-checkbox"
                    name="mfl-input-checkbox-2"
                    checked={reviewStrategyVisited.length}
                    disabled
                  />
                  <label
                    className="mfl-input-checkbox-label"
                    htmlFor="chkbox-score-2"
                  >
                    <span>
                      Score <span className="font-bold">900</span> or more
                      points on the <span className="font-bold">review.</span>
                    </span>
                  </label>
                </div>
              </>
            );
          } else {
            return (
              <>
                Score 950 points on the <b>Trainer</b> to unlock the other
                strategies.
              </>
            );
          }
        // Level S  // No Trainer
        case userAssignedMulDivLevel === 18:
          const uniqueStrategyBasicGroupByLevel = strategyList.filter(
            strategy => {
              return (
                strategy.visited &&
                strategy.slug.includes("quarters-4x25=100") &&
                strategy.score >= 900
              );
            },
          );

          return (
            <>
              <div className="mfl-input-wrap">
                <input
                  type="checkbox"
                  id="chkbox-score-3"
                  className="mfl-input-checkbox"
                  name="mfl-input-checkbox-3"
                  checked={uniqueStrategyBasicGroupByLevel.length === 3}
                  disabled
                />
                <label
                  className="mfl-input-checkbox-label"
                  htmlFor="chkbox-score-3"
                >
                  <span>
                    Score <span className="font-bold">900</span> or more points
                    on all 3 stages of
                  </span>
                </label>
                <div className="frame-input-wrap">
                  <input type="number" value="4" className="input-control sm" />{" "}
                  x{" "}
                  <input
                    type="number"
                    value="25"
                    className="input-control sm"
                  />{" "}
                  =
                  <input
                    type="number"
                    value="100"
                    className="input-control sm"
                  />
                </div>
              </div>
              <div className="mfl-input-wrap">
                <input
                  type="checkbox"
                  id="chkbox-score-2"
                  className="mfl-input-checkbox"
                  name="mfl-input-checkbox-2"
                  checked={reviewStrategyVisited.length}
                  disabled
                />
                <label
                  className="mfl-input-checkbox-label"
                  htmlFor="chkbox-score-2"
                >
                  <span>
                    Score <span className="font-bold">900</span> or more points
                    on the <span className="font-bold">review.</span>
                  </span>
                </label>
              </div>
            </>
          );
        // Level T
        case userAssignedMulDivLevel === 19:
          if (trainerStrategyVisited.length) {
            const uniqueStrategyBasicGroupByLevel = strategyList.filter(
              strategy => {
                return (
                  strategy.visited &&
                  strategy.slug.includes("dice-20=10+10") &&
                  strategy.score >= 900
                );
              },
            );

            return (
              <>
                <div className="mfl-input-wrap">
                  <input
                    type="checkbox"
                    id="chkbox-score-3"
                    className="mfl-input-checkbox"
                    name="mfl-input-checkbox-3"
                    checked={uniqueStrategyBasicGroupByLevel.length === 3}
                    disabled
                  />
                  <label
                    className="mfl-input-checkbox-label"
                    htmlFor="chkbox-score-3"
                  >
                    <span>
                      Score <span className="font-bold">900</span> or more
                      points on all 3 stages of
                    </span>
                  </label>
                  <div className="frame-input-wrap">
                    <input
                      type="number"
                      value="20"
                      className="input-control sm"
                    />
                    =
                    <input
                      type="number"
                      value="10"
                      className="input-control sm"
                    />{" "}
                    +
                    <input
                      type="number"
                      value="10"
                      className="input-control sm"
                    />
                  </div>
                </div>
                <div className="mfl-input-wrap">
                  <input
                    type="checkbox"
                    id="chkbox-score-2"
                    className="mfl-input-checkbox"
                    name="mfl-input-checkbox-2"
                    checked={reviewStrategyVisited.length}
                    disabled
                  />
                  <label
                    className="mfl-input-checkbox-label"
                    htmlFor="chkbox-score-2"
                  >
                    <span>
                      Score <span className="font-bold">900</span> or more
                      points on the <span className="font-bold">review.</span>
                    </span>
                  </label>
                </div>
              </>
            );
          } else {
            return (
              <>
                Score 950 points on the <b>Trainer</b> to unlock the other
                strategies.
              </>
            );
          }
        // Level U // No Trainer
        case userAssignedMulDivLevel === 20: {
          const uniqueStrategyBasicGroupByLevel = strategyList.filter(
            strategy => {
              return (
                strategy.visited &&
                strategy.slug.includes("dice-19=20-1") &&
                strategy.score >= 900
              );
            },
          );

          return (
            <>
              <div className="mfl-input-wrap">
                <input
                  type="checkbox"
                  id="chkbox-score-3"
                  className="mfl-input-checkbox"
                  name="mfl-input-checkbox-3"
                  checked={uniqueStrategyBasicGroupByLevel.length === 3}
                  disabled
                />
                <label
                  className="mfl-input-checkbox-label"
                  htmlFor="chkbox-score-3"
                >
                  <span>
                    Score <span className="font-bold">900</span> or more points
                    on all 3 stages of
                  </span>
                </label>
                <div className="frame-input-wrap">
                  <input
                    type="number"
                    value="19"
                    className="input-control sm"
                  />
                  =
                  <input
                    type="number"
                    value="20"
                    className="input-control sm"
                  />{" "}
                  -
                  <input type="number" value="1" className="input-control sm" />
                </div>
              </div>
              <div className="mfl-input-wrap">
                <input
                  type="checkbox"
                  id="chkbox-score-2"
                  className="mfl-input-checkbox"
                  name="mfl-input-checkbox-2"
                  checked={reviewStrategyVisited.length}
                  disabled
                />
                <label
                  className="mfl-input-checkbox-label"
                  htmlFor="chkbox-score-2"
                >
                  <span>
                    Score <span className="font-bold">900</span> or more points
                    on the <span className="font-bold">review.</span>
                  </span>
                </label>
              </div>
            </>
          );
        }
        // Level V
        case userAssignedMulDivLevel === 21:
          if (trainerStrategyVisited.length) {
            const uniqueStrategyBasicGroupByLevel = strategyList.filter(
              strategy => {
                return (
                  strategy.visited &&
                  strategy.slug.includes("dice-18=20-2") &&
                  strategy.score >= 900
                );
              },
            );

            return (
              <>
                <div className="mfl-input-wrap">
                  <input
                    type="checkbox"
                    id="chkbox-score-3"
                    className="mfl-input-checkbox"
                    name="mfl-input-checkbox-3"
                    checked={uniqueStrategyBasicGroupByLevel.length === 3}
                    disabled
                  />
                  <label
                    className="mfl-input-checkbox-label"
                    htmlFor="chkbox-score-3"
                  >
                    <span>
                      Score <span className="font-bold">900</span> or more
                      points on all 3 stages of
                    </span>
                  </label>
                  <div className="frame-input-wrap">
                    <input
                      type="number"
                      value="18"
                      className="input-control sm"
                    />
                    =
                    <input
                      type="number"
                      value="20"
                      className="input-control sm"
                    />{" "}
                    -
                    <input
                      type="number"
                      value="2"
                      className="input-control sm"
                    />
                  </div>
                </div>
                <div className="mfl-input-wrap">
                  <input
                    type="checkbox"
                    id="chkbox-score-2"
                    className="mfl-input-checkbox"
                    name="mfl-input-checkbox-2"
                    checked={reviewStrategyVisited.length}
                    disabled
                  />
                  <label
                    className="mfl-input-checkbox-label"
                    htmlFor="chkbox-score-2"
                  >
                    <span>
                      Score <span className="font-bold">900</span> or more
                      points on the <span className="font-bold">review.</span>
                    </span>
                  </label>
                </div>
              </>
            );
          } else {
            return (
              <>
                Score 950 points on the <b>Trainer</b> to unlock the other
                strategies.
              </>
            );
          }
        //Level W
        case userAssignedMulDivLevel === 22:
          if (trainerStrategyVisited.length) {
            const uniqueStrategyBasicGroupByLevel = strategyList.filter(
              strategy => {
                return (
                  strategy.visited &&
                  strategy.slug.includes("dice-14=10+4") &&
                  strategy.score >= 900
                );
              },
            );

            return (
              <>
                <div className="mfl-input-wrap">
                  <input
                    type="checkbox"
                    id="chkbox-score-3"
                    className="mfl-input-checkbox"
                    name="mfl-input-checkbox-3"
                    checked={uniqueStrategyBasicGroupByLevel.length === 3}
                    disabled
                  />
                  <label
                    className="mfl-input-checkbox-label"
                    htmlFor="chkbox-score-3"
                  >
                    <span>
                      Score <span className="font-bold">900</span> or more
                      points on all 3 stages of
                    </span>
                  </label>
                  <div className="frame-input-wrap">
                    <input
                      type="number"
                      value="14"
                      className="input-control sm"
                    />
                    =
                    <input
                      type="number"
                      value="10"
                      className="input-control sm"
                    />
                    +
                    <input
                      type="number"
                      value="4"
                      className="input-control sm"
                    />
                  </div>
                </div>
                <div className="mfl-input-wrap">
                  <input
                    type="checkbox"
                    id="chkbox-score-2"
                    className="mfl-input-checkbox"
                    name="mfl-input-checkbox-2"
                    checked={reviewStrategyVisited.length}
                    disabled
                  />
                  <label
                    className="mfl-input-checkbox-label"
                    htmlFor="chkbox-score-2"
                  >
                    <span>
                      Score <span className="font-bold">900</span> or more
                      points on the <span className="font-bold">review.</span>
                    </span>
                  </label>
                </div>
              </>
            );
          } else {
            return (
              <>
                Score 950 points on the <b>Trainer</b> to unlock the other
                strategies.
              </>
            );
          }
        // Level X
        case userAssignedMulDivLevel === 23:
          if (trainerStrategyVisited.length) {
            const uniqueStrategyBasicGroupByLevel = strategyList.filter(
              strategy => {
                return (
                  strategy.visited &&
                  strategy.slug.includes("dice-16=8+8") &&
                  strategy.score >= 900
                );
              },
            );

            return (
              <>
                <div className="mfl-input-wrap">
                  <input
                    type="checkbox"
                    id="chkbox-score-3"
                    className="mfl-input-checkbox"
                    name="mfl-input-checkbox-3"
                    checked={uniqueStrategyBasicGroupByLevel.length === 3}
                    disabled
                  />
                  <label
                    className="mfl-input-checkbox-label"
                    htmlFor="chkbox-score-3"
                  >
                    <span>
                      Score <span className="font-bold">900</span> or more
                      points on all 3 stages of
                    </span>
                  </label>
                  <div className="frame-input-wrap">
                    <input
                      type="number"
                      value="16"
                      className="input-control sm"
                    />
                    =
                    <input
                      type="number"
                      value="8"
                      className="input-control sm"
                    />
                    +
                    <input
                      type="number"
                      value="8"
                      className="input-control sm"
                    />
                  </div>
                </div>
                <div className="mfl-input-wrap">
                  <input
                    type="checkbox"
                    id="chkbox-score-2"
                    className="mfl-input-checkbox"
                    name="mfl-input-checkbox-2"
                    checked={reviewStrategyVisited.length}
                    disabled
                  />
                  <label
                    className="mfl-input-checkbox-label"
                    htmlFor="chkbox-score-2"
                  >
                    <span>
                      Score <span className="font-bold">900</span> or more
                      points on the <span className="font-bold">review.</span>
                    </span>
                  </label>
                </div>
              </>
            );
          } else {
            return (
              <>
                Score 950 points on the <b>Trainer</b> to unlock the other
                strategies.
              </>
            );
          }

        // Level Y
        case userAssignedMulDivLevel === 24:
          if (trainerStrategyVisited.length) {
            const uniqueStrategyBasicGroupByLevel = strategyList.filter(
              strategy => {
                return (
                  strategy.visited &&
                  strategy.slug.includes("dice-13=10+3") &&
                  strategy.score >= 900
                );
              },
            );

            return (
              <>
                <div className="mfl-input-wrap">
                  <input
                    type="checkbox"
                    id="chkbox-score-3"
                    className="mfl-input-checkbox"
                    name="mfl-input-checkbox-3"
                    checked={uniqueStrategyBasicGroupByLevel.length === 3}
                    disabled
                  />
                  <label
                    className="mfl-input-checkbox-label"
                    htmlFor="chkbox-score-3"
                  >
                    <span>
                      Score <span className="font-bold">900</span> or more
                      points on all 3 stages of
                    </span>
                  </label>
                  <div className="frame-input-wrap">
                    <input
                      type="number"
                      value="13"
                      className="input-control sm"
                    />
                    =
                    <input
                      type="number"
                      value="10"
                      className="input-control sm"
                    />
                    +
                    <input
                      type="number"
                      value="3"
                      className="input-control sm"
                    />
                  </div>
                </div>
                <div className="mfl-input-wrap">
                  <input
                    type="checkbox"
                    id="chkbox-score-2"
                    className="mfl-input-checkbox"
                    name="mfl-input-checkbox-2"
                    checked={reviewStrategyVisited.length}
                    disabled
                  />
                  <label
                    className="mfl-input-checkbox-label"
                    htmlFor="chkbox-score-2"
                  >
                    <span>
                      Score <span className="font-bold">900</span> or more
                      points on the <span className="font-bold">review.</span>
                    </span>
                  </label>
                </div>
              </>
            );
          } else {
            return (
              <>
                Score 950 points on the <b>Trainer</b> to unlock the other
                strategies.
              </>
            );
          }
        // Level Z
        case userAssignedMulDivLevel === 25:
          if (trainerStrategyVisited.length) {
            const uniqueStrategyBasicGroupByLevel = strategyList.filter(
              strategy => {
                return (
                  strategy.visited &&
                  strategy.slug.includes("dice-17=20-3") &&
                  strategy.score >= 900
                );
              },
            );

            return (
              <>
                <div className="mfl-input-wrap">
                  <input
                    type="checkbox"
                    id="chkbox-score-3"
                    className="mfl-input-checkbox"
                    name="mfl-input-checkbox-3"
                    checked={uniqueStrategyBasicGroupByLevel.length === 3}
                    disabled
                  />
                  <label
                    className="mfl-input-checkbox-label"
                    htmlFor="chkbox-score-3"
                  >
                    <span>
                      Score <span className="font-bold">900</span> or more
                      points on all 3 stages of
                    </span>
                  </label>
                  <div className="frame-input-wrap">
                    <input
                      type="number"
                      value="17"
                      className="input-control sm"
                    />
                    =
                    <input
                      type="number"
                      value="20"
                      className="input-control sm"
                    />
                    -
                    <input
                      type="number"
                      value="3"
                      className="input-control sm"
                    />
                  </div>
                </div>
                <div className="mfl-input-wrap">
                  <input
                    type="checkbox"
                    id="chkbox-score-2"
                    className="mfl-input-checkbox"
                    name="mfl-input-checkbox-2"
                    checked={reviewStrategyVisited.length}
                    disabled
                  />
                  <label
                    className="mfl-input-checkbox-label"
                    htmlFor="chkbox-score-2"
                  >
                    <span>
                      Score <span className="font-bold">900</span> or more
                      points on the <span className="font-bold">review.</span>
                    </span>
                  </label>
                </div>
              </>
            );
          } else {
            return (
              <>
                Score 950 points on the <b>Trainer</b> to unlock the other
                strategies.
              </>
            );
          }
        // Level Graduate
        case userAssignedMulDivLevel >= 26: {
          const reviewStrategyList = strategyList.filter(strategy => {
            return (
              strategy.visited &&
              strategy.slug.includes("review") &&
              strategy.score >= 900
            );
          });
          return (
            <>
              <div className="mfl-input-wrap">
                <input
                  type="checkbox"
                  id="chkbox-score-2"
                  className="mfl-input-checkbox"
                  name="mfl-input-checkbox-2"
                  checked={reviewStrategyList.length === 3}
                  disabled
                />
                <label
                  className="mfl-input-checkbox-label"
                  htmlFor="chkbox-score-2"
                >
                  <span>
                    Score <span className="font-bold">900</span> or more points
                    on <span className="font-bold"> all three reviews</span>
                  </span>
                </label>
              </div>
            </>
          );
        }

        default:
          return (
            <span className="initial-lifter-title">
              Complete each activity at least once to unlock the Level Lifter.
            </span>
          );
      }
    } else {
      switch (true) {
        // Level E exception case
        case userAssignedMulDivLevel === 5:
          return (
            <>
              <div className="mfl-input-wrap">
                <input
                  type="checkbox"
                  id="chkbox-score-2"
                  className="mfl-input-checkbox"
                  name="mfl-input-checkbox-2"
                  checked={firstMathOperationVisitedStrategy.length}
                  disabled
                />
                <label className="mfl-input-checkbox-label" htmlFor="checki-1">
                  <span>
                    {" "}
                    Score <span className="font-bold">900 </span> or more points
                    on{" "}
                    {mathOperationTitleList[firstMathOperation] === "Addition"
                      ? "an"
                      : "a"}{" "}
                    <span
                      className="font-bold"
                      style={{
                        textTransform: "lowercase",
                      }}
                    >
                      {mathOperationTitleList[firstMathOperation]}{" "}
                    </span>{" "}
                    activity.
                  </span>
                </label>
              </div>
            </>
          );

        // Level M exception case
        case userAssignedAddSubLevel === 11 || userAssignedAddSubLevel === 12:
          return (
            <>
              <div className="activity-checkbox">
                <input
                  className="mfl-input-checkbox"
                  type="checkbox"
                  id="checki-2"
                  checked={firstMathOperationVisitedStrategy.length}
                  disabled
                />
                <label className="mfl-input-checkbox-label" htmlFor="checki-2">
                  <span>
                    Score <span className="font-bold">900 </span> or more points
                    on an{" "}
                    <span
                      className="font-bold"
                      style={{
                        textTransform: "lowercase",
                      }}
                    >
                      {mathOperationTitleList[firstMathOperation]}{" "}
                    </span>{" "}
                    activity.
                  </span>
                </label>
              </div>
              <div className="activity-checkbox">
                <input
                  className="mfl-input-checkbox"
                  type="checkbox"
                  id="checki-1"
                  disabled
                  checked={tenFramesSubtractionVisitedStrategy.length}
                />
                <label className="mfl-input-checkbox-label" htmlFor="checki-1">
                  <span>
                    Score <span className="font-bold">900 </span> or more points
                    on
                    <span className="font-bold">
                      Ten Frames Subtraction.
                    </span>{" "}
                  </span>
                </label>
              </div>
              <div className="activity-checkbox">
                <input
                  className="mfl-input-checkbox"
                  type="checkbox"
                  id="checki-2"
                  checked={findDifferenceVisitedStrategy.length}
                  disabled
                />
                <label className="mfl-input-checkbox-label" htmlFor="checki-2">
                  <span>
                    {" "}
                    Score <span className="font-bold">900 </span> or more points
                    on <span className="font-bold">Find the Difference.</span>
                  </span>
                </label>
              </div>
            </>
          );

        // Level O
        case userAssignedMulDivLevel === 14: {
          const uniqueStrategyByLevel = strategyList.filter(strategy => {
            return (
              strategy.visited &&
              strategy.slug.includes("dice-11=10+1") &&
              strategy.score >= 900
            );
          });
          return (
            <>
              <div className="mfl-input-wrap">
                <input
                  type="checkbox"
                  id="chkbox-score-3"
                  className="mfl-input-checkbox"
                  name="mfl-input-checkbox-3"
                  checked={uniqueStrategyByLevel.length}
                  disabled
                />
                <label
                  className="mfl-input-checkbox-label"
                  htmlFor="chkbox-score-3"
                >
                  Score <span className="font-bold">900</span> or more points on
                </label>
                <div className="frame-input-wrap">
                  <input
                    type="number"
                    value="11"
                    className="input-control sm"
                  />{" "}
                  =
                  <input
                    type="number"
                    value="10"
                    className="input-control sm"
                  />{" "}
                  +
                  <input type="number" value="1" className="input-control sm" />
                </div>
              </div>
              <div className="mfl-input-wrap">
                <input
                  type="checkbox"
                  id="chkbox-score-2"
                  className="mfl-input-checkbox"
                  name="mfl-input-checkbox-2"
                  checked={reviewStrategyVisited.length}
                  disabled
                />
                <label
                  className="mfl-input-checkbox-label"
                  htmlFor="chkbox-score-2"
                >
                  <span>
                    Score <span className="font-bold">900</span> or more points
                    on the <span className="font-bold">review.</span>
                  </span>
                </label>
              </div>
            </>
          );
        }
        // Level P
        case userAssignedMulDivLevel === 15: {
          const uniqueStrategyByLevel = strategyList.filter(strategy => {
            return (
              strategy.visited &&
              strategy.slug.includes("dice-12=10+2") &&
              strategy.score >= 900
            );
          });
          return (
            <>
              <div className="mfl-input-wrap">
                <input
                  type="checkbox"
                  id="chkbox-score-3"
                  className="mfl-input-checkbox"
                  name="mfl-input-checkbox-3"
                  checked={uniqueStrategyByLevel.length}
                  disabled
                />
                <label
                  className="mfl-input-checkbox-label"
                  htmlFor="chkbox-score-3"
                >
                  Score <span className="font-bold">900</span> or more points on
                </label>
                <div className="frame-input-wrap">
                  <input
                    type="number"
                    value="12"
                    className="input-control sm"
                  />{" "}
                  =
                  <input
                    type="number"
                    value="10"
                    className="input-control sm"
                  />{" "}
                  +
                  <input type="number" value="2" className="input-control sm" />
                </div>
              </div>
              <div className="mfl-input-wrap">
                <input
                  type="checkbox"
                  id="chkbox-score-2"
                  className="mfl-input-checkbox"
                  name="mfl-input-checkbox-2"
                  checked={reviewStrategyVisited.length}
                  disabled
                />
                <label
                  className="mfl-input-checkbox-label"
                  htmlFor="chkbox-score-2"
                >
                  <span>
                    Score <span className="font-bold">900</span> or more points
                    on the <span className="font-bold">review.</span>
                  </span>
                </label>
              </div>
            </>
          );
        }
        // Level Q
        case userAssignedMulDivLevel === 16: {
          const uniqueStrategyByLevel = strategyList.filter(strategy => {
            return (
              strategy.visited &&
              strategy.slug.includes("dice-50=5x10-stage-3") &&
              strategy.score >= 900
            );
          });
          return (
            <>
              <div className="mfl-input-wrap">
                <input
                  type="checkbox"
                  id="chkbox-score-3"
                  className="mfl-input-checkbox"
                  name="mfl-input-checkbox-3"
                  checked={uniqueStrategyByLevel.length}
                  disabled
                />
                <label
                  className="mfl-input-checkbox-label"
                  htmlFor="chkbox-score-3"
                >
                  <span>
                    Score <span className="font-bold">900</span> or more points
                    on Stage 3 of
                  </span>
                </label>
                <div className="frame-input-wrap">
                  <input
                    type="number"
                    value="50"
                    className="input-control sm"
                  />{" "}
                  =
                  <input
                    type="number"
                    value="5"
                    className="input-control sm"
                  />{" "}
                  x
                  <input
                    type="number"
                    value="10"
                    className="input-control sm"
                  />
                </div>
              </div>
              <div className="mfl-input-wrap">
                <input
                  type="checkbox"
                  id="chkbox-score-2"
                  className="mfl-input-checkbox"
                  name="mfl-input-checkbox-2"
                  checked={reviewStrategyVisited.length}
                  disabled
                />
                <label
                  className="mfl-input-checkbox-label"
                  htmlFor="chkbox-score-2"
                >
                  <span>
                    Score <span className="font-bold">900</span> or more points
                    on the <span className="font-bold">review.</span>
                  </span>
                </label>
              </div>
            </>
          );
        }

        // Level R
        case userAssignedMulDivLevel === 17: {
          const uniqueStrategyByLevel = strategyList.filter(strategy => {
            return (
              strategy.visited &&
              strategy.slug.includes("dice-15=10+5-stage-3") &&
              strategy.score >= 900
            );
          });
          return (
            <>
              <div className="mfl-input-wrap">
                <input
                  type="checkbox"
                  id="chkbox-score-3"
                  className="mfl-input-checkbox"
                  name="mfl-input-checkbox-3"
                  checked={uniqueStrategyByLevel.length}
                  disabled
                />
                <label
                  className="mfl-input-checkbox-label"
                  htmlFor="chkbox-score-3"
                >
                  <span>
                    Score <span className="font-bold">900</span> or more points
                    on Stage 3 of
                  </span>
                </label>
                <div className="frame-input-wrap">
                  <input
                    type="number"
                    value="15"
                    className="input-control sm"
                  />{" "}
                  =
                  <input
                    type="number"
                    value="10"
                    className="input-control sm"
                  />{" "}
                  +
                  <input type="number" value="5" className="input-control sm" />
                </div>
              </div>
              <div className="mfl-input-wrap">
                <input
                  type="checkbox"
                  id="chkbox-score-2"
                  className="mfl-input-checkbox"
                  name="mfl-input-checkbox-2"
                  checked={reviewStrategyVisited.length}
                  disabled
                />
                <label
                  className="mfl-input-checkbox-label"
                  htmlFor="chkbox-score-2"
                >
                  <span>
                    Score <span className="font-bold">900</span> or more points
                    on the <span className="font-bold">review.</span>
                  </span>
                </label>
              </div>
            </>
          );
        }

        // Level S  // No Trianer
        case userAssignedMulDivLevel === 18: {
          const uniqueStrategyByLevel = strategyList.filter(strategy => {
            return (
              strategy.visited &&
              strategy.slug.includes("quarters-4x25=100-stage-3") &&
              strategy.score >= 900
            );
          });
          return (
            <>
              <div className="mfl-input-wrap">
                <input
                  type="checkbox"
                  id="chkbox-score-3"
                  className="mfl-input-checkbox"
                  name="mfl-input-checkbox-3"
                  checked={uniqueStrategyByLevel.length}
                  disabled
                />
                <label
                  className="mfl-input-checkbox-label"
                  htmlFor="chkbox-score-3"
                >
                  <span>
                    Score <span className="font-bold">900</span> or more points
                    on Stage 3 of
                  </span>
                </label>
                <div className="frame-input-wrap">
                  <input type="number" value="4" className="input-control sm" />{" "}
                  x{" "}
                  <input
                    type="number"
                    value="25"
                    className="input-control sm"
                  />{" "}
                  =
                  <input
                    type="number"
                    value="100"
                    className="input-control sm"
                  />
                </div>
              </div>
              <div className="mfl-input-wrap">
                <input
                  type="checkbox"
                  id="chkbox-score-2"
                  className="mfl-input-checkbox"
                  name="mfl-input-checkbox-2"
                  checked={reviewStrategyVisited.length}
                  disabled
                />
                <label
                  className="mfl-input-checkbox-label"
                  htmlFor="chkbox-score-2"
                >
                  <span>
                    Score <span className="font-bold">900</span> or more points
                    on the <span className="font-bold">review.</span>
                  </span>
                </label>
              </div>
            </>
          );
        }
        // Level T
        case userAssignedMulDivLevel === 19: {
          const uniqueStrategyByLevel = strategyList.filter(strategy => {
            return (
              strategy.visited &&
              strategy.slug.includes("dice-20=10+10-stage-3") &&
              strategy.score >= 900
            );
          });
          return (
            <>
              <div className="mfl-input-wrap">
                <input
                  type="checkbox"
                  id="chkbox-score-3"
                  className="mfl-input-checkbox"
                  name="mfl-input-checkbox-3"
                  checked={uniqueStrategyByLevel.length}
                  disabled
                />
                <label
                  className="mfl-input-checkbox-label"
                  htmlFor="chkbox-score-3"
                >
                  <span>
                    Score <span className="font-bold">900</span> or more points
                    on Stage 3 of
                  </span>
                </label>
                <div className="frame-input-wrap">
                  <input
                    type="number"
                    value="20"
                    className="input-control sm"
                  />
                  =
                  <input
                    type="number"
                    value="10"
                    className="input-control sm"
                  />{" "}
                  +
                  <input
                    type="number"
                    value="10"
                    className="input-control sm"
                  />
                </div>
              </div>
              <div className="mfl-input-wrap">
                <input
                  type="checkbox"
                  id="chkbox-score-2"
                  className="mfl-input-checkbox"
                  name="mfl-input-checkbox-2"
                  checked={reviewStrategyVisited.length}
                  disabled
                />
                <label
                  className="mfl-input-checkbox-label"
                  htmlFor="chkbox-score-2"
                >
                  <span>
                    Score <span className="font-bold">900</span> or more points
                    on the <span className="font-bold">review.</span>
                  </span>
                </label>
              </div>
            </>
          );
        }
        // Level U
        case userAssignedMulDivLevel === 20: {
          const uniqueStrategyByLevel = strategyList.filter(strategy => {
            return (
              strategy.visited &&
              strategy.slug.includes("dice-19=20-1-stage-3") &&
              strategy.score >= 900
            );
          });
          return (
            <>
              <div className="mfl-input-wrap">
                <input
                  type="checkbox"
                  id="chkbox-score-3"
                  className="mfl-input-checkbox"
                  name="mfl-input-checkbox-3"
                  checked={uniqueStrategyByLevel.length}
                  disabled
                />
                <label
                  className="mfl-input-checkbox-label"
                  htmlFor="chkbox-score-3"
                >
                  <span>
                    Score <span className="font-bold">900</span> or more points
                    on Stage 3 of
                  </span>
                </label>
                <div className="frame-input-wrap">
                  <input
                    type="number"
                    value="19"
                    className="input-control sm"
                  />
                  =
                  <input
                    type="number"
                    value="20"
                    className="input-control sm"
                  />{" "}
                  -
                  <input type="number" value="1" className="input-control sm" />
                </div>
              </div>
              <div className="mfl-input-wrap">
                <input
                  type="checkbox"
                  id="chkbox-score-2"
                  className="mfl-input-checkbox"
                  name="mfl-input-checkbox-2"
                  checked={reviewStrategyVisited.length}
                  disabled
                />
                <label
                  className="mfl-input-checkbox-label"
                  htmlFor="chkbox-score-2"
                >
                  <span>
                    Score <span className="font-bold">900</span> or more points
                    on the <span className="font-bold">review.</span>
                  </span>
                </label>
              </div>
            </>
          );
        }
        //Level V
        case userAssignedMulDivLevel === 21: {
          const uniqueStrategyByLevel = strategyList.filter(strategy => {
            return (
              strategy.visited &&
              strategy.slug.includes("dice-18=20-2-stage-3") &&
              strategy.score >= 900
            );
          });

          return (
            <>
              <div className="mfl-input-wrap">
                <input
                  type="checkbox"
                  id="chkbox-score-3"
                  className="mfl-input-checkbox"
                  name="mfl-input-checkbox-3"
                  checked={uniqueStrategyByLevel.length}
                  disabled
                />
                <label
                  className="mfl-input-checkbox-label"
                  htmlFor="chkbox-score-3"
                >
                  <span>
                    Score <span className="font-bold">900</span> or more points
                    on Stage 3 of
                  </span>
                </label>
                <div className="frame-input-wrap">
                  <input
                    type="number"
                    value="18"
                    className="input-control sm"
                  />
                  =
                  <input
                    type="number"
                    value="20"
                    className="input-control sm"
                  />{" "}
                  -
                  <input type="number" value="2" className="input-control sm" />
                </div>
              </div>
              <div className="mfl-input-wrap">
                <input
                  type="checkbox"
                  id="chkbox-score-2"
                  className="mfl-input-checkbox"
                  name="mfl-input-checkbox-2"
                  checked={reviewStrategyVisited.length}
                  disabled
                />
                <label
                  className="mfl-input-checkbox-label"
                  htmlFor="chkbox-score-2"
                >
                  <span>
                    Score <span className="font-bold">900</span> or more points
                    on the <span className="font-bold">review.</span>
                  </span>
                </label>
              </div>
            </>
          );
        }
        // Level W
        case userAssignedMulDivLevel === 22: {
          const uniqueStrategyByLevel = strategyList.filter(strategy => {
            return (
              strategy.visited &&
              strategy.slug.includes("dice-14=10+4-stage-3") &&
              strategy.score >= 900
            );
          });
          return (
            <>
              <div className="mfl-input-wrap">
                <input
                  type="checkbox"
                  id="chkbox-score-3"
                  className="mfl-input-checkbox"
                  name="mfl-input-checkbox-3"
                  checked={uniqueStrategyByLevel.length}
                  disabled
                />
                <label
                  className="mfl-input-checkbox-label"
                  htmlFor="chkbox-score-3"
                >
                  <span>
                    Score <span className="font-bold">900</span> or more points
                    on Stage 3 of
                  </span>
                </label>
                <div className="frame-input-wrap">
                  <input
                    type="number"
                    value="14"
                    className="input-control sm"
                  />
                  =
                  <input
                    type="number"
                    value="10"
                    className="input-control sm"
                  />
                  +
                  <input type="number" value="4" className="input-control sm" />
                </div>
              </div>
              <div className="mfl-input-wrap">
                <input
                  type="checkbox"
                  id="chkbox-score-2"
                  className="mfl-input-checkbox"
                  name="mfl-input-checkbox-2"
                  checked={reviewStrategyVisited.length}
                  disabled
                />
                <label
                  className="mfl-input-checkbox-label"
                  htmlFor="chkbox-score-2"
                >
                  <span>
                    Score <span className="font-bold">900</span> or more points
                    on the <span className="font-bold">review.</span>
                  </span>
                </label>
              </div>
            </>
          );
        }
        // Level X
        case userAssignedMulDivLevel === 23: {
          const uniqueStrategyByLevel = strategyList.filter(strategy => {
            return (
              strategy.visited &&
              strategy.slug.includes("dice-16=8+8-stage-3") &&
              strategy.score >= 900
            );
          });
          return (
            <>
              <div className="mfl-input-wrap">
                <input
                  type="checkbox"
                  id="chkbox-score-3"
                  className="mfl-input-checkbox"
                  name="mfl-input-checkbox-3"
                  checked={uniqueStrategyByLevel.length}
                  disabled
                />
                <label
                  className="mfl-input-checkbox-label"
                  htmlFor="chkbox-score-3"
                >
                  <span>
                    Score <span className="font-bold">900</span> or more points
                    on Stage 3 of
                  </span>
                </label>
                <div className="frame-input-wrap">
                  <input
                    type="number"
                    value="16"
                    className="input-control sm"
                  />
                  =
                  <input type="number" value="8" className="input-control sm" />
                  +
                  <input type="number" value="8" className="input-control sm" />
                </div>
              </div>
              <div className="mfl-input-wrap">
                <input
                  type="checkbox"
                  id="chkbox-score-2"
                  className="mfl-input-checkbox"
                  name="mfl-input-checkbox-2"
                  checked={reviewStrategyVisited.length}
                  disabled
                />
                <label
                  className="mfl-input-checkbox-label"
                  htmlFor="chkbox-score-2"
                >
                  <span>
                    Score <span className="font-bold">900</span> or more points
                    on the <span className="font-bold">review.</span>
                  </span>
                </label>
              </div>
            </>
          );
        }
        //Level Y
        case userAssignedMulDivLevel === 24: {
          const uniqueStrategyByLevel = strategyList.filter(strategy => {
            return (
              strategy.visited &&
              strategy.slug.includes("dice-13=10+3-stage-3") &&
              strategy.score >= 900
            );
          });
          return (
            <>
              <div className="mfl-input-wrap">
                <input
                  type="checkbox"
                  id="chkbox-score-3"
                  className="mfl-input-checkbox"
                  name="mfl-input-checkbox-3"
                  checked={uniqueStrategyByLevel.length}
                  disabled
                />
                <label
                  className="mfl-input-checkbox-label"
                  htmlFor="chkbox-score-3"
                >
                  <span>
                    Score <span className="font-bold">900</span> or more points
                    on Stage 3 of
                  </span>
                </label>
                <div className="frame-input-wrap">
                  <input
                    type="number"
                    value="13"
                    className="input-control sm"
                  />
                  =
                  <input
                    type="number"
                    value="10"
                    className="input-control sm"
                  />
                  +
                  <input type="number" value="3" className="input-control sm" />
                </div>
              </div>
              <div className="mfl-input-wrap">
                <input
                  type="checkbox"
                  id="chkbox-score-2"
                  className="mfl-input-checkbox"
                  name="mfl-input-checkbox-2"
                  checked={reviewStrategyVisited.length}
                  disabled
                />
                <label
                  className="mfl-input-checkbox-label"
                  htmlFor="chkbox-score-2"
                >
                  <span>
                    Score <span className="font-bold">900</span> or more points
                    on the <span className="font-bold">review.</span>
                  </span>
                </label>
              </div>
            </>
          );
        }
        //Level Z
        case userAssignedMulDivLevel === 25: {
          const uniqueStrategyByLevel = strategyList.filter(strategy => {
            return (
              strategy.visited &&
              strategy.slug.includes("dice-17=20-3-stage-3") &&
              strategy.score >= 900
            );
          });
          return (
            <>
              <div className="mfl-input-wrap">
                <input
                  type="checkbox"
                  id="chkbox-score-3"
                  className="mfl-input-checkbox"
                  name="mfl-input-checkbox-3"
                  checked={uniqueStrategyByLevel.length}
                  disabled
                />
                <label
                  className="mfl-input-checkbox-label"
                  htmlFor="chkbox-score-3"
                >
                  <span>
                    Score <span className="font-bold">900</span> or more points
                    on Stage 3 of
                  </span>
                </label>
                <div className="frame-input-wrap">
                  <input
                    type="number"
                    value="17"
                    className="input-control sm"
                  />
                  =
                  <input
                    type="number"
                    value="20"
                    className="input-control sm"
                  />
                  -
                  <input type="number" value="3" className="input-control sm" />
                </div>
              </div>
              <div className="mfl-input-wrap">
                <input
                  type="checkbox"
                  id="chkbox-score-2"
                  className="mfl-input-checkbox"
                  name="mfl-input-checkbox-2"
                  checked={reviewStrategyVisited.length}
                  disabled
                />
                <label
                  className="mfl-input-checkbox-label"
                  htmlFor="chkbox-score-2"
                >
                  <span>
                    Score <span className="font-bold">900</span> or more points
                    on the <span className="font-bold">review.</span>
                  </span>
                </label>
              </div>
            </>
          );
        }
        // Level Graduate
        case userAssignedMulDivLevel >= 26: {
          const reviewStrategyList = strategyList.filter(strategy => {
            return (
              strategy.visited &&
              strategy.slug.includes("review") &&
              strategy.score >= 900
            );
          });
          return (
            <>
              <div className="mfl-input-wrap">
                <input
                  type="checkbox"
                  id="chkbox-score-2"
                  className="mfl-input-checkbox"
                  name="mfl-input-checkbox-2"
                  checked={reviewStrategyList.length === 3}
                  disabled
                />
                <label
                  className="mfl-input-checkbox-label"
                  htmlFor="chkbox-score-2"
                >
                  <span>
                    Score <span className="font-bold">900</span> or more points
                    on <span className="font-bold"> all three reviews</span>
                  </span>
                </label>
              </div>
            </>
          );
        }
        // Level O exception case
        case userAssignedAddSubLevel === 13: {
          const uniqueAdditionStrategyByLevel = strategyList.filter(
            strategy => {
              return (
                strategy.visited &&
                strategy.slug.includes("2-digit-plus-multiple-of-10") &&
                strategy.score >= 900
              );
            },
          );
          const uniqueSubtractionStrategyByLevel = strategyList.filter(
            strategy => {
              return (
                strategy.visited &&
                strategy.slug.includes("2-digit-minus-multiple-of-10") &&
                strategy.score >= 900
              );
            },
          );
          return (
            <>
              <div className="mfl-input-wrap">
                <input
                  type="checkbox"
                  id="chkbox-score-3"
                  className="mfl-input-checkbox"
                  name="mfl-input-checkbox-3"
                  checked={uniqueAdditionStrategyByLevel.length}
                  disabled
                />
                <label
                  className="mfl-input-checkbox-label"
                  htmlFor="chkbox-score-3"
                >
                  <span>
                    Score <span className="font-bold">900</span> points on
                  </span>
                </label>

                <div className="flex align-items-center">
                  <div
                    className="box-strategy-icon-block"
                    style={{ marginLeft: "44px" }}
                  >
                    <span>
                      <div className="box-strategy-icon"></div>
                    </span>
                    <span>
                      <div
                        style={{
                          border: "0px solid",
                          height: "16px",
                          width: "5px",
                        }}
                      ></div>
                    </span>
                    <span>
                      <div className="box-strategy-icon"></div>
                    </span>
                  </div>
                  <span
                    style={{
                      marginRight: "6px",
                      marginLeft: "6px",
                      marginTop: "10px",
                    }}
                  >
                    +
                  </span>
                  <div className="box-strategy-icon-block">
                    <span>
                      <div className="box-strategy-icon"></div>
                    </span>
                    <span>
                      <div
                        style={{
                          border: "0px solid",
                          height: "16px",
                          width: "5px",
                        }}
                      ></div>
                    </span>
                    <span>0</span>
                  </div>
                </div>
              </div>
              <div className="mfl-input-wrap">
                <input
                  type="checkbox"
                  id="chkbox-score-2"
                  className="mfl-input-checkbox"
                  name="mfl-input-checkbox-2"
                  checked={uniqueSubtractionStrategyByLevel.length}
                  disabled
                />
                <label
                  className="mfl-input-checkbox-label"
                  htmlFor="chkbox-score-2"
                >
                  <span>
                    Score <span className="font-bold">900</span> points on
                  </span>
                </label>
                <div className="flex align-items-center">
                  <div
                    className="box-strategy-icon-block"
                    style={{ marginLeft: "44px" }}
                  >
                    <span>
                      <div className="box-strategy-icon"></div>
                    </span>
                    <span>
                      <div
                        style={{
                          border: "0px solid",
                          height: "16px",
                          width: "5px",
                        }}
                      ></div>
                    </span>
                    <span>
                      <div className="box-strategy-icon"></div>
                    </span>
                  </div>
                  <span
                    style={{
                      marginRight: "6px",
                      marginLeft: "6px",
                      marginTop: "10px",
                    }}
                  >
                    -
                  </span>
                  <div className="box-strategy-icon-block">
                    <span>
                      <div className="box-strategy-icon"></div>
                    </span>
                    <span>
                      <div
                        style={{
                          border: "0px solid",
                          height: "16px",
                          width: "5px",
                        }}
                      ></div>
                    </span>
                    <span>0</span>
                  </div>
                </div>
              </div>
            </>
          );
        }
        // Level O exception case
        case userAssignedAddSubLevel === 14: {
          const uniqueAdditionStrategyByLevel = strategyList.filter(
            strategy => {
              return (
                strategy.visited &&
                strategy.slug.includes("2-digit-plus-2-digit") &&
                strategy.score >= 900
              );
            },
          );
          const uniqueSubtractionStrategyByLevel = strategyList.filter(
            strategy => {
              return (
                strategy.visited &&
                strategy.slug.includes("2-digit-minus-2-digit") &&
                strategy.score >= 900
              );
            },
          );
          return (
            <>
              <div className="mfl-input-wrap">
                <input
                  type="checkbox"
                  id="chkbox-score-3"
                  className="mfl-input-checkbox"
                  name="mfl-input-checkbox-3"
                  checked={uniqueAdditionStrategyByLevel.length}
                  disabled
                />
                <label
                  className="mfl-input-checkbox-label"
                  htmlFor="chkbox-score-3"
                >
                  <span>
                    Score <span className="font-bold">900</span> points on
                  </span>
                </label>
                <div className="flex align-items-center">
                  <div
                    className="box-strategy-icon-block"
                    style={{ marginLeft: "44px" }}
                  >
                    <span>
                      <div className="box-strategy-icon"></div>
                    </span>
                    <span>
                      <div
                        style={{
                          border: "0px solid",
                          height: "16px",
                          width: "5px",
                        }}
                      ></div>
                    </span>
                    <span>
                      <div className="box-strategy-icon"></div>
                    </span>
                  </div>
                  <span
                    style={{
                      marginRight: "6px",
                      marginLeft: "6px",
                      marginTop: "10px",
                    }}
                  >
                    +
                  </span>
                  <div className="box-strategy-icon-block">
                    <span>
                      <div className="box-strategy-icon"></div>
                    </span>
                    <span>
                      <div
                        style={{
                          border: "0px solid",
                          height: "16px",
                          width: "5px",
                        }}
                      ></div>
                    </span>
                    <span>
                      <div className="box-strategy-icon"></div>
                    </span>
                  </div>
                </div>
              </div>
              <div className="mfl-input-wrap">
                <input
                  type="checkbox"
                  id="chkbox-score-2"
                  className="mfl-input-checkbox"
                  name="mfl-input-checkbox-2"
                  checked={uniqueSubtractionStrategyByLevel.length}
                  disabled
                />
                <label
                  className="mfl-input-checkbox-label"
                  htmlFor="chkbox-score-2"
                >
                  <span>
                    Score <span className="font-bold">900</span> points on
                  </span>
                </label>
                <div className="flex align-items-center">
                  <div
                    className="box-strategy-icon-block"
                    style={{ marginLeft: "44px" }}
                  >
                    <span>
                      <div className="box-strategy-icon"></div>
                    </span>
                    <span>
                      <div
                        style={{
                          border: "0px solid",
                          height: "16px",
                          width: "5px",
                        }}
                      ></div>
                    </span>
                    <span>
                      <div className="box-strategy-icon"></div>
                    </span>
                  </div>
                  <span
                    style={{
                      marginRight: "6px",
                      marginLeft: "6px",
                      marginTop: "10px",
                    }}
                  >
                    -
                  </span>
                  <div className="box-strategy-icon-block">
                    <span>
                      <div className="box-strategy-icon"></div>
                    </span>
                    <span>
                      <div
                        style={{
                          border: "0px solid",
                          height: "16px",
                          width: "5px",
                        }}
                      ></div>
                    </span>
                    <span>
                      <div className="box-strategy-icon"></div>
                    </span>
                  </div>
                </div>
              </div>
            </>
          );
        }
        // Level P exception case
        case userAssignedAddSubLevel === 15: {
          const uniqueAdditionStrategyByLevel = strategyList.filter(
            strategy => {
              return (
                strategy.visited &&
                strategy.slug.includes("-digit-plus-2-digit-ends-with-9") &&
                strategy.score >= 900
              );
            },
          );
          const uniqueSubtractionStrategyByLevel = strategyList.filter(
            strategy => {
              return (
                strategy.visited &&
                strategy.slug.includes("2-digit-minus-2-digit-ends-with-9") &&
                strategy.score >= 900
              );
            },
          );
          return (
            <>
              <div className="mfl-input-wrap">
                <input
                  type="checkbox"
                  id="chkbox-score-3"
                  className="mfl-input-checkbox"
                  name="mfl-input-checkbox-3"
                  checked={uniqueAdditionStrategyByLevel.length}
                  disabled
                />
                <label
                  className="mfl-input-checkbox-label"
                  htmlFor="chkbox-score-3"
                >
                  <span>
                    Score <span className="font-bold">900</span> points on
                  </span>
                </label>
                <div className="flex align-items-center">
                  <div
                    className="box-strategy-icon-block"
                    style={{ marginLeft: "44px" }}
                  >
                    <span>
                      <div className="box-strategy-icon"></div>
                    </span>
                    <span>
                      <div
                        style={{
                          border: "0px solid",
                          height: "16px",
                          width: "5px",
                        }}
                      ></div>
                    </span>
                    <span>
                      <div className="box-strategy-icon"></div>
                    </span>
                  </div>
                  <span
                    style={{
                      marginRight: "6px",
                      marginLeft: "6px",
                      marginTop: "10px",
                    }}
                  >
                    +
                  </span>
                  <div className="box-strategy-icon-block">
                    <span>
                      <div className="box-strategy-icon"></div>
                    </span>
                    <span>
                      <div
                        style={{
                          border: "0px solid",
                          height: "16px",
                          width: "5px",
                        }}
                      ></div>
                    </span>
                    <span>9</span>
                  </div>
                </div>
              </div>
              <div className="mfl-input-wrap">
                <input
                  type="checkbox"
                  id="chkbox-score-2"
                  className="mfl-input-checkbox"
                  name="mfl-input-checkbox-2"
                  checked={uniqueSubtractionStrategyByLevel.length}
                  disabled
                />
                <label
                  className="mfl-input-checkbox-label"
                  htmlFor="chkbox-score-2"
                >
                  <span>
                    Score <span className="font-bold">900</span> points on
                  </span>
                </label>
                <div className="flex align-items-center">
                  <div
                    className="box-strategy-icon-block"
                    style={{ marginLeft: "44px" }}
                  >
                    <span>
                      <div className="box-strategy-icon"></div>
                    </span>
                    <span>
                      <div
                        style={{
                          border: "0px solid",
                          height: "16px",
                          width: "5px",
                        }}
                      ></div>
                    </span>
                    <span>
                      <div className="box-strategy-icon"></div>
                    </span>
                  </div>
                  <span
                    style={{
                      marginRight: "6px",
                      marginLeft: "6px",
                      marginTop: "10px",
                    }}
                  >
                    -
                  </span>
                  <div className="box-strategy-icon-block">
                    <span>
                      <div className="box-strategy-icon"></div>
                    </span>
                    <span>
                      <div
                        style={{
                          border: "0px solid",
                          height: "16px",
                          width: "5px",
                        }}
                      ></div>
                    </span>
                    <span>9</span>
                  </div>
                </div>
              </div>
            </>
          );
        }

        // Level Q exception case
        case userAssignedAddSubLevel === 16: {
          const uniqueAdditionStrategyByLevel = strategyList.filter(
            strategy => {
              return (
                strategy.visited &&
                strategy.slug.includes(
                  "2-digit-plus-2-digit-with-sums-greater-than-100-of-10",
                ) &&
                strategy.score >= 900
              );
            },
          );
          const uniqueSubtractionStrategyByLevel = strategyList.filter(
            strategy => {
              return (
                strategy.visited &&
                strategy.slug.includes(
                  "2-digit-minus-2-digit-with-minuends-greater-than-100-of-10",
                ) &&
                strategy.score >= 900
              );
            },
          );
          return (
            <>
              <div className="mfl-input-wrap">
                <input
                  type="checkbox"
                  id="chkbox-score-3"
                  className="mfl-input-checkbox"
                  name="mfl-input-checkbox-3"
                  checked={uniqueAdditionStrategyByLevel.length}
                  disabled
                />
                <label
                  className="mfl-input-checkbox-label"
                  htmlFor="chkbox-score-3"
                >
                  <span>
                    Score <span className="font-bold">900</span> points on
                  </span>
                </label>
                <div className="flex align-items-center">
                  <div
                    className="box-strategy-icon-block"
                    style={{ marginLeft: "44px" }}
                  >
                    <span>
                      <div className="box-strategy-icon"></div>
                    </span>
                    <span>
                      <div
                        style={{
                          border: "0px solid",
                          height: "16px",
                          width: "5px",
                        }}
                      ></div>
                    </span>
                    <span>
                      <div className="box-strategy-icon"></div>
                    </span>
                  </div>
                  <span
                    style={{
                      marginRight: "6px",
                      marginLeft: "6px",
                      marginTop: "10px",
                    }}
                  >
                    +
                  </span>
                  <div className="box-strategy-icon-block">
                    <span>
                      <div className="box-strategy-icon"></div>
                    </span>
                    <span>
                      <div
                        style={{
                          border: "0px solid",
                          height: "16px",
                          width: "5px",
                        }}
                      ></div>
                    </span>
                    <span>0</span>
                  </div>
                </div>
              </div>
              <div className="mfl-input-wrap">
                <input
                  type="checkbox"
                  id="chkbox-score-2"
                  className="mfl-input-checkbox"
                  name="mfl-input-checkbox-2"
                  checked={uniqueSubtractionStrategyByLevel.length}
                  disabled
                />
                <label
                  className="mfl-input-checkbox-label"
                  htmlFor="chkbox-score-2"
                >
                  <span>
                    Score <span className="font-bold">900</span> points on
                  </span>
                </label>
                <div className="flex align-items-center">
                  <div
                    className="box-strategy-icon-block"
                    style={{ marginLeft: "44px" }}
                  >
                    <span
                      style={{ marginRight: "3px", marginTop: "2px" }}
                      className="flex align-items-center"
                    >
                      1
                    </span>

                    <span>
                      <div className="box-strategy-icon"></div>
                    </span>
                    <span>
                      <div
                        style={{
                          border: "0px solid",
                          height: "16px",
                          width: "5px",
                        }}
                      ></div>
                    </span>
                    <span>
                      <div className="box-strategy-icon"></div>
                    </span>
                  </div>
                  <span
                    style={{
                      marginRight: "6px",
                      marginLeft: "6px",
                      marginTop: "10px",
                    }}
                  >
                    -
                  </span>
                  <div className="box-strategy-icon-block">
                    <span>
                      <div className="box-strategy-icon"></div>
                    </span>
                    <span>
                      <div
                        style={{
                          border: "0px solid",
                          height: "16px",
                          width: "5px",
                        }}
                      ></div>
                    </span>
                    <span>0</span>
                  </div>
                </div>
              </div>
            </>
          );
        }
        // Level R exception case
        case userAssignedAddSubLevel === 17: {
          const uniqueAdditionStrategyByLevel = strategyList.filter(
            strategy => {
              return (
                strategy.visited &&
                strategy.slug.includes(
                  "2-digit-plus-2-digit-with-sums-greater-than-100",
                ) &&
                strategy.score >= 900
              );
            },
          );
          const uniqueSubtractionStrategyByLevel = strategyList.filter(
            strategy => {
              return (
                strategy.visited &&
                strategy.slug.includes(
                  "2-digit-minus-2-digit-with-minuends-greater-than-100",
                ) &&
                strategy.score >= 900
              );
            },
          );
          return (
            <>
              <div className="mfl-input-wrap">
                <input
                  type="checkbox"
                  id="chkbox-score-3"
                  className="mfl-input-checkbox"
                  name="mfl-input-checkbox-3"
                  checked={uniqueAdditionStrategyByLevel.length}
                  disabled
                />
                <label
                  className="mfl-input-checkbox-label"
                  htmlFor="chkbox-score-3"
                >
                  <span>
                    Score <span className="font-bold">900</span> points on
                  </span>
                </label>
                <div className="flex align-items-center">
                  <div
                    className="box-strategy-icon-block"
                    style={{ marginLeft: "44px" }}
                  >
                    <span>
                      <div className="box-strategy-icon"></div>
                    </span>
                    <span>
                      <div
                        style={{
                          border: "0px solid",
                          height: "16px",
                          width: "5px",
                        }}
                      ></div>
                    </span>
                    <span>
                      <div className="box-strategy-icon"></div>
                    </span>
                  </div>
                  <span
                    style={{
                      marginRight: "6px",
                      marginLeft: "6px",
                      marginTop: "10px",
                    }}
                  >
                    +
                  </span>
                  <div className="box-strategy-icon-block">
                    <span>
                      <div className="box-strategy-icon"></div>
                    </span>
                    <span>
                      <div
                        style={{
                          border: "0px solid",
                          height: "16px",
                          width: "5px",
                        }}
                      ></div>
                    </span>
                    <span>
                      <div className="box-strategy-icon"></div>
                    </span>
                  </div>
                </div>
              </div>
              <div className="mfl-input-wrap">
                <input
                  type="checkbox"
                  id="chkbox-score-2"
                  className="mfl-input-checkbox"
                  name="mfl-input-checkbox-2"
                  checked={uniqueSubtractionStrategyByLevel.length}
                  disabled
                />
                <label
                  className="mfl-input-checkbox-label"
                  htmlFor="chkbox-score-2"
                >
                  <span>
                    Score <span className="font-bold">900</span> points on
                  </span>
                </label>
                <div className="flex align-items-center">
                  <div
                    className="box-strategy-icon-block"
                    style={{ marginLeft: "44px" }}
                  >
                    <span
                      style={{ marginRight: "3px", marginTop: "2px" }}
                      className="flex align-items-center"
                    >
                      1
                    </span>

                    <span>
                      <div className="box-strategy-icon"></div>
                    </span>
                    <span>
                      <div
                        style={{
                          border: "0px solid",
                          height: "16px",
                          width: "5px",
                        }}
                      ></div>
                    </span>
                    <span>
                      <div className="box-strategy-icon"></div>
                    </span>
                  </div>
                  <span
                    style={{
                      marginRight: "6px",
                      marginLeft: "6px",
                      marginTop: "10px",
                    }}
                  >
                    -
                  </span>
                  <div className="box-strategy-icon-block">
                    <span>
                      <div className="box-strategy-icon"></div>
                    </span>
                    <span>
                      <div
                        style={{
                          border: "0px solid",
                          height: "16px",
                          width: "5px",
                        }}
                      ></div>
                    </span>
                    <span>
                      <div className="box-strategy-icon"></div>
                    </span>
                  </div>
                </div>
              </div>
            </>
          );
        }

        case userAssignedAddSubLevel >= 26: {
          const uniqueAdditionStrategyByLevel = strategyList.filter(
            strategy => {
              return (
                strategy.visited &&
                strategy.slug.includes("2-digit-plus-2-digit") &&
                strategy.score >= 900
              );
            },
          );
          const uniqueSubtractionStrategyByLevel = strategyList.filter(
            strategy => {
              return (
                strategy.visited &&
                strategy.slug.includes(
                  "2-digit-minus-2-digit-with-minuends-greater-than-100",
                ) &&
                strategy.score >= 900
              );
            },
          );
          return (
            <>
              <div className="mfl-input-wrap">
                <input
                  type="checkbox"
                  id="chkbox-score-3"
                  className="mfl-input-checkbox"
                  name="mfl-input-checkbox-3"
                  checked={uniqueAdditionStrategyByLevel.length}
                  disabled
                />
                <label
                  className="mfl-input-checkbox-label"
                  htmlFor="chkbox-score-3"
                >
                  <span>
                    Score <span className="font-bold">900</span> points on
                  </span>
                </label>
                <div className="flex align-items-center">
                  <div
                    className="box-strategy-icon-block"
                    style={{ marginLeft: "44px" }}
                  >
                    <span>
                      <div className="box-strategy-icon"></div>
                    </span>
                    <span>
                      <div
                        style={{
                          border: "0px solid",
                          height: "16px",
                          width: "5px",
                        }}
                      ></div>
                    </span>
                    <span>
                      <div className="box-strategy-icon"></div>
                    </span>
                  </div>
                  <span
                    style={{
                      marginRight: "6px",
                      marginLeft: "6px",
                      marginTop: "10px",
                    }}
                  >
                    +
                  </span>
                  <div className="box-strategy-icon-block">
                    <span>
                      <div className="box-strategy-icon"></div>
                    </span>
                    <span>
                      <div
                        style={{
                          border: "0px solid",
                          height: "16px",
                          width: "5px",
                        }}
                      ></div>
                    </span>
                    <span>
                      <div className="box-strategy-icon"></div>
                    </span>
                  </div>
                </div>
              </div>
              <div className="mfl-input-wrap">
                <input
                  type="checkbox"
                  id="chkbox-score-2"
                  className="mfl-input-checkbox"
                  name="mfl-input-checkbox-2"
                  checked={uniqueSubtractionStrategyByLevel.length}
                  disabled
                />
                <label
                  className="mfl-input-checkbox-label"
                  htmlFor="chkbox-score-2"
                >
                  <span>
                    Score <span className="font-bold">900</span> points on
                  </span>
                </label>
                <div className="flex align-items-center">
                  <div
                    className="box-strategy-icon-block"
                    style={{ marginLeft: "44px" }}
                  >
                    <span
                      style={{ marginRight: "3px", marginTop: "2px" }}
                      className="flex align-items-center"
                    >
                      1
                    </span>

                    <span>
                      <div className="box-strategy-icon"></div>
                    </span>
                    <span>
                      <div
                        style={{
                          border: "0px solid",
                          height: "16px",
                          width: "5px",
                        }}
                      ></div>
                    </span>
                    <span>
                      <div className="box-strategy-icon"></div>
                    </span>
                  </div>
                  <span
                    style={{
                      marginRight: "6px",
                      marginLeft: "6px",
                      marginTop: "10px",
                    }}
                  >
                    -
                  </span>
                  <div className="box-strategy-icon-block">
                    <span>
                      <div className="box-strategy-icon"></div>
                    </span>
                    <span>
                      <div
                        style={{
                          border: "0px solid",
                          height: "16px",
                          width: "5px",
                        }}
                      ></div>
                    </span>
                    <span>
                      <div className="box-strategy-icon"></div>
                    </span>
                  </div>
                </div>
              </div>
            </>
          );
        }
        default:
          return (
            <>
              {/* <div className="flex justify-content-center">
                <div className="flex-column align-items-start">
                  <div className="activity-checkbox">
                    <input
                      className="mfl-input-checkbox"
                      type="checkbox"
                      id="checki-1"
                      disabled
                      checked={firstMathOperationVisitedStrategy.length}
                    />
                    <label
                      className="mfl-input-checkbox-label"
                      htmlFor="checki-1"
                    >
                      Score <span className="font-bold">900 </span> or more
                      points on{" "}
                      {mathOperationTitleList[firstMathOperation] === "Addition"
                        ? "an"
                        : "a"}{" "}
                      <span
                        className="font-bold"
                        style={{
                          textTransform: "lowercase",
                        }}
                      >
                        {mathOperationTitleList[firstMathOperation]}{" "}
                      </span>{" "}
                      activity.
                    </label>
                  </div>
                  <div className="activity-checkbox">
                    <input
                      className="mfl-input-checkbox"
                      type="checkbox"
                      id="checki-2"
                      checked={secondMathOperationVisitedStrategy.length}
                      disabled
                    />
                    <label
                      className="mfl-input-checkbox-label"
                      htmlFor="checki-2"
                    >
                      Score <span className="font-bold">900 </span> or more
                      points on a{" "}
                      <span
                        className="font-bold"
                        style={{
                          textTransform: "lowercase",
                        }}
                      >
                        {mathOperationTitleList[secondMathOperation]}{" "}
                      </span>
                      activity.
                    </label>
                  </div>
                </div>
              </div> */}

              <div className="mfl-input-wrap">
                <input
                  type="checkbox"
                  id="chkbox-score-1"
                  className="mfl-input-checkbox"
                  name="mfl-input-checkbox-1"
                  disabled
                  checked={firstMathOperationVisitedStrategy.length}
                />
                <label
                  className="mfl-input-checkbox-label"
                  htmlFor="chkbox-score-1"
                >
                  <span>
                    Score <span className="font-bold">900 </span> or more points
                    on{" "}
                    {mathOperationTitleList[firstMathOperation] === "Addition"
                      ? "an"
                      : "a"}{" "}
                    <span
                      className="font-bold"
                      style={{
                        textTransform: "lowercase",
                      }}
                    >
                      {mathOperationTitleList[firstMathOperation]}{" "}
                    </span>{" "}
                    activity
                  </span>
                </label>
              </div>
              <div className="mfl-input-wrap">
                <input
                  type="checkbox"
                  id="chkbox-score-2"
                  className="mfl-input-checkbox"
                  name="mfl-input-checkbox-2"
                  checked={secondMathOperationVisitedStrategy.length}
                  disabled
                />
                <label
                  className="mfl-input-checkbox-label"
                  htmlFor="chkbox-score-2"
                >
                  <span>
                    Score <span className="font-bold">900 </span> or more points
                    on a{" "}
                    <span
                      className="font-bold"
                      style={{
                        textTransform: "lowercase",
                      }}
                    >
                      {mathOperationTitleList[secondMathOperation]}{" "}
                    </span>{" "}
                    activity
                  </span>
                </label>
              </div>
            </>
          );
      }
    }
  };
  return renderInitialLevelLifterUnlockRequirements();
};

export default UnlockLevelLifterRequirement;
