// src/Stats.js

import React from "react";
import { IoMdPeople } from "react-icons/io";
import { LuClipboardList } from "react-icons/lu";
import { FaCheckSquare } from "react-icons/fa";
import { GoGoal } from "react-icons/go";
// Removed import of "./style.css" as it's handled in App.js

export default function Stats({ users }) {
  // Calculate stats from the users object
  const userList = Object.values(users);
  const memberCount = userList.length;

  const totalRoutines = userList.reduce((sum, user) => sum + user.routines.length, 0);
  const completedRoutines = userList.reduce((sum, user) => 
    sum + user.routines.filter(r => r.completed).length, 0);
  
  const progress = totalRoutines > 0 ? Math.round((completedRoutines / totalRoutines) * 100) : 0;

  return (
    <div>
      <div className='cards'>
        <div className='card'>
          <div className='infos' id='members'>
            <h1 className='icon'><IoMdPeople style={{ color: "white" }} /></h1>
            <h2>{memberCount}</h2>
            <h3>Members</h3>
          </div>
        </div>
        <div className='card'>
          <div className='infos'>
            <h1 className='icon'><LuClipboardList style={{ color: "white" }} /></h1>
            <h2>{totalRoutines}</h2>
            <h3>Routines</h3>
          </div>
        </div>
        <div className='card'>
          <div className='infos'>
            <h1 className='icon'><FaCheckSquare style={{ color: "white" }} /></h1>
            <h2>{completedRoutines}</h2>
            <h3>Terminées</h3>
          </div>
        </div>
        <div className='card'>
          <div className='infos'>
            <h1 className='icon'><GoGoal style={{ color: "white" }} /></h1>
            <h2>{progress}%</h2>
            <h3>Progression</h3>
          </div>
        </div>
      </div>
    </div>
  );
}