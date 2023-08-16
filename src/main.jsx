import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import './styles.css';
import { AutProvider } from './context/AutProvider.jsx';

 


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      
            <BrowserRouter>
            <AutProvider>
                 <App />
                 </AutProvider>
            </BrowserRouter>
   
    </React.StrictMode>
)

