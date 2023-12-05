import React, { useEffect, useRef, useState } from 'react';
import "./ConsumerWelcomePage.css";
import { useNavigate } from 'react-router-dom';
import ConsumerHeader from '../ConsumerHeader/ConsumerHeader';
import { getConsumerDetailsService, uploadConsumerProfileImage } from '../Service/Service';

const ConsumerWelcomePage = () => {
  const [profileDetails, setProfileDetails] = useState({});
  const role = localStorage.getItem("role");
  const firstName = localStorage.getItem("firstName");
  const navigate = useNavigate();
  const fileInputRef = useRef(null);


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
      formData.append("fileUrl", image);
      const res = await uploadConsumerProfileImage(formData);
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
console.log(profileDetails)


    useEffect(() => {
      const fetchProfileImage = async () => {
        try {
          const res = await getConsumerDetailsService();
          console.log(res.data);
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
       if (role !== "consumer") {
         navigate("/consumerLogin");
       }
   }, [navigate, role]);
  
  const handleForm = () =>{
    navigate("/consumerMainForm");
  }
  
  return (
    <>
      {role === "consumer" ? (
        <>
          <ConsumerHeader profileDetails={profileDetails} />
          <div className="container-fluid page-body-wrapper heightByContent mainCleintStartSection">
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
                        alt=""
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
                              Hi {firstName}!
                            </h1>
                          </div>
                          <div className="col-md-6 d-flex align-items-center">
                            {/* <p className="mb-0 profileType OutfitFont">Therapist</p> */}
                          </div>
                        </div>
                        <p className="mb-0 imageSectionContent AthleticsFont">
                          Share more, match better!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="container align-items-center justify-content-center boxSectionNew boxsectionNew2 d-flex align-items-center">
                  <div className="mainBox2RowUp">
                    <div className="mainQuestionContainer text-center">
                      <label
                        htmlFor="exampleInputEmail1"
                        className="AthleticsFont maintitlemain"
                      >
                        How to get started? It’s simple 
                      </label>
                    </div>
                    <div className="row justify-content-center">
                      <h3 className="text-center clientStartPageShortHeading  clientStartPageShortHeading1 AthleticsFont">
                        Fill in a few questions about yourself
                      </h3>
                      <p className="text-center clientStartPageShortDescription clientStartPageShortDescription1 OutfitFont">
                        This is so we can find the best therapist or coach match
                        for you
                      </p>
                      <h3 className="text-center clientStartPageShortHeading  clientStartPageShortHeading2 AthleticsFont">
                        Book
                      </h3>
                      <p className="text-center clientStartPageShortDescription clientStartPageShortDescription2 OutfitFont">
                        Choose a therapist or coach you like and book a time
                        with them that suits you best
                      </p>
                      <h3 className="text-center clientStartPageShortHeading clientStartPageShortHeading3 AthleticsFont">
                        Pay
                      </h3>
                      <p className="text-center clientStartPageShortDescription  clientStartPageShortDescription3 OutfitFont">
                        Pay for your session through our secure platform
                      </p>
                      <h3 className="text-center clientStartPageShortHeading clientStartPageShortHeading4 AthleticsFont">
                        Join
                      </h3>
                      <p className="text-center clientStartPageShortDescription clientStartPageShortDescription4 OutfitFont">
                        Come back to Tala Thrive and join the video call when
                        it’s time for your session
                      </p>

                      <button
                        onClick={handleForm}
                        className="btn btn-primary btn-block mainnextbutton OutfitFont"
                      >
                        Let’s go!
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container-fluid bottomImageContainer">
            <img
              src="../../../assets/images/mainBottomBackgroundImage/bottomBackgroundImage.png"
              alt=""
            ></img>
          </div>
        </>
      ) : null}
    </>
  );
}

export default ConsumerWelcomePage;