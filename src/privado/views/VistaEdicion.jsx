import { useState } from 'react';

import { Grid, Typography } from '@mui/material';

import ExpedientesTable from '../componentes/ExpedientesTable';
import ExpedientesEdicion from '../componentes/ExpedientesEdicion';
import MyDataGrid from '../../publico/components/MyDataGrid';
import ExpedientesDataGrid from '../componentes/ExpedientesDataGrid';
const VistaEdicion = () => {
    const [expedienteSeleccionado, setExpedienteSeleccionado] = useState({
  
    legajo: "",
    folios: "",
    estadoExp: "Estudio",
    motivo: "",
    nuevoMotivo: "",
    comentario: "",
    fechaIngreso:new Date().toISOString().substring(0, 10),
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
       
        <Grid container  direction="row" justifyContent="center"   >
           
            <Grid item xs={12}>
            <Typography fontSize={25}>EDICION EXPEDIENTES</Typography>
            </Grid>
                 
          
   
     {/*       <Grid item xs={5}>
                {isEditing ? (
                    <ExpedientesEdicion
                        titulo="Edicion"
                        expediente={expedienteSeleccionado}
                        estadoCarga="Edicion"
                        onUpdated={handleUpdated}
                    />
                ) : (
                    <p>Selecciona un expediente</p>
                )}
            </Grid> */}
            <Grid item xs={6} sx={{mr:"20px"}}  >
      
           <ExpedientesDataGrid onSelectExpediente={handleExpedienteSelected} />
    
           
            </Grid>
            <Grid item xs={5}  >
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
