import React from "react";

export default function InputAnswer({ inputAnswer, handleInputChange }) {
  return (
    <input
      type="text"
      value={inputAnswer}
      onChange={handleInputChange}
    />
  );
}
