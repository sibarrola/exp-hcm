import { useState } from 'react';

import { Grid, Typography } from '@mui/material';
import ExpedientesDataGrid from '../componentes/ExpedientesDataGrid';
import PasesCarga from '../componentes/PasesCarga';
 
import ExpedienteCard from '../componentes/ExpedienteCard';


const VistaPases = () => {

    const [expedienteSeleccionado, setExpedienteSeleccionado] = useState({
        _id:"",
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
        pases:[{}]

    });
  
    /* -------------------------------------- */

    const [pases, setPases] = useState([]); // Estado que contiene la lista de pases
    const [isEditing, setIsEditing] = useState(false);  

    const [seleccionado, setSeleccionado] = useState(true);

   
    const handlePaseAdd = (nuevoPase) => {
        setPases((prevPases) => [...prevPases,nuevoPase]);
      };
    
  
    const handleExpedienteSelect = (expediente) => {
        setExpedienteSeleccionado(expediente);
        console.log("expediente seleccionado",expedienteSeleccionado)
      /*   setPases(expediente.pases); */
    };
  
 
    const handlePaseEdit = (paseId, newData) => {
      // Implementar lógica para editar el pase en pases
    };
  
    const handlePaseDelete = (paseId) => {
      // Implementar lógica para eliminar el pase de pases
    };
    return (

        <Grid container direction="row" sx={{ display: 'flex' ,justifyContent:'between' }}    spacing={2}  >
         {/*    <div> {JSON.stringify(expedienteSeleccionado)}</div>  */}
            <Grid item xs={12}>
                <Typography variant='h5' align='left' marginLeft='5%'>SELECCION DE EXPEDIENTES Y CARGA DE PASES</Typography>
            </Grid>
            {seleccionado && (
            <Grid item md={12} lg={12} sx={{ mr: "20px" }}  >
                <ExpedientesDataGrid onSelectExpediente={handleExpedienteSelect} isEditing={isEditing} setIsEditing={setIsEditing} seleccionado={seleccionado} setSeleccionado={setSeleccionado} pases={pases} setPases={setPases} />   </Grid>
            )}
         
            {expedienteSeleccionado && !seleccionado && (
                <> <Grid item xs={12}  md={4} >
                    <PasesCarga   expediente={expedienteSeleccionado} handleExpedienteSelect={handleExpedienteSelect}    pases={pases}   onPaseAdd={handlePaseAdd}   />

                </Grid>
              
                   {/*  <Grid item xs={12}  md={8}   sx={{ alignContent: 'left' }} >
                        <DetalleExpedienteYpases expediente={expedienteSeleccionado} pases={pases} />

                    </Grid> */}
                    <Grid item xs={12}  md={8}   sx={{ alignContent: 'left' }} >
                         <Grid item xs={12}  md={8}   sx={{ alignContent: 'left' }} >
                        <ExpedienteCard  
                        expediente={expedienteSeleccionado} pases={pases} onPaseEdit={handlePaseEdit} onPaseDelete={handlePaseDelete} />
                    </Grid>

                    </Grid>

                </>
            )}

        </Grid>

    );
}


export default VistaPases;