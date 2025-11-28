import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { EnchoreProvider } from './context/EnchoreContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <EnchoreProvider>
      <App />
    </EnchoreProvider>
  </React.StrictMode>
);
