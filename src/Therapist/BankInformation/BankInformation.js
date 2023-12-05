import React, { useEffect, useRef, useState } from "react";
import "./BankInformation.css";
import Header from "../Header/Header";
import { AddBankDetailsService, GetBankDetailsService, UpdateImageService, getTherapistDetailsService } from "../TherapistServices/TherapistServices";
import { useNavigate } from "react-router-dom";
import SorryPopup from "../Page/SorryPopup/SorryPopup";
import FormSubmitModel from "../Page/FormSubmitModel/FormSubmitModel";

const BankInformation = ( ) => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [profileDetails, setProfileDetails] = useState({});
  const id = localStorage.getItem("id");
  const role = localStorage.getItem("role");


  const handleDocumentClick = () => {
    fileInputRef.current.click();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      updateHandleImage(file);
    }
  };

  const updateHandleImage = async (image) => {
    try {
      const formData = new FormData();
      formData.append("profileImageUrl", image);
      const res = await UpdateImageService(id, formData);
      if (res && res.data && res.data.data) {
        setProfileDetails({
          ...profileDetails,
          profileImage: res.data.data.profileImage,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const res = await getTherapistDetailsService();
        if (res && res?.data && res?.data?.data) {
          setProfileDetails(res?.data?.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchProfileImage();
  }, [setProfileDetails]);


  
  
 

  useEffect(() => {
    if (role !== "therapist" && role !== "coach") {
      navigate("/login");
    }
  }, [navigate, role]);


  const [personal, setPersonal] = useState(true);
  const [company, setCompany] = useState(false);
  const [country, setCountry] = useState("")
  const [houseNumber, setHouseNumber] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState();
  const [bankName, setBankName] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const [sortCode, setSortcode] = useState(""); 
  // const [isProfile, setIsProfile] = useState(true);
      const handlePersonalChange = () => {
        setPersonal(true);
        setCompany(false);
  
      };

      const handleCompanyChange = () => {
        setPersonal(false);
        setCompany(true);
      };
  
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const [message, setMessage] = useState("");
  
    const handleCloseModelForm = () => {
      setShowSubmitForm(false);
    };
 
  const handleSubmit =async(e) => {
    e.preventDefault();
    try {
      const userDetails = {
        isPersonal: personal,
        countryName: country,
        houseNumber: houseNumber,
        address: address,
        zipCode: pincode,
        accountName: bankName,
        accountNumber: bankAccount,
        sortCode: sortCode,
      };
      const res = await AddBankDetailsService(userDetails);
      if (res.data) {
        console.log(res.data);
        setShowSubmitForm(true);
        setMessage(res.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  }


  const [showSorryModal, setShowSorryModal] = useState(false);
  
    useEffect(() => {
      if (country === "Other") {
        setShowSorryModal(true);
      }
    }, [country]);

    const handleSorryCloseModal = () => {
      setShowSorryModal(false);
    };
  
  
    useEffect(() => {
      const getBankDetails = async () => {
        try {
          const res = await GetBankDetailsService();
          if (res && res?.data && res?.data?.data) {
            console.log(res.data);
            setPersonal(res?.data?.data.isPersonal);
            setCountry(res?.data?.data.countryName);
            setHouseNumber(res?.data?.data.houseNumber);
            setAddress(res?.data?.data.address);
            setPincode(res?.data?.data.zipCode);
            setBankAccount(res?.data?.data.accountNumber);
            setBankName(res?.data?.data.accountName);
            setSortcode(res?.data?.data.sortCode);
          } 
        } catch (error) {
          console.log(error.response);
        }
      };
      getBankDetails();
    }, [ ]);
  
  
  
  console.log(sortCode)
  


   const validateGenderAndOrientation = () => {
    if (!country || country === "Select country" || country === "Other" ||!houseNumber || !address || !pincode || !bankName || !bankAccount || !sortCode) {
      return true;
    }
    return false;
  };
 

  return (
    <>
      {role === "therapist" || role === "coach" ? (
        <>
          <Header profileDetails={profileDetails} />
          <div className="container-fluid page-body-wrapper heightByContent mainBankDetailsSection">
            <div className="main-panel">
              <div className="transactionSection">
                <div className="container align-items-center boxSectionNew d-flex align-items-center">
                  <div className="row mainRow">
                    <div className="col-md-2 mb-3 mb-md-0 position-relative">
                      <img
                        src={
                          profileDetails.profileImage
                            ? profileDetails.profileImage
                            : "../../../../assets/images/profileImage/defaultProfileImage.png"
                        }
                        alt="Profile"
                        className="img-fluid rounded-circle roundedProfileImage"
                      />
                      <div className="edit-icon" onClick={handleDocumentClick}>
                        <img
                          src="../../../../assets/images/globalImages/editButtonImage.png"
                          alt="Edit Icon"
                          style={{ width: "20px", height: "20px" }}
                        />
                      </div>
                      <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        onChange={handleImageUpload}
                      />
                    </div>
                    <div className="col-md-10">
                      <div className="profileInfo">
                        <div className="row profileinforRow">
                          <div
                            className="col-md-6 d-flex align-items-center"
                            style={{ paddingTop: "6px" }}
                          >
                            <h1 className="profileName AthleticsFont">
                              Hi {profileDetails.firstName}!
                            </h1>
                          </div>
                          <div className="col-md-6 d-flex align-items-center">
                            {/* <p className="mb-0 profileType OutfitFont">Therapist</p> */}
                          </div>
                        </div>
                        {/* <p className="mb-0 imageSectionContent AthleticsFont">
                      We prioritise the security and confidentiality of your
                      information.
                    </p> */}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="container align-items-center justify-content-center boxSectionNew boxsectionNew7 d-flex align-items-center">
                  <div className="mainBox2RowUp">
                    <div className="row mb-5 text-center">
                      {/* {role === "coach" ? (
                    <div className="col-md-4 text-left">
                      <p className="stepPTag AthleticsFont position-absolute">Step 4 of 7</p>
                    </div>
                  ) : (
                    <div className="col-md-4 text-left">
                      <p className="stepPTag AthleticsFont position-absolute">Step 4 of 6</p>
                    </div>
                  )} */}
                      <div
                        className="col-md-8 d-flex align-items-left justify-content-left"
                        style={{ paddingLeft: "0px" }}
                      ></div>
                      <p className="AthleticsFont mainContainerHeading">
                        Add your bank information
                      </p>
                      <span className="bankinfoDescription AthleticsFont">
                        Let us know where to send your earnings
                      </span>
                    </div>

                    <div className="mainbox2">
                      <div className="row">
                        <div className="col-md-8 col-sm-12">
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="radioGroup"
                              id="personalRadio"
                              value="personal"
                              onChange={handlePersonalChange}
                              defaultChecked
                            />
                            <label
                              className="form-check-label bankinforadioLabel AthleticsFont"
                              htmlFor="personalRadio"
                            >
                              Personal
                            </label>
                          </div>

                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="radioGroup"
                              id="companyRadio"
                              value="company"
                              onChange={handleCompanyChange}
                              checked={company}
                            />
                            <label
                              className="form-check-label bankinforadioLabel AthleticsFont"
                              htmlFor="companyRadio"
                            >
                              Company
                            </label>
                          </div>
                        </div>

                        <div className="col-md-4 col-sm-12">
                          <button
                            type="button"
                            className="btn btn-default appointmentButton appointmentStartButton secureButton OutfitFont disply-flex AthleticsFont"
                          >
                            <img
                              src="../../../../assets/images/bankInfoImages/secure.png"
                              alt="Secure Image"
                              className="img-fluid secureImage"
                            />
                            Secure
                          </button>
                        </div>

                        <form action="" className="bankinfoForm">
                          <h3 className="bankInfoQuestion AthleticsFont">
                            {" "}
                            Billing address
                          </h3>
                          <div className="form-group">
                            <select
                              className="form-select form-control bankforminputtext AthleticsFont"
                              value={country}
                              onChange={(e) => setCountry(e.target.value)}
                            >
                              <option>Select country</option>
                              <option timezone="Australia/Sydney">
                                Australia
                              </option>
                              <option timezone="Europe/Vienna">Austria</option>
                              <option timezone="Europe/Brussels">
                                Belgium
                              </option>
                              <option timezone="Europe/Sofia">Bulgaria</option>
                              <option timezone="Canada/Eastern">Canada</option>
                              <option timezone="Europe/Zagreb">Croatia</option>
                              <option timezone="Asia/Nicosia">Cyprus</option>
                              <option timezone="Europe/Prague">
                                Czech Republic
                              </option>
                              <option timezone="Europe/Copenhagen">
                                Denmark
                              </option>
                              <option timezone="Europe/Tallinn">Estonia</option>
                              <option timezone="Europe/Helsinki">
                                Finland
                              </option>
                              <option timezone="Europe/Paris">France</option>
                              <option timezone="Europe/Berlin">Germany</option>
                              <option timezone="Europe/Athens">Greece</option>
                              <option timezone="Europe/Budapest">
                                Hungary
                              </option>
                              <option timezone="Europe/Dublin">Ireland</option>
                              <option timezone="Europe/Rome">Italy</option>
                              <option timezone="Europe/Riga">Latvia</option>
                              <option timezone="Europe/Vilnius">
                                Lithuania
                              </option>
                              <option timezone="Europe/Luxembourg">
                                Luxembourg
                              </option>
                              <option timezone="Europe/Malta">Malta</option>
                              <option timezone="Europe/Amsterdam">
                                Netherlands
                              </option>
                              <option timezone="Pacific/Auckland">
                                New Zealand
                              </option>
                              <option timezone="Europe/Warsaw">Poland</option>
                              <option timezone="Europe/Lisbon">Portugal</option>
                              <option timezone="Europe/Bucharest">
                                Romania
                              </option>
                              <option timezone="Europe/Bratislava">
                                Slovakia
                              </option>
                              <option timezone="Europe/Ljubljana">
                                Slovenia
                              </option>
                              <option timezone="Europe/Madrid">Spain</option>
                              <option timezone="Europe/Stockholm">
                                Sweden
                              </option>
                              <option timezone="Europe/London">
                                United Kingdom
                              </option>
                              <option>Other</option>
                            </select>
                          </div>
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control bankforminputtext AthleticsFont"
                              placeholder="House number or name"
                              value={houseNumber}
                              onChange={(e) => setHouseNumber(e.target.value)}
                            />
                          </div>
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control bankforminputtext AthleticsFont"
                              placeholder="Address Line"
                              value={address}
                              onChange={(e) => setAddress(e.target.value)}
                            />
                          </div>
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control bankforminputtext AthleticsFont"
                              placeholder="Post Code/ ZIP Code"
                              value={pincode}
                              onChange={(e) => setPincode(e.target.value)}
                            />
                          </div>

                          <h3 className="bankInfoQuestion AthleticsFont bankInfoQuestion2">
                            Bank account information
                          </h3>

                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control bankforminputtext AthleticsFont"
                              placeholder="Name on account"
                              value={bankName}
                              onChange={(e) => setBankName(e.target.value)}
                            />
                          </div>
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control bankforminputtext AthleticsFont"
                              placeholder="Account number"
                              value={bankAccount}
                              onChange={(e) => setBankAccount(e.target.value)}
                            />
                          </div>
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control bankforminputtext AthleticsFont"
                              placeholder="Sort code "
                              value={sortCode}
                              onChange={(e) => setSortcode(e.target.value)}
                            />
                          </div>
                        </form>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 d-flex align-items-center talaThriveInformation">
                        {/* <p onClick={() => handleOpenInformationClick()}>
                      Why does Tala Thrive need this information?
                    </p> */}
                      </div>
                      <div
                        className="col-md-6 d-flex align-items-center"
                        style={{ textAlign: "right" }}
                      >
                        <div className="form-group w-100">
                          <button
                            type="submit"
                            onClick={handleSubmit}
                            disabled={validateGenderAndOrientation()}
                            className="btn btn-primary btn-block my-4 py-3 mainnextbutton OutfitFont"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <SorryPopup show={showSorryModal} onHide={handleSorryCloseModal} />
          <FormSubmitModel
            show={showSubmitForm}
            onHide={handleCloseModelForm}
            message={message}
          />
          <div className="container-fluid bottomImageContainer">
            <img
              src="../../../../assets/images/mainBottomBackgroundImage/bottomBackgroundImage.png"
              alt=""
            ></img>
          </div>
        </>
      ) : null}
    </>
  );
};

export default BankInformation;
