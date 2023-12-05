import React from "react";
import "./InformationModalComponent.css";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

const InformationModalComponent = ({ show, onHide }) => {
  const handleContinue = () => {
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} dialogClassName="custom-modal">
      <Modal.Body>
        {/* Body content goes here */}
        <h3 className="informationModalTitle AthleticsFont">
          Your information is safe with us
        </h3>
        <br />
        <p className="informationModalDescription AthleticsFont">
          The information you provide will only be used for the purposes of
          allowing for better matches with clients. Only Tala Thrive staff will
          have access to this information, and your responses will be kept
          private and secure.
          <br /> <br />
          The information will not be used for any discriminatory purpose. Your
          information will be saved only at the end of the onboarding so please
          go through all questions and save at the end.
          <br />
          <br />
          You can change this information at any point for any reason, or ask to
          have your information deleted. For more information{" "}
          <Link
            to="mailto:support@talathrive.com"
            className="AthleticsFont contactuslink"
          >
            contact us here
          </Link>
        </p>
        {/* Other content if needed */}
        <br />
        <button
          type="submit"
          class="btn btn-primary btn-block my-4 py-3 mainmodalcontinuebutton OutfitFont"
          onClick={handleContinue}
        >
          Continue
        </button>
      </Modal.Body>
    </Modal>
  );
};

export default InformationModalComponent;
