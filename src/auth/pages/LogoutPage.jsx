import React from 'react'
import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
const LogoutPage = () => {
 const {setAuth}=useAuth();
 const navigate=useNavigate();

 useEffect(()=>{
    //vacio el localStorage
   /*  localStorage.removeItem("token");
    localStorage.removeItem("usuario"); */

    // setear estados globales
    setAuth({});
     console.log("ESTOY EN LOGOUT PAGE")
    // redireccione a la barra login
   /*  navigate("/auth/login"); */
  // Cerrar la página del navegador
  window.close();
 })





  return (
    <h1>
      Cerrando sesión....
    </h1>
  )
}

export default LogoutPage
