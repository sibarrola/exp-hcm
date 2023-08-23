/* import { useState } from 'react';
 
import { Grid, Typography } from '@mui/material';
import Buscador from '../../publico/components/Buscador';
import ExpedientesTable from '../componentes/ExpedientesTable';
import ExpedientesEdicion from '../componentes/ExpedientesEdicion';
const VistaEdicion= () => {
    

    const [expedienteSeleccionado, setExpedienteSeleccionado] = useState(null);
    const [listadoState, setListadoState] = useState([]);
    const [estadoCarga,setEstadoCarga]=useState("Edicion");
    
    return (
        <Grid container direction='row' justifyContent='space-between' sx={{ mb: 1, ml:11, mt:'50px'}}>
            <Grid item xs={12} >
                <Typography fontSize={25}>Consulta Expediente del Cuidadano</Typography>
             
            </Grid>
            <Grid item xs={6} >
                {/*-- buscador */}
                <Buscador listadoState={listadoState} setListadoState={setListadoState} />
            </Grid>
            <hr/>
            {/* el formulario de edicion del expediente */}
            <Grid item xs={6} >
                {expedienteSeleccionado ? (
                    <ExpedientesEdicion expediente={expedienteSeleccionado} estadoCarga={estadoCarga}   />
                ) : (
                    <p>Selecciona un expediente</p>
                )}
            </Grid>
            <Grid item xs={12} sx={{mt:12}} > <Typography variant='h5'>LISTADO EXPEDIENTES </Typography></Grid>
            <Grid item xs={12}  >
                <ExpedientesTable       
                />
            </Grid>

        </Grid>
    );
};

/* export default VistaEdicion; */
 */