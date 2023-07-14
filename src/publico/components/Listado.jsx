import React, { useEffect, useState } from 'react'
 


// tengo que recibir unas prop, que me llegan en forma de objeto, que puedo desestructurar
const Listado = ({ listadoState,setListadoState}) => {
    // tratar de poner los hook arriba de todo, arriba de las otras frunciones......
   // const [listadoState, setListadoState] = useState([]);
    const [editar, setEditar] = useState(0);

    const conseguirPeliculas = () => {
       /*  let peliculas = JSON.parse(localStorage.getItem("pelis")); */
     let peliculas=[
        { id: 1,Exp:'123' ,fecha:'23/05/2022', Apellido: 'Perez', Nombres: 'Marina', estado: 'En estudio' },
        { id: 2,Exp:'124' ,fecha:'23/05/2022', Apellido: 'Gómez', Nombres: 'Juan', estado: 'Archivado' },
        { id: 3,Exp:'125' ,fecha:'23/05/2022', Apellido: 'Fernandez', Nombres: 'Alicia', estado: 'En estudio' },
        { id: 4,Exp:'126' ,fecha:'23/05/2022', Apellido: 'Pratto', Nombres: 'José', estado: 'En estudio' },
        // Agrega más filas si lo deseas
      ];
        setListadoState(peliculas);
    
        return peliculas;
    }
     
     useEffect(() => {
      conseguirPeliculas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
   // el use Effect anduvo con ese comentario, sino me da error

    const borrarPeli = (id) => {
        // conseguir peliculas  almacenadas
        let pelis_almacenadas = conseguirPeliculas();

        // filtrar esas peliculas para que elimine del array la que no quiero

        let nuevo_array_pelis = pelis_almacenadas.filter(peli => peli.id !== parseInt(id)) //me quedo con todas las peliculas cuyo identificador sea distinto al que le estoy pasando como parametro
        // (se descarta la pelicula de ese id)

        //actualizar estado del listado
        setListadoState(nuevo_array_pelis);

        // actualizar el localstorage
        localStorage.setItem('pelis', JSON.stringify(nuevo_array_pelis));

    }


    return (

        <>
            {listadoState != null ?
                listadoState.map(peli => {
                    return (
                        <article key={peli.id} className="peli-item">
                            <h3 className="title"> {peli.Exp}</h3>
                            <p className="description">{peli.fecha}</p>
                            <p className="description">{peli.Apellido}</p>
                            <p className="description">{peli.Nombres}</p>
                            <p className="description">{peli.estado}</p>

                            <button className="edit" onClick={() => setEditar(peli.id)}>seleccionar</button>
                          {/*    
                            {editar === peli.id 
                             && (
                                    
                                <Editar peli={peli} conseguirPeliculas={conseguirPeliculas} setListadoState={setListadoState} setEditar={setEditar}/>  
                            )  
                            } */}
                        </article>
                    )
                })
                : <h2>No hay peliculas para mostrar</h2>
            }



        </>
    )
}
export default Listado