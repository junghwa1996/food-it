import { useEffect, useRef, useState } from "react";
import useTranslate from "../hooks/useTranslate";

function FileInput({ name, value, initialPreview, onChange }) {
  const inputRef = useRef();
  const [preview, setPreview] = useState(initialPreview);
  const t = useTranslate();

  const handleChange = (e) => {
    const file = e.target.files[0];
    onChange(name, file);
  };

  const handleClearClick = () => {
    const inputNode = inputRef.current;
    if (!inputNode) return; // 검증

    inputNode.value = "";
    onChange(name, null);
  };

  useEffect(() => {
    if (!value) return; // 검증

    const nextPreview = URL.createObjectURL(value);
    setPreview(nextPreview);

    return () => {
      setPreview(initialPreview);
      URL.revokeObjectURL(nextPreview);
    };
  }, [value, initialPreview]);
  return (
    <div>
      <img src={preview} alt="이미지 미리보기" />
      <input
        type="file"
        accept="image/png, image/jpeg"
        ref={inputRef}
        onChange={handleChange}
      />
      <button type="button" onClick={handleClearClick}>
        {t("delete button")}
      </button>
    </div>
  );
}

export default FileInput;
