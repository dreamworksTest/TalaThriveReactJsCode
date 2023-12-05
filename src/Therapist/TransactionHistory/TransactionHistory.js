import React, { useEffect, useState } from 'react'
import "./TransactionHistory.css";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";

 

const TransactionHistory = () => {
      const navigate = useNavigate();
      const role = localStorage.getItem("role");
      const [selectedDates, setSelectedDates] = useState({ startDate: null, endDate: null,});
  
    const handleDateChange = (event, picker) => {
      setSelectedDates({
        startDate: picker.startDate,
        endDate: picker.endDate,
      });
    };
    const formatDateRange = () => {
      if (selectedDates.startDate && selectedDates.endDate) {
        const start = selectedDates.startDate.format("DD MM YYYY");
        const end = selectedDates.endDate.format("DD MM YYYY");
        return `${start} - ${end}`;
      }
      return "18 Jul 2023- 18 Oct 2023";
    };


   

      useEffect(() => {
        if (role !== "therapist" && role !== "coach") {
          navigate("/login");
        }
      }, [navigate, role]);
    
  return (
    <div>
      {role === "therapist" || role === "coach" ? (
        <>
          <Header />
          <div className="container-fluid page-body-wrapper heightByContent">
            <div className="main-panel">
              <div className="container mt-5 transactionSection">
                <div className="row appointmentSectionRow">
                  <div className="col-md-12  justify-content-center align-items-center appointmentMainColumn">
                    <div>
                      <br />

                      <div className="form-group">
                        <h1 className="OutfitFont mainAppointmentTitle">
                          Transaction history
                        </h1>
                      </div>
                      <div className="form-group">
                        {/* <DateRangePicker onApply={handleDateChange}>
        <button>
          <div>
            <span>Select Date Range</span>
          </div>
          <i className="glyphicon glyphicon-calendar"></i>
        </button>
      </DateRangePicker> */}

                        <DateRangePicker onApply={handleDateChange}>
                          <button className="datepickerButton OutfitFont">
                            <div>
                              <span>{formatDateRange()}</span>
                            </div>
                            <img
                              src="../assets/images/transaction/calender.png"
                              alt="Calendar Icon"
                            />
                          </button>
                        </DateRangePicker>
                        {/* <div>
        {selectedDates.startDate && selectedDates.endDate && (
          <p>
            You selected the date range from {selectedDates.startDate.format('LL')} to{' '}
            {selectedDates.endDate.format('LL')}
          </p>
        )}
      </div> */}
                      </div>

                      <div className="form-group">
                        {/* <ul className="nav nav-tabs" id="myTab" role="tablist">
    <li className="nav-item">
      <Link className="nav-link active" id="tab1-tab" data-toggle="tab" to="#tab1" role="tab" aria-controls="tab1" aria-selected="true">Today</Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link" id="tab2-tab" data-toggle="tab" to="#tab2" role="tab" aria-controls="tab2" aria-selected="false">Upcoming</Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link" id="tab3-tab" data-toggle="tab" to="#tab3" role="tab" aria-controls="tab3" aria-selected="false">Completed</Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link" id="tab4-tab" data-toggle="tab" to="#tab4" role="tab" aria-controls="tab4" aria-selected="false">Cancelled</Link>
    </li>
  </ul> */}
                      </div>

                      <div className="table-responsive">
                        <table className="table appointmentTable">
                          <thead>
                            <tr>
                              <th className="OutfitFont">Transaction ID</th>
                              <th className="OutfitFont">Session date</th>
                              <th className="OutfitFont">Customer name</th>
                              <th className="OutfitFont">Paid out date</th>
                              <th className="OutfitFont">Amount</th>
                              <th className="OutfitFont">Download receipt</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="OutfitFont">24525235235</td>
                              <td className="OutfitFont">18 Jul 2023</td>
                              <td className="OutfitFont">
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <img
                                    src="../assets/images/appointments/tableuser.png"
                                    alt="Profile"
                                    width="50"
                                    height="50"
                                  />
                                  <span style={{ marginLeft: "10px" }}>
                                    John Doe
                                  </span>
                                </div>
                              </td>

                              <td className="OutfitFont">18 Jul 2023</td>
                              <td className="OutfitFont">$233</td>
                              <td className="OutfitFont">
                                <button className="btn btn-default mr-2 appointmentButton transactionDetailButton OutfitFont">
                                  <div className="button-content">
                                    <img
                                      src="../assets/images/transaction/Vector.png"
                                      alt="Download"
                                      className="button-image"
                                    />
                                    <span className="button-text">Download</span>
                                  </div>
                                </button>
                              </td>
                            </tr>
                            <tr>
                              <td className="OutfitFont">24525235235</td>
                              <td className="OutfitFont">18 Jul 2023</td>
                              <td className="OutfitFont">
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <img
                                    src="../assets/images/appointments/tableuser.png"
                                    alt="Profile"
                                    width="50"
                                    height="50"
                                  />
                                  <span style={{ marginLeft: "10px" }}>
                                    John Doe
                                  </span>
                                </div>
                              </td>

                              <td className="OutfitFont">18 Jul 2023</td>
                              <td className="OutfitFont">$233</td>
                              <td className="OutfitFont">
                                <button className="btn btn-default mr-2 appointmentButton transactionDetailButton OutfitFont">
                                  <div className="button-content">
                                    <img
                                      src="../assets/images/transaction/Vector.png"
                                      alt="Download"
                                      className="button-image"
                                    />
                                    <span className="button-text">Download</span>
                                  </div>
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <nav className="d-flex justify-content-between">
                        <div className="p-2">Showing 1 - 8 out of 50</div>
                        <ul className="pagination p-2">
                          <li className="page-item">
                            <Link className="page-link OutfitFont" to="#">
                              Prev
                            </Link>
                          </li>
                          <li className="page-item active">
                            <Link className="page-link OutfitFont" to="#">
                              1
                            </Link>
                          </li>
                          <li className="page-item">
                            <Link className="page-link OutfitFont" to="#">
                              2
                            </Link>
                          </li>
                          <li className="page-item">
                            <Link className="page-link OutfitFont" to="#">
                              3
                            </Link>
                          </li>
                          <li className="page-item">
                            <Link className="page-link OutfitFont" to="#">
                              Next
                            </Link>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default TransactionHistory;