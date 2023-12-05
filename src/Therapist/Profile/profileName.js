import React, { useEffect, useState } from 'react';
import { Modal} from 'react-bootstrap';
import { UpdateProfileNameService } from '../TherapistServices/TherapistServices';
import { updateProfileName } from '../TherapistValidation/TherapistValidation';
 

function ProfileName({ setDetails,details, show, onHide }) {
  const [errors, setErrors] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  
  useEffect(() => {
    setFirstName(details.firstName);
    setLastName(details.lastName);
  },[details])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validate = updateProfileName(firstName, lastName);
    setErrors(validate);
    if (Object.keys(validate).length === 0) {
      try {
        const usesDetails = { firstName, lastName };
        const res = await UpdateProfileNameService(details.therapistId, usesDetails);
        setDetails({ ...details, firstName: res.data.data.firstName, lastName: res.data.data.lastName });
        onHide();
      } catch (err) {
        console.log(err);
      }
    }
   };
  
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        {/* Your modal content goes here */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstName" className="OutfitFont">
              First Name:
            </label>
            <input
              type="text"
              className={`form-control OutfitFont ${ errors.firstName && !firstName  ? "error-border"  : "" }`}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="first name"
              id="firstName"
            />
            {errors && !firstName && (
              <span className="text-red-600">{errors.firstName}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="lastName" className="OutfitFont">
              Last Name:
            </label>
            <input
              type="text"
              className="form-control OutfitFont"
              placeholder="last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              id="lastName"
            />
            {errors && !lastName && (
              <span className="text-red-600">{errors.lastName}</span>
            )}
          </div>
          
          <button
            type="submit"
            className="btn btn-default submitmodelbutton OutfitFont"
          >
            Submit
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default ProfileName;
