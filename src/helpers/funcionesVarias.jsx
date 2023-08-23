import { format } from 'date-fns';

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
