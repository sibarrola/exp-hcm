import React, { useState } from 'react';
import { List, ListItem,   ListItemText } from '@mui/material';
import MyDataGrid from './MyDataGrid';
 
const ExpedientesList = ({ expedientes, onSelectExpediente }) => {
/* const ExpedientesList = ({ expedientes, onSelectExpediente }) => { */
  return (
    <>
    {/* <List> 
      {expedientes.map((expediente) => (
        <ListItem 
         key={expediente.id}
          onClick={() => onSelectExpediente(expediente)}
        >
          <ListItemText primary={expediente.nombre} />
        </ListItem >
      ))
   
      }
       </List>   */}
      <MyDataGrid/>
       </>

  );
};

export default ExpedientesList;
