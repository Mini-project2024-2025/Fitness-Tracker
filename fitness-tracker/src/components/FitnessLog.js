// NEW: For logging fitness activities
import React, { useState } from 'react';
import fitnessService from '../services/fitnessService';

function FitnessLog() {
  const [steps, setSteps] = useState(0);
  const [calories, setCalories] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    fitnessService.logActivity({ steps, calories })
      .then(response => alert('Activity logged!'))
      .catch(error => console.log(error));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Steps: </label>
        <input type="number" value={steps} onChange={e => setSteps(e.target.value)} />
        <br />
        <label>Calories: </label>
        <input type="number" value={calories} onChange={e => setCalories(e.target.value)} />
        <br />
        <button type="submit">Log Activity</button>
      </form>
    </div>
  );
}

export default FitnessLog;
// This component will allow users to log steps and calories.
// Create two inputs for logging steps and calories.
// Submit this data via the fitnessService to the backend.