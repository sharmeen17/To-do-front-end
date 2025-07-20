import React, { useState } from "react";

const InputTodo = () => {
  const [description, setDescription] = useState("");

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { description };
      const response = await fetch("https://to-do-back-end-production.up.railway.app/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <h1 className="title">TO DO</h1>
      <form className="form" onSubmit={onSubmitForm}>
        <input
          type="text"
          className="form-input"
          placeholder="Enter a new todo..."
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <button className="btn btn-success" type="submit">Add</button>
      </form>
    </>
  );
};

export default InputTodo;