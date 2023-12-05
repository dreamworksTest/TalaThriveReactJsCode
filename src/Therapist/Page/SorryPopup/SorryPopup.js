import React from 'react';
import "./SorryPopup.css";
import { Modal} from 'react-bootstrap';
 
function SorryPopup({ show,onHide}) {
 

    

  return (
    <Modal show={show} onHide={onHide} size="lg">
      {/* <Modal.Header closeButton>
        
      </Modal.Header> */}
      <Modal.Body className='text-center'>
        {/* Your modal content goes here */}
       <h1 className='text-center sorryPopupHeading AthleticsFont'>Sorry!</h1>
       <p className='text-center sorryPopupDescription AthleticsFont'>Unfortunately Tala Thrive is not available in your location yet  
We hope to be there soon!</p>
<button className='btn btn-default sorryPopupButton AthleticsFont' onClick={onHide}>Continue</button>
      </Modal.Body>
      
    </Modal>
  );
}

export default SorryPopup;
