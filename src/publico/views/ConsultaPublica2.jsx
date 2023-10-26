import { useState } from 'react';

import { Grid,Box} from '@mui/material';
 import ExpedientesDataGridPublico  from '../components/ExpedientesDataGridPublico';

 
import ExpedienteCardPublico from '../components/ExpedienteCardPublico';
import { NavListDrawer } from '../components/NavListDrawer';
 
 
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

  
 
  
    return (
        <Box sx={{display:'flex',mt:'3%' }}> 

<Box sx={{ display: { xs: 'none', sm: 'none', md: 'none', lg: 'none', xl: 'flex' }  
        }}> 
          <NavListDrawer />
          </Box>

     
        <Grid container     sx={{ display: 'flex' ,ml:'2%',justifyContent:'center'     }}    > 
          
             {  seleccionado && (
                   <Grid item xs={12} md={11}   >
                    <ExpedientesDataGridPublico onSelectExpediente={handleExpedienteSelect} isEditing={isEditing} setIsEditing={setIsEditing} seleccionado={seleccionado} setSeleccionado={setSeleccionado}
                 />
                </Grid>
                   )}
                     {expedienteSeleccionado && !seleccionado && (
            


            <Grid item xs={11} lg={9}    sx={{ justifyContent: 'center' }} >
                <ExpedienteCardPublico
                    expediente={expedienteSeleccionado}seleccionado={seleccionado} setSeleccionado={setSeleccionado}  />
 
            </Grid>
          
         
    )}
        </Grid>
  
        </Box>
    );
}

 

export default ConsultaPublica;
