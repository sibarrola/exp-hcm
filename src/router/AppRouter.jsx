import { Route, Routes } from 'react-router-dom'
import AuthRoutes from '../auth/routes/AuthRoutes'
import PublicoRoutes from '../publico/routes/PublicoRoutes'
import PrivadoRoutes from '../privado/routes/PrivadoRoutes'
import LoginPage from '../auth/pages/LoginPage'
import RegisterPage from '../auth/pages/RegisterPage'
 
const AppRouter = () => {
    return (
        <Routes>

            
            {/* Privada................................................ */}
             <Route path='/privado/*'  element={<PrivadoRoutes/>}/>  

            {/* Login y Registro......................................... */}
              <Route path='/auth/login' element ={<LoginPage/>}/>    
              <Route path='/auth/register' element ={<RegisterPage/>}/>  
             <Route path='/auth/*'  element={<AuthRoutes/>}/>       {/* esto no me funcionó...... */}
            
 
            {/* public */}
          {/*   <Route path='/expedientes' element={<PublicoRoutes/>}/> */}
            <Route path='/*' element={<PublicoRoutes/>}/>
       

        </Routes>
    )
}

export default AppRouter

 