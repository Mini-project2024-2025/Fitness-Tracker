import '../styles/Dashboard.css';  
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [workouts, setWorkouts] = useState([]);
    const [exerciseName, setExerciseName] = useState('');
    const [sets, setSets] = useState('');
    const [reps, setReps] = useState('');
    const [date, setDate] = useState('');
    const [showForm, setShowForm] = useState(false); // New state for form visibility
    
    useEffect(() => {
        // Get user data from the backend when the component loads
        const token = localStorage.getItem('token');
        
        if (token) {
            axios.get('http://localhost:5000/api/dashboard', {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(res => {
                setUser(res.data.user);
                setWorkouts(res.data.user.workouts);
            })
            .catch(err => console.log('Error fetching dashboard data:', err));
        }
    }, []);
    
    const handleAddWorkout = () => {
        const workoutData = { exerciseName, sets, reps, date };
        
        axios.post('http://localhost:5000/api/add-workout', workoutData, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        .then(res => {
            setWorkouts(prevWorkouts => [...prevWorkouts, workoutData]);
            setExerciseName('');
            setSets('');
            setReps('');
            setDate('');
        })
        .catch(err => console.log('Error adding workout:', err));
    };

    return (
        <div className="dashboard-main-container">
            {user ? (
                <>
                    <div className="dashboard-output-section">
                        <h1 className="dashboard-h1">Hi {user.name}</h1>
                        
                        <button className="dashboard-button" onClick={() => setShowForm(!showForm)}>
                            {showForm ? "Hide Workout Form" : "Add Your Workout"}
                        </button>

                        {/* Show the form only when showForm is true */}
                        {showForm && (
                            <div className="dashboard-workout-form">
                                <input
                                    type="text"
                                    placeholder="Exercise Name"
                                    value={exerciseName}
                                    onChange={(e) => setExerciseName(e.target.value)}
                                />
                                <input
                                    type="number"
                                    placeholder="Sets"
                                    value={sets}
                                    onChange={(e) => setSets(e.target.value)}
                                />
                                <input
                                    type="number"
                                    placeholder="Reps"
                                    value={reps}
                                    onChange={(e) => setReps(e.target.value)}
                                />
                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                />
                                <button className="dashboard-button" onClick={handleAddWorkout}>Update</button>
                            </div>
                        )}

                        <div className="dashboard-workout-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Exercise</th>
                                        <th>Sets</th>
                                        <th>Reps</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {workouts.map((workout, index) => (
                                        <tr key={index}>
                                            <td>{workout.exerciseName}</td>
                                            <td>{workout.sets}</td>
                                            <td>{workout.reps}</td>
                                            <td>{new Date(workout.date).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            ) : (
                <div className="dashboard-warning-message">
                    <h2>Login First to Access the Dashboard</h2>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
