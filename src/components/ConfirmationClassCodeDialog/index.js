import React from "react";
import Button from "components/Button";
import { Modal } from "antd";
import "assets/sass/components/button-ant.scss";

function ConfirmationClassCodeDialog(props) {
  const {
    activeClassCode,
    loading,
    closeConfirmationDialog,
    success,
    open,
  } = props;

  //Close popup
  const handleCloseDialog = () => {
    closeConfirmationDialog();
  };

  //Delete User Api Call
  const handleDeleteClassCode = () => {
    success();
  };

  return (
    <>
      <>
        <Modal
          visible={open}
          title="Are you sure?"
          // title={
          //   <div className="popup-header">
          //     <h3 className="popup-title">Are you sure?</h3>
          //   </div>
          // }
          // destroyOnClose={true}
          // onOk={() => handleCloseDialog()}
          onCancel={() => handleCloseDialog()}
          // closable={false}
          // closeIcon={
          //   <span className="close" onClick={() => handleCloseDialog()}>
          //     <i className="icon-close" aria-hidden="true"></i>
          //   </span>
          // }
          footer={null}
          key="modal"
        >
          <div className="popup-content">
            <h4 style={{ marginLeft: "15px" }} className="popup-sub-title">
              Are you sure you wish to delete
              <b>{` ${activeClassCode.name}`}</b>?
            </h4>
          </div>
          <div style={{ height: "24px" }}></div>
          <div
            style={{
              position: "absolute",
              width: "100%",
              right: "0",
              // borderBottom: "1px solid #f0f0f0",
            }}
          ></div>
          <div className="popup-footer">
            <div className="button-wrap">
              <div className="button-cols">
                <Button
                  type="button"
                  disabled={loading}
                  className="button"
                  name={"No, cancel"}
                  onClick={() => handleCloseDialog()}
                ></Button>
              </div>
              <div className="button-cols">
                <Button
                  disabled={loading}
                  type="button"
                  className="button-secondary"
                  name={"Yes, delete"}
                  onClick={() => handleDeleteClassCode()}
                ></Button>
              </div>
            </div>
          </div>
        </Modal>
      </>
    </>
  );
}

export default ConfirmationClassCodeDialog;

// import React from "react";
// import Button from "components/Button";

// function ConfirmationClassCodeDialog(props) {
//   const { activeClassCode, loading, closeConfirmationDialog, success } = props;

//   //Close popup
//   const handleCloseDialog = () => {
//     closeConfirmationDialog();
//   };

//   //Delete User Api Call
//   const handleDeleteClassCode = () => {
//     success();
//   };

//   return (
//     <>
//       <>
//         {/* <!-- Add " open " className in backdrop and custom-popup while open  --> */}
//         <div className="custom-popup open" style={{ zIndex: "1555555" }}>
//           <div className="popup">
//             <div className="popup-header">
//               <h3 className="popup-title">Are you sure? </h3>
//               <span className="close" onClick={() => handleCloseDialog()}>
//                 <i className="icon-close" aria-hidden="true"></i>
//               </span>
//             </div>

//             <div className="popup-content">
//               <h4 style={{ marginLeft: "15px" }} className="popup-sub-title">
//                 Are you sure you wish to delete
//                 <b>{` ${activeClassCode.name}`}</b>
//               </h4>
//             </div>
//             <div className="popup-footer">
//               <div className="button-wrap">
//                 <div className="button-cols">
//                   <Button
//                     type="button"
//                     disabled={loading}
//                     className="btn btn-gray"
//                     name={"No, cancel"}
//                     onClick={() => handleCloseDialog()}
//                   ></Button>
//                 </div>
//                 <div className="button-cols">
//                   <Button
//                     disabled={loading}
//                     type="button"
//                     className="btn btn-secondary"
//                     name={"Yes, delete"}
//                     onClick={() => handleDeleteClassCode()}
//                   ></Button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="popup-backface open" style={{ zIndex: "999" }}></div>
//       </>
//     </>
//   );
// }

// export default ConfirmationClassCodeDialog;
