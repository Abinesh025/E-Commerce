import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { useAppContext } from './Context/useAppContext.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <useAppContext >
        <StrictMode>
          <App />
        </StrictMode>
      </useAppContext>
  </BrowserRouter>
)
