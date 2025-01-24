import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap for styling

const ScoresPage = () => {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await axios.get('http://localhost:5000/quiz/scores');
        setScores(response.data.scores);
        setLoading(false);
      } catch (err) {
        setError('Error fetching scores. Please try again later.');
        setLoading(false);
      }
    };

    fetchScores();
  }, []);

  if (loading) return <p>Loading scores...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
    <Navbar />
  
    <div>

    
    <div className="container mt-5">
      
      <h2 className="text-center mb-4">Quiz Scores</h2>

      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>Username</th>
              <th>Score</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((score, index) => (
              <tr key={index}>
                <td>{score.userId.name}</td> {/* Username */}
                <td>{score.scored}</td> {/* Score */}
                <td>{new Date(score.date).toLocaleDateString()}</td> {/* Date */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
    </div>
  );
};

export default ScoresPage;
