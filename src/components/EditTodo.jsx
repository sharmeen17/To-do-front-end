import React, { useState } from "react";

const EditTodo = ({ todo }) => {
  const [description, setDescription] = useState(todo.description);
  const [showModal, setShowModal] = useState(false); // Controls modal visibility

  const updateDescription = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      await fetch(`http://localhost:5000/todos/${todo.todo_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      setShowModal(false); // Close modal on success
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
        <div
          className="modal d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={() => setShowModal(false)} // closes modal when clicking outside
        >
          <div
            className="modal-dialog"
            role="document"
            onClick={(e) => e.stopPropagation()} // prevent modal close on inner click
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Todo</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => {
                    setDescription(todo.description); // reset on cancel
                    setShowModal(false);
                  }}
                >
                  &times;
                </button>
              </div>

              <div className="modal-body">
                <input
                  type="text"
                  className="form-control"
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
                    setDescription(todo.description); // reset on close
                    setShowModal(false);
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditTodo;
