import { useState } from 'react';

import { Grid, Typography } from '@mui/material';
import ExpedientesDataGrid from '../componentes/ExpedientesDataGrid';
import PasesCarga from '../componentes/PasesCarga';
import DetalleExpedienteYpases from '../componentes/DetalleExpedienteYpases';
import RegisterPage from '../../auth/pages/RegisterPage';

const VistaPases = () => {

    const [expedienteSeleccionado, setExpedienteSeleccionado] = useState({
        legajo: "",
        folios: "",
        estadoExp: "Estudio",
        motivo: "",
        nuevoMotivo: "",
        comentario: " ",
        fechaIngreso: "",
        categoria: "",
        institucion: "",
        organismo: "",
        nuevaInstitucion: "",
        dem: "",
        nuevoDem: "",
        nuevoOrganismo: "",
        solicitante: "",
        apellido: "",
        nombres: "",
        dni: "",
        celular: "",
        domicilio: "",
        estado: "true",

    });


    /* -------------------------------------- */


    const [pases, setPases] = useState([]); // Aquí almacenarías los pases del expediente seleccionado

    const handleExpedienteSelected = (expediente) => {
        setExpedienteSeleccionado(expediente);

    };

    const handleAddPase = (pase) => {
        setPases(prevPases => [...prevPases, pase]);
    };

    return (

        <Grid container direction="row" sx={{ display: 'flex' }}   >

            <Grid item xs={12}>
                <Typography variant='h5' align='left' marginLeft='5%'>SELECCION DE EXPEDIENTES Y CARGA DE PASES</Typography>
            </Grid>

            <Grid item md={12} lg={6} sx={{ mr: "20px" }}  >
                <ExpedientesDataGrid onSelectExpediente={handleExpedienteSelected} />   </Grid>


            {expedienteSeleccionado && (
                <> <Grid item md={12} lg={5}>
                    <PasesCarga onAdd={handleAddPase} expediente={expedienteSeleccionado}  />

                </Grid>
                <Grid item md={12} lg={6} sx={{ alignContent: 'left' }} >
                       
                    </Grid>
                    <Grid item md={12} lg={5} sx={{ alignContent: 'left' }} >
                        <DetalleExpedienteYpases expediente={expedienteSeleccionado} pases={pases} />

                    </Grid>


                </>
            )}

        </Grid>

    );
}


export default VistaPases;