 
/* import { Typography } from '@mui/material'

import { MailOutline} from '@mui/icons-material' */

 
import AppRouter from "./router/AppRouter"
import { AppTheme } from "./theme"
import { AutProvider } from './context/AutProvider.jsx';
 
 const App = () => {
   return (
     
        <AutProvider>
            <AppTheme>
            <AppRouter/>
            </AppTheme>
          </AutProvider>
       
       
        
   
   )
 }
 
 export default App
 
