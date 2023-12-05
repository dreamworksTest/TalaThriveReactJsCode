import React from "react";
import "./InformationModalComponent.css";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

const InformationModalComponent = ({ show, onHide }) => {
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
        <h3 className="informationModalTitle AthleticsFont">
          Your information is safe with us
        </h3>
        <br />
        <p className="informationModalDescription AthleticsFont">
          The information you provide will only be used for the purposes of
          allowing for better matches with therapists or coaches.
          <br />
          <br />
          Tala Thrive matches you to a therapist or coach who understands your
          culture, language and/or religion. We provide mild to moderate care,
          if one of our therapists or coaches feels as though you could benefit
          with a higher level of care we will refer you to someone for this.
          Your health is the most important to us and we want you to get the
          best care for you!
          <br />
          <br />
          Only Tala Thrive staff will have access to this information, and your
          responses will be kept private and secure.
          <br />
          <br />
          Only Tala Thrive staff will have access to this information, and your
          responses will be kept private and secure.
          <br />
          <br />
          The information will not be used for any discriminatory purpose. Your
          information will be saved after each question will be and there when
          you log in next.
          <br />
          <br />
          You can change this information at any point for any reason, or ask to
          have your information deleted. For more information{" "}
          <Link to="" className="AthleticsFont contactuslink">
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
