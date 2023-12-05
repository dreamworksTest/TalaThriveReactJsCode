import React from 'react';
import { Modal } from 'react-bootstrap';
 
function ProfileReligion({ religion, setReligion, show, onHide,onSave }) {


 
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        {/* Your modal content goes here */}
        <form>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1" className="OutfitFont">
              religion
            </label>
            <select
              className="form-control"
              value={religion}
              onChange={(e) => setReligion(e.target.value)}
            >
              {/* <option className="OutfitFont">Select religion</option> */}
              <option className="OutfitFont" value="Spanish">
                Spanish
              </option>
              <option className="OutfitFont" value="English">
                English
              </option>
              <option className="OutfitFont" value="French">
                French
              </option>
              <option className="OutfitFont" value="Russian">
                Russian
              </option>
              <option className="OutfitFont" value="Hindi">
                Hindi
              </option>
              <option className="OutfitFont" value="Japanese">
                Japanese
              </option>
              <option className="OutfitFont" value="Korean">
                Korean
              </option>
            </select>
          </div>

          <button
            onClick={onSave}
            className="btn btn-default submitmodelbutton OutfitFont"
          >
            Save Changes
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default ProfileReligion;
