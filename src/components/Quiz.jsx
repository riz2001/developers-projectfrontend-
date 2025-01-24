import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap for styling

const Quiz = () => {
  const questions = [
    {
      question: "What is the primary benefit of recycling paper?",
      options: ["It increases landfill space", "It reduces pollution", "It uses more energy", "It increases deforestation"],
      correctAnswer: "It reduces pollution",
    },
    {
      question: "Which type of paper can be recycled?",
      options: ["Dirty pizza boxes", "Clean cardboard boxes", "Paper towels", "All of the above"],
      correctAnswer: "Clean cardboard boxes",
    },
    {
      question: "Why is it important to reduce paper usage?",
      options: ["To save energy and water", "To increase forest area", "To reduce the use of plastic", "To encourage more deforestation"],
      correctAnswer: "To save energy and water",
    },
    {
      question: "What material is commonly used to make recycled paper?",
      options: ["Plastic", "Newspapers", "Metal", "Glass"],
      correctAnswer: "Newspapers",
    },
    {
      question: "What is the first step in the paper recycling process?",
      options: ["Sorting", "Shredding", "Cleaning", "Mixing with water"],
      correctAnswer: "Sorting",
    },
    {
      question: "Which of the following is NOT recyclable?",
      options: ["Newspapers", "Cardboard", "Used paper napkins", "Magazines"],
      correctAnswer: "Used paper napkins",
    },
    {
      question: "What is the environmental impact of paper production?",
      options: ["It reduces carbon emissions", "It contributes to deforestation", "It has no impact on the environment", "It reduces energy consumption"],
      correctAnswer: "It contributes to deforestation",
    },
    {
      question: "How much energy does recycling paper save compared to making new paper?",
      options: ["10%", "50%", "60%", "40%"],
      correctAnswer: "60%",
    },
    {
      question: "What is the term used for paper that is no longer suitable for reuse and goes into the waste stream?",
      options: ["Recycled paper", "Waste paper", "Virgin paper", "Sorted paper"],
      correctAnswer: "Waste paper",
    },
    {
      question: "What is a major reason why people avoid recycling paper?",
      options: ["It's too expensive", "It's too time-consuming", "People are unaware of its benefits", "It requires no energy"],
      correctAnswer: "People are unaware of its benefits",
    },
  ];

  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [score, setScore] = useState(0);

  const handleAnswerChange = (e, index) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[index] = e.target.value;
    setSelectedAnswers(updatedAnswers);
  };

  const handleSubmit = () => {
    let calculatedScore = 0;
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        calculatedScore++;
      }
    });
    setScore(calculatedScore);
    saveScoreToDatabase(calculatedScore);
  };

  const saveScoreToDatabase = async (score) => {
    try {
      const userId = sessionStorage.getItem('userId'); // Retrieve userId
  
      if (!userId) {
        console.error('User ID not found in session storage');
        return;
      }
  
      // Ensure `score` is a number
      const response = await axios.post('http://localhost:5000/quiz/score', {
        userId,
        score: Number(score), // Convert to a number explicitly
      });
  
      console.log(response.data.message);
    } catch (error) {
      console.error('Error saving score:', error);
    }
  };

  return (
    <div>  <Navbar />
    <div className="container mt-5">
    
      <h2 className="text-center mb-4">Paper Disposal Quiz</h2>

      <form>
        {questions.map((q, index) => (
          <div key={index} className="mb-4">
            <h4>{q.question}</h4>
            <div className="d-flex flex-column">
              {q.options.map((option, optionIndex) => (
                <div key={optionIndex} className="form-check">
                  <input
                    type="radio"
                    name={`question${index}`}
                    value={option}
                    checked={selectedAnswers[index] === option}
                    onChange={(e) => handleAnswerChange(e, index)}
                    className="form-check-input"
                  />
                  <label className="form-check-label">{option}</label>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="text-center">
          <button type="button" onClick={handleSubmit} className="btn btn-primary btn-lg">
            Submit
          </button>
        </div>
      </form>

      {score !== 0 && (
        <div className="mt-4 text-center">
          <h4>Your Score: {score}/{questions.length}</h4>
        </div>
      )}
    </div>
    </div>
  );
};

export default Quiz;
