import React, { useState } from "react";

export const TextInputForm = (props) => {
  const { author, buttonText, handleClick, id, label, placeholder, token } =
    props;
  const [text, setText] = useState("");

  return (
    <>
      <label htmlFor={id}>
        {label} to {author}
        <br />
      </label>
      <input
        id={id}
        placeholder={placeholder}
        type="text"
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={() => handleClick(id, text, token)}>{buttonText}</button>
    </>
  );
};
