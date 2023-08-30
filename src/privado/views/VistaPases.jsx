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
    const [seleccionado, setSeleccionado] = useState(true);

    const handleAddPase = (pase) => {
        setPases(prevPases => [...prevPases, pase]);
    };

    return (

        <Grid container direction="row" sx={{ display: 'flex' ,justifyContent:'between' }}    spacing={2}  >

            <Grid item xs={12}>
                <Typography variant='h5' align='left' marginLeft='5%'>SELECCION DE EXPEDIENTES Y CARGA DE PASES</Typography>
            </Grid>
            {seleccionado && (
            <Grid item md={12} lg={12} sx={{ mr: "20px" }}  >
                <ExpedientesDataGrid onSelectExpediente={handleExpedienteSelected} seleccionado={seleccionado} setSeleccionado={setSeleccionado} />   </Grid>
            )}

            {expedienteSeleccionado && !seleccionado && (
                <> <Grid item xs={12}  md={4} >
                    <PasesCarga onAdd={handleAddPase} expediente={expedienteSeleccionado} seleccionado={seleccionado} setSeleccionado={setSeleccionado}   />

                </Grid>
              
                    <Grid item xs={12}  md={8}   sx={{ alignContent: 'left' }} >
                        <DetalleExpedienteYpases expediente={expedienteSeleccionado} pases={pases} />

                    </Grid>


                </>
            )}

        </Grid>

    );
}


export default VistaPases;