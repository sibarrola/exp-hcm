import {useEffect,useState} from 'react';

// hice esta para usar cuando quiero traer datos de una coleccion
const [tabla,setTabla]=useState({
    datos:null,
    cargando:true
});
const getData = async(url) => {
    setTabla({
        ...tabla,
        cargando:true
    });

     
        const peticion= await fetch(url);
        const {data}= await peticion.json();
        console.log(data)
          setTabla({
              data,
              cargando:false
          })
    useEffect(()=>{
        getData();
    },[url])

  

return {
    datos:tabla.datos,
    cargando:tabla.cargando
}
}

export default getData
