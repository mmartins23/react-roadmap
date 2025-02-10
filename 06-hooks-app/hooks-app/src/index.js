import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { MainApp } from './components/08-useContext/MainApp';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <MainApp />
    </React.StrictMode>
  </BrowserRouter>
);
