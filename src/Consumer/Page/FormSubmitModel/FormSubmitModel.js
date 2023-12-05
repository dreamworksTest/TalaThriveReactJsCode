import React from 'react';
import "./FormSubmitModel.css"
import { Modal} from 'react-bootstrap';

const FormSubmitModel = ({message,show,onHide}) => {
  return (
    <Modal show={show} onHide={onHide}>
      {/* <Modal.Header closeButton>
        
      </Modal.Header> */}
      <Modal.Body className='text-center mainCommonModalBackground'>
        {/* Your modal content goes here */}
       {/* <h1 className='text-center sorryPopupHeading AthleticsFont'>Sorry!</h1>
       <p className='text-center sorryPopupDescription AthleticsFont'>Unfortunately Tala Thrive is not available in your location yet  
We hope to be there soon!</p>
<button className='btn btn-default sorryPopupButton AthleticsFont'>Continue</button> */}
    <div className="container passwordchangedcontainer ">
              <img className='mainCommonModalImage'
                height="60"
                width="60"
                alt=""
                // src="../../assets/images/gotMailImages/gotMail.png"
                src='../../assets/images/passwordChangedImages/success.png'
              />
              <br />
              {/* <h2 className="mainCommonModaltitle AthleticsFont">You've got mail!</h2> */}
              <h2 className="mainCommonModaltitle AthleticsFont">Successful</h2>
              <p className="mainCommonModalDescription AthleticsFont">
                {/* We've sent you an email - if you don't <br /> see it, please
                check your spam folder */}
                {message}
              </p>
              <button className='btn btn-default sorryPopupButton AthleticsFont' onClick={onHide}>OK</button>
              {/* <p className="loginlink AthleticsFont" onClick={onHide}>
                ok
                Not Received? <span>Resend</span>
              </p> */}
            </div>
      </Modal.Body>
      
    </Modal>
  )
}

export default FormSubmitModel