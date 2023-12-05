import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { updatePaymentService } from '../../Service/Service';
import PaymentFailedPopup from '../../Page/PaymentFailedPopup/PaymentFailedPopup';


const PaymentFailed = () => {
     const location = useLocation();
     const searchParams = new URLSearchParams(location.search);
     const status = searchParams.get("status");
     const sessionId = searchParams.get("session_id");
     let bookAppointmentId = localStorage.getItem("bookAppointmentId");
      bookAppointmentId = bookAppointmentId ? parseInt(bookAppointmentId, 10) : null;
     const [successPupup, setSuccessPopup] = useState(false);
     const [message, setMessage] = useState("");

      useEffect(() => {
        const updatePaymentStatus = async () => {
          const userDetails = {
            paymentStatus: status,
            transectionId: sessionId,
            bookAppointmentId: bookAppointmentId,
            reason: "Failed",
          };
          const res = await updatePaymentService(userDetails);
        
          if (res.data.statusCode === 200) {
            setMessage(res.data.message);
            setSuccessPopup(true);
          }
        };
        updatePaymentStatus();
      }, []);
  
  return (
    <div>
      <PaymentFailedPopup message={message} show={successPupup} />
    </div>
  );
}

export default PaymentFailed