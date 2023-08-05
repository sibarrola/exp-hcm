import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Container, Grid, Paper, Select, MenuItem, FormControl, InputLabel  } from '@mui/material';
 

// vector categorias
const categorias = [
  'Particular',
  'D.E.M.',
  'Concejal',
  'Organismo público',
  'Instituciones privadas',
  'Otro',
];



const FormularioExpedientes = () => {
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
    const [motivos, setMotivos] = useState([]);

    const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
      control
    } = useForm();

    const fetchMotivos = async () => {
        try {
            const res = await axios.get(`{url}/motivos`);
            if (Array.isArray(res.data.motivos)) {
                setMotivos(res.data.motivos);
                
            } else {
                console.error('Server did not return an array');
            }
        } catch (err) {
            console.error(err);
        }
    };

  
    useEffect(() => {
      // Función para obtener los datos de la base de datos
          fetchMotivos();
    }, []);  
  
    const onSubmit = (data) => {
      console.log(data);
      // Aquí podrías hacer la lógica para guardar los datos
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

 