// src/pages/StaticPage/StaticPage.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';

const StaticPage: React.FC = () => {
  const navigate = useNavigate();

  const redirectToForm = () => {
    navigate('/form');
  };

  return (
    <div data-testid="static-page">
      <h1>Welcome to Todo App</h1>
      <p>Powered by React + Supabase</p>
      <button onClick={redirectToForm} aria-label="Go to Form">
        Go to Form
      </button>
    </div>
  );
};

export default StaticPage;
