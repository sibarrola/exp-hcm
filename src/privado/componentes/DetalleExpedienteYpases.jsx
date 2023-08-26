import React from 'react';
import ExpedientesCarga from './ExpedientesCarga';

function DetalleExpedienteYpases({ expediente,pases }) {
  // Aquí puedes agregar lógica y diseño para editar el expediente seleccionado
  return (
    <div>
      
      ESTO ES EL DETALLA DE EXPEDIENTES Y LOS MOVIM
      <p>
        {JSON.stringify(expediente)}
      </p>
    </div>
  );
}

export default DetalleExpedienteYpases;