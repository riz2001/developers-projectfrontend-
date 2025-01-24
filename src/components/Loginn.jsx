import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for redirection

// Inline CSS styles
const styles = {
  body: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f4f7fc',
    margin: 0,
    padding: 0,
  },
  loginContainer: {
    maxWidth: '400px',
    margin: '100px auto',
    padding: '20px',
    backgroundColor: '#fff',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
  },
  loginTitle: {
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
  loginForm: {
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
  registerButton: {
    padding: '12px',
    backgroundColor: '#28a745',
    color: 'white',
    textAlign:'center',
    fontSize: '16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    marginTop: '15px',
  },
};

function Loginn() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  const navigate = useNavigate();  // Initialize the useNavigate hook

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', formData);
      setMessage(response.data.message);

      // Store token and userId in sessionStorage (or localStorage if you prefer)
      const { token, userId } = response.data;
      sessionStorage.setItem('token', token);  // Store the JWT token
      sessionStorage.setItem('userId', userId);  // Store the userId

      console.log('Login success:', response.data);

      // Redirect to quiz page after successful login
      navigate('/quiz');  // Redirect to the quiz page

    } catch (error) {
      setMessage(error.response.data.message || 'Error during login');
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register');  // Redirect to the register page
  };

  return (
    <div style={styles.loginContainer}>
      <h2 style={styles.loginTitle}>User Login</h2>
      {message && <p style={styles.errorMessage}>{message}</p>}
      <form onSubmit={handleSubmit} style={styles.loginForm}>
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
          Login
        </button>
      </form>

      {/* Register Button */}
      <button 
        onClick={handleRegisterRedirect}
        style={styles.registerButton}
      >
        Don't have an account? Register
      </button>
    </div>
  );
}

export default Loginn;
