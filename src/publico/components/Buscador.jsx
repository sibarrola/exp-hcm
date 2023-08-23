
import { Alert, Button, Grid, Typography } from '@mui/material';
import { useState } from 'react'


const Buscador = ({ listadoState, setListadoState }) => {  // puedo acceder al array listadoState y el metodo para 
    const [busqueda, setBusqueda] = useState(""); //arranco con una busqueda vacio
    const [noEncontrado, setNoencontrado] = useState(false);
    const buscarPeli = (e) => {


        // crear estado y actualizarlo
        setBusqueda(e.target.value)
        console.log(busqueda);
        console.log('listadoState', listadoState);
    }
        // filtrar el estado para buscar coincidencias
 /*        let peliculas_encontradas = listadoState.filter(peli => {
            // el includes tambien funciona en textos pues un string se comporta como un array
            return peli.Exp.toLowerCase().includes(busqueda.toLocaleLowerCase());
        }); */
       /*  if (busqueda.length <= 1 || peliculas_encontradas <= 0) {
            peliculas_encontradas = JSON.parse(localStorage.getItem("pelis"));
            setNoencontrado(true);
        }
        else {
            setNoencontrado(false)
        }
        console.log('filtradas', peliculas_encontradas); */


        // Actualizar estado del Listado principal con lo que he logrado filtrar
 /*        setListadoState(peliculas_encontradas);

    } */
    return (
        <>
            <form>
                <Grid
                    container
                    spacing={0}  /* para que no haya espacio entre los hijos */
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    sx={{ minHeight: '18vh',  padding: 1,width: { sm: 265} }}
                >
                    <Grid item
                        className='box-shadow'
                        xs={2}   /* em pág pequeñas va a tener 3 posiciones */
                        sx={{
                            width: { sm: 250 },
                            backgroundColor: 'white',
                            padding: 3,
                            borderRadius: 2
                        }}>

                        {(noEncontrado === true && busqueda.length > 0) && (
                            <Alert color='error' >No fue encontrado</Alert>
                        )}
                        <Typography variant="h5" sx={{ mb: 1, fontWeight: "bold" }}> Buscador</Typography>
                        <Grid item xs={12} sx={{ m: 1 }}>

                            <input type="text"
                                name="busqueda"
                                autoComplete="off"
                                value={busqueda}
                                onChange={buscarPeli}
                            />


                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button variant="contained" sx={{ pl: '5' }}>Buscar</Button>
                        </Grid>




                    </Grid>
                </Grid>

            </form>


        </>
    )
}

export default Buscador
