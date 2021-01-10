import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';

const root = document.querySelector('#root');

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  root,
);
