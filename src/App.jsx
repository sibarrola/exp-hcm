 
/* import { Typography } from '@mui/material'

import { MailOutline} from '@mui/icons-material' */

 
import AppRouter from "./router/AppRouter"
import { AppTheme } from "./theme"
import { AutProvider } from './context/AutProvider.jsx';
 
 const App = () => {
   return (
     <AppTheme>
        <AutProvider>
        <AppRouter/>
        </AutProvider>
       
       
        
    </AppTheme>
   )
 }
 
 export default App
 
