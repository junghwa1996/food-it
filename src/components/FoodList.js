import "./FoodList.css";

const formatDate = (value) => {
  const date = new Date(value);
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
};

const FoodListItem = ({ item }) => {
  const { imgUrl, title, calorie, content, createdAt } = item;

  return (
    <div className='FoodListItem'>
      <img src={imgUrl} alt={title} />
      <div>{title}</div>
      <div>{calorie}</div>
      <div>{content}</div>
      <div>{formatDate(createdAt)}</div>
    </div>
  );
};

const FoodList = ({ items }) => {
  return (
    <ul className='FoodList'>
      {items.map((item) => (
        <li key={item.id}>
          <FoodListItem item={item} />
        </li>
      ))}
    </ul>
  );
};

export default FoodList;
