
// hice esta para usar cuando quiero traer datos de una coleccion
const [tabla,setTabla]=useState({
    datos:null,
    cargando:true
});
const useTablasCombos = async(url) => {
   

     
        const peticion= await fetch(url);
        const {data}= await peticion.json();
        console.log(data)
          setTabla({
              datos:data,
             
          })
    useEffect(()=>{
        getData();
    },[url])

  

return {
    datos:tabla.datos,
     
}
}

export default useTablasCombos
