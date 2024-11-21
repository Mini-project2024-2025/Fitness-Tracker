import React, { useState } from 'react';
import '../styles/DietPlanner.css'; 

const DietPlanner = () => {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [targetWeight, setTarget]=useState('');
  const [goal, setGoal]=useState('');
  const [dietType, setType]=useState('');
  const [mealTime, setTime]=useState('');
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5001/api/dietPlanner', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ age, gender, height, weight, targetWeight, goal, dietType, mealTime, question }),
      });

      const data = await res.json();
      setResponse(formatResponse(data.response));  // Format the response
    } catch (error) {
      console.error('Error:', error);
      setResponse('There was an error processing your request.');
    }
  };

  // Function to format the response in a consistent manner
  const formatResponse = (response) => {
    return `<h2>AI Response:</h2><p>${response}</p>`;
  };

  const handlePositiveChange = (setter) => (e) => {
    const value = e.target.value;
    if (value === '' || /^[+]?\d+(\.\d+)?$/.test(value)) {
      setter(value);
    }
  };

  return (
    <div className="dietPlanner-container">
      {/* Input section */}
      <div className="diet-input">
        <form onSubmit={handleSubmit}>

          <input 
            type="number" 
            value={age}
            onChange={handlePositiveChange(setAge)}
            placeholder="Enter your age" 
            required
            min="0"
          />

          <div className='genderSelect'>
            <label>
              <input type="radio" name="gender" value="Male"
                checked={gender === 'Male'}
                onChange={(e) => setGender(e.target.value)}
              />
              Male
            </label>
            <label>
              <input name="gender" value="Female" type="radio"
                checked={gender === 'Female'}
                onChange={(e) => setGender(e.target.value)}
              />
              Female
            </label>
          </div>
          
          <input 
            type="number" 
            value={height}
            onChange={handlePositiveChange(setHeight)}
            placeholder="Enter your height in cm" 
            required
            min="0"
          />
          <input 
            type="number" 
            value={weight}
            onChange={handlePositiveChange(setWeight)}
            placeholder="Enter your weight in kg" 
            required
            min="0"
          />

          <input 
            type="number" 
            value={targetWeight}
            onChange={handlePositiveChange(setTarget)}
            placeholder="Enter your target weight" 
            required
            min="0"
          />

          <select value={goal} onChange={(e) => setGoal(e.target.value)} required>
            <option value="">Set Goal</option>
            <option value="Weight Loss">Weight Loss</option>
            <option value="Muscle Gain">Muscle Gain</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Improved Energy">Improved Energy</option>
          </select>

          <select value={dietType} onChange={(e) => setType(e.target.value)} required>
            <option value="">DietType</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Vegan">Vegan</option>
            <option value="Non-Vegetarian">Non-Vegetarian</option>
            <option value="Keto">Keto</option>
          </select>

          <select value={mealTime} onChange={(e) => setTime(e.target.value)} required>
            <option value="">Meal Time</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>

          <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Any Specific Allergy?"
              required
          />

          <button type="submit">Submit</button>
        </form>
      </div>

      {/* Response section */}
      <div className="diet-response">
        <div id="responseBox" dangerouslySetInnerHTML={{ __html: response }}></div>
      </div>
    </div>
  );
};

export default DietPlanner;
