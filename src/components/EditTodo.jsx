import React, { useState } from "react";

const EditTodo = ({ todo }) => {
  const [description, setDescription] = useState(todo.description);
  const [showModal, setShowModal] = useState(false);

  const updateDescription = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      await fetch(`http://localhost:5000/todos/${todo.todo_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      setShowModal(false);
      window.location.reload();
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <button className="btn btn-warning" onClick={() => setShowModal(true)}>
        Edit
      </button>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Edit Todo</h3>
              <button
                className="modal-close"
                onClick={() => {
                  setDescription(todo.description);
                  setShowModal(false);
                }}
              >
                &times;
              </button>
            </div>

            <div className="modal-body">
              <input
                type="text"
                className="modal-input"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="modal-footer">
              <button className="btn btn-warning" onClick={updateDescription}>
                Save Changes
              </button>
              <button
                className="btn btn-danger"
                onClick={() => {
                  setDescription(todo.description);
                  setShowModal(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditTodo;