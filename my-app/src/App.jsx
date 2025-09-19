// src/App.js

import React, { useState, useEffect } from "react";
import AddRoutineForm from "./AddRoutineForm";
import Stats from "./Stats";
import ProgressGlobal from "./ProgressGlobal";
import UsersCard from "./UsersCard";
import "./style.css"; // Make sure your CSS is imported

// Default state (used only if no localStorage data exists)
const INITIAL_USERS = {
  sophie: {
    id: "sophie",
    name: "Sophie",
    routines: [],
  },
  thomas: {
    id: "thomas",
    name: "Thomas",
    routines: [],
  },
  peter: {
    id: "peter",
    name: "Peter",
    routines: [],
  },
};

export default function App() {
  // Load users from localStorage if available, otherwise use INITIAL_USERS
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem("users");
    return savedUsers ? JSON.parse(savedUsers) : INITIAL_USERS;
  });

  // Keep localStorage in sync whenever users state changes
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  // Function to add a new routine to a specific user
  // Function to add a new routine to a specific user
const handleAddRoutine = (routineText, userId) => {
  if (!routineText.trim()) return; // Don't add empty routines

  setUsers((prevUsers) => {
    const newUsers = { ...prevUsers };

    // ✅ Prevent adding duplicate routines for the same user
    const alreadyExists = newUsers[userId].routines.some(
      (r) => r.text.toLowerCase() === routineText.toLowerCase()
    );
    if (alreadyExists) return prevUsers;

    const newRoutine = {
      id: Date.now(), // Unique ID for the routine
      text: routineText,
      completed: false,
    };

    newUsers[userId].routines.push(newRoutine);
    return newUsers;
  });
};


  // Function to toggle the 'completed' status of a routine
const handleToggleRoutine = (userId, routineId) => {
  setUsers((prevUsers) => {
    const newUsers = { ...prevUsers };

    newUsers[userId] = {
      ...newUsers[userId],
      routines: newUsers[userId].routines.map((r) =>
        r.id === routineId ? { ...r, completed: !r.completed } : r
      ),
    };

    return newUsers;
  });
};


  // Function to delete a routine
  const handleDeleteRoutine = (userId, routineId) => {
    setUsers((prevUsers) => {
      const newUsers = { ...prevUsers };
      newUsers[userId].routines = newUsers[userId].routines.filter((r) => r.id !== routineId);
      return newUsers;
    });
  };

  // Function to pass/skip a routine
  const handlePassRoutine = (userId, routineId) => {
    setUsers((prevUsers) => {
      const newUsers = { ...prevUsers };
      const routineToPass = newUsers[userId].routines.find((r) => r.id === routineId);
      if (routineToPass) {
        routineToPass.skipped = true;
      }
      return newUsers;
    });
  };
  const handleResetUsers = () => {
  setUsers(INITIAL_USERS);
  localStorage.removeItem("users");
};

  return (
    <div className="container">
      <AddRoutineForm
  addRoutine={handleAddRoutine}
  resetUsers={handleResetUsers}
  users={users}   // ✅ pass users here
/>

      <Stats users={users} />
      <ProgressGlobal users={users} />

     <div className="all-users">
      {Object.values(users).map((user) => (
        <UsersCard
          key={user.id}
          user={user}   
          onToggleRoutine={handleToggleRoutine}
          onDeleteRoutine={handleDeleteRoutine}
          onPassRoutine={handlePassRoutine}
        />
      ))}
    </div>

    </div>
  );
}
