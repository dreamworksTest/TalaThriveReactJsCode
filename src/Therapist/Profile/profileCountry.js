import React from 'react';
import { Modal} from 'react-bootstrap';
 
function ProfileCountry({ setCountryOfResidence, countryOfResidence,show,onHide,onSave}) {
 

    

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        
      </Modal.Header>
      <Modal.Body>
        {/* Your modal content goes here */}
        <form  >


        <div className="form-group">
                    <label htmlFor="exampleInputEmail1" className="OutfitFont">Country</label>
                     <select className="form-control" value={countryOfResidence} onChange={(e)=>setCountryOfResidence(e.target.value)} >
                         {/* <option className="OutfitFont">Select Country</option> */}
                         <option className="OutfitFont" value='france'>France</option>
                         <option className="OutfitFont" value='Paris'>Paris</option>
                         <option className="OutfitFont" value='London'>London</option>
                         <option className="OutfitFont" value='United States'>United States</option>
                         <option className="OutfitFont" value='india'>india</option>
            </select>  
            
                    <small id="emailHelp" className="form-text text-muted OutfitFont">We are required to ask this for safety and regulatory reasons.</small>
                  </div>
  
        <button  onClick={onSave} className="btn btn-default submitmodelbutton OutfitFont">Save Changes</button>
         </form>
      </Modal.Body>
      
    </Modal>
  );
}

export default ProfileCountry;
