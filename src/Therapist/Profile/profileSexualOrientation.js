import React from 'react';
import { Modal } from 'react-bootstrap';
 
function ProfileSexualOrientation({
  sexualOrientation,
  setSexualOrientation,
  show,
  onHide,
  onSave,
}) {
  

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        {/* Your modal content goes here */}
        <form>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1" className="OutfitFont">
              Sexual Orientation
            </label>
            <select
              className="form-control"
              value={sexualOrientation}
              onChange={(e) => setSexualOrientation(e.target.value)}
            >
              <option className="OutfitFont">Select sexualOrientation</option>
              <option className="OutfitFont" value="Straight/Heterosexual">
                Straight/Heterosexual
              </option>
              <option className="OutfitFont" value="Lesbian">
                Lesbian
              </option>
              <option className="OutfitFont" value="Gay">
                Gay
              </option>
              <option className="OutfitFont" value="Bisexual">
                Bisexual
              </option>
              <option className="OutfitFont" value="Fluid">
                Fluid
              </option>
              <option className="OutfitFont" value="Queer">
                Queer
              </option>
              <option className="OutfitFont" value="Questioning or unsure">
                Questioning or unsure
              </option>
              <option className="OutfitFont" value="Asexual">
                Asexual
              </option>
              <option className="OutfitFont" value="Not listed above">
                Not listed above
              </option>
              <option className="OutfitFont" value="Prefer not to say">
                Prefer not to say
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

export default ProfileSexualOrientation;
