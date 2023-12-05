import React, { useState } from "react";
import "./BookAppointmentPopup.css";
import { Modal } from "react-bootstrap";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { bookAppointmentService, getMatchTherapistSlotService } from "../../Service/Service";
import { loadStripe } from "@stripe/stripe-js";



const BookAppointmentPopup = ({ show, onHide, therapist }) => {
  const [selectedDate, setSelectedDate] = useState();
  const [slot, setSlot] = useState([]);
  const [fees, setFees] = useState();
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [appointmentTime, setAppointmentTime] = useState("");
  const publicKey = process.env.REACT_APP_PUBLIC_KEY;

      const handleDateChange =async (date) => {
        const formattedDate = date.format("YYYY-MM-DD");
        const id = therapist.therapistId;
        try{
       const res= await getMatchTherapistSlotService(id,formattedDate);
         if(res.data.statusCode === 200){
          setSlot(res.data.data);
         }
        } catch(err){
          console.log(err)
        }
        setSelectedDate(formattedDate);
     
      };

      const handleSelect = (fees, startTime, endTime,time) => {
        setFees(fees);
        setStartTime(startTime);
        setEndTime(endTime);
        setAppointmentTime(time);
      };
 
  const handleContinue = () => {
    onHide();
  };
  
  console.log(therapist);
  
  const handleSubmit =async () => {
     try{
      const userDetails = {appointmentDate: selectedDate,startTime: startTime,endTime: endTime,amount: fees,therapistId: therapist.therapistId, appointmentTime:appointmentTime};     
      const res= await bookAppointmentService(userDetails);
      if (res.data.data.transactionId) {
        console.log(res.data);
        const stripe = await loadStripe(publicKey);
        localStorage.setItem("bookAppointmentId",res.data.data.bookAppointmentId);
        const result = await stripe.redirectToCheckout({
          sessionId: res.data.data.transactionId,
        });
        if (result.error) {
          console.error(result.error.message);
        } else {
          onCheckout && onCheckout();
        }
      }
     }catch(err){
      console.log(err);
     }
  };



  return (
    <Modal
      show={show}
      onHide={onHide}
      dialogClassName="custom-modal mainBookAppointmentModal"
    >
      <Modal.Body>
        <div className="container-fluid">
          <h3 className="bookappointmentPopupMainHeading AthleticsFont">
            Select a time with {therapist?.firstName} {therapist?.lastName}
          </h3>

          <div className="row">
            <div className="col-md-6 calenderBox">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar onChange={handleDateChange} />
              </LocalizationProvider>
            </div>
            <div className="col-md-6 BookApointmentSecondBox">
              <div className="row secondboxFirstRow">
                <div className="col-md-6 col-sm-6 availablSessionColumn1">
                  <p className="availableSessionText AthleticsFont">
                    Available sessions
                  </p>
                </div>
                <div className="col-md-6 col-sm-6">
                  <p className="availableSessionDate AthleticsFont">
                    {therapist.nextAvailable?.nextSlotDate}
                  </p>
                </div>
              </div>

              <div className="mainmainsAppointmentBookBox">
                {slot.map((slots, index) => (
                  <div className="row" key={index}>
                    <div className="col-md-4 col-sm-12 scheduleColumn1 vertical-align-center">
                      <div
                        className="column-content d-flex align-items-center"
                        style={{ paddingTop: "12px" }}
                      >
                        <p className="AthleticsFont">{slots.time}</p>
                      </div>
                    </div>

                    <div className="col-md-4 col-sm-12 scheduleColumn2 vertical-align-center">
                      <div
                        className="column-content d-flex align-items-center"
                        style={{ paddingTop: "12px" }}
                      >
                        <p className="AthleticsFont">£{slots.fees}</p>
                      </div>
                    </div>

                    <div className="col-md-4 col-sm-12 scheduleColumn3 vertical-align-center">
                      <div className="column-content d-flex align-items-center">
                        <button
                          className="btn AthleticsFont selectAppointmentForBookButton"
                          onClick={() =>
                            handleSelect(
                              slots.fees,
                              slots.startTime,
                              slots.endTime,
                              slots.time
                            )
                          }
                        >
                          Select
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add another set of rows if needed */}

              <button
                type="submit"
                className="btn btn-primary btn-block my-4 py-3 mainmodalProceedbutton AthleticsFont"
                onClick={handleSubmit}
              >
                Proceed
              </button>
            </div>
          </div>
          <div className="row">
            <p
              className="backButtonFromAppointmentModal AthleticsFont"
              onClick={handleContinue}
            >
              Back
            </p>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default BookAppointmentPopup;
