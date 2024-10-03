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
function App() {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("");
  const [cursor, setCursor] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(null);

  const handleCreatedClick = () => setOrder("createdAt");

  const handleCalorieClick = () => setOrder("calorie");

  const handleDelete = (id) => {
    const newItems = items.filter((item) => item.id !== id);
    setItems(newItems);
  };

  const handleLoad = async (options) => {
    let result;
    try {
      setIsLoading(true);
      setLoadingError(null);
      result = await getFoodsList(options);
    } catch (error) {
      setLoadingError(error);
    } finally {
      setIsLoading(false);
    }
    const {
      foods,
      paging: { nextCursor },
    } = result;
    if (!options.cursor) {
      setItems(foods);
    } else {
      setItems((prevItems) => [...prevItems, ...foods]);
    }
    setCursor(nextCursor);
  };

  const handleLoadMore = () => {
    handleLoad({ order, cursor });
  };

  const sortItem = items.sort((a, b) => b[order] - a[order]);

  useEffect(() => {
    handleLoad({ order });
  }, [order]);

  return (
    <div>
      <div>
        <button onClick={handleCreatedClick}>생성일순</button>
        <button onClick={handleCalorieClick}>칼로리순</button>
      </div>
      <FoodList items={sortItem} onDelete={handleDelete} />
      {cursor && (
        <button disabled={isLoading} onClick={handleLoadMore}>
          더보기
        </button>
      )}
      {loadingError?.message && <span>{loadingError.message}</span>}
    </div>
  );
}

export default App;
