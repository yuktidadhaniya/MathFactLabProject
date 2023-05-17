import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import ReactGA from "react-ga";
import { handleClassCodeError } from "store/action";
import { useSelector, useDispatch } from "react-redux";
import { addNewClassCode, editClassCode } from "store/action";
// import Button from "components/Button";
import { Modal, Button } from "antd";
import "assets/sass/components/button-ant.scss";

const ClassCodeDialog = props => {
  //Set Value for Edit Student
  const dispatch = useDispatch();

  const {
    open,
    isEditMode,
    loading,
    activeClassCode,

    activeClassCode: { class_code },
  } = props;

  const {
    addNewClassCodeError,
    // classCodeList,
  } = useSelector(({ classCode }) => classCode);

  const defaultValues = {
    name: "",
  };

  const handleCloseClassCodeDailog = () => {
    props.closeClassCodePopup();
  };

  const { register, handleSubmit, watch, errors, setValue } = useForm({
    defaultValues,
  });

  useEffect(() => {
    if (isEditMode) {
      setValue("name", activeClassCode.name);
    }
  }, []);

  useEffect(() => {
    dispatch(handleClassCodeError());
  }, []);

  const handleSuccess = data => {
    props.closeClassCodePopup();
    if (
      process.env.REACT_APP_ENV !== "development" ||
      process.env.REACT_APP_ENV !== "staging"
    ) {
      ReactGA.event({
        category: `${process.env.REACT_APP_ENV}: Teacher Class Event`,
        action: isEditMode
          ? `Teacher edited  class ${data.name}`
          : `Teacher added class ${data.name}`,
        label: "Teacher Dashboard",
      });
    }
  };
  const handleSubmitLoginForm = data => {
    const { name } = data;
    if (isEditMode) {
      const body = {
        name: name,

        class_code,
      };

      dispatch(editClassCode(activeClassCode.id, body, handleSuccess(data)));
    } else {
      const body = {
        classes: [
          {
            name: name,
          },
        ],
      };

      dispatch(addNewClassCode(body, handleSuccess(data)));
    }
  };

  return (
    <Modal
      className="class-code-popup"
      visible={open}
      title={isEditMode ? "Edit Class " : "New Class"}
      // destroyOnClose={true}
      onCancel={() => handleCloseClassCodeDailog()}
      // closable={false}

      footer={null}
      key="modal"
    >
      <form
        // className="popup"
        onSubmit={handleSubmit(handleSubmitLoginForm)}
      >
        <div className="popup-content">
          <div className="form-group">
            <div
              className={
                errors.name && errors.name.type === "required"
                  ? "form-input input-error"
                  : "form-input "
              }
            >
              <label className="input-label" htmlFor="name">
                Class name
              </label>
              <input
                type="text"
                id="name"
                className={
                  watch("name") ? "form-control" : "form-control input-error"
                }
                placeholder="Please enter class name"
                name="name"
                ref={register({
                  required: true,
                })}
                autoFocus
              />
              {errors.name && errors.name.type === "required" && (
                <span className="error">Please enter class name.</span>
              )}
            </div>
          </div>

          {!!addNewClassCodeError && (
            <div className="error-text" style={{ paddingBottom: "0px" }}>
              <span>{addNewClassCodeError}</span>
            </div>
          )}
        </div>
        <div style={{ height: "24px" }}></div>
        <div
          style={{
            position: "absolute",
            width: "100%",
            right: "0",
            borderBottom: "1px solid #f0f0f0",
          }}
        ></div>
        <div className="popup-footer">
          <div className="button-wrap">
            <div className="button-cols">
              <div className="button-cols">
                <Button
                  size="small"
                  onClick={() => handleCloseClassCodeDailog()}
                  disabled={loading}
                >
                  Cancel
                </Button>
              </div>
            </div>
            {isEditMode ? (
              <div className="button-cols">
                <Button
                  type="primary"
                  size="small"
                  htmlType="submit"
                  disabled={loading}
                >
                  Save
                </Button>
              </div>
            ) : (
              <div className="button-cols">
                <Button
                  type="primary"
                  htmlType="submit"
                  size="small"
                  disabled={loading}
                >
                  Create
                </Button>
              </div>
            )}
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default ClassCodeDialog;
