const minNameLength = 12;
const minPasswordLength = 6;

function validateEmail(email) {
  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

  return emailRegex.test(email);
}

const validateName = (name) => name.length >= minNameLength;

const validatePassword = (Password) => Password.length >= minPasswordLength;

export default function validateRegisterInputs({ name, email, password }) {
  return validateEmail(email) && validateName(name) && validatePassword(password);
}
