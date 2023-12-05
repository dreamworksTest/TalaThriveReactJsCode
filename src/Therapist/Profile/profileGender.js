import React from 'react';
import { Modal } from 'react-bootstrap';
 
 

function ProfileGender({ gender, setGender,show, onHide,onSave }) {
  
 

  
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        
      </Modal.Header>
      <Modal.Body>
        {/* Your modal content goes here */}
        <form >


        <div className="form-group">
                    <label htmlFor="exampleInputEmail1" className="OutfitFont">Gender</label>
                     <select className="form-control" value={gender} onChange={(e)=>setGender(e.target.value)} >
                         {/* <option className="OutfitFont">Select Gender</option> */}
                         <option className="OutfitFont" value='Male'>Male</option>
                         <option className="OutfitFont" value='Female'>Female</option>
                         <option className="OutfitFont" value='TransMan'>TransMan</option>
                         <option className="OutfitFont" value='TransWoman'>TransWoman</option>
                         <option className="OutfitFont" value='Non-binary'>Non-binary</option>
                         <option className="OutfitFont" value='Genderqueer/gender non-conforming'>Genderqueer/gender non-conforming</option>
                         <option className="OutfitFont" value='Identity not listed or represented above'>Identity not listed or represented above</option>
                         <option className="OutfitFont" value='Prefer not to say'>Prefer not to say</option>
                    </select>           
                  </div>
                        <button  onClick={onSave} className="btn btn-default submitmodelbutton OutfitFont">Save Changes</button>
              </form>
      </Modal.Body>
      
    </Modal>
  );
}

export default ProfileGender;
