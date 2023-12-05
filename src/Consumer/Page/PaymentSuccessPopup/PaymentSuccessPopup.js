import React from 'react';
import "./PaymentSuccessPopup.css"
import { Modal} from 'react-bootstrap';
 

const PaymentSuccessPopup = ({ message, show }) => {
 
  return (
    <Modal show={show}>
      <Modal.Body className="text-center mainCommonModalBackground">
        <div className="container passwordchangedcontainer ">
          <img
            className="mainCommonModalImage"
            height="60"
            width="60"
            alt=""
            src="../../assets/images/passwordChangedImages/success.png"
          />
          <br />

          <h2 className="mainCommonModaltitle AthleticsFont">Successful</h2>
          <p className="mainCommonModalDescription AthleticsFont">{message}</p>
            <a
              className="btn btn-default sorryPopupButton AthleticsFont"
              href="/matchTherapist"
            >
              OK
            </a>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default PaymentSuccessPopup