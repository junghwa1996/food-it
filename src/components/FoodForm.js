import { useState } from "react";

function FoodForm() {
  const [values, setValues] = useState({
    title: "",
    calorie: 0,
    content: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValue) => ({ ...prevValue, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type='text' name='title' value={values.title} onChange={handleChange} />
      <input type='number' name='calorie' value={values.calorie} onChange={handleChange} />
      <input type='text' name='content' value={values.content} onChange={handleChange} />
      <button type='submit'>확인</button>
    </form>
  );
}

export default FoodForm;
