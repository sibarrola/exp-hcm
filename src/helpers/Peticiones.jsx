    const Peticiones = async (url, metodo, datosGuardar = "") => {
        let opciones = {
          method: metodo,
        };
      
        if (metodo === "POST" || metodo === "PUT") {
          opciones = {
            ...opciones,
            body: JSON.stringify(datosGuardar),
            headers: {
              "Content-Type": "application/json",
            },
          };
        }
      
        const peticion = await fetch(url, opciones);
        const datos = await peticion.json();
      
        return {
          datos,
        };
      };
      
      export default Peticiones;
      