import React from "react";
import "./PrefrencePopup.css";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

const PrefrencePopup = ({ show, onHide }) => {
  const handleContinue = () => {
    onHide();
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      dialogClassName="custom-modal mainClientInformationModal"
    >
      <Modal.Body>
        {/* Body content goes here */}
        <h3 className="informationModalTitle AthleticsFont text-center">
        Coaching or therapy?        </h3>
        <br />
        <p className="informationModalDescription AthleticsFont">
        <bolp>Coaches</bolp> focus on visioning, success, the present and moving toward the future with goal planning and other tools. An executive coach specifically works with senior leaders on goals, actions, capabilities and career progression.
          <br />
          <br />
          <bolp>Therapists</bolp> usually emphasise psychopathology, emotions and the past to understand the present, and it works more with developing skills for managing emotions or past issues.
          <br />
          <br />
       
        </p>
        {/* Other content if needed */}
       
        <button
          type="submit"
          class="btn btn-primary btn-block my-4 py-3 mainmodalcontinuebutton AthleticsFont"
          onClick={handleContinue}
        >
          Continue
        </button>
      </Modal.Body>
    </Modal>
  );
};

export default PrefrencePopup;
