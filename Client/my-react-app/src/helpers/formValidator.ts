type errors = {
  name?: boolean;
  email: boolean;
  password: boolean;
  confirmPassword?: boolean;
};

interface formDetails {
  name?: string;
  email: string;
  password: string;
  confirmPassword?: string;
  errors: errors;
}

interface returnDetails {
  valid: boolean;
  userDetails: formDetails;
}

/**
 *
 * @param formDetailsParam
 * @returns formDetailswithError
 */

export default function formValidator(
  formDetailsParam: formDetails
): returnDetails {
  let valid = true;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;

  // Passing the state creating deepcopy so that it will not be mutated
  const copy = JSON.parse(JSON.stringify(formDetailsParam));
  const { email, password } = copy;

  if (!emailRegex.test(email)) {
    valid = false;
    copy.errors.email = true;
  } else {
    copy.errors.email = false;
  }

  if (!passwordRegex.test(password)) {
    valid = false;
    copy.errors.password = true;
  } else {
    copy.errors.password = false;
  }

  if (password?.toLowerCase() !== copy?.confirmPassword?.toLowerCase()) {
    valid = false;
    copy.errors.confirmPassword = true;
  } else {
    copy.errors.confirmPassowrd = false;
  }

  return {
    valid,
    userDetails: copy,
  };
}
