import { useState, FC } from 'react';
import '../../styles/EditableField.css';

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
    <div className="editable-field">
      <label className="field-label">{label}</label>
      {editMode ? (
        <div className="edit-container">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="edit-input"
          />
          <button onClick={handleSave} className="save-button">Save</button>
          <button onClick={() => setEditMode(false)} className="cancel-button">Cancel</button>
        </div>
      ) : (
        <div className="view-container">
          <span className="field-value">{value}</span>
          <button onClick={() => setEditMode(true)} className="edit-button">Edit</button>
        </div>
      )}
    </div>
  );
};

export default EditableField;
