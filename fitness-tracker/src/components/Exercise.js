import React, { useState } from 'react';
import '../styles/Exercise.css';

const Exercise = () => {
  const [time, setTime] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [focus, setfocus] = useState('');
  const [training, setType] = useState('');
  const [equipment, setEquipment] = useState('');
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5001/api/exercise', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ time, difficulty, focus, training, equipment, question }),
      });

      const data = await res.json();
      setResponse(formatResponse(data.response)); // Apply the formatting function
    } catch (error) {
      console.error('Error:', error);
      setResponse('There was an error processing your request.');
    }
  };

  const formatResponse = (response) => {
    return `<h2>Exercise:</h2><p>${response}</p>`;
  };

  const handlePositiveChange = (setter) => (e) => {
    const value = e.target.value;
    if (value === '' || /^[+]?\d+(\.\d+)?$/.test(value)) {
      setter(value);
    }
  };
  

  return (
    <div className="ExercisePlanner-container">
        <div className="image-section">
        <div className="overlay-text">Find Your <br/> Perfect <br/>Exercise Routine</div>
        </div>
      {/* Input section */}
      <div className="inputs-container">
        <form onSubmit={handleSubmit}>
          
          <input
          className="input-box"
            type="number"
            value={time}
            onChange={handlePositiveChange(setTime)}
            placeholder="Enter Time in min"
            required
            min="0"
          />

          <input
          className="input-box"
            type="number"
            value={difficulty}
            onChange={handlePositiveChange(setDifficulty)}
            placeholder="Enter your Difficulty level"
            required
            min="0"
            max="10"
          />

          <select className="dropdown" value={focus} onChange={(e) => setfocus(e.target.value)} required>
            <option value="">Body Focus</option>
            <option value="Neck">Neck</option>
            <option value="Trapezius">Trapezius</option>
            <option value="Shoulder">Shoulder</option>
            <option value="Back">Back</option>
            <option value="Erector Spinae">Erector Spinae</option>
            <option value="Biceps">Biceps</option>
            <option value="Triceps">Triceps</option>
            <option value="Forearm">Forearm</option>
            <option value="Abs">Abs</option>
            <option value="Leg">Leg</option>
            <option value="Calf">Calf</option>
            <option value="Hips">Hips</option>
            <option value="Cardio">Cardio</option>
            <option value="Full Body">Full Body</option>
          </select>

          <select className="dropdown" value={training} onChange={(e) => setType(e.target.value)} required>
            <option value="">Training Type</option>
            <option value="Balance">Balance</option>
            <option value="Barre">Barre</option>
            <option value="Cardiovascular">Cardiovascular</option>
            <option value="HIIT">HIIT</option>
            <option value="Kettlebell">Kettlebell</option>
            <option value="Kickboxing">Kickboxing</option>
            <option value="Low Impact">Low Impact</option>
            <option value="Mobility">Mobility</option>
            <option value="Pilates">Pilates</option>
            <option value="Plyometric">Plyometric</option>
            <option value="Pre & Posrnatal">Pre & Posrnatal</option>
            <option value="Strength Training">Strength Training</option>
            <option value="Stretching">Stretching</option>
            <option value="Toning">Toning</option>
            <option value="Warm Up/Cool Down">Warm Up/Cool Down</option>
            <option value="Yoga">Yoga</option>
          </select>

          <select className="dropdown" value={equipment} onChange={(e) => setEquipment(e.target.value)} required>
            <option value="">Equipment</option>
            <option value="Barbell">Barbell</option>
            <option value="Bench">Bench</option>
            <option value="Dumbell">Dumbell</option>
            <option value="Exercise Band">Exercise Band</option>
            <option value="Foam Roller">Foam Roller</option>
            <option value="Jump Rope">Jump Rope</option>
            <option value="Kettlebell">Kettlebell</option>
            <option value="Mat">Mat</option>
            <option value="Medicine Ball">Medicine Ball</option>
            <option value="Physio-Ball">Physio-Ball</option>
            <option value="SandBeg">SandBeg</option>
            <option value="Slosh Tube">Slosh Tube</option>
            <option value="Stationary Bike">Stationary Bike</option>
            <option value="Yoga Block">Yoga Block</option>
          </select>

          <textarea
          className="textarea"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Description"
            required
          />
      <button className="submit-button">Submit</button>
        
        </form>
      </div>

      {/* Response section */}
      <div className="exercise-response">
        <div dangerouslySetInnerHTML={{ __html: response }}></div>
      </div>
    </div>
  );
};

export default Exercise;
