import React  from 'react';
import { Modal } from 'react-bootstrap';
 
 

function ProfileBio({ bio, setBio,show,onHide,onSave }) {
  const maxWords = 100;
  
 

    const countWords = (text) => {
      if (!text) {
        return 0;
      }
      const words = text.trim().split(/\s+/);
      return words.length;
    };

  const validateBio = () => {
    if (!bio) {
      return true;
    }
    return false;
   }
 
  
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        {/* Your modal content goes here */}
        <form>
          <div className="form-group">
            <label htmlFor="profileBio OutfitFont">Bio</label>
            <textarea
              className="form-control OutfitFont"
              id="profileBio"
              rows="3"
              value={bio}
              onChange={(e) => {
                if (countWords(e.target.value.trim()) <= maxWords) {
                  setBio(e.target.value);
                }
              }}
            ></textarea>
            <small className="form-text text-muted text-sm font-normal text-gray-600 leading-4 float-right">
              {countWords(bio)}/{maxWords} Words
            </small>
          </div>
          <button
            onClick={onSave}
            disabled={validateBio()}
            className="btn btn-default submitmodelbutton OutfitFont"
          >
            Save Changes
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default ProfileBio;
