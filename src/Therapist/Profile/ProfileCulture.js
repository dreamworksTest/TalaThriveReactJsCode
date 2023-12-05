import React from "react";
import { Modal } from "react-bootstrap";

function ProfileCulture({ culture, setCulture, show, onHide, onSave }) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        {/* Add closeButton prop to Modal.Header */}
        <Modal.Title>Modal Title</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1" className="OutfitFont">
              culture
            </label>
            <select
              className="form-control"
              value={culture}
              onChange={(e) => setCulture(e.target.value)}
            >
              {/* <option className="OutfitFont">Select culture</option> */}
              <option className="OutfitFont" value="Catholic">
                Catholic
              </option>
              <option className="OutfitFont" value="Atheist">
                Atheist
              </option>
              <option className="OutfitFont" value="French">
                French
              </option>
              <option className="OutfitFont" value="Sikh">
                Sikh
              </option>
              <option className="OutfitFont" value="Hindi">
                Hindu
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

export default ProfileCulture;
