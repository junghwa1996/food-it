import { useState } from "react";
import FileInput from "./FileInput";
import { createFood } from "../api";

const sanitize = (type, value) => {
  switch (type) {
    case "number":
      return Number(value) || 0;

    default:
      return value;
  }
};

const INITIAL_VALUES = {
  title: "",
  calorie: 0,
  content: "",
  imgFile: null,
};
function FoodForm({ onSubmitSuccess }) {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittingError, setSubmittingError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    handleChange(name, sanitize(type, value));
  };

  const handleChange = (name, value) => {
    setValues((prevValue) => ({ ...prevValue, [name]: value }));
  };

  let result;
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("imgFile", values.imgFile);
    formData.append("title", values.title);
    formData.append("calorie", values.calorie);
    formData.append("content", values.content);
    try {
      setIsSubmitting(true);
      setSubmittingError(null);
      result = await createFood(formData);
    } catch (error) {
      setSubmittingError(error);
    } finally {
      setIsSubmitting(false);
    }
    const { food } = result;
    onSubmitSuccess(food);
    setValues(INITIAL_VALUES);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FileInput
        name='imgFile'
        value={values.imgFile}
        onChange={handleChange}
      />
      <input name='title' value={values.title} onChange={handleInputChange} />
      <input
        type='number'
        name='calorie'
        value={values.calorie}
        onChange={handleInputChange}
      />
      <input
        name='content'
        value={values.content}
        onChange={handleInputChange}
      />
      <button type='submit' disabled={isSubmitting}>
        확인
      </button>
      {submittingError?.message && <div>{submittingError.message}</div>}
    </form>
  );
}

export default FoodForm;
