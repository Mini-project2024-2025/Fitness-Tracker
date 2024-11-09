// pages/GoalSetting.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './GoalSetting.css';

const exercisesByBodyPart = {
  Biceps: ["Bicep Curl", "Hammer Curl", "Concentration Curl", "Cable Curl", "Preacher Curl"],
  Legs: ["Squat", "Leg Press", "Lunges", "Leg Extension", "Leg Curl"],
  Chest: ["Bench Press", "Push Up", "Incline Dumbbell Press", "Chest Fly", "Cable Cross"],
  Shoulders: ["Shoulder Press", "Lateral Raise", "Front Raise", "Reverse Fly", "Arnold Press"],
  Back: ["Pull-Up", "Deadlift", "Lat Pulldown", "Seated Row", "Back Extension"],
};

const GoalSetting = ({ userId }) => {
  const [selectedExercises, setSelectedExercises] = useState({});
  const [targetTimes, setTargetTimes] = useState({});
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const response = await axios.get(`/api/goals/${userId}`);
      setGoals(response.data.goals);
    } catch (error) {
      console.error('Error fetching goals:', error);
    }
  };

  const handleExerciseToggle = (part, exercise) => {
    setSelectedExercises(prev => ({
      ...prev,
      [part]: prev[part]?.includes(exercise)
        ? prev[part].filter(ex => ex !== exercise)
        : [...(prev[part] || []), exercise],
    }));
  };

  const handleTimeChange = (part, exercise, time) => {
    setTargetTimes(prev => ({
      ...prev,
      [part]: {
        ...prev[part],
        [exercise]: time,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const goalsArray = Object.keys(selectedExercises).flatMap(part =>
        selectedExercises[part].map(exercise => ({
          userId,
          exercise,
          targetTime: targetTimes[part]?.[exercise],
        }))
      );
      await axios.post('/api/goals', { goals: goalsArray });
      setSelectedExercises({});
      setTargetTimes({});
      fetchGoals(); // Refresh goals after submission
    } catch (error) {
      console.error('Error saving goal:', error);
    }
  };

  return (
    <div className="goal-setting">
      <div className="goal-setting-header">
        <div className="goal-setting-title">Set Exercise Goals</div>
      </div>
      <form onSubmit={handleSubmit}>
        {Object.keys(exercisesByBodyPart).map(part => (
          <div key={part} className="exercise-group">
            <div className="exercise-group-title">{part}</div>
            <div className="exercise-options">
              <div className="exercise-list">
                {exercisesByBodyPart[part].map(name => (
                  <div key={name} className="exercise-option">
                    <div className="exercise-name">{name}</div>
                    <div className="checkbox-time-wrapper">
                      <input
                        type="checkbox"
                        checked={selectedExercises[part]?.includes(name) || false}
                        onChange={() => handleExerciseToggle(part, name)}
                      />
                      <div className="time-input">
                        <label>Set Time (minutes):</label>
                        <input
                          type="number"
                          value={targetTimes[part]?.[name] || ''}
                          onChange={(e) => handleTimeChange(part, name, e.target.value)}
                          placeholder="e.g., 30"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
        <button type="submit" className="submit-button">Set Goal</button>
      </form>

      <div className="your-goals-header">Your Goals</div>
      <ul>
        {goals.map((goal, index) => (
          <li key={index}>
            {goal.exercise} - {goal.targetTime} mins
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GoalSetting;
