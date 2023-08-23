import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from  '@mui/material';
import {Global} from '../../helpers/Global';
import Peticiones from '../../helpers/Peticiones'; 
 
 import {formatearFecha} from '../../helpers/funcionesVarias'

function ExpedientesTable({onSelectExpediente}) {
  const [expedientes, setExpedientes] = useState([]);
 
 

   useEffect(() => {
  
    const url=Global.url+'/expedientes/estadoExp/Estudio?desde=0&limit=10'; // Actualiza esto con la URL correcta
    const metodo = 'GET';

    Peticiones(url, metodo).then((response) => {
         
     setExpedientes(response.datos.expedientes);
   
     
    }).catch((error) => {
      console.error("Hubo un error al obtener los expedientes:", error);
    });
  }, []); // El array vacío significa que este efecto se ejecutará solo una vez, 


  const handleClick = (expediente) => {
    const fechaISO = expediente.fechaIngreso.split('/').reverse().join('-');
    expediente.fechaIngreso=fechaISO;
    alert("fecha convertida",fechaISO);
     onSelectExpediente(expediente);
   
   };
    
/*   if (selectedExpediente) {
    return <ExpedientesEdicion expediente={selectedExpediente} />;
  } */

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
     
          <TableRow>
           
            <TableCell>Fecha ing.</TableCell>
            <TableCell>Legajo</TableCell>
            <TableCell>Motivo</TableCell>
            <TableCell>Categoría</TableCell>
            <TableCell>Solicitante</TableCell>
            <TableCell>Apellido</TableCell>
        
          </TableRow>
        </TableHead>
         <TableBody>
        {expedientes.map((expediente) => {
           let fechaIngreso = new Date(expediente.fechaIngreso);
           let fechaFormateada=formatearFecha(fechaIngreso)
            return(
    <TableRow key={expediente._id} onClick={() => handleClick(expediente)}>
      <TableCell>{ fechaFormateada} </TableCell>
      <TableCell>{expediente.legajo}</TableCell>
      <TableCell>{expediente.motivo}</TableCell>
      <TableCell>{expediente.categoria}</TableCell>
      <TableCell>{expediente.solicitante}</TableCell>
      <TableCell>{expediente.apellido}</TableCell>
      
    </TableRow>
        )})}
 
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ExpedientesTable;
