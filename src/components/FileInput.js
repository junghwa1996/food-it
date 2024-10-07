import { useRef } from "react";

function FileInput({ name, value, onChange }) {
  const inputRef = useRef();

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
  return (
    <div>
      <input type='file' ref={inputRef} onChange={handleChange} />
      <button type='button' onClick={handleClearClick}>
        삭제
      </button>
    </div>
  );
}

export default FileInput;
