/* para compartir una informacion con los otros componentes  */
import { Global } from '../helpers/Global';
 
import React, { useState,useEffect,createContext } from 'react'

const AuthContext =createContext();

export const AutProvider = ({children}) => {
    /* este Provider se va a ejecutar cada vez que le pase un children */
   const [auth,setAuth]=useState({});

   useEffect(()=>{
     authUser();
   }, []);

   const authUser = async()=>{
    // sacar los datos del usuario identificado del localstorage
     const token = localStorage.getItem("token");
     const user = localStorage.getItem("usuario");

    console.log("token",token);

    // comprobar si tengo el token y el user
     if(!token || !user){
        return false;     

     }

    // transformar los datos a un objeto de javascript
     const userObj =JSON.parse(user);
     const userId =userObj.uid;

    // peticion ayax al backend que compruebe el token y que ne devuelva los datos del usuario
     const request = await fetch(Global.url+"/usuarios/"+userId,{
        method:"GET",
        headers: {
            "Content-Type":"application/json",
            "x-token":token
        }
     });
     const data =await request.json();
     console.log("USUARIO",data.usuario);
   
    //setear el estado auth
    setAuth(data.usuario); 
  
   }

    return (
    <AuthContext.Provider
    value={{
        auth,
        setAuth
    }}>
      {children}          
    </AuthContext.Provider>
  )
}

export default AuthContext;
