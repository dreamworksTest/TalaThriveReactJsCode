import React  from 'react';
import { Modal  } from 'react-bootstrap';
 
 
 

function ProfileTags({expertise, setExpertise, show, onHide,onSave }) {

   




  const handleTagChange = (e) => {
    const selectedOptions = Array.from(e.target.options).filter((option) => option.selected).map((option) => option.value);
    setExpertise(selectedOptions);
  };

   


  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        {/* Your modal content goes here */}
        <form  >
          <div className="form-group">
            <label htmlFor="exampleInputEmail1" className="OutfitFont">
              Tags
            </label>
            <select
              className="form-control"
              value={expertise}
              onChange={handleTagChange}
              multiple
            >
          
              <option className="OutfitFont" value="stress">
                stress
              </option>
              <option className="OutfitFont" value="Depression">
                Depression
              </option>
              <option className="OutfitFont" value="Health">
                Health
              </option>
              <option className="OutfitFont" value="Psychologist">
                Psychologist
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

export default ProfileTags;
