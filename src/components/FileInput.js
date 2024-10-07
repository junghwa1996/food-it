function FileInput({ name, onChange }) {
  const handleChange = (e) => {
    const value = e.target.files[0];
    onChange(name, value);
  };
  return <input type='file' onChange={handleChange} />;
}

export default FileInput;
