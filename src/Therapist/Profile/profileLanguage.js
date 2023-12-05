import React from 'react';
import { Modal} from 'react-bootstrap';
 

function ProfileLanguage({ language, setLanguage, show, onHide,onSave }) {
 
   const handleTagChange = (e) => {
     const selectedOptions = Array.from(e.target.options)
       .filter((option) => option.selected)
       .map((option) => option.value);
     setLanguage(selectedOptions);
   };



  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <form>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1" className="OutfitFont">
              language
            </label>
            <select
              className="form-control"
              value={language}
              onChange={handleTagChange}
              multiple
            >
              {/* <option className="OutfitFont">Select language</option> */}
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

export default ProfileLanguage;
