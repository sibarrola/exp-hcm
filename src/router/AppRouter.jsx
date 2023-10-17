import { Navigate, Route, Routes } from 'react-router-dom'

import LoginPage from '../auth/pages/LoginPage'
import RegisterPage from '../auth/pages/RegisterPage'
import LogoutPage from '../auth/pages/LogoutPage'
import PaginaPrivada from '../privado/pages/PaginaPrivada'
import PaginaPublica from '../publico/pages/PaginaPublica'
import PaginaConsultaCiudadano from '../publico/pages/PaginaConsultaCiudadano'
import CargaExpedientes from '../privado/pages/CargaExpedientes'
import ListaEdicionExpedientes from '../privado/pages/ListaEdicionExpedientes'
import Tablas from '../privado/pages/Tablas'
import CargaPases from '../privado/pages/CargaPases'
import PaginaContacto from '../publico/pages/PaginaContacto'
 
  
const AppRouter = () => {
   
    return (
      
  
        <Routes>
    {/* Privada................................................ */}
          
 
            <Route path='/privado/menu' element={ <PaginaPrivada /> }  />
            <Route path="/privado/tablas/:nro" element={ <Tablas />} />
            <Route path='/privado/ingresos'element={ <CargaExpedientes /> } />
            <Route path='/privado/edicion'element={ <ListaEdicionExpedientes/> } />
            <Route path='/privado/pases'element={ <CargaPases/> } />
       
            {/* Login y Registro......................................... */}
            <Route path='/auth/login' element={<LoginPage />} />
            <Route path='/auth/register' element={<RegisterPage />} />
            <Route path='/auth/logout' element={<LogoutPage/>} />
            <Route path='/auth/*' element={<LoginPage />} />
  

            {/* public */}
            {/*   <Route path='/expedientes' element={<PublicoRoutes/>}/> */}
            <Route path='/' element={<PaginaPublica />} />
            <Route path='/expedientes' element={<PaginaConsultaCiudadano />} />
            <Route path='/contacto' element={<PaginaContacto />} />
            <Route path='/*' element={<Navigate to="/" />} />

 
        </Routes>
   
    )
}

export default AppRouter

