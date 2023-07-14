import {Navigate,Routes,Route} from 'react-router-dom'
import PaginaPublica from '../pages/PaginaPublica' 
import PaginaConsultaCiudadano from '../pages/PaginaConsultaCiudadano'
 
 
const PublicoRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<PaginaPublica/>}/>
      <Route path='/expedientes' element={<PaginaConsultaCiudadano/>}/>
       <Route path='/*' element={<Navigate to="/"/>}/>  
    </Routes>
  )
}

export default PublicoRoutes
