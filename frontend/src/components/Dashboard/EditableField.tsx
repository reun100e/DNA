import { useState, FC } from 'react';

interface EditableFieldProps {
  label: string;
  value: string;
  onSave: (newValue: string) => void;
}

const EditableField: FC<EditableFieldProps> = ({ label, value, onSave }) => {
  const [editMode, setEditMode] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const handleSave = () => {
    onSave(inputValue);
    setEditMode(false);
  };

  return (
    <div style={{ marginBottom: '1rem' }}>
      <label>{label}</label>
      {editMode ? (
        <div>
          <input 
            type="text" 
            value={inputValue} 
            onChange={(e) => setInputValue(e.target.value)} 
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setEditMode(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <span>{value}</span>
          <button onClick={() => setEditMode(true)}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default EditableField;
