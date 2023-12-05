

export const signupConsumerValidation = (
  firstName,
  lastName,
  preferredName,
  email,
  password,
  confirmPassword,
  termsAndConditions
) => {
  let errors = {};

  if (!firstName?.trim()) {
    errors.firstName = "*Required field";
  }

  if (!lastName?.trim()) {
    errors.lastName = "*Required field";
  }

   if (!preferredName?.trim()) {
     errors.preferredName = "*Required field";
   }

  if (!email?.trim()) {
    errors.email = "*Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    errors.email = "*You have entered an invalid email address!";
  }

  if (!password?.trim()) {
    errors.password = "*Password is required";
  } else if (password.length < 8) {
    errors.password = "*Password must be at least 8 characters long";
  }

  if (!confirmPassword?.trim()) {
    errors.confirmPassword = "*Confirm Password is required";
  } else if (confirmPassword !== password) {
    errors.confirmPassword = "*Passwords do not match";
  }

  if (!termsAndConditions) {
    errors.termsAndConditions = "*Please accept the Terms & Conditions";
  }
  return errors;
};






//Login Validation
  export const loginConsumerValidation = (email, password) => {
    let errors = {};
    if (!email?.trim()) {
      errors.email = "*Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      errors.email = "*You have entered an invalid email address!";
    }

    if (!password?.trim()) {
      errors.password = "*Password is required";
    }
    return errors;
  };


  //Login Validation
  export const forgotPasswordConsumerValidation = (email) => {
    let errors = {};
    if (!email?.trim()) {
      errors.email = "*Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      errors.email = "*You have entered an invalid email address!";
    }
    return errors;
  };


  export const resetPasswordConsumerValidation = (password, confirmPassword) => {
    let errors = {};

    if (!password?.trim()) {
      errors.password = "*Password is required";
    } else if (password.length < 8) {
      errors.password = "*Password must be at least 8 characters long";
    }

    if (!confirmPassword?.trim()) {
      errors.confirmPassword = "*Confirm Password is required";
    } else if (confirmPassword !== password) {
      errors.confirmPassword = "*Passwords do not match";
    }
    return errors;
  };