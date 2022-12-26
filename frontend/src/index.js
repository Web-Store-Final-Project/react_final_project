import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ItemsContextProvider } from './context/ItemsContext';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ItemsContextProvider>
      <App />
    </ItemsContextProvider>
  </React.StrictMode>
);

