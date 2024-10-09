import { useState } from "react";
import "./FoodList.css";
import FoodForm from "./FoodForm";
import useTranslate from "../hooks/useTranslate";

const formatDate = (value) => {
  const date = new Date(value);
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
};

function FoodList({ items, onDelete, onUpdate, onUpdateSuccess }) {
  // 수정할 id 값 상태
  const [editingId, setEditingId] = useState(null);

  const handleCancel = () => {
    setEditingId(null);
  };

  return (
    <ul className="FoodList">
      {items.map((item) => {
        if (item.id === editingId) {
          const { id, imgUrl, title, calorie, content } = item;
          const initialValue = { imgUrl: null, title, calorie, content };

          const handleSubmit = (formData) => onUpdate(id, formData);

          const handleSubmitSuccess = (food) => {
            onUpdateSuccess(food);
            setEditingId(null);
          };
          return (
            <li key={item.id}>
              <FoodForm
                initialValue={initialValue}
                initialPreview={imgUrl}
                onCancel={handleCancel}
                onSubmit={handleSubmit}
                onSubmitSuccess={handleSubmitSuccess}
              />
            </li>
          );
        }
        return (
          <li key={item.id}>
            <FoodListItem
              item={item}
              onEdit={setEditingId}
              onDelete={onDelete}
            />
          </li>
        );
      })}
    </ul>
  );
}

function FoodListItem({ item, onEdit, onDelete }) {
  const { imgUrl, title, calorie, content, createdAt } = item;
  const t = useTranslate();

  const handleDeleteClick = () => onDelete(item.id);

  const handleEditClick = () => {
    onEdit(item.id); // onEdit() = setEditingId()
  };

  return (
    <div className="FoodListItem">
      <img src={imgUrl} alt={title} />
      <div>{title}</div>
      <div>{calorie}</div>
      <div>{content}</div>
      <div>{formatDate(createdAt)}</div>
      <button onClick={handleEditClick}>{t("edit button")}</button>
      <button onClick={handleDeleteClick}>{t("delete button")}</button>
    </div>
  );
}

export default FoodList;
