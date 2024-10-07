import { useEffect, useRef, useState } from "react";

function FileInput({ name, value, onChange }) {
  const inputRef = useRef();
  const [preview, setPreview] = useState();

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
      setPreview();
      URL.revokeObjectURL(nextPreview);
    };
  }, [value]);
  return (
    <div>
      <img src={preview} alt='이미지 미리보기' />
      <input type='file' accept='image/png, image/jpeg' ref={inputRef} onChange={handleChange} />
      <button type='button' onClick={handleClearClick}>
        삭제
      </button>
    </div>
  );
}

export default FileInput;
