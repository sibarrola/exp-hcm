import { useState } from 'react';
import ExpedientesList from '../components/ExpedientesList';
import ExpedienteDetalle from '../components/ExpedienteDetalle';
import { Grid, Typography } from '@mui/material';
import Buscador from '../components/Buscador';

const ConsultaPublica = () => {
    const [expedientes, setExpedientes] = useState([
        { id: 1, nombre: 'Expediente 1', descripcion: 'Descripción del expediente 1' },
        { id: 2, nombre: 'Expediente 2', descripcion: 'Descripción del expediente 2' },
        { id: 3, nombre: 'Expediente 3', descripcion: 'Descripción del expediente 3' },
        // Agrega más expedientes según tus necesidades
    ]);

    const [expedienteSeleccionado, setExpedienteSeleccionado] = useState(null);
    const [listadoState, setListadoState] = useState([]);
    const handleSelectExpediente = (expediente) => {
        setExpedienteSeleccionado(expediente);
    };

    return (
        <Grid container direction='row' justifyContent='space-between' sx={{ mb: 1, ml:11, mt:'50px'}}>
            <Grid item xs={12} >
                <Typography fontSize={25}  >Consulta Expediente del Cuidadano</Typography>
             
            </Grid>
            <Grid item >
                {/*-- buscador */}
                <Buscador listadoState={listadoState} setListadoState={setListadoState} />
            </Grid>
            <hr/>
            <Grid item xs={6} >
                {expedienteSeleccionado ? (
                    <ExpedienteDetalle expediente={expedienteSeleccionado} />
                ) : (
                    <p>Selecciona un expediente</p>
                )}
            </Grid>
            <Grid item xs={12} sx={{mt:12}} > <Typography variant='h5'>LISTADO EXPEDIENTES </Typography></Grid>
            <Grid item xs={12}  >
                <ExpedientesList
                    expedientes={expedientes}
                    onSelectExpediente={handleSelectExpediente}
                />
            </Grid>

        </Grid>
    );
};

export default ConsultaPublica;
