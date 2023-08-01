import React, { useState } from 'react';
import { TextField, Button, Container, Grid, Paper } from '@mui/material';

const FormularioCargaExpedientes = () => {
  const [expediente, setExpediente] = useState({
    legajo: '',
    fecha_ingreso: '',
    motivo: '',
    categoria: '',
    descripcion: '',
    apellido: '',
    nombre: '',
    DNI: '',
    celular: '',
    domicilio: '',
    email: '',
    estado_expediente: false,
    folios: 0,
    id_usuario: 0,

  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setExpediente({ ...expediente, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes enviar los datos a la API o realizar cualquier otra acción
    console.log('Expediente a enviar:', expediente);
  };

  return (
    <Container component={Paper} maxWidth="sm" sx={{ padding: 2 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Legajo"
              name="legajo"
              value={expediente.legajo}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Fecha ingreso"
              name="fecha_ingreso"
              value={expediente.fecha_ingreso}
              onChange={handleChange}
            />
          </Grid>
          {/* Agrega aquí los demás campos del formulario */}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Guardar Expediente
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default FormularioCargaExpedientes;
