import React from "react";
import tenFramesRedDotImage from "assets/images/ten-frames/red.png";
import tenFramesYellowDotImage from "assets/images/ten-frames/yellow.png";
import tenFramesGreenDotImage from "assets/images/ten-frames/green.png";
import tenFramesBlueDotImage from "assets/images/ten-frames/blue.png";

function LevelKDoubleFoursIsEightWithDice(props) {
  //practice question test page
  const { second_factor, hintClickedCount } = props;

  let isLowZoomLevel = false;

  if (window.devicePixelRatio * 100 < 100) {
    isLowZoomLevel = true;
  }
  const renderFirstColumn = number => {
    if (hintClickedCount === 2) {
      if (number <= second_factor) {
        return (
          <div className="circle-wrapper" key={number}>
            <div>
              <div className="circle first-col visible">
                <img
                  src={tenFramesRedDotImage}
                  alt="tenFramesRedDotImage"
                ></img>
              </div>
              <div className="circle second-col">
                <img
                  src={tenFramesYellowDotImage}
                  alt="tenFramesYellowDotImage"
                ></img>
              </div>
            </div>
          </div>
        );
      }
      if (number <= second_factor * 2) {
        return (
          <div className="circle-wrapper" key={number}>
            <div>
              <div className="circle first-col ">
                <img
                  src={tenFramesRedDotImage}
                  alt="tenFramesRedDotImage"
                ></img>
              </div>
              <div className="circle second-col visible">
                <img
                  src={tenFramesYellowDotImage}
                  alt="tenFramesYellowDotImage"
                ></img>
              </div>
            </div>
          </div>
        );
      }
      if (number <= second_factor * 3) {
        return (
          <div className="circle-wrapper" key={number}>
            <div>
              <div className="circle first-col ">
                {" "}
                <img
                  src={tenFramesRedDotImage}
                  alt="tenFramesRedDotImage"
                ></img>
              </div>
              <div className="circle second-col">
                <img
                  src={tenFramesYellowDotImage}
                  alt="tenFramesYellowDotImage"
                ></img>
              </div>
              <div className="circle third-col visible">
                <img
                  src={tenFramesGreenDotImage}
                  alt="tenFramesGreenDotImage"
                ></img>
              </div>
            </div>
          </div>
        );
      }
      if (number <= second_factor * 4) {
        return (
          <div className="circle-wrapper" key={number}>
            <div>
              <div className="circle first-col ">
                <img
                  src={tenFramesRedDotImage}
                  alt="tenFramesRedDotImage"
                ></img>
              </div>
              <div className="circle second-col">
                <img
                  src={tenFramesYellowDotImage}
                  alt="tenFramesYellowDotImage"
                ></img>
              </div>
              <div className="circle third-col ">
                <img
                  src={tenFramesGreenDotImage}
                  alt="tenFramesGreenDotImage"
                ></img>
              </div>
              <div className="circle fourth-col visible">
                <img
                  src={tenFramesBlueDotImage}
                  alt="tenFramesBlueDotImage"
                ></img>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className="circle-wrapper" key={number}>
            <div>
              <div className="circle first-col">
                <img
                  src={tenFramesRedDotImage}
                  alt="tenFramesRedDotImage"
                ></img>
              </div>
              <div className="circle second-col">
                <img
                  src={tenFramesYellowDotImage}
                  alt="tenFramesYellowDotImage"
                ></img>
              </div>
            </div>
          </div>
        );
      }
    } else {
      if (hintClickedCount === 1) {
        if (number <= second_factor) {
          return (
            <div className="circle-wrapper" key={number}>
              <div>
                <div className="circle first-col visible">
                  <img
                    src={tenFramesRedDotImage}
                    alt="tenFramesRedDotImage"
                  ></img>
                </div>
                <div className="circle second-col">
                  <img
                    src={tenFramesYellowDotImage}
                    alt="tenFramesYellowDotImage"
                  ></img>
                </div>
              </div>
            </div>
          );
        }
        if (number <= second_factor * 2) {
          return (
            <div className="circle-wrapper" key={number}>
              <div>
                <div className="circle first-col ">
                  <img
                    src={tenFramesRedDotImage}
                    alt="tenFramesRedDotImage"
                  ></img>
                </div>
                <div className="circle second-col visible">
                  <img
                    src={tenFramesYellowDotImage}
                    alt="tenFramesYellowDotImage"
                  ></img>
                </div>
              </div>
            </div>
          );
        } else {
          return (
            <div className="circle-wrapper" key={number}>
              <div>
                <div className="circle first-col">
                  <img
                    src={tenFramesRedDotImage}
                    alt="tenFramesRedDotImage"
                  ></img>
                </div>
                <div className="circle second-col">
                  <img
                    src={tenFramesYellowDotImage}
                    alt="tenFramesYellowDotImage"
                  ></img>
                </div>
              </div>
            </div>
          );
        }
      } else {
        if (number <= second_factor) {
          return (
            <div className="circle-wrapper" key={number}>
              <div>
                <div className="circle first-col visible">
                  <img
                    src={tenFramesRedDotImage}
                    alt="tenFramesRedDotImage"
                  ></img>
                </div>
                <div className="circle second-col">
                  <img
                    src={tenFramesYellowDotImage}
                    alt="tenFramesYellowDotImage"
                  ></img>
                </div>
              </div>
            </div>
          );
        } else {
          return (
            <div className="circle-wrapper" key={number}>
              <div>
                <div className="circle first-col">
                  <img
                    src={tenFramesRedDotImage}
                    alt="tenFramesRedDotImage"
                  ></img>
                </div>
                <div className="circle second-col">
                  <img
                    src={tenFramesYellowDotImage}
                    alt="tenFramesYellowDotImage"
                  ></img>
                </div>
              </div>
            </div>
          );
        }
      }
    }
  };

  const renderSecondColumn = number => {
    if (hintClickedCount === 2) {
      if (number <= second_factor * 2 - 10) {
        return (
          <div className="circle-wrapper" key={number}>
            <div>
              <div className="circle first-col">
                {" "}
                <img
                  src={tenFramesRedDotImage}
                  alt="tenFramesRedDotImage"
                ></img>
              </div>
              <div className="circle second-col visible">
                <img
                  src={tenFramesYellowDotImage}
                  alt="tenFramesYellowDotImage"
                ></img>
              </div>
            </div>
          </div>
        );
      }
      if (number <= second_factor * 3 - 10) {
        return (
          <div className="circle-wrapper" key={number}>
            <div>
              <div className="circle first-col">
                {" "}
                <img
                  src={tenFramesRedDotImage}
                  alt="tenFramesRedDotImage"
                ></img>
              </div>
              <div className="circle second-col">
                <img
                  src={tenFramesYellowDotImage}
                  alt="tenFramesYellowDotImage"
                ></img>
              </div>
              <div className="circle third-col visible">
                {" "}
                <img
                  src={tenFramesGreenDotImage}
                  alt="tenFramesGreenDotImage"
                ></img>
              </div>
            </div>
          </div>
        );
      }
      if (number <= second_factor * 4 - 10) {
        return (
          <div className="circle-wrapper" key={number}>
            <div>
              <div className="circle first-col">
                {" "}
                <img
                  src={tenFramesRedDotImage}
                  alt="tenFramesRedDotImage"
                ></img>
              </div>
              <div className="circle second-col">
                <img
                  src={tenFramesYellowDotImage}
                  alt="tenFramesYellowDotImage"
                ></img>
              </div>
              <div className="circle fourth-col visible">
                {" "}
                <img
                  src={tenFramesBlueDotImage}
                  alt="tenFramesBlueDotImage"
                ></img>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className="circle-wrapper" key={number}>
            <div>
              <div className="circle first-col">
                <img
                  src={tenFramesRedDotImage}
                  alt="tenFramesRedDotImage"
                ></img>
              </div>
              <div className="circle second-col">
                <img
                  src={tenFramesYellowDotImage}
                  alt="tenFramesYellowDotImage"
                ></img>
              </div>
              <div className="circle third-col ">
                <img
                  src={tenFramesGreenDotImage}
                  alt="tenFramesGreenDotImage"
                ></img>
              </div>
            </div>
          </div>
        );
      }
    } else {
      if (hintClickedCount === 2) {
        if (number <= second_factor * 2 - 10) {
          return (
            <div className="circle-wrapper" key={number}>
              <div>
                <div className="circle first-col">
                  {" "}
                  <img
                    src={tenFramesRedDotImage}
                    alt="tenFramesRedDotImage"
                  ></img>
                </div>
                <div className="circle second-col visible">
                  <img
                    src={tenFramesYellowDotImage}
                    alt="tenFramesYellowDotImage"
                  ></img>
                </div>
              </div>
            </div>
          );
        } else {
          return (
            <div className="circle-wrapper" key={number}>
              <div>
                <div className="circle first-col">
                  {" "}
                  <img
                    src={tenFramesRedDotImage}
                    alt="tenFramesRedDotImage"
                  ></img>
                </div>
                <div className="circle second-col">
                  <img
                    src={tenFramesYellowDotImage}
                    alt="tenFramesYellowDotImage"
                  ></img>
                </div>
              </div>
            </div>
          );
        }
      } else {
        if (hintClickedCount === 1) {
          if (number <= second_factor * 2 - 10) {
            return (
              <div className="circle-wrapper" key={number}>
                <div>
                  <div className="circle first-col">
                    {" "}
                    <img
                      src={tenFramesRedDotImage}
                      alt="tenFramesRedDotImage"
                    ></img>
                  </div>
                  <div className="circle second-col visible">
                    <img
                      src={tenFramesYellowDotImage}
                      alt="tenFramesYellowDotImage"
                    ></img>
                  </div>
                </div>
              </div>
            );
          } else {
            return (
              <div className="circle-wrapper" key={number}>
                <div>
                  <div className="circle first-col">
                    {" "}
                    <img
                      src={tenFramesRedDotImage}
                      alt="tenFramesRedDotImage"
                    ></img>
                  </div>
                  <div className="circle second-col">
                    <img
                      src={tenFramesYellowDotImage}
                      alt="tenFramesYellowDotImage"
                    ></img>
                  </div>
                </div>
              </div>
            );
          }
        } else {
          if (number <= second_factor) {
            return (
              <div className="circle-wrapper" key={number}>
                <div>
                  <div className="circle first-col ">
                    {" "}
                    <img
                      src={tenFramesRedDotImage}
                      alt="tenFramesRedDotImage"
                    ></img>
                  </div>
                  <div className="circle second-col visible">
                    <img
                      src={tenFramesYellowDotImage}
                      alt="tenFramesYellowDotImage"
                    ></img>
                  </div>
                  <div className="circle third-col ">
                    {" "}
                    <img
                      src={tenFramesGreenDotImage}
                      alt="tenFramesGreenDotImage"
                    ></img>
                  </div>
                </div>
              </div>
            );
          } else {
            return (
              <div className="circle-wrapper" key={number}>
                <div>
                  <div className="circle first-col">
                    {" "}
                    <img
                      src={tenFramesRedDotImage}
                      alt="tenFramesRedDotImage"
                    ></img>
                  </div>
                  <div className="circle second-col">
                    <img
                      src={tenFramesYellowDotImage}
                      alt="tenFramesYellowDotImage"
                    ></img>
                  </div>
                  <div className="circle third-col ">
                    {" "}
                    <img
                      src={tenFramesGreenDotImage}
                      alt="tenFramesGreenDotImage"
                    ></img>
                  </div>
                </div>
              </div>
            );
          }
        }
      }
    }
  };
  const renderThirdColumn = number => {
    if (hintClickedCount === 2) {
      if (number <= second_factor * 3 - 20) {
        return (
          <div className="circle-wrapper" key={number}>
            <div>
              <div className="circle first-col">
                {" "}
                <img
                  src={tenFramesRedDotImage}
                  alt="tenFramesRedDotImage"
                ></img>
              </div>
              <div className="circle second-col">
                <img
                  src={tenFramesYellowDotImage}
                  alt="tenFramesYellowDotImage"
                ></img>
              </div>
              <div className="circle third-col visible">
                {" "}
                <img
                  src={tenFramesGreenDotImage}
                  alt="tenFramesGreenDotImage"
                ></img>
              </div>
            </div>
          </div>
        );
      }
      if (number <= second_factor * 4 - 20) {
        return (
          <div className="circle-wrapper" key={number}>
            <div>
              <div className="circle first-col">
                {" "}
                <img
                  src={tenFramesRedDotImage}
                  alt="tenFramesRedDotImage"
                ></img>
              </div>
              <div className="circle second-col">
                <img
                  src={tenFramesYellowDotImage}
                  alt="tenFramesYellowDotImage"
                ></img>
              </div>
              <div className="circle fourth-col visible">
                {" "}
                <img
                  src={tenFramesBlueDotImage}
                  alt="tenFramesBlueDotImage"
                ></img>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className="circle-wrapper" key={number}>
            <div>
              <div className="circle first-col">
                {" "}
                <img
                  src={tenFramesRedDotImage}
                  alt="tenFramesRedDotImage"
                ></img>
              </div>
              <div className="circle second-col">
                <img
                  src={tenFramesYellowDotImage}
                  alt="tenFramesYellowDotImage"
                ></img>
              </div>
              <div className="circle third-col ">
                {" "}
                <img
                  src={tenFramesGreenDotImage}
                  alt="tenFramesGreenDotImage"
                ></img>
              </div>
            </div>
          </div>
        );
      }
    }
    if (hintClickedCount === 1) {
      if (number <= second_factor) {
        return (
          <div className="circle-wrapper" key={number}>
            <div>
              <div className="circle first-col ">
                {" "}
                <img
                  src={tenFramesRedDotImage}
                  alt="tenFramesRedDotImage"
                ></img>
              </div>
              <div className="circle second-col "></div>
              <div className="circle third-col visible">
                {" "}
                <img
                  src={tenFramesGreenDotImage}
                  alt="tenFramesGreenDotImage"
                ></img>
              </div>
            </div>
          </div>
        );
      }
      if (number <= second_factor * 2) {
        return (
          <div className="circle-wrapper" key={number}>
            <div>
              <div className="circle first-col ">
                {" "}
                <img
                  src={tenFramesRedDotImage}
                  alt="tenFramesRedDotImage"
                ></img>
              </div>
              <div className="circle second-col "></div>
              <div className="circle fourth-col visible">
                {" "}
                <img
                  src={tenFramesBlueDotImage}
                  alt="tenFramesBlueDotImage"
                ></img>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className="circle-wrapper" key={number}>
            <div>
              <div className="circle first-col">
                {" "}
                <img
                  src={tenFramesRedDotImage}
                  alt="tenFramesRedDotImage"
                ></img>
              </div>
              <div className="circle second-col">
                <img
                  src={tenFramesYellowDotImage}
                  alt="tenFramesYellowDotImage"
                ></img>
              </div>
            </div>
          </div>
        );
      }
    } else {
      if (number <= second_factor) {
        return (
          <div className="circle-wrapper" key={number}>
            <div>
              <div className="circle first-col ">
                {" "}
                <img
                  src={tenFramesRedDotImage}
                  alt="tenFramesRedDotImage"
                ></img>
              </div>
              <div className="circle second-col">
                <img
                  src={tenFramesYellowDotImage}
                  alt="tenFramesYellowDotImage"
                ></img>
              </div>
              <div className="circle third-col visible">
                {" "}
                <img
                  src={tenFramesGreenDotImage}
                  alt="tenFramesGreenDotImage"
                ></img>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className="circle-wrapper" key={number}>
            <div>
              <div className="circle first-col">
                {" "}
                <img
                  src={tenFramesRedDotImage}
                  alt="tenFramesRedDotImage"
                ></img>
              </div>
              <div className="circle second-col">
                <img
                  src={tenFramesYellowDotImage}
                  alt="tenFramesYellowDotImage"
                ></img>
              </div>
              <div className="circle third-col">
                {" "}
                <img
                  src={tenFramesGreenDotImage}
                  alt="tenFramesGreenDotImage"
                ></img>
              </div>
            </div>
          </div>
        );
      }
    }
  };

  const renderFourthColumn = number => {
    if (hintClickedCount === 2) {
      if (number <= second_factor * 4 - 30) {
        return (
          <div className="circle-wrapper" key={number}>
            <div>
              <div className="circle first-col">
                {" "}
                <img
                  src={tenFramesRedDotImage}
                  alt="tenFramesRedDotImage"
                ></img>
              </div>
              <div className="circle fourth-col visible">
                {" "}
                <img
                  src={tenFramesBlueDotImage}
                  alt="tenFramesBlueDotImage"
                ></img>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className="circle-wrapper" key={number}>
            <div>
              <div className="circle first-col">
                {" "}
                <img
                  src={tenFramesRedDotImage}
                  alt="tenFramesRedDotImage"
                ></img>
              </div>
              <div className="circle second-col">
                <img
                  src={tenFramesYellowDotImage}
                  alt="tenFramesYellowDotImage"
                ></img>
              </div>
              <div className="circle third-col ">
                {" "}
                <img
                  src={tenFramesGreenDotImage}
                  alt="tenFramesGreenDotImage"
                ></img>
              </div>
            </div>
          </div>
        );
      }
    } else {
      if (hintClickedCount === 1) {
        if (number <= second_factor * 2 - 10) {
          return (
            <div className="circle-wrapper" key={number}>
              <div>
                <div className="circle first-col">
                  {" "}
                  <img
                    src={tenFramesRedDotImage}
                    alt="tenFramesRedDotImage"
                  ></img>
                </div>
                <div className="circle third-col ">
                  {" "}
                  <img
                    src={tenFramesGreenDotImage}
                    alt="tenFramesGreenDotImage"
                  ></img>
                </div>
                <div className="circle fourth-col visible">
                  {" "}
                  <img
                    src={tenFramesBlueDotImage}
                    alt="tenFramesBlueDotImage"
                  ></img>
                </div>
              </div>
            </div>
          );
        } else {
          return (
            <div className="circle-wrapper" key={number}>
              <div>
                <div className="circle first-col">
                  {" "}
                  <img
                    src={tenFramesRedDotImage}
                    alt="tenFramesRedDotImage"
                  ></img>
                </div>
                <div className="circle second-col">
                  <img
                    src={tenFramesYellowDotImage}
                    alt="tenFramesYellowDotImage"
                  ></img>
                </div>
                <div className="circle third-col ">
                  {" "}
                  <img
                    src={tenFramesGreenDotImage}
                    alt="tenFramesGreenDotImage"
                  ></img>
                </div>

                <div className="circle fourth-col ">
                  {" "}
                  <img
                    src={tenFramesBlueDotImage}
                    alt="tenFramesBlueDotImage"
                  ></img>
                </div>
              </div>
            </div>
          );
        }
      } else {
        if (number <= second_factor) {
          return (
            <div className="circle-wrapper" key={number}>
              <div>
                <div className="circle first-col ">
                  {" "}
                  <img
                    src={tenFramesRedDotImage}
                    alt="tenFramesRedDotImage"
                  ></img>
                </div>
                <div className="circle second-col">
                  <img
                    src={tenFramesYellowDotImage}
                    alt="tenFramesYellowDotImage"
                  ></img>
                </div>
                <div className="circle third-col ">
                  {" "}
                  <img
                    src={tenFramesGreenDotImage}
                    alt="tenFramesGreenDotImage"
                  ></img>
                </div>
                <div className="circle fourth-col visible">
                  {" "}
                  <img
                    src={tenFramesBlueDotImage}
                    alt="tenFramesBlueDotImage"
                  ></img>
                </div>
              </div>
            </div>
          );
        } else {
          return (
            <div className="circle-wrapper" key={number}>
              <div>
                <div className="circle first-col">
                  {" "}
                  <img
                    src={tenFramesRedDotImage}
                    alt="tenFramesRedDotImage"
                  ></img>
                </div>
                <div className="circle second-col">
                  <img
                    src={tenFramesYellowDotImage}
                    alt="tenFramesYellowDotImage"
                  ></img>
                </div>
                <div className="circle third-col">
                  {" "}
                  <img
                    src={tenFramesGreenDotImage}
                    alt="tenFramesGreenDotImage"
                  ></img>
                </div>
              </div>
            </div>
          );
        }
      }
    }
  };

  return (
    <div className="ten-frames-with-x4-main-outer-wrapper">
      <div
        className={
          isLowZoomLevel ? "grid-container low-zoom-level" : "grid-container"
        }
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(number =>
          renderFirstColumn(number),
        )}
      </div>

      <div
        className={
          isLowZoomLevel ? "grid-container low-zoom-level" : "grid-container"
        }
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(number =>
          renderSecondColumn(number),
        )}
      </div>

      <div
        className={
          isLowZoomLevel ? "grid-container low-zoom-level" : "grid-container"
        }
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(number =>
          renderThirdColumn(number),
        )}
      </div>
      <div
        className={
          isLowZoomLevel ? "grid-container low-zoom-level" : "grid-container"
        }
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(number =>
          renderFourthColumn(number),
        )}
      </div>
    </div>
  );
}

export default LevelKDoubleFoursIsEightWithDice;
