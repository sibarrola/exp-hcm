import { useState } from 'react';

import { Grid, Typography } from '@mui/material';

import ExpedientesEdicion from '../componentes/ExpedientesEdicion';

import ExpedientesDataGrid from '../componentes/ExpedientesDataGrid';
const VistaEdicion = () => {
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
    const [isEditing, setIsEditing] = useState(false);

    const handleExpedienteSelected = (expediente) => {
        setExpedienteSeleccionado(expediente);
        setIsEditing(true);
    };

    const handleUpdated = () => {
        setIsEditing(false);
    };
    return (
        <>

            <Grid container direction="row" justifyContent="center"   >

                <Grid item xs={12}>
                    <Typography variant='h4' align='left' marginLeft='5%'>EDICION EXPEDIENTES</Typography>
                </Grid>

                <Grid item md={12} lg={6} sx={{ mr: "20px" }}  >

                    <ExpedientesDataGrid onSelectExpediente={handleExpedienteSelected} />

                </Grid>
                <Grid item md={12} lg={5} >
                    <ExpedientesEdicion
                        titulo="Edicion"
                        expediente={expedienteSeleccionado}
                        estadoCarga="Edicion"
                        onUpdated={handleUpdated}
                    />
                </Grid>

            </Grid>

        </>
    );
};

export default VistaEdicion;
