import React, { useState } from 'react';
import { TextField, Button, Container, Grid, Paper } from '@mui/material';

const FormularioLista = ( ) => {
  const [listaTabla, setListaTabla] = useState({
    
    nombre: '',
     

  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setListaTabla({ ...listaTabla, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes enviar los datos a la API o realizar cualquier otra acción
    console.log('dato a enviar:', listaTabla);
  };

 
    
      return (
        <Container component={Paper} maxWidth="sm" sx={{ padding: 2 }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="nombre"
                  name="nombre"
                  value={listaTabla.nombre}
                  onChange={handleChange}
                />
              </Grid>
               
              {/* Agrega aquí los demás campos del formulario */}
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  Guardar  
                </Button>
              </Grid>
            </Grid>
          </form>
        </Container>
      );
    };
    
    export default FormularioLista