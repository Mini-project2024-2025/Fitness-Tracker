import React, { useState } from 'react';
import jsPDF from 'jspdf';
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
      const res = await fetch('http://localhost:5001/api/dietPlanner', {
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
    const paragraphs = response.split(/<\/?p>/).filter((para) => para.trim() !== '');
    return paragraphs.map((para) => `<p>${para.trim()}</p>`).join('');
  };

  const handlePositiveChange = (setter) => (e) => {
    const value = e.target.value;
    if (value === '' || /^[+]?\d+(\.\d+)?$/.test(value)) {
      setter(value);
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth() - 20; // Width with 10px margins
    const pageHeight = doc.internal.pageSize.getHeight() - 20; // Height with 10px margins
    const title = 'AI Exercise Planner Response';
  
    // Add Title
    doc.setFontSize(16);
    doc.text(title, 10, 10);
    doc.setFontSize(12);
  
    // Convert HTML response into plain text with line breaks between paragraphs
    const plainText = response
      .replace(/<\/p>/g, '\n\n') // Replace closing paragraph tags with double line breaks
      .replace(/<\/?[^>]+(>|$)/g, '') // Remove other HTML tags
      .trim();
  
    // Split the text into lines that fit within the page width
    const lines = doc.splitTextToSize(plainText, pageWidth);
  
    // Add text to the PDF with reduced line spacing
    let cursorY = 20; // Start below the title
    const lineHeight = 7; // Reduced line height for tighter spacing
  
    lines.forEach((line) => {
      if (cursorY + lineHeight > pageHeight) {
        // Add a new page if content overflows
        doc.addPage();
        cursorY = 10; // Reset cursor to the top of the new page
      }
      doc.text(line, 10, cursorY);
      cursorY += lineHeight;
    });
  
    // Save the PDF
    doc.save('ExercisePlannerResponse.pdf');
  };
  

  return (
    <div className="ExercisePlanner-container">
        <div class="image-section">
        <div class="overlay-text">Find Your <br/> Perfect <br/> Exercise Routine</div>
    </div>
      {/* Input section */}
      <div className="inputs-containe">
        <form onSubmit={handleSubmit}>
          
          <input
          class="input-box"
            type="number"
            value={time}
            onChange={handlePositiveChange(setTime)}
            placeholder="Enter Time in min"
            required
            min="0"
          />

          <input
          class="input-box"
            type="number"
            value={difficulty}
            onChange={handlePositiveChange(setDifficulty)}
            placeholder="Enter your Difficulty level"
            required
            min="0"
          />

          <select class="dropdown" value={focus} onChange={(e) => setfocus(e.target.value)} required>
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

          <select class="dropdown" value={training} onChange={(e) => setType(e.target.value)} required>
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

          <select class="dropdown" value={equipment} onChange={(e) => setEquipment(e.target.value)} required>
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
          class="textarea"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="for exercise video"
            required
          />
<div class="center-section"></div>
<button class="submit-button">Submit</button>
        
        </form>
      </div>

      {/* Response section */}
      <div className="exercise-response">
        <div id="responseBox" dangerouslySetInnerHTML={{ __html: response }}></div>
        {response && (
          <button onClick={generatePDF}>Download as PDF</button>
        )}
      </div>
    </div>
  );
};

export default Exercise;
