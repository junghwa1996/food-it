import FoodList from "./components/FoodList";
import items from "./mock.json";

function App() {
  return (
    <div>
      <FoodList items={items} />
    </div>
  );
}

export default App;
