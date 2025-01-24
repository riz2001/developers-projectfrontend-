import logo from './logo.svg';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { Route, Router, Routes } from 'react-router-dom';
import Register from './components/Registration';
import Loginn from './components/Loginn';

function App() {
  return (
   
      <BrowserRouter>
        <Routes>
          
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Loginn />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
