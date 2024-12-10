import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import { AuthContextWrapper } from '../context/Auth.context.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <AuthContextWrapper>
        <App />
      </AuthContextWrapper>
    </Router>
  </StrictMode>,
);
