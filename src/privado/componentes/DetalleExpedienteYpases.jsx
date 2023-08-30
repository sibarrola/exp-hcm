import React from 'react';
 
import ExpedienteCard from './ExpedienteCard';

function DetalleExpedienteYpases({ expediente,pases }) {
  // Aquí puedes agregar lógica y diseño para editar el expediente seleccionado
  return (
    <div>
      <ExpedienteCard expediente={expediente}/>
     
       
    </div>
  );
}

export default DetalleExpedienteYpases;