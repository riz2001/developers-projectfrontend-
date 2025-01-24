import logo from './logo.svg';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { Route, Router, Routes } from 'react-router-dom';
import Register from './components/Registration';
import Loginn from './components/Loginn';
import Quiz from './components/Quiz';
import ScoresPage from './components/result';
import PaperCupSurvey from './components/PaperCupSurvey';
import Surveyr from './Surveyr';

function App() {
  return (
   
      <BrowserRouter>
        <Routes>
          
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Loginn />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/result" element={<ScoresPage />} />
          <Route path="/survey" element={<PaperCupSurvey />} />
          <Route path="/surveyr" element={<Surveyr />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
