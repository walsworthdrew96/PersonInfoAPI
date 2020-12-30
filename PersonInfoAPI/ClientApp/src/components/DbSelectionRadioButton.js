import React, { useState } from "react";

const DbSelectionRadioButton = ({ text, value }) => {
  const [selectedOption, setSelectedOption] = useState("msSqlConnection");

  const onValueChange = (e) => {
    setSelectedOption(e.target.value);
  };
  return (
    <div className="radio">
      <label>
        <input
          type="radio"
          value={value}
          checked={selectedOption === value}
          onChange={onValueChange}
        />
        {text}
      </label>
    </div>
  );
};

export default DbSelectionRadioButton;
