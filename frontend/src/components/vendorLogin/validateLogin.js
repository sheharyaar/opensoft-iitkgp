export default function validateLogin(values) {
  let errors = {};
  if (!values.number) {
    errors.number = "Store id required";
  } else if (values.number < 0) {
    errors.number = "Store Id is invalid";
  }
  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 6) {
    errors.password = "Password needs to be 6 characters or more";
  }

  return errors;
}
