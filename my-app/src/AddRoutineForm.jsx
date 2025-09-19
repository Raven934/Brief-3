// src/AddRoutineForm.js
// No changes needed! Your original code is perfect.

import React, { useState } from "react";
import Select from "react-select";
import { GoPeople } from "react-icons/go";
import { FaPlus } from "react-icons/fa6";
import { FaArrowRotateLeft } from "react-icons/fa6";


export default function AddRoutineForm({ addRoutine, resetUsers, users }) {
  const [input, setInput] = useState("");
  const initialUserId = users ? Object.keys(users)[0] : null;
  const [selectedUser, setSelectedUser] = useState(initialUserId);

  const options = users
    ? Object.values(users).map((user) => ({
        value: user.id,
        label: user.name,
      }))
    : [];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === "" || !selectedUser) return;
    addRoutine(input, selectedUser);
    setInput("");
  };

  return (
    <div className="dashboard">
      <div className="header">
        <div className="header-container">
          <img src="/hehe.png" alt="character" className="character" />
          <h1 className="title">Time to be productive!!!!</h1>
        </div>
        <div className="input-container">
          <form className="input-add" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Nouvelle Routine..."
              className="routine-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button className="add-btn" type="submit">
              <FaPlus style={{ color: "white" }} />
            </button>
          </form>
          <div className="buttons">
            <Select
              className="select"
              placeholder={<GoPeople style={{ marginRight: 8, color: "white", width: "35px" }} />}
              options={options}
              value={options.find((opt) => opt.value === selectedUser)}
              onChange={(opt) => setSelectedUser(opt.value)}
              styles={{
                control: (provided) => ({
                  ...provided,
                  backgroundColor: "#ffadef96",
                  border: "none",
                  height: "50px",
                  borderRadius: "10px",
                  boxShadow: "0 5px 6px rgba(0, 0, 0, 0.263)",
                }),
                menu: (provided) => ({
                  ...provided,
                  backgroundColor: "#ffadefff",
                  width: "100px",
                }),
                indicatorSeparator: () => ({ display: "none" }),
                indicatorsContainer: () => ({ display: "none" }),
              }}
            />
            <button className="btn" type="button" onClick={resetUsers}>
              <FaArrowRotateLeft style={{ color: "white", width: "50px" }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

