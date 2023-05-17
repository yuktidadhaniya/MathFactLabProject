import React from "react";
import _ from "lodash";

import arrowLeft from "assets/images/arrow/find-difference-arrow-left.png";
import TwoDigitMinusTwoDigitsOfNine from "../TwoDigitMinusTwoDigitsOfNine";

function TwoDigitMinusTwoDigits(props) {
  const { first_factor, second_factor, answer, isShowHint } = props;
  let endingPoint = 22;
  const firstArcValue = second_factor - (second_factor % 10);
  const secondArcValue = second_factor % 10;
  const hintValue = first_factor - firstArcValue;
  // let divideLengthFactor = Math.round(endingPoint / 10);

  // Take 21 bcz we have to start from 0 For example : 71-21 = 50 So stating point 50 and ending point 70
  let startingPoint = 1;

  function renderNode(number) {
    let node = null;

    node = (
      <div
        className={
          number === 7 || number === 10 || number === 16
            ? "line-5th"
            : "line-5th line-5th-hidden"
        }
        key={number}
      >
        <div className="down-label">
          {number === 7
            ? "?"
            : number === 10
            ? isShowHint
              ? hintValue
              : "?"
            : number === 16
            ? first_factor
            : ""}
        </div>
      </div>
    );

    return node;
  }

  return (
    <>
      {second_factor % 10 === 9 ? (
        <TwoDigitMinusTwoDigitsOfNine {...props} />
      ) : (
        <div className="find-difference-wrapper">
          <div className="line-wrapper">
            <div className="marker-line"></div>
            <div className={"marker-wrapper-lg"}>
              {_.range(startingPoint, endingPoint).map(number =>
                renderNode(number),
              )}
            </div>
            <div className={"marker-wrapper-lg"}>
              {[1].map(number => {
                return (
                  <div
                    key={number}
                    style={{
                      width: "100%",
                      marginLeft: `${((7 - startingPoint) / 20) * 100}%`,
                      position: "relative",
                      marginRight: `${((endingPoint - 10 - 1) / 20) * 100}%`,
                    }}
                  >
                    <div
                      className={
                        answer > 3
                          ? "hint-half-circle-arch-arrow visible"
                          : answer > 1
                          ? "hint-half-circle-arch-arrow md visible"
                          : "hint-half-circle-arch-arrow sm visible"
                      }
                    >
                      <img src={arrowLeft} alt="bracketBottom" />

                      <div
                        className={
                          answer > 3
                            ? "hint-arch-text visible"
                            : answer > 1
                            ? "hint-arch-text md visible"
                            : "hint-arch-text sm visible"
                        }
                      >
                        - {secondArcValue}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className={"marker-wrapper-lg"}>
              {[1].map(number => {
                return (
                  <div
                    key={number}
                    style={{
                      width: "100%",
                      marginLeft: `${((10 - startingPoint) / 20) * 100}%`,
                      position: "relative",
                      marginRight: `${((endingPoint - 16 - 1) / 20) * 100}%`,
                    }}
                  >
                    <div
                      className={
                        answer > 3
                          ? "hint-half-circle-arch-arrow visible"
                          : answer > 1
                          ? "hint-half-circle-arch-arrow md visible"
                          : "hint-half-circle-arch-arrow sm visible"
                      }
                    >
                      <img src={arrowLeft} alt="bracketBottom" />

                      <div
                        className={
                          answer > 3
                            ? "hint-arch-text visible"
                            : answer > 1
                            ? "hint-arch-text md visible"
                            : "hint-arch-text sm visible"
                        }
                      >
                        - {firstArcValue}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TwoDigitMinusTwoDigits;
