import { useState } from 'react';

import { Grid, Typography } from '@mui/material';

import ExpedientesCarga from '../componentes/ExpedientesCarga';
import ExpedientesDataGrid from '../componentes/ExpedientesDataGrid';
const VistaEdicion = () => {
    const handleExpedienteSelected = (expediente) => {
        setExpedienteSeleccionado(expediente);
        setIsEditing(true);
    };

    const [expedienteSeleccionado, setExpedienteSeleccionado] = useState({
        _id:"",
        legajo: "",
        folios: "",
        estadoExp: "Estudio",
        motivo: "",
        nuevoMotivo: "",
        comentario: " ",
        fechaIngreso: new Date().toISOString().substring(0, 10),
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
 
 

    // este estado  lo  pongo porque los usa el componente DATAGRID (pero en realidad los usa desde la VistaPases )
    const [seleccionado, setSeleccionado] = useState(true); // expediente 
 
    return (
        <>

            <Grid container direction="row" justifyContent="center"  sx={{mt:'1%'}} >

         {/*        <Grid item xs={12}>
                    <Typography variant='h5' align='left' marginLeft='5%'>LISTA/EDICION DE EXPEDIENTES</Typography>
                </Grid> */}

                <Grid item md={12} lg={6} sx={{ mr: "20px" }}  >
             
                   <ExpedientesDataGrid handleExpedienteSelected={handleExpedienteSelected} isEditing={isEditing} setIsEditing={setIsEditing} seleccionado={seleccionado} setSeleccionado={setSeleccionado} />

                </Grid>
                <Grid item md={12} lg={5} >
                  {/*   <ExpedientesEdicion */}
                 <ExpedientesCarga
                        titulo="Edicion"
                        expedienteSeleccionado={expedienteSeleccionado}
                        estadoCarga="Edicion"
                        setExpedienteSeleccionado={setExpedienteSeleccionado}
                        handleExpedienteSelected={handleExpedienteSelected}
                        isEditing={isEditing} 
                        setIsEditing={setIsEditing}
                    /> 
                </Grid>

            </Grid>

        </>
    );
};

export default VistaEdicion;