import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap for styling

const AllUsersSurveyList = () => {
  const [surveyData, setSurveyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSurveyData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/survey/all"); // Fetch all surveys with user details
        setSurveyData(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch survey data. Please try again later.");
        setLoading(false);
      }
    };

    fetchSurveyData();
  }, []);

  if (loading) return <p>Loading survey details...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
          <Navbar />
    <div className="container mt-5">
    
      <h2 className="text-center mb-4">All Users' Survey Details</h2>

      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="thead-dark">
            <tr>
              <th>Name</th>
              <th>Department</th>
              <th>Usage Frequency</th>
              <th>Health Risk Awareness</th>
              <th>Alternatives Used</th>
              <th>Environmental Concern</th>
              <th>Challenges</th>
              <th>Support Tech Solutions</th>
              <th>Motivation</th>
              <th>Additional Feedback</th>
            </tr>
          </thead>
          <tbody>
            {surveyData.map((survey, index) => (
              <tr key={index}>
                <td>{survey.userId ? survey.userId.name : "N/A"}</td> {/* Displaying user name */}
                <td>{survey.userId ? survey.userId.department : "N/A"}</td> {/* Displaying user department */}
                <td>{survey.usageFrequency}</td>
                <td>{survey.healthRiskAwareness}</td>
                <td>{survey.alternativesUsed || "N/A"}</td>
                <td>{survey.environmentalConcern}</td>
                <td>{survey.challenges.join(", ") || "N/A"}</td>
                <td>{survey.supportTechSolutions}</td>
                <td>{survey.motivation || "N/A"}</td>
                <td>{survey.additionalFeedback || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default AllUsersSurveyList;
