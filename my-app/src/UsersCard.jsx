// src/UsersCard.js

import React, { useState } from 'react';
import { IoPersonSharp } from "react-icons/io5";
import { GoGoal } from "react-icons/go";
import { RiCalendarTodoFill } from "react-icons/ri";
import { SiFireship } from "react-icons/si";
import { MdKeyboardArrowDown } from "react-icons/md";

export default function UsersCard({ user, onToggleRoutine, onDeleteRoutine, onPassRoutine }) {
    const [showRoutines, setShowRoutines] = useState(false);

    // Calculate stats for this specific user
    const totalRoutines = user.routines.length;
    const completedRoutines = user.routines.filter(r => r.completed).length;
    const progress = totalRoutines > 0 ? Math.round((completedRoutines / totalRoutines) * 100) : 0;

    return (
        <div className='card-progress'>
            <div className='progress1'>
                <div className='name'>
                    <h1 id='icon2'><IoPersonSharp style={{ color: "black" }} /></h1>
                    <h2 style={{ color: "#FF00F6" }}>{user.name}</h2>
                </div>
                <div className='dropdown'>
                    <h4 style={{ backgroundColor: "#ffadef86", color: "#FF00F6", padding: "5px", borderRadius: "10px", width: "150px", textAlign: "center" }}>
                        {completedRoutines}/{totalRoutines} aujourd'hui
                    </h4>
                    <button className='drop' onClick={() => setShowRoutines(!showRoutines)}>
                        <MdKeyboardArrowDown />
                    </button>
                </div>
            </div>

            <div className='stats-global'>
                <div className='stat-info'>
                    <div className='center'><GoGoal style={{ color: "#FF60B5", fontSize: "30px" }} />
                        <h3 style={{ color: "#FF00F6" }}> Progression Globale</h3>
                    </div>
                    <h2 style={{ color: "#FF60B5" }}>{progress}%</h2>
                    <progress value={completedRoutines} max={totalRoutines}></progress>
                </div>
                <div className='stat-info'>
                    <div className='center'><RiCalendarTodoFill style={{ color: "#FF60B5", fontSize: "30px" }} />
                        <h3 style={{ color: "#FF00F6" }}> Semaine</h3>
                    </div>
                    <h2 style={{ color: "#FF60B5" }}>{progress}%</h2>
                    <progress value={completedRoutines} max={totalRoutines}></progress>
                </div>
                <div className='stat-info'>
                    <h3 style={{ color: "#FF00F6" }}> <SiFireship style={{ color: "#FF60B5", fontSize: "30px" }} /> Série</h3>
                    <h2 style={{ color: "#FF60B5" }}>{completedRoutines}</h2>
                    <progress value={completedRoutines} max={totalRoutines}></progress>
                </div>
            </div>

            {showRoutines && (
                <div className='routines-card'>
                    <h3 style={{ color: "#FF00F6" }}>Routines ajoutées :</h3>
                    {user.routines.length === 0 ? (
                        <p style={{ color: "rgb(255, 96, 181)" }}>Aucune routine ajoutée.</p>
                    ) : (
                        user.routines.map((routine) => (
                            <div
                                key={routine.id}
                                className='routine-item'
                                style={{
                                    backgroundColor: "#ffadef86",
                                    color: "#FF00F6",
                                    padding: "10px",
                                    borderRadius: "10px",
                                    margin: "10px 0",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    textDecoration: routine.completed ? 'line-through' : 'none',
                                    opacity: routine.completed ? 0.6 : 1,
                                }}
                            >
                                <span>{routine.text}</span>
                                <div style={{ display: "flex", gap: "8px" }}>
                                    {/* ✔ button */}
                                    <button
                                        style={{ background: routine.completed ? "#FF00F6" : "#FF60B5", color: "white", border: "none", borderRadius: "6px", padding: "4px 8px", cursor: "pointer" }}
                                        onClick={() => onToggleRoutine(user.id, routine.id)}
                                    >
                                        {routine.completed ? "✖" : "✔"}
                                    </button>

                                    {/* 🗑 delete button */}
                                    <button
                                        style={{ background: "#FF00F6", color: "white", border: "none", borderRadius: "6px", padding: "4px 8px", cursor: "pointer" }}
                                        onClick={() => onDeleteRoutine && onDeleteRoutine(user.id, routine.id)}
                                    >
                                        🗑
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}
