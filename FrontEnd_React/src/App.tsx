import Home from './app/components/Home';
import Login from './app/components/Login';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

const App = () => {
  
  const [translations, setTranslations] = useState(null);
  useEffect(() => {
    const fetchTranslations = async () => {
      try {
        const response = await fetch('URL_DE_TU_SERVIDOR/translations/es.json');
        const data = await response.json();
        setTranslations(data);
      } catch (error) {
        console.error('Error fetching translations', error);
      }
    };

    fetchTranslations();
  }, []);

  const PrivateRoute = ({ nextComponent, ...rest }) => {
    const isAuthenticated = !localStorage.getItem('accessToken');
    // console.log('Private Route');
    return isAuthenticated ? nextComponent : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/hola-mundo"
          element={<PrivateRoute nextComponent={<Home />} />}
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
