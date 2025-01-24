import React, { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';

const PaperCupSurvey = () => {
  const [formData, setFormData] = useState({
    usageFrequency: "",
    healthRiskAwareness: "",
    alternativesUsed: "",
    environmentalConcern: 3,
    challenges: [],
    supportTechSolutions: "",
    motivation: "",
    additionalFeedback: "",
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const userId = sessionStorage.getItem("userId"); // Retrieve user ID from sessionStorage

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        challenges: checked
          ? [...prevData.challenges, value]
          : prevData.challenges.filter((challenge) => challenge !== value),
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      setError("User ID not found. Please log in.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/survey", {
        userId,
        ...formData,
      });
      setSuccess(response.data.message);
      setError("");
    } catch (err) {
      setError("Failed to submit survey. Please try again.");
      setSuccess("");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <h2 className="text-center mb-4">Paper Cup Usage Survey</h2>
        {success && <p className="text-success">{success}</p>}
        {error && <p className="text-danger">{error}</p>}
        
        <form onSubmit={handleSubmit} className="shadow-lg p-4 rounded bg-light">
          <div className="mb-3">
            <label className="form-label">
              How often do you use disposable paper cups?
            </label>
            <select
              name="usageFrequency"
              value={formData.usageFrequency}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">Select...</option>
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Occasionally">Occasionally</option>
              <option value="Rarely">Rarely</option>
              <option value="Never">Never</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">
              Are you aware of the health risks (e.g., BPA, phthalates) associated with paper cups?
            </label>
            <select
              name="healthRiskAwareness"
              value={formData.healthRiskAwareness}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">Select...</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              <option value="Somewhat">Somewhat</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">
              What alternatives do you currently use to reduce paper cup usage?
            </label>
            <input
              type="text"
              name="alternativesUsed"
              value={formData.alternativesUsed}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              How concerned are you about the environmental impact of disposable paper cups?
            </label>
            <input
              type="range"
              name="environmentalConcern"
              value={formData.environmentalConcern}
              onChange={handleChange}
              min="1"
              max="5"
              className="form-range"
            />
            <span>{formData.environmentalConcern}</span>
          </div>

          <fieldset className="mb-3">
            <legend>What do you believe are the biggest challenges in reducing paper cup usage?</legend>
            <div className="form-check">
              <input
                type="checkbox"
                name="challenges"
                value="Lack of awareness"
                checked={formData.challenges.includes("Lack of awareness")}
                onChange={handleChange}
                className="form-check-input"
              />
              <label className="form-check-label">Lack of awareness</label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                name="challenges"
                value="Inconvenience of alternatives"
                checked={formData.challenges.includes("Inconvenience of alternatives")}
                onChange={handleChange}
                className="form-check-input"
              />
              <label className="form-check-label">Inconvenience of alternatives</label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                name="challenges"
                value="Cost of reusable options"
                checked={formData.challenges.includes("Cost of reusable options")}
                onChange={handleChange}
                className="form-check-input"
              />
              <label className="form-check-label">Cost of reusable options</label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                name="challenges"
                value="Limited access to sustainable solutions"
                checked={formData.challenges.includes("Limited access to sustainable solutions")}
                onChange={handleChange}
                className="form-check-input"
              />
              <label className="form-check-label">Limited access to sustainable solutions</label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                name="challenges"
                value="Others"
                checked={formData.challenges.includes("Others")}
                onChange={handleChange}
                className="form-check-input"
              />
              <label className="form-check-label">Others (please specify)</label>
            </div>
          </fieldset>

          <div className="mb-3">
            <label className="form-label">
              Would you support the use of tech-driven solutions to reduce paper cup dependency?
            </label>
            <select
              name="supportTechSolutions"
              value={formData.supportTechSolutions}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">Select...</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">
              What type of solution would motivate you to switch from disposable cups?
            </label>
            <input
              type="text"
              name="motivation"
              value={formData.motivation}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Any additional feedback or suggestions for reducing paper cup reliance?
            </label>
            <textarea
              name="additionalFeedback"
              value={formData.additionalFeedback}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">Submit Survey</button>
        </form>
      </div>
    </div>
  );
};

export default PaperCupSurvey;
