import { useState } from 'react';

import { Grid, Typography } from '@mui/material';
import ExpedientesDataGrid from '../../privado/componentes/ExpedientesDataGrid';
 
import ExpedienteCardPublico from '../components/ExpedienteCardPublico';

 
const ConsultaPublica = () => {
 
 
  
    const [expedienteSeleccionado, setExpedienteSeleccionado] = useState({
        _id: "",
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
        pases: [{}]

    });

    /* -------------------------------------- */
 
 
    const [seleccionado, setSeleccionado] = useState(true); // expediente seleccionado
    const [isEditing, setIsEditing] = useState(false);
 

    const handleExpedienteSelect = (expediente) => {
        setExpedienteSeleccionado(expediente);
        console.log("expediente seleccionado", expedienteSeleccionado)
        /*   setPases(expediente.pases); */
    };
    /* NUEVO------------------------------------------------------ */

  
    /* -------------------BORRA EL PASE------------------------------------ */
  
    return (

        <Grid container direction="row" spacing={2} sx={{ display: 'flex', mt:'2%', justifyContent:'center'     }}    >
       
            {/*    <div> {JSON.stringify(expedienteSeleccionado)}</div>  */}
    {/*         <Grid item xs={12}>
                 
                <Typography marginLeft="5%"   sx={colortema.typography.texto1}>SELECCION DE EXPEDIENTES Y CARGA DE PASES</Typography>
            </Grid> */}
            {/* seleccionado && ( */
              
                <Grid item xs={12} lg={6}   >
                    <ExpedientesDataGrid onSelectExpediente={handleExpedienteSelect} isEditing={isEditing} setIsEditing={setIsEditing} seleccionado={seleccionado} setSeleccionado={setSeleccionado}
                 />
                </Grid>
          
           /*  ) */}

            {expedienteSeleccionado && !seleccionado && (
            


                    <Grid item xs={12} lg={5} sx={{ alignContent: 'left' }} >
                        <ExpedienteCardPublico
                            expediente={expedienteSeleccionado}   />

                    </Grid>
                 
            )}

        </Grid>

    );
}

 

export default ConsultaPublica;
