import { useState, useEffect } from "react";

const useFormL = (callback, validate) => {
  const [values, setValues] = useState({
    number: 0,
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrors(validate(values));
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
  }, [errors]); //remove warning

  return { handleChange, handleSubmit, values, errors };
};;

export default useFormL;
