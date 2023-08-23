import React from 'react';
import ExpedientesCarga from './ExpedientesCarga';

function ExpedientesEdicion({ expediente }) {
  // Aquí puedes agregar lógica y diseño para editar el expediente seleccionado
  return (
    <div>
     
      <ExpedientesCarga titulo="Edición de expedientes" expediente={expediente}/>
    </div>
  );
}

export default ExpedientesEdicion;
