import React from 'react';
import "./SorryPopupDob.css";
import { Modal} from 'react-bootstrap';
 
function SorryPopupDob({ show, onHide }) {
  return (
    <Modal show={show} onHide={onHide} size="lg">
      {/* <Modal.Header closeButton>
        
      </Modal.Header> */}
      <Modal.Body className="text-center">
        {/* Your modal content goes here */}
        <h1 className="text-center sorryPopupHeading AthleticsFont">Sorry!</h1>
        <p className="text-center sorryPopupDescription AthleticsFont">
          'Sorry as you are under 18 we unfortunately can't help you yet'
        </p>
        <button
          className="btn btn-default sorryPopupButton AthleticsFont"
          onClick={onHide}
        >
          Continue
        </button>
      </Modal.Body>
    </Modal>
  );
}

export default SorryPopupDob;
