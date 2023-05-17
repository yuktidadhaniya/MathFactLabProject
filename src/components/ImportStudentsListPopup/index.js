import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactGA from "react-ga";
import Papa from "papaparse";
import { addNewUsers } from "store/action";
import {
  userRole,
  maxTimeoutAnswerCountList,
  studentPasswordList,
  levelLifterWhoopsiesList,
  studentSessionTimeLimitList,
} from "config/const";
import { message, Modal, Upload } from "antd";
import { randomTwoDigitNumberGeneratior } from "utils/helpers";
import { InboxOutlined } from "@ant-design/icons";
import { isEmpty, drop } from "lodash";
import sampleStudentList from "assets/xls/MathFactLab_Student_Import_Template.xlsx";

const { Dragger } = Upload;

function ImportStudentListPopup(props) {
  const { classCodeList } = useSelector(({ classCode }) => classCode);
  const { studentList: studentUserList } = useSelector(({ user }) => user);

  const [isCSVclassCreated, setIsCSVclassCreated] = useState(false);
  const [isClassCodeMissing, setIsClassCodeMissing] = useState(false);
  const [isValuesMissing, setIsValuesMissing] = useState(false);
  const [isRequiredColumnsMissing, setIsRequiredColumnsMissing] = useState(
    false,
  );
  const [isStudentMaxLimitError, setIsStudentMaxLimitError] = useState(false);
  const [isSpecialCharError, setIsSpecialCharError] = useState(false);

  const dispatch = useDispatch();

  const handleCloseDailog = () => {
    props.closePopup();
  };

  const classCodeListOption = [
    ...classCodeList.map(classCode => {
      return {
        label: `${classCode.name} - ${classCode.class_code}`,
        value: classCode.class_code,
      };
    }),
  ];

  const handleSuccess = () => {
    if (
      process.env.REACT_APP_ENV !== "development" ||
      process.env.REACT_APP_ENV !== "staging"
    ) {
      ReactGA.event({
        category: `${process.env.REACT_APP_ENV}: Teacher Student  Event`,
        action: `Teacher added students`,
        label: "Teacher Dashboard",
      });
    }
    props.closePopup();
  };

  const changeHandler = async info => {
    const { status } = info.file;

    if (status === "done") {
      if (info.file) {
        Papa.parse(info.file.originFileObj, {
          skipEmptyLines: true,
          complete: async function(results) {
            const CSVResult = results.data;

            if (CSVResult.length > 0) {
              const students = [];
              const data = CSVResult.filter(
                da => !da.slice(1).every(value => !value),
              );

              const requiredFields = [
                "Class Code",
                "Student First Name",
                "Student Last Name",
              ];
              const checkFields = requiredFields.filter(
                da => !data[2].find(field => field.includes(da)),
              );

              const studentData = drop(data, 6).map(d => {
                return {
                  class_code: d[1] || "",
                  first_name: d[2] || "",
                  last_name: d[3] || "",
                  user_name: d[4] || "",
                  password: d[5] || "",
                  learning_mode: d[6] || "",
                };
              });

              if (checkFields.length > 0) {
                setIsRequiredColumnsMissing(true);
                // setErrorMessage(
                //   checkFields.length <= 1
                //     ? `A1Please check your .csv ${checkFields.join(
                //         "",
                //       )} column is missing`
                //     : `A2Please check your .csv ${checkFields.join(
                //         " and ",
                //       )} columns is missing`,
                // );
              } else {
                setIsRequiredColumnsMissing(false);
              }
              if (isEmpty(studentData)) {
                setIsCSVclassCreated(true);
                setIsClassCodeMissing(true);
                setIsValuesMissing(true);
              } else {
                const classCodeList = classCodeListOption.map(
                  classCode => classCode.value,
                );

                const isClassCodeAvailable = studentData
                  .filter(std => !!std.class_code)
                  .every(
                    std =>
                      std.class_code && classCodeList.includes(std.class_code),
                  );

                // wrong class code available error
                if (isClassCodeAvailable) {
                  setIsCSVclassCreated(false);
                } else {
                  setIsCSVclassCreated(true);
                }

                // missing class code error
                const isMissingClassCode = studentData.some(data => {
                  return !data.class_code;
                });

                if (isMissingClassCode) {
                  setIsClassCodeMissing(true);
                } else {
                  setIsClassCodeMissing(false);
                }
                // remove spaces
                const missingValues = studentData.some(
                  data => !data.first_name.trim() || !data.last_name.trim(),
                );

                // if first name and last name value missing
                if (missingValues) {
                  setIsValuesMissing(true);
                } else {
                  setIsValuesMissing(false);
                }

                const specialCharsExAphoHyPh = /[`!@#$%^&*()_+\=\[\]{};:"\\|.<>\/?~]/; //eslint-disable-line

                const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|.<>\/?~]/; //eslint-disable-line
                // remove spaces
                const isIncludeSpecialChar = studentData.some(
                  data =>
                    specialCharsExAphoHyPh.test(data.first_name) ||
                    specialCharsExAphoHyPh.test(data.last_name) ||
                    specialChars.test(data.user_name),
                );

                if (isIncludeSpecialChar) {
                  setIsSpecialCharError(true);
                } else {
                  setIsSpecialCharError(false);
                }

                let isMaxError = false;
                if (studentData.length > 100) {
                  isMaxError = true;
                  setIsStudentMaxLimitError(true);
                } else {
                  isMaxError = false;
                  setIsStudentMaxLimitError(false);
                }
                if (
                  !missingValues &&
                  isClassCodeAvailable &&
                  isEmpty(checkFields) &&
                  !isMissingClassCode &&
                  !isIncludeSpecialChar &&
                  studentData.length &&
                  !isMaxError
                ) {
                  studentData.map(user => {
                    const updatedUserNameByFnameLname =
                      user["user_name"] === ""
                        ? user["first_name"]
                            .replace(/[^a-zA-Z0-9 ]/g, "")
                            .charAt(0)
                            .toLowerCase() +
                          user["last_name"]
                            .replace(/[^a-zA-Z0-9 ]/g, "")
                            .replaceAll(" ", "")
                            .toLowerCase()
                        : user["user_name"];
                    const sameUserNameList = studentUserList.filter(std =>
                      std["user_name"].startsWith(updatedUserNameByFnameLname),
                    );
                    const currentSameUserNameList = students.filter(std =>
                      std["user_name"].startsWith(updatedUserNameByFnameLname),
                    );
                    let maxNum = 0;
                    [...sameUserNameList, ...currentSameUserNameList].forEach(
                      std => {
                        if (+std["user_name"].replace(/^\D+/g, "") > +maxNum) {
                          maxNum = +std["user_name"].replace(/^\D+/g, "");
                        }
                      },
                    );
                    let user_name = maxNum
                      ? `${updatedUserNameByFnameLname}${maxNum + 1}`
                      : [...sameUserNameList, ...currentSameUserNameList].length
                      ? `${updatedUserNameByFnameLname}${
                          [...sameUserNameList, ...currentSameUserNameList]
                            .length
                        }`
                      : updatedUserNameByFnameLname;

                    const randomValue = Math.floor(
                      Math.random() * (studentPasswordList.length - 1 - 0) + 0,
                    );
                    const generatedPassword =
                      user.password.length >= 5
                        ? user.password
                        : studentPasswordList[randomValue] +
                          randomTwoDigitNumberGeneratior();

                    students.push({
                      user_name: user_name,
                      password: generatedPassword,
                      role_id: userRole.STUDENT.role_id,
                      profile: {
                        first_name: user["first_name"],
                        last_name: user["last_name"],
                        class_code: user["class_code"],
                        student_learning_mode_id:
                          user["learning_mode"] !== ""
                            ? +user["learning_mode"] > 0
                              ? 2
                              : 1
                            : 2,
                        auto_timeout_for_question:
                          maxTimeoutAnswerCountList[2].value * 6,
                        max_retry_count_to_attempt_question: 1,
                        session_time_limit:
                          studentSessionTimeLimitList[3].value,
                        allowed_level_lifter_whoopsies:
                          levelLifterWhoopsiesList[2].value,
                        max_timeout_correct_ans_secs:
                          maxTimeoutAnswerCountList[2].value,
                      },
                    });
                    return true;
                  });

                  dispatch(addNewUsers({ students: students }, handleSuccess));
                }
              }
            }
          },
        });
      }
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const handleReadCSVFile = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };
  return (
    <Modal
      open={true}
      footer={null}
      onCancel={() => handleCloseDailog()}
      width={"50%"}
      title={
        <>
          Import Students list <sup> Beta</sup>
        </>
      }
    >
      {/* <!-- Add " open " className in backdrop and custom-popup while open  --> */}

      <div className="import-csv-popup">
        <div className="import-csv-popup-content">
          <div className="import-csv-info">
            <div className="import-csv-info-sub-text">
              1.{" "}
              <a
                href={sampleStudentList}
                download
                style={{
                  color: "#51d69a",
                  borderBottom: "1px solid",
                  cursor: "pointer",
                }}
              >
                {" "}
                Download
              </a>{" "}
              the MathFactLab Student Import Template.
            </div>
            <div className="import-csv-info-sub-text">
              2. Complete all required fields.
            </div>
            <div className="import-csv-info-sub-text ">
              3. <span className="border-bottom">Save as CSV</span>.
            </div>
            <div className="import-csv-info-sub-text">
              4. Upload using the field below.
            </div>

            <div className="import-csv-block">
              <Dragger
                name="file"
                multiple={false}
                onChange={changeHandler}
                accept={".csv"}
                customRequest={handleReadCSVFile}
                maxCount={1}
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload.
                </p>
              </Dragger>
            </div>
            {(isRequiredColumnsMissing ||
              isCSVclassCreated ||
              isClassCodeMissing ||
              isValuesMissing ||
              isSpecialCharError) && (
              <div className="csv-error-text mt-5">
                Please check your .csv file for accuracy.
              </div>
            )}
            {isRequiredColumnsMissing && (
              <div className="csv-error-text ">You have missing columns</div>
            )}
            {isClassCodeMissing && (
              <div className="csv-error-text ">
                You have at least one missing value in the class code column.
              </div>
            )}
            {isCSVclassCreated && (
              <div className="csv-error-text ">
                You have at least one class code entered which does not exist.
              </div>
            )}
            {isValuesMissing && (
              <div className="csv-error-text ">
                You have at least one missing first and/or last name.
              </div>
            )}
            {isSpecialCharError && (
              <div className="csv-error-text ">
                You have at least one first, last name and/or username which has
                Special char.
              </div>
            )}

            {isStudentMaxLimitError && (
              <div className="csv-error-text ">
                Please limit list to 100 or less names.
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ImportStudentListPopup;
