import "./FoodList.css";

const FoodListItem = ({ item }) => {
  const { imgUrl, title, calorie, content } = item;

  return (
    <div>
      <img src={imgUrl} alt={title} />
      <div>{title}</div>
      <div>{calorie}</div>
      <div>{content}</div>
    </div>
  );
};

const FoodList = ({ items }) => {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          <FoodListItem item={item} />
        </li>
      ))}
    </ul>
  );
};

export default FoodList;
