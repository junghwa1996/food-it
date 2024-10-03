import { useState } from "react";
import FoodList from "./components/FoodList";
import mockItems from "./mock.json";

/** mock.json
 * imgUrl : 이미지
 * title : 음식 이름
 * Content : 칼로리
 * createdAt : 생성일
 * updatedAt : 업데이트일
 * calorie : 칼로리
 */

function App() {
  const [items, setItems] = useState(mockItems);
  const [order, setOrder] = useState("createdAt");
  const sortItem = items.sort((a, b) => b[order] - a[order]);

  const handleCreatedClick = () => setOrder("createdAt");
  const handleCalorieClick = () => setOrder("calorie");
  const handleDelete = (id) => {
    const newItems = items.filter((item) => item.id !== id);
    setItems(newItems);
  };
  return (
    <div>
      <div>
        <button onClick={handleCreatedClick}>생성일순</button>
        <button onClick={handleCalorieClick}>칼로리순</button>
      </div>
      <FoodList items={sortItem} onDelete={handleDelete} />
    </div>
  );
}

export default App;
