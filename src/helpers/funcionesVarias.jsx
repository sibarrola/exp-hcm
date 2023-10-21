import { fileUpload } from "./fileUpload";

 

export const extractDigits = (value)=> {
    return value.replace(/\D/g, '');
  }
 
  
 export const formatearFecha = (fechaIngreso)=>{
    return  fechaIngreso.getUTCDate().toString().padStart(2, '0') + '/'
    + (fechaIngreso.getUTCMonth() + 1).toString().padStart(2, '0') + '/'
    + fechaIngreso.getUTCFullYear();
 
  
  /*   const fecha = new Date(fechaIng);
    return (fecha.getDate().toString().padStart(2, '0') + '-'
                         + (fecha.getMonth() + 1).toString().padStart(2, '0') + '-'
                         + fecha.getFullYear());
   */

  }

  export const fechaReves = (fecha)=>{
     return fecha.split('/').reverse().join('-');
     
  }

  export const calculaDias =(fecha1)=> {
    
     const fechaHoy = new Date();

const diferenciaEnMilisegundos = fechaHoy - fecha1;

const milisegundosPorDia = 1000 * 60 * 60 * 24; // 1000 ms * 60 segundos * 60 minutos * 24 horas
const dias = Math.floor(diferenciaEnMilisegundos / milisegundosPorDia);

return dias; // Esto te mostrará el número de días de diferencia.

  }

 /*  export const startUploadingFiles =(files=[])=>{
    console.log(files,"estoy en startuploadingfiles");
    
    return async()=>{
        await fileUpload(files[0]);
    }
  } */