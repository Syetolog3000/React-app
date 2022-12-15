import React from "react";

export const SearchParam = ({ name, array, onChange }) => {
  const handleChange = (e) => onChange(e.target.value);

  return (
    <div>
      <span>{name}</span>
      <select onChange={handleChange}>
        {array.map((option) => (
          <option key={option.id}>{option.name}</option>
        ))}
      </select>
    </div>
  );
};
