// src/ProgressGlobal.js

import React from 'react';
import { GoPeople } from "react-icons/go";
import { FaArrowTrendUp } from "react-icons/fa6";
// Removed import of "./style.css" as it's handled in App.js

export default function ProgressGlobal({ users }) {
    // These calculations are similar to the Stats component
    const userList = Object.values(users);
    const memberCount = userList.length;

    const totalRoutines = userList.reduce((sum, user) => sum + user.routines.length, 0);
    const completedRoutines = userList.reduce((sum, user) => 
      sum + user.routines.filter(r => r.completed).length, 0);

    const progress = totalRoutines > 0 ? Math.round((completedRoutines / totalRoutines) * 100) : 0;
    
    // An "active member" has completed at least one routine
    const activeMembers = userList.filter(user => user.routines.some(r => r.completed)).length;

    return (
        <div className='card-progress'>
            <div className='progress'>
                <h1 id='icon'><GoPeople style={{ color: "#FF60B5" }} /></h1>
                <h2 style={{ color: "#FF00F6" }}>Progression du Groupe</h2>
            </div>
            <div className='stats-global'>
                <div className='stat-info'>
                    <h3 style={{ color: "#FF00F6" }}> <FaArrowTrendUp style={{ color: "#FF60B5" }} /> Progression Globale</h3>
                    <h2 style={{ color: "#FF60B5" }}>{progress}%</h2>
                    <progress value={completedRoutines} max={totalRoutines}></progress>
                </div>
                <div className='stat-info'>
                    <h3 style={{ color: "#FF00F6" }}>Membres Actifs</h3>
                    <h2 style={{ color: "#FF60B5" }}>{activeMembers}/{memberCount}</h2>
                </div>
                <div className='stat-info'>
                    <h3 style={{ color: "#FF00F6" }}>Total Routines</h3>
                    <h2 style={{ color: "#FF60B5" }}>{totalRoutines}</h2>
                </div>
            </div>
        </div>
    )
}