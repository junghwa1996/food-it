import { useState } from "react";

function FoodForm() {
  const [title, setTitle] = useState("");
  const [calorie, setCalorie] = useState(0);
  const [content, setContent] = useState("");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleCalorieChange = (event) => {
    const typeCheck = Number(event.target.value) || 0;
    setCalorie(typeCheck);
  };
  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  return (
    <form>
      <input type='text' name='title' value={title} onChange={handleTitleChange} />
      <input type='number' name='calorie' value={calorie} onChange={handleCalorieChange} />
      <input type='text' name='content' value={content} onChange={handleContentChange} />
    </form>
  );
}

export default FoodForm;
