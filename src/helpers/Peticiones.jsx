/* esta es una fución para cuando quiero guardar algo en forma rapida, no trabaja con estados... */
const Peticiones= async(url,metodo,datosGuardar="")=>{

    let opciones={
        method:"GET"
    };

    if (metodo=="GET" || metodo=="DELETE"){
         opciones = {
            method:metodo,
         };
    }
    if (metodo=="POST" || metodo=="PUT"){
        opciones = {
            method:metodo,
            body:JSON.stringify(datosGuardar),
            headers: {
                "Content-Type":"application/json"
            }
        };
      }
     const peticion=await fetch(url,opciones);
           datos=await  peticion.json();

     return {
        datos
     }
    }