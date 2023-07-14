
import {Navigate,Routes,Route} from 'react-router-dom'
import PaginaPrivada from '../pages/PaginaPrivada' 


const PrivadoRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<PaginaPrivada/>}/>
      <Route path='/*' element={<Navigate to="/"/>}/>
    </Routes>
  )
}

export default PrivadoRoutes ;
