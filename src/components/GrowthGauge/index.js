import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  mulSubLevelList,
  addSubLevelList,
  userRole,
  // mathOperationList,
} from "config/const";
import Select from "components/ReactSelect";
import Loader from "components/Loader";
import { studentLearningModeList } from "config/const";
import { DatePicker, Button, Popover, Divider } from "antd";
import moment from "moment";
import { getClassCodeList, getGrowthGaugeReport } from "store/action";
const GrowthGauge = props => {
  const { isShowProgressTablePopup } = props;
  const dispatch = useDispatch();

  const { classCodeList } = useSelector(({ classCode }) => classCode);
  const { growthGaugeReport, fetchingGrowthGaugeReportLoading } = useSelector(
    ({ user }) => user,
  );

  const [selectedClassCode, setSelectClassCode] = useState("");
  const handleChangeClassCode = e => {
    setSelectClassCode(e.target.value);
  };
  const [learningMode, setSelectedLearningMode] = useState(1);
  const classCodeListOption = [
    {
      label: "All Classes",
      value: "",
    },

    ...classCodeList.map(classCode => {
      return {
        label: `${classCode.name} - ${classCode.class_code}`,
        value: classCode.class_code,
      };
    }),
  ];
  const handleClose = () => {
    props.close();
  };

  const { userDetails } = useSelector(({ auth }) => auth);

  useEffect(() => {
    const elem = document.getElementById("active-selected");
    if (elem) {
      elem.scrollIntoView();
    }
  }, [learningMode]);

  let userCurrentModeList =
    learningMode === 1 ? addSubLevelList : mulSubLevelList;

  let levelListByLearningMode = Object.values(userCurrentModeList);

  // remove first and last element of warm up and graduate level
  levelListByLearningMode.shift(); // Removes the first element from an array and returns only that element.
  // levelListByLearningMode.pop();

  const basicLevelList = growthGaugeReport.filter(data =>
    learningMode === 1
      ? addSubLevelList[data.level] &&
        addSubLevelList[data.level].stage === "basic"
      : mulSubLevelList[data.level] &&
        mulSubLevelList[data.level].stage === "basic",
  );

  const advancedLevelList = growthGaugeReport.filter(data =>
    learningMode === 1
      ? addSubLevelList[data.level] &&
        addSubLevelList[data.level].stage === "advanced"
      : mulSubLevelList[data.level] &&
        mulSubLevelList[data.level].stage === "advanced",
  );

  const superAdvancedLevelList = growthGaugeReport.filter(data =>
    learningMode === 1
      ? addSubLevelList[data.level] &&
        addSubLevelList[data.level].stage === "super-advanced"
      : mulSubLevelList[data.level] &&
        mulSubLevelList[data.level].stage === "super-advanced",
  );

  const superDuperAdvancedLevelList = growthGaugeReport.filter(data =>
    learningMode === 1
      ? addSubLevelList[data.level] &&
        addSubLevelList[data.level].stage === "super-duper-advanced"
      : mulSubLevelList[data.level] &&
        mulSubLevelList[data.level].stage === "super-duper-advanced",
  );

  const graduationLevel = growthGaugeReport.filter(data => data.level === 26);

  const lowerBasicLevel = growthGaugeReport.filter(data =>
    learningMode === 1
      ? addSubLevelList[data.level] &&
        addSubLevelList[data.level].stage === "lower-basic"
      : mulSubLevelList[data.level] &&
        mulSubLevelList[data.level].stage === "lower-basic",
  );

  const placementTestResult = growthGaugeReport.filter(
    data => data.isPlacementTestResult,
  );

  const basicLevelCount = learningMode === 1 ? 11 : 12;

  const handleChangeLearningMode = () => {
    setSelectedLearningMode(learningMode === 1 ? 2 : 1);
  };
  const [fromDateVisible, setFromDateVisibleVisible] = useState(false);
  const [toDateVisible, setToDateVisible] = useState(false);
  const [fromDate, setFromDate] = useState(
    moment(userDetails.profile.created_at).format("YYYY-MM-DD"),
  );

  const [toDate, setToDate] = useState(moment().format("YYYY-MM-DD"));
  const [menuItemEvent, setMenuItemEvent] = useState(null);
  const handleAssignEvent = e => {
    setMenuItemEvent((e.domEvent = e));
  };
  const handleChangeToDate = async (e, selectedDate, selectedCase, c, d) => {
    c === "From Date"
      ? setFromDate(
          selectedDate ? moment(selectedDate).format("YYYY-MM-DD") : undefined,
        )
      : setToDate(
          selectedDate ? moment(selectedDate).format("YYYY-MM-DD") : undefined,
        );
    setFromDateVisibleVisible(false);
    setToDateVisible(false);
  };

  useEffect(() => {
    dispatch(
      getGrowthGaugeReport(
        learningMode,
        moment(toDate).format("YYYY-MM-DD"),
        moment(fromDate).format("YYYY-MM-DD"),
      ),
    );
    !classCodeList.length && dispatch(getClassCodeList());
  }, [dispatch, learningMode]); // eslint-disable-line

  const handleGenerateReport = () => {
    dispatch(
      getGrowthGaugeReport(
        learningMode,
        moment(toDate).format("YYYY-MM-DD"),
        moment(fromDate).format("YYYY-MM-DD"),
        selectedClassCode,
      ),
    );
  };

  const handleChangeExtraCustomDate = async (e, selectedCase, idFromDate) => {
    e.stopPropagation();
    e.isPropagationStopped();
    const renderState = idFromDate === "from" ? setFromDate : setToDate;

    switch (selectedCase) {
      case "Initial":
        renderState(
          moment(userDetails.profile.created_at).format("YYYY-MM-DD"),
        );
        break;
      case "Yesterday":
        renderState(
          moment()
            .subtract(1, "days")
            .format("YYYY-MM-DD"),
        );
        break;
      case "1 week ago":
        renderState(
          moment()
            .subtract(7, "d")
            .format("YYYY-MM-DD"),
        );
        break;
      case "2 weeks ago":
        renderState(
          moment()
            .subtract(14, "d")
            .format("YYYY-MM-DD"),
        );
        break;
      case "1 month ago":
        renderState(
          moment()
            .subtract(30, "d")
            .format("YYYY-MM-DD"),
        );
        break;

      default:
    }

    setFromDateVisibleVisible(false);
    setToDateVisible(false);
  };

  const renderExtraFooterFromDate = mode => (
    <>
      <div
        className="extra-footer-date no-top-border"
        onClick={e => handleChangeExtraCustomDate(e, "Initial", "from")}
      >
        Initial
      </div>
      <div
        className="extra-footer-date"
        onClick={e => handleChangeExtraCustomDate(e, "Yesterday", "from")}
      >
        Yesterday
      </div>
      <div
        className="extra-footer-date"
        onClick={e => handleChangeExtraCustomDate(e, "1 week ago", "from")}
      >
        1 week ago
      </div>
      <div
        className="extra-footer-date"
        onClick={e => handleChangeExtraCustomDate(e, "2 weeks ago", "from")}
      >
        2 weeks ago
      </div>
      <div
        className="extra-footer-date"
        onClick={e => handleChangeExtraCustomDate(e, "1 month ago", "from")}
      >
        1 month ago
      </div>
    </>
  );

  const renderExtraFooterToDate = mode => (
    <>
      <div
        className="extra-footer-date no-top-border"
        onClick={e => handleChangeExtraCustomDate(e, "Yesterday", "to")}
      >
        Yesterday
      </div>
      <div
        className="extra-footer-date"
        onClick={e => handleChangeExtraCustomDate(e, "1 week ago", "to")}
      >
        1 week ago
      </div>
      <div
        className="extra-footer-date"
        onClick={e => handleChangeExtraCustomDate(e, "2 weeks ago", "to")}
      >
        2 weeks ago
      </div>
      <div
        className="extra-footer-date"
        onClick={e => handleChangeExtraCustomDate(e, "1 month ago", "to")}
      >
        1 month ago
      </div>
    </>
  );

  return (
    <>
      <>
        {/* <!-- Add or remove " mobile-menu-open " className for toggle aside for mobile and ipad only  --> */}
        <section className="growth-gauge-layout growth-gauge-twoLayout-popup-layout">
          {/* <!-- Popup modal --> */}
          {/* <!-- Add " open " className in backdrop and custom-popup while open  --> */}
          <div
            className={
              isShowProgressTablePopup
                ? "custom-popup open growth-gauge-twoLayout-popup ease-in-popup"
                : "custom-popup  growth-gauge-twoLayout-popup ease-in-popup"
            }
          >
            <div className="popup">
              <div className="growth-gauge-twoLayout-popup-left">
                <div className="popup-left-inner">
                  <div className="font-46 growth-gauge-twoLayout-popup-title">
                    Growth Gauge{" "}
                    <div>
                      {learningMode === 1 ? (
                        <h4 className="mode-title">Addition/Subtraction </h4>
                      ) : (
                        <h4 className="mode-title">Multiplication/Division</h4>
                      )}
                    </div>
                  </div>
                  <div className="date-selection">
                    <div className="from-date-text">
                      <div className="date-selection-legend-text">
                        {" "}
                        From Date{" "}
                      </div>
                      {"  "}
                      <DatePicker
                        size={"small"}
                        onChange={date => {
                          handleChangeToDate(
                            menuItemEvent,
                            date,
                            "Custom",
                            "From Date",
                          );
                          menuItemEvent.domEvent.stopPropagation();
                          menuItemEvent.domEvent.isPropagationStopped();
                        }}
                        onClick={e => {
                          handleAssignEvent(e);
                          setFromDateVisibleVisible(true);
                          e.stopPropagation();
                        }}
                        open={fromDateVisible}
                        format={"YYYY-MM-DD"}
                        renderExtraFooter={renderExtraFooterFromDate}
                        value={
                          fromDate ? moment(fromDate, "YYYY-MM-DD") : undefined
                        }
                      />
                    </div>
                    <div className="from-date-text">
                      <div className="date-selection-legend-text">
                        {" "}
                        To Date {"  "}
                      </div>
                      <DatePicker
                        size={"small"}
                        onChange={date => {
                          handleChangeToDate(
                            menuItemEvent,
                            date,
                            "Custom",
                            "To Date",
                          );
                          menuItemEvent.domEvent.stopPropagation();
                          menuItemEvent.domEvent.isPropagationStopped();
                        }}
                        onClick={e => {
                          handleAssignEvent(e);
                          setToDateVisible(true);
                          e.stopPropagation();
                        }}
                        open={toDateVisible}
                        format={"YYYY-MM-DD"}
                        renderExtraFooter={renderExtraFooterToDate}
                        value={
                          toDate ? moment(toDate, "YYYY-MM-DD") : undefined
                        }
                      />
                    </div>
                  </div>
                  <div className="bottom-legend-section section-exception">
                    <div className="bottom-legend">
                      <div className="bottom-legend-text">Class</div>
                    </div>
                    <Select
                      name="classCode"
                      className="form-control"
                      value={selectedClassCode}
                      options={classCodeListOption}
                      onChange={handleChangeClassCode}
                      style={{ width: 260 }}
                    >
                      {classCodeListOption}
                    </Select>{" "}
                    <div className="bottom-legend">
                      <div className="bottom-legend-text">
                        Select learning mode
                      </div>
                    </div>
                    <Select
                      name="learningMode"
                      value={learningMode}
                      options={studentLearningModeList}
                      onChange={handleChangeLearningMode}
                      placeholder="Select Learning Mode..."
                    />
                  </div>
                  <div className="generate-btn">
                    <Button
                      className="ant-btn"
                      onClick={() => handleGenerateReport()}
                    >
                      Generate New Report
                    </Button>
                  </div>
                </div>
              </div>

              {/* for teacher user added one more class for content in center */}
              <div
                className={
                  userDetails.role_name === userRole.TEACHER.role_name
                    ? "growth-gauge-twoLayout-popup-right layout-content-center"
                    : "growth-gauge-twoLayout-popup-right"
                }
              >
                {fetchingGrowthGaugeReportLoading ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "calc(100vh - 244px)",
                      width: "100%",
                    }}
                  >
                    <Loader />
                  </div>
                ) : (
                  <div className="growth-gauge-twoLayout-popup-content">
                    {/* Compare current level  with low level for show stage */}

                    <div className="level-wrapper ">
                      <div
                        className="level-title mastered"
                        style={{ opacity: 0 }}
                      >
                        <div className="level-title-text">Super-Advanced</div>
                      </div>
                      <div
                        className="question-list-wrapper"
                        style={{ display: "contents" }}
                      >
                        {" "}
                        {graduationLevel.map((lvl, i) => {
                          let level =
                            learningMode === 1
                              ? addSubLevelList[lvl.level]
                              : mulSubLevelList[lvl.level];
                          let beforeResult = lvl.result.beforeResult.result;
                          let afterResult = lvl.result.afterResult.result;
                          let beforeUsers = lvl.result.beforeResult.users
                            .sort((a, b) =>
                              a.last_name.localeCompare(b.last_name),
                            )
                            .map(user => (
                              // eslint-disable-next-line react/jsx-key
                              <>
                                <div className="user-text">
                                  {user.last_name + ",  " + user.first_name}
                                </div>
                                <Divider />
                              </>
                            ));
                          let afterUsers = lvl.result.afterResult.users.map(
                            user => (
                              // eslint-disable-next-line react/jsx-key
                              <>
                                <div className="user-text">
                                  {user.last_name + ",  " + user.first_name}
                                </div>
                                <Divider />
                              </>
                            ),
                          );
                          return (
                            <div
                              className="growth-gauge-bar-count mastered"
                              key={Math.random()}
                            >
                              <div className="growth-gauge-bar-button">
                                <div className="level-label mastered">
                                  {`${
                                    level.sort === "GR"
                                      ? "Graduate"
                                      : level.sort
                                  }`}
                                  <span className="level-descriptors">
                                    {level.descriptors}
                                  </span>
                                </div>
                              </div>

                              {learningMode === 1 && level.value >= 26 ? (
                                <div className="growth-gauge-bar-count-wrap">
                                  <div className="growth-gauge-bar-raw-outer-wrap">
                                    <Popover
                                      content={afterUsers}
                                      title={false}
                                      trigger="hover"
                                      overlayClassName="growth-gauge-popover-user-list"
                                    >
                                      <div
                                        className="growth-gauge-bar-raw-outer-wrap bg-green"
                                        style={{
                                          width: `${afterResult}%`,
                                        }}
                                      >
                                        <div className="user-text">
                                          {afterResult}%
                                        </div>
                                      </div>
                                    </Popover>
                                  </div>
                                  <div className="growth-gauge-bar-raw-outer-wrap">
                                    <Popover
                                      content={beforeUsers}
                                      title={false}
                                      trigger="hover"
                                      overlayClassName="growth-gauge-popover-user-list"
                                    >
                                      <div
                                        className="growth-gauge-bar-raw-outer-wrap bg-blue"
                                        style={{
                                          width: `${beforeResult}%`,
                                        }}
                                      >
                                        <div className="user-text">
                                          {beforeResult}%
                                        </div>
                                      </div>
                                    </Popover>
                                  </div>
                                </div>
                              ) : (
                                <div className="growth-gauge-bar-count-wrap">
                                  <div className="growth-gauge-bar-raw-outer-wrap">
                                    <Popover
                                      content={afterUsers}
                                      title={false}
                                      trigger="hover"
                                      overlayClassName="growth-gauge-popover-user-list"
                                    >
                                      <div
                                        className="growth-gauge-bar-raw-outer-wrap bg-green"
                                        style={{
                                          width: `${afterResult}%`,
                                        }}
                                      >
                                        <div className="user-text">
                                          {afterResult}%
                                        </div>
                                      </div>
                                    </Popover>
                                  </div>
                                  <div className="growth-gauge-bar-raw-outer-wrap">
                                    <Popover
                                      content={beforeUsers}
                                      title={false}
                                      trigger="hover"
                                      overlayClassName="growth-gauge-popover-user-list"
                                    >
                                      <div
                                        className="growth-gauge-bar-raw-outer-wrap bg-blue"
                                        style={{
                                          width: `${beforeResult}%`,
                                        }}
                                      >
                                        <div className="user-text">
                                          {beforeResult}%
                                        </div>
                                      </div>
                                    </Popover>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}{" "}
                      </div>
                    </div>

                    {+learningMode === 2 && (
                      <div className="level-wrapper ">
                        <div className="level-title mastered">
                          <div className="level-title-text">
                            Super-Duper-Advanced
                          </div>
                        </div>
                        <div className="question-list-wrapper">
                          {" "}
                          {superDuperAdvancedLevelList.map((lvl, i) => {
                            let level =
                              learningMode === 1
                                ? addSubLevelList[lvl.level]
                                : mulSubLevelList[lvl.level];
                            let beforeResult = lvl.result.beforeResult.result;
                            let afterResult = lvl.result.afterResult.result;

                            let beforeUsers = lvl.result.beforeResult.users
                              .sort((a, b) =>
                                a.last_name.localeCompare(b.last_name),
                              )
                              .map(user => (
                                // eslint-disable-next-line react/jsx-key
                                <>
                                  <div className="user-text">
                                    {user.last_name + ",  " + user.first_name}
                                  </div>
                                  <Divider />
                                </>
                              ));
                            let afterUsers = lvl.result.afterResult.users
                              .sort((a, b) =>
                                a.last_name.localeCompare(b.last_name),
                              )
                              .map(user => (
                                // eslint-disable-next-line react/jsx-key
                                <>
                                  <div className="user-text">
                                    {user.last_name + ",  " + user.first_name}
                                  </div>
                                  <Divider />
                                </>
                              ));

                            return (
                              <div
                                className="growth-gauge-bar-count mastered"
                                key={Math.random()}
                                id={`${
                                  level.value === 1 ? "active-selected" : ""
                                }`}
                              >
                                <div className="growth-gauge-bar-button">
                                  <div className="level-label mastered">
                                    {`${
                                      level.sort === "GR"
                                        ? "Graduate"
                                        : level.sort
                                    }`}
                                    <span className="level-descriptors">
                                      {level.descriptors}
                                    </span>
                                  </div>
                                </div>

                                <div className="growth-gauge-bar-count-wrap">
                                  <div className="growth-gauge-bar-raw-outer-wrap">
                                    <Popover
                                      content={afterUsers}
                                      title={false}
                                      trigger="hover"
                                      overlayClassName="growth-gauge-popover-user-list"
                                    >
                                      <div
                                        className="growth-gauge-bar-raw-outer-wrap bg-green"
                                        style={{
                                          width: `${afterResult}%`,
                                        }}
                                      >
                                        <div className="user-text">
                                          {afterResult}%
                                        </div>
                                      </div>
                                    </Popover>
                                  </div>
                                  <div className="growth-gauge-bar-raw-outer-wrap">
                                    <Popover
                                      content={beforeUsers}
                                      title={false}
                                      trigger="hover"
                                      overlayClassName="growth-gauge-popover-user-list"
                                    >
                                      <div
                                        className="growth-gauge-bar-raw-outer-wrap bg-blue"
                                        style={{
                                          width: `${beforeResult}%`,
                                        }}
                                      >
                                        <div className="user-text">
                                          {beforeResult}%
                                        </div>
                                      </div>
                                    </Popover>
                                  </div>
                                </div>
                              </div>
                            );
                          })}{" "}
                        </div>
                      </div>
                    )}

                    <div className="level-wrapper ">
                      <div className="level-title mastered">
                        <div className="level-title-text">Super-Advanced</div>
                      </div>
                      <div className="question-list-wrapper">
                        {" "}
                        {superAdvancedLevelList.map((lvl, i) => {
                          let level =
                            learningMode === 1
                              ? addSubLevelList[lvl.level]
                              : mulSubLevelList[lvl.level];
                          let beforeResult = lvl.result.beforeResult.result;
                          let afterResult = lvl.result.afterResult.result;
                          let beforeUsers = lvl.result.beforeResult.users
                            .sort((a, b) =>
                              a.last_name.localeCompare(b.last_name),
                            )
                            .map(user => (
                              // eslint-disable-next-line react/jsx-key
                              <>
                                <div className="user-text">
                                  {user.last_name + ",  " + user.first_name}
                                </div>
                                <Divider />
                              </>
                            ));
                          let afterUsers = lvl.result.afterResult.users
                            .sort((a, b) =>
                              a.last_name.localeCompare(b.last_name),
                            )
                            .map(user => (
                              // eslint-disable-next-line react/jsx-key
                              <>
                                <div className="user-text">
                                  {user.last_name + ",  " + user.first_name}
                                </div>
                                <Divider />
                              </>
                            ));

                          return (
                            <div
                              className="growth-gauge-bar-count mastered"
                              key={Math.random()}
                            >
                              <div className="growth-gauge-bar-button">
                                <div className="level-label mastered">
                                  {`${
                                    level.sort === "GR"
                                      ? "Graduate"
                                      : level.sort
                                  }`}
                                  <span className="level-descriptors">
                                    {level.descriptors}
                                  </span>
                                </div>
                              </div>

                              {learningMode === 1 &&
                              level.value >= basicLevelCount ? (
                                <div className="growth-gauge-bar-count-wrap">
                                  <div className="growth-gauge-bar-raw-outer-wrap">
                                    <Popover
                                      content={afterUsers}
                                      title={false}
                                      trigger="hover"
                                      overlayClassName="growth-gauge-popover-user-list"
                                    >
                                      <div
                                        className="growth-gauge-bar-raw-outer-wrap bg-green"
                                        style={{
                                          width: `${afterResult}%`,
                                        }}
                                      >
                                        <div className="user-text">
                                          {afterResult}%
                                        </div>
                                      </div>
                                    </Popover>
                                  </div>
                                  <div className="growth-gauge-bar-raw-outer-wrap">
                                    <Popover
                                      content={beforeUsers}
                                      title={false}
                                      trigger="hover"
                                      overlayClassName="growth-gauge-popover-user-list"
                                    >
                                      <div
                                        className="growth-gauge-bar-raw-outer-wrap bg-blue"
                                        style={{
                                          width: `${beforeResult}%`,
                                        }}
                                      >
                                        <div className="user-text">
                                          {beforeResult}%
                                        </div>
                                      </div>
                                    </Popover>
                                  </div>
                                </div>
                              ) : (
                                <div className="growth-gauge-bar-count-wrap">
                                  <div className="growth-gauge-bar-raw-outer-wrap">
                                    <Popover
                                      content={afterUsers}
                                      title={false}
                                      trigger="hover"
                                      overlayClassName="growth-gauge-popover-user-list"
                                    >
                                      <div
                                        className="growth-gauge-bar-raw-outer-wrap bg-green"
                                        style={{
                                          width: `${afterResult}%`,
                                        }}
                                      >
                                        <div className="user-text">
                                          {afterResult}%
                                        </div>
                                      </div>
                                    </Popover>
                                  </div>
                                  <div className="growth-gauge-bar-raw-outer-wrap">
                                    <Popover
                                      content={beforeUsers}
                                      title={false}
                                      trigger="hover"
                                      overlayClassName="growth-gauge-popover-user-list"
                                    >
                                      <div
                                        className="growth-gauge-bar-raw-outer-wrap bg-blue"
                                        style={{
                                          width: `${beforeResult}%`,
                                        }}
                                      >
                                        <div className="user-text">
                                          {beforeResult}%
                                        </div>
                                      </div>
                                    </Popover>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}{" "}
                      </div>
                    </div>

                    <div className="level-wrapper ">
                      <div className="level-title mastered">
                        <div className="level-title-text">Advanced</div>
                      </div>
                      <div className="question-list-wrapper">
                        {" "}
                        {advancedLevelList.map((lvl, i) => {
                          let level =
                            learningMode === 1
                              ? addSubLevelList[lvl.level]
                              : mulSubLevelList[lvl.level];
                          let beforeResult = lvl.result.beforeResult.result;
                          let afterResult = lvl.result.afterResult.result;

                          let beforeUsers = lvl.result.beforeResult.users
                            .sort((a, b) =>
                              a.last_name.localeCompare(b.last_name),
                            )
                            .map(user => (
                              // eslint-disable-next-line react/jsx-key
                              <>
                                <div className="user-text">
                                  {user.last_name + ",  " + user.first_name}
                                </div>
                                <Divider />
                              </>
                            ));
                          let afterUsers = lvl.result.afterResult.users
                            .sort((a, b) =>
                              a.last_name.localeCompare(b.last_name),
                            )
                            .map(user => (
                              // eslint-disable-next-line react/jsx-key
                              <>
                                <div className="user-text">
                                  {user.last_name + ",  " + user.first_name}
                                </div>
                                <Divider />
                              </>
                            ));

                          return (
                            <div
                              className="growth-gauge-bar-count mastered"
                              key={Math.random()}
                              id={`${
                                level.value === 1 ? "active-selected" : ""
                              }`}
                            >
                              <div className="growth-gauge-bar-button">
                                <div className="level-label mastered">
                                  {`${
                                    level.sort === "GR"
                                      ? "Graduate"
                                      : level.sort
                                  }`}
                                  <span className="level-descriptors">
                                    {level.descriptors}
                                  </span>
                                </div>
                              </div>

                              <div className="growth-gauge-bar-count-wrap">
                                <div className="growth-gauge-bar-raw-outer-wrap">
                                  <Popover
                                    content={afterUsers}
                                    title={false}
                                    trigger="hover"
                                    overlayClassName="growth-gauge-popover-user-list"
                                  >
                                    <div
                                      className="growth-gauge-bar-raw-outer-wrap bg-green"
                                      style={{
                                        width: `${afterResult}%`,
                                      }}
                                    >
                                      <div className="user-text">
                                        {afterResult}%
                                      </div>
                                    </div>
                                  </Popover>
                                </div>
                                <div className="growth-gauge-bar-raw-outer-wrap">
                                  <Popover
                                    content={beforeUsers}
                                    title={false}
                                    trigger="hover"
                                    overlayClassName="growth-gauge-popover-user-list"
                                  >
                                    <div
                                      className="growth-gauge-bar-raw-outer-wrap bg-blue"
                                      style={{
                                        width: `${beforeResult}%`,
                                      }}
                                    >
                                      <div className="user-text">
                                        {beforeResult}%
                                      </div>
                                    </div>
                                  </Popover>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="level-wrapper ">
                      <div className="level-title mastered">
                        <div className="level-title-text">Basic Part 2</div>
                      </div>
                      <div className="question-list-wrapper">
                        {" "}
                        {basicLevelList.map((lvl, i) => {
                          let level =
                            learningMode === 1
                              ? addSubLevelList[lvl.level]
                              : mulSubLevelList[lvl.level];
                          let beforeResult = lvl.result.beforeResult.result;
                          let afterResult = lvl.result.afterResult.result;

                          let beforeUsers = lvl.result.beforeResult.users
                            .sort((a, b) =>
                              a.last_name.localeCompare(b.last_name),
                            )
                            .map(user => (
                              // eslint-disable-next-line react/jsx-key
                              <>
                                <div className="user-text">
                                  {user.last_name + ",  " + user.first_name}
                                </div>
                                <Divider />
                              </>
                            ));
                          let afterUsers = lvl.result.afterResult.users
                            .sort((a, b) =>
                              a.last_name.localeCompare(b.last_name),
                            )
                            .map(user => (
                              // eslint-disable-next-line react/jsx-key
                              <>
                                <div className="user-text">
                                  {user.last_name + ",  " + user.first_name}
                                </div>
                                <Divider />
                              </>
                            ));

                          return (
                            <div
                              className="growth-gauge-bar-count mastered"
                              key={Math.random()}
                              id={`${
                                level.value === 1 ? "active-selected" : ""
                              }`}
                            >
                              <div className="growth-gauge-bar-button">
                                <div className="level-label mastered">
                                  {`${
                                    level.sort === "GR"
                                      ? "Graduate"
                                      : level.sort
                                  }`}
                                  <span className="level-descriptors">
                                    {level.descriptors}
                                  </span>
                                </div>
                              </div>

                              <div className="growth-gauge-bar-count-wrap">
                                <div className="growth-gauge-bar-raw-outer-wrap">
                                  <Popover
                                    content={afterUsers}
                                    title={false}
                                    trigger="hover"
                                    overlayClassName="growth-gauge-popover-user-list"
                                  >
                                    <div
                                      className="growth-gauge-bar-raw-outer-wrap bg-green"
                                      style={{
                                        width: `${afterResult}%`,
                                      }}
                                    >
                                      <div className="user-text">
                                        {afterResult}%
                                      </div>
                                    </div>
                                  </Popover>
                                </div>
                                <div className="growth-gauge-bar-raw-outer-wrap">
                                  <Popover
                                    content={beforeUsers}
                                    title={false}
                                    trigger="hover"
                                    overlayClassName="growth-gauge-popover-user-list"
                                  >
                                    <div
                                      className="growth-gauge-bar-raw-outer-wrap bg-blue"
                                      style={{
                                        width: `${beforeResult}%`,
                                      }}
                                    >
                                      <div className="user-text">
                                        {beforeResult}%
                                      </div>
                                    </div>
                                  </Popover>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="level-wrapper ">
                      <div className="level-title mastered">
                        <div className="level-title-text">Basic Part 1</div>
                      </div>
                      <div className="question-list-wrapper">
                        {lowerBasicLevel.map((lvl, i) => {
                          let level =
                            learningMode === 1
                              ? addSubLevelList[lvl.level]
                              : mulSubLevelList[lvl.level];
                          let beforeResult = lvl.result.beforeResult.result;
                          let afterResult = lvl.result.afterResult.result;
                          let beforeUsers = lvl.result.beforeResult.users
                            .sort((a, b) =>
                              a.last_name.localeCompare(b.last_name),
                            )
                            .map(user => (
                              // eslint-disable-next-line react/jsx-key
                              <div className="user-text">
                                {user.last_name + ",  " + user.first_name}
                                <Divider />
                              </div>
                            ));
                          let afterUsers = lvl.result.afterResult.users
                            .sort((a, b) =>
                              a.last_name.localeCompare(b.last_name),
                            )
                            .map(user => (
                              // eslint-disable-next-line react/jsx-key
                              <div className="user-text">
                                {user.last_name + ",  " + user.first_name}
                                <Divider />
                              </div>
                            ));

                          return (
                            <div
                              className="growth-gauge-bar-count mastered"
                              key={Math.random()}
                              id={`${
                                level.value === 1 ? "active-selected" : ""
                              }`}
                            >
                              <div className="growth-gauge-bar-button">
                                <div className="level-label mastered">
                                  {`${
                                    level.sort === "GR"
                                      ? "Graduate"
                                      : level.sort
                                  }`}
                                  <span className="level-descriptors">
                                    {level.descriptors}
                                  </span>
                                </div>
                              </div>

                              <div className="growth-gauge-bar-count-wrap">
                                <div className="growth-gauge-bar-raw-outer-wrap">
                                  <Popover
                                    content={afterUsers}
                                    title={false}
                                    trigger="hover"
                                    overlayClassName="growth-gauge-popover-user-list"
                                  >
                                    <div
                                      className="growth-gauge-bar-raw-outer-wrap bg-green"
                                      style={{
                                        width: `${afterResult}%`,
                                      }}
                                    >
                                      <div className="user-text">
                                        {afterResult}%
                                      </div>
                                    </div>
                                  </Popover>
                                </div>
                                <div className="growth-gauge-bar-raw-outer-wrap">
                                  <Popover
                                    content={beforeUsers}
                                    title={false}
                                    trigger="hover"
                                    overlayClassName="growth-gauge-popover-user-list"
                                  >
                                    <div
                                      className="growth-gauge-bar-raw-outer-wrap bg-blue"
                                      style={{
                                        width: `${beforeResult}%`,
                                      }}
                                    >
                                      <div className="user-text">
                                        {beforeResult}%
                                      </div>
                                    </div>
                                  </Popover>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="level-wrapper ">
                      <div className="level-title disable">
                        <div className="level-title-text"></div>
                      </div>
                      <div className="question-list-wrapper">
                        {placementTestResult.map((lvl, i) => {
                          let beforeResult = lvl.result.beforeResult.result;
                          let afterResult = lvl.result.afterResult.result;
                          let beforeUsers = lvl.result.beforeResult.users
                            .sort((a, b) =>
                              a.profile.last_name.localeCompare(
                                b.profile.last_name,
                              ),
                            )
                            .map(user => (
                              // eslint-disable-next-line react/jsx-key
                              <div className="user-text">
                                {user.profile.last_name +
                                  ",  " +
                                  user.profile.first_name}
                                <Divider />
                              </div>
                            ));
                          let afterUsers = lvl.result.afterResult.users
                            .sort((a, b) =>
                              a.profile.last_name.localeCompare(
                                b.profile.last_name,
                              ),
                            )
                            .map(user => (
                              // eslint-disable-next-line react/jsx-key
                              <div className="user-text">
                                {user.profile.last_name +
                                  ",  " +
                                  user.profile.first_name}
                                <Divider />
                              </div>
                            ));

                          return (
                            <div
                              className="growth-gauge-bar-count mastered"
                              key={Math.random()}
                            >
                              <div className="growth-gauge-bar-button">
                                <div className="not-yet-label mastered">
                                  {/* <span className="level-descriptors"> */}
                                  <p
                                    className="font-15"
                                    style={{ marginBottom: "0px" }}
                                  >
                                    Not yet taken
                                  </p>
                                  placement test
                                  {/* </span>{" "}/ */}
                                </div>
                              </div>

                              <div className="growth-gauge-bar-count-wrap">
                                <div className="growth-gauge-bar-raw-outer-wrap">
                                  <Popover
                                    content={afterUsers}
                                    title={false}
                                    trigger="hover"
                                    overlayClassName="growth-gauge-popover-user-list"
                                  >
                                    <div
                                      className="growth-gauge-bar-raw-outer-wrap bg-green"
                                      style={{
                                        width: `${afterResult}%`,
                                      }}
                                    >
                                      <div className="user-text">
                                        {afterResult}%
                                      </div>
                                    </div>
                                  </Popover>
                                </div>
                                <div className="growth-gauge-bar-raw-outer-wrap">
                                  <Popover
                                    content={beforeUsers}
                                    title={false}
                                    trigger="hover"
                                    overlayClassName="growth-gauge-popover-user-list"
                                  >
                                    <div
                                      className="growth-gauge-bar-raw-outer-wrap bg-blue"
                                      style={{
                                        width: `${beforeResult}%`,
                                      }}
                                    >
                                      <div className="user-text">
                                        {beforeResult}%
                                      </div>
                                    </div>
                                  </Popover>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="level-wrapper ">
                      <div className="level-title disable">
                        <div className="level-title-text"></div>
                      </div>
                      <div className="question-list-wrapper">
                        <div
                          className="growth-gauge-bar-count mastered"
                          key={Math.random()}
                        >
                          <div className="growth-gauge-bar-button">
                            <div className="level-label mastered">Keys</div>
                          </div>

                          <div className="growth-gauge-bar-count-wrap">
                            <div className="growth-gauge-bar-raw-outer-wrap">
                              <div
                                className="growth-gauge-bar-raw-outer-wrap bg-green"
                                style={{
                                  width: `${100}%`,
                                }}
                              >
                                <div className="user-text">
                                  After ({moment(toDate).format("DD MMM YY")})
                                </div>
                              </div>
                            </div>
                            <div className="growth-gauge-bar-raw-outer-wrap">
                              <div
                                className="growth-gauge-bar-raw-outer-wrap bg-blue"
                                style={{
                                  width: `${100}%`,
                                }}
                              >
                                <div className="user-text">
                                  Before ({moment(fromDate).format("DD MMM YY")}
                                  )
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {userDetails.role_name === userRole.TEACHER.role_name ? (
                  <span className="close" onClick={() => handleClose()}>
                    &times;
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <div
            className={
              isShowProgressTablePopup
                ? "growth-gauge-twoLayout-popup-backface open"
                : "growth-gauge-twoLayout-popup-backface "
            }
          ></div>
        </section>
      </>
    </>
  );
};

export default GrowthGauge;
