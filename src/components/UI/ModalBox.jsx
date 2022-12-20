import React from "react";
import '../../styles/modalBox.css'
const ModalBox = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal d-block" : "modal d-none";

  return (
    <div className={showHideClassName}>
      <div className="modal-container">
        <div className="modal-head"><h3>Lỗi</h3></div>
        <div className="modal-content"><h5>{children}</h5></div>
        <a href="#" className="modal-close" onClick={handleClose}>
          close
        </a>
      </div>
    </div>
  );
};

export default ModalBox;
