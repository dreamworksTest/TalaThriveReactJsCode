import React from "react";
import "./CancelPopup.css";
import { Modal } from "react-bootstrap";
import { cancelAppointmentService } from "../../Service/Service";
 

const CancelPopup = ({bookAppointmentId, show, onHide,setAppointmentDetails,appointmentDetails }) => {
   
  const handleContinue = () => {
    onHide();
  };

 

  const cancelAppointment = async () => {
        onHide();
   try {
     const userDetails = { bookAppointmentId: bookAppointmentId,  reason: "cancel by consumers", };
  
     const res = await cancelAppointmentService(userDetails);
     if (res.data) {
       const updatedAppointments = appointmentDetails.filter(
         (appointment) => appointment.bookAppointmentId !== bookAppointmentId
       );
        setAppointmentDetails(updatedAppointments);
      }
   } catch (error) {
     console.error("Error cancelling appointment:", error.message);
   }
 };


  return (
    <Modal
      show={show}
      onHide={onHide}
      dialogClassName="custom-modal mainClientInformationModal"
    >
      <Modal.Body>
        {/* Body content goes here */}
        <h3 className="CancelAppPopupTitle AthleticsFont text-center">
          Are you sure you want to cancel?
        </h3>
        <br />
        <p className="CancelAppPopupDescription AthleticsFont text-center">
          If cancelled within 48 hours of your session you will not be refunded
        </p>
        {/* Other content if needed */}

        <div className="row">
          <div className="col-md-6">
            <button
              type="submit"
              class="btn btn-primary btn-block my-4 py-3 cancelPopupBackButton AthleticsFont"
              onClick={handleContinue}
            >
              Back
            </button>
          </div>
          <div className="col-md-6">
            <button
              type="submit"
              class="btn btn-primary btn-block my-4 py-3 CancelPopupcancelButton AthleticsFont"
              onClick={cancelAppointment}
            >
              Yes, cancel
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CancelPopup;
