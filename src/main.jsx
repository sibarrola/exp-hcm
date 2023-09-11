import React from 'react'
import ReactDOM from 'react-dom/client'
import { CssBaseline } from '@mui/material';
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import './styles.css';
import { AutProvider } from './context/AutProvider.jsx';
import { AppTheme } from "./theme"
 


ReactDOM.createRoot(document.getElementById('root')).render(
   /*  <React.StrictMode> */
  <AppTheme>
  <CssBaseline />
  <BrowserRouter>
            <AutProvider>
                 <App />
                 </AutProvider>
            </BrowserRouter>
   
  </AppTheme>
            
  /*   </React.StrictMode> */
)

