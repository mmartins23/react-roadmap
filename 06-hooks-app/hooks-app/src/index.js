import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App';
import './index.css';
import { MainApp } from './components/09-useReducer/MainApp';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <MainApp />
    </React.StrictMode>
  </BrowserRouter>
);
