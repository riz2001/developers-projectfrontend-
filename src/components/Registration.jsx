import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';
// Import useNavigate for redirection

// Inline CSS styles
const styles = {
  body: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f4f7fc',
    margin: 0,
    padding: 0,
  },
  registrationContainer: {
    maxWidth: '400px',
    margin: '50px auto',
    padding: '20px',
    backgroundColor: '#fff',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
  },
  registrationTitle: {
    textAlign: 'center',
    color: '#333',
    fontSize: '24px',
    marginBottom: '20px',
  },
  errorMessage: {
    color: 'red',
    textAlign: 'center',
    marginBottom: '15px',
  },
  registrationForm: {
    display: 'flex',
    flexDirection: 'column',
  },
  formField: {
    marginBottom: '15px',
  },
  label: {
    fontSize: '14px',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginTop: '5px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '14px',
  },
  inputFocus: {
    borderColor: '#007BFF',
    outline: 'none',
  },
  submitButton: {
    padding: '12px',
    backgroundColor: '#007BFF',
    color: 'white',
    fontSize: '16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  submitButtonHover: {
    backgroundColor: '#0056b3',
  },
  backButton: {
    marginTop: '10px',
    padding: '12px',
    backgroundColor: '#6c757d',
    color: 'white',
    fontSize: '16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  backButtonHover: {
    backgroundColor: '#5a6268',
  },
};

function Registration() {
  const [formData, setFormData] = useState({
    name: '',
    rollNo: '',
    admissionNo: '',
    department: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/register', formData);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message || 'Error during registration');
    }
  };

  const handleBackToLogin = () => {
    navigate('/'); // Navigate back to the login page
  };

  return (
    <div style={styles.registrationContainer}>
      <h2 style={styles.registrationTitle}>Student Registration</h2>
      {message && <p style={styles.errorMessage}>{message}</p>}
      <form onSubmit={handleSubmit} style={styles.registrationForm}>
        <div style={styles.formField}>
          <label style={styles.label}>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter your full name"
            style={styles.input}
          />
        </div>

        <div style={styles.formField}>
          <label style={styles.label}>Roll Number:</label>
          <input
            type="text"
            name="rollNo"
            value={formData.rollNo}
            onChange={handleChange}
            maxLength="3"
            required
            placeholder="Enter your roll number"
            style={styles.input}
          />
        </div>

        <div style={styles.formField}>
          <label style={styles.label}>Admission Number:</label>
          <input
            type="text"
            name="admissionNo"
            value={formData.admissionNo}
            onChange={handleChange}
            maxLength="7"
            required
            placeholder="Enter your admission number"
            style={styles.input}
          />
        </div>

        <div style={styles.formField}>
          <label style={styles.label}>Department:</label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
            placeholder="Enter your department"
            style={styles.input}
          />
        </div>

        <div style={styles.formField}>
          <label style={styles.label}>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email address"
            style={styles.input}
          />
        </div>

        <div style={styles.formField}>
          <label style={styles.label}>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Enter your password"
            style={styles.input}
          />
        </div>

        <button type="submit" style={styles.submitButton}>
          Register
        </button>
      </form>

      <button onClick={handleBackToLogin} style={styles.backButton}>
        Back to Login
      </button>
    </div>
  );
}

export default Registration;
