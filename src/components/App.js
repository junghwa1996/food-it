import { useEffect, useState } from "react";
import FoodList from "./FoodList";
import { getFoodsList } from "../api";

/** mock.json
 * imgUrl : 이미지
 * title : 음식 이름
 * Content : 칼로리
 * createdAt : 생성일
 * updatedAt : 업데이트일
 * calorie : 칼로리
 */
const LIMIT = 10;
function App() {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("createdAt");
  const [cursor, setCursor] = useState("");

  const handleCreatedClick = () => setOrder("createdAt");

  const handleCalorieClick = () => setOrder("calorie");

  const handleDelete = (id) => {
    const newItems = items.filter((item) => item.id !== id);
    setItems(newItems);
  };

  const handleLoad = async (options) => {
    const { foods, paging } = await getFoodsList(options);
    if (options.cursor === "LGNyZWF0ZWRBdCwyNzU2Mw") {
      setItems(foods);
    } else {
      setItems((presentItems) => [...presentItems, ...foods]);
    }
    setCursor(paging.nextCursor);
  };

  const handleLoadMore = () => {
    handleLoad({ order, cursor, LIMIT });
  };

  const sortItem = items.sort((a, b) => b[order] - a[order]);

  useEffect(() => {
    handleLoad({ order, cursor: "LGNyZWF0ZWRBdCwyNzU2Mw", LIMIT });
  }, [order]);

  return (
    <div>
      <div>
        <button onClick={handleCreatedClick}>생성일순</button>
        <button onClick={handleCalorieClick}>칼로리순</button>
      </div>
      <FoodList items={sortItem} onDelete={handleDelete} />
      {cursor !== null && <button onClick={handleLoadMore}>더보기</button>}
    </div>
  );
}

export default App;
