import React from 'react';
import { Paper, Typography } from '@mui/material';

const ExpedienteDetalle = ({ expediente }) => {
  return (
    <Paper elevation={3} style={{ padding: '20px' }}>
      <Typography variant="h5">{expediente.nombre}</Typography>
      <Typography>{expediente.descripcion}</Typography>
      {/* Aquí puedes mostrar más detalles del expediente */}
    </Paper>
  );
};

export default ExpedienteDetalle;
