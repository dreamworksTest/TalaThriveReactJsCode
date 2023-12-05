

export const changePasswordValidation = (oldPassword, newPassword, confirmPassword) => {
  let errors = {};

  if (!oldPassword?.trim()) {
    errors.oldPassword = "*Old Password is required";
  }

  if (!newPassword?.trim()) {
    errors.newPassword = "*New Password is required";
  } else if (newPassword.length < 8) {
    errors.newPassword = "*New Password must be at least 8 characters long";
  }

  if (!confirmPassword?.trim()) {
    errors.confirmPassword = "*Confirm Password is required";
  } else if (confirmPassword !== newPassword) {
    errors.confirmPassword = "*Passwords do not match";
  }

  return errors;
};


export const updateProfileName = (firstName,lastName) => {
  let errors = {};

   if (!firstName?.trim()) {
     errors.firstName = "*Required field";
   }

   if (!lastName?.trim()) {
     errors.lastName = "*Required field";
   }

  return errors;
};

export const updateProfileBio = (bio) => {
  let errors = {};

  if (!bio?.trim()) {
    errors.bio = "*Required field";
  }

  return errors;
};

export const updateCountryOfResidence = (countryOfResidence) => {
  let errors = {};

  if (!countryOfResidence) {
    errors.countryOfResidence = "*Required field";
  }

  return errors;
};

export const updateGender = (gender) => {
  let errors = {};

  if (!gender) {
    errors.gender = "*Required field";
  }

  return errors;
};


export const updateSexualOrientation = (sexualOrientation) => {
  let errors = {};

  if (!sexualOrientation) {
    errors.sexualOrientation = "*Required field";
  }

  return errors;
};

export const updateLanguage = (language) => {
  let errors = {};

  if (!language) {
    errors.language = "*Required field";
  }

  return errors;
};

export const updateReligion = (religion) => {
  let errors = {};

  if (!religion) {
    errors.religion = "*Required field";
  }

  return errors;
};

export const updateCulture = (culture) => {
  let errors = {};

  if (!culture) {
    errors.culture = "*Required field";
  }

  return errors;
};

export const updateExpertise = (expertise) => {
  let errors = {};

  if (!expertise || expertise.length === 0) {
    errors.expertise = "*Select at least one tag";
  }

  return errors;
};
