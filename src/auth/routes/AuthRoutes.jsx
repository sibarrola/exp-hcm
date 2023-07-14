import {Navigate, Routes,Route} from 'react-router-dom'
import RegisterPage from '../pages/RegisterPage'
import LoginPage from '../pages/LoginPage'
 
const AuthRoutes = () => {
  return (
    <Routes>
        <Route path='/auth/login' element ={<LoginPage/>}/>
        <Route path='/auth/register' element ={<RegisterPage/>}/>
        <Route pat ="/auth/*" element={<Navigate to="/"/>}/>
    </Routes>
  )
}

export default AuthRoutes
