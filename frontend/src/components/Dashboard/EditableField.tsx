import React, { useState } from "react";

interface EditableFieldProps {
  label: string;
  value: string;
  onSave: (newValue: string) => void;
  isEditable: boolean;
  icon?: React.ReactNode;
  iconLabel?: string;
}

const EditableField: React.FC<EditableFieldProps> = ({
  label,
  value,
  onSave,
  isEditable,
  icon,
  iconLabel,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const handleSave = () => {
    onSave(inputValue);
    setIsEditing(false);
  };
  const handleClose = () => {
    setIsEditing(false);
  };

  return (
    <div className="editable-field">
      <label className="block text-sm font-medium">{label}</label>
      <div className="flex items-center mt-2">
        {/* Icon next to value with tooltip */}
        {icon && iconLabel && (
          <div className="relative flex items-center mr-2">
            <span className="cursor-pointer" data-tooltip={iconLabel}>
              {icon}
            </span>
            <div className="absolute hidden group-hover:block bg-gray-800 text-white text-xs p-2 rounded-lg w-max left-0 top-6 z-10 group">
              {iconLabel}
            </div>
          </div>
        )}

        {/* Editable Value */}
        {isEditable ? (
          isEditing ? (
            <div className="flex items-center">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="border bg-accent p-2 rounded-md flex-1"
              />
              <button
                onClick={handleSave}
                className="ml-2 bg-primary dark:bg-primary text-white px-4 py-2 rounded-md"
              >
                Save
              </button>
            </div>
          ) : (
            <div className="flex items-center">
              <span>{value}</span>
              <button
                onClick={() => setIsEditing(true)}
                className="ml-2 text-blue-500"
              >
                Edit
              </button>
            </div>
          )
        ) : (
          <div className="flex items-center">
            <span>{value}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditableField;
