import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Container, Grid, Paper } from '@mui/material';

const FormularioExpedientes2 = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data); // Puedes enviar los datos a la API o realizar cualquier otra acción
  };

  return (
    <Container component={Paper} maxWidth="sm" sx={{ padding: 2 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3>formulario 2</h3>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Controller
              name="legajo"
              control={control}
              rules={{
                required: 'El legajo es obligatorio',
                pattern: {
                  value: /^[0-9]+$/,
                  message: 'El legajo debe contener solo números',
                },
              }}
              render={({ field }) => (
                <TextField
                  fullWidth
                  label="Legajo"
                  {...field}
                  error={!!errors.legajo}
                  helperText={errors.legajo?.message}
                />
              )}
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

export default FormularioExpedientes2;
