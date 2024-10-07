import { useState } from "react";
import FileInput from "./FileInput";

function FoodForm() {
  const [values, setValues] = useState({
    title: "",
    calorie: 0,
    content: "",
    imgFile: null,
  });

  const sanitize = (type, value) => {
    switch (type) {
      case "number":
        return Number(value) || 0;

      default:
        return value;
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    handleChange(name, sanitize(value, type));
  };

  const handleChange = (name, value) => {
    setValues((prevValue) => ({ ...prevValue, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FileInput name='imgFile' value={values.imgFile} onChange={handleChange} />
      <input type='text' name='title' value={values.title} onChange={handleInputChange} />
      <input type='number' name='calorie' value={values.calorie} onChange={handleInputChange} />
      <input type='text' name='content' value={values.content} onChange={handleInputChange} />
      <button type='submit'>확인</button>
    </form>
  );
}

export default FoodForm;
