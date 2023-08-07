import React, { useEffect, useState } from 'react';
import { useForm, Controller, Form } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Select, MenuItem, TextField, Button, Container,Paper, Grid } from '@mui/material';
import {Global} from '../../helpers/Global.jsx';
import axios from 'axios';
 
import * as yup from 'yup';
const url=Global.url; 
// Esquema de validación
const schema = yup.object().shape({
  legajo: yup.string().required('Este campo es requerido'),
  motivo: yup.string().required('Este campo es requerido'),
  categoria: yup.string().required('Este campo es requerido'),
  organismo: yup.string().when('categoria', {
    is: 'Organismo público',
    then: yup.string().required('Este campo es requerido'),
  }),
  institucion: yup.string().when('categoria', {
    is: 'Instituciones privadas',
    then: yup.string().required('Este campo es requerido'),
  }),
  // ... otras validaciones ...
});

const ExpedientesForm=() =>{

    const [expediente, setExpediente] = useState({
        legajo: '',
        fecha_ingreso: '',
        motivo: 'Proyecto cero',
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
    

  const { handleSubmit, control, watch, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const categoriaSeleccionada = watch("categoria");

  const [motivos, setMotivos] = useState([]);
  const [organismos, setOrganismos] = useState([]);
  const [instituciones, setInstituciones] = useState([]);
  async function fetchData() {
      
    const resMotivos = await axios.get(`${url}/motivos`);
    
        setMotivos(resMotivos.data.motivos);
       console.log("motivos",motivos)
       console.log("lista", resMotivos.data.motivos);

    /* const resOrganismos = await fetch('/api/organismos');
    const dataOrganismos = await resOrganismos.json();
    setOrganismos(dataOrganismos);

    const resInstituciones = await fetch('/api/instituciones');
    const dataInstituciones = await resInstituciones.json();
    setInstituciones(dataInstituciones); */
  }
  useEffect(() => {
   
    fetchData();
  }, []);
  useEffect(() => {
    // a esto lo hago porque sino no se me refleja el estado motivos
    console.log("motivos", motivos);
}, [motivos]);

  const onSubmit = async (data) => {
alert(data);
    console.log(data);
    // Aquí puedes manejar el envío del formulario a tu servidor
   /*  const response = await fetch('http://localhost:3000/api/expedientes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      console.log('Expediente guardado');
    } else {
      console.error('Error al guardar el expediente');
    } */
  };




  return (
    <Container component={Paper} maxWidth="sm" sx={{ padding: 2 }}>
        {/* FORMULARIO----------------------------------------- */}
    <form onSubmit={handleSubmit(onSubmit)}>
    <h3>CARGA DE EXPEDIENTES</h3>
    <Grid container xs={12} spacing={1}>
        <Grid item xs={12}  >
          
      <Controller
        name="legajo"
        control={control}
        defaultValue={expediente.legajo}
        render={({ field }) => <TextField label="Legajo" {...field} error={!!errors.legajo} helperText={errors.legajo?.message} />}
      />
      </Grid>
      <Grid item xs={12}> 
      <Controller
        name="motivo"
        control={control}
        defaultValue={expediente.motivo}
        render={({ field }) => (
            <Select label="Motivo" {...field} error={!!errors.motivo}>
                   <MenuItem disabled value="">
        <em>SELECCIONE UN MOTIVO</em>
      </MenuItem>
              {motivos.map((motivo, index) => (
                <MenuItem key={index} value={motivo.motivo}>{motivo.motivo}</MenuItem>
              ))}
            </Select>
        )}
      />
      </Grid>
      <Grid item xs={12}  >
      <Controller
        name="categoria"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Select label="Categoría" {...field} error={!!errors.categoria}>
            <MenuItem value="Particular">Particular</MenuItem>
            <MenuItem value="Organismo público">Organismo público</MenuItem>
            {/* ... otras categorías ... */}
          </Select>
        )}
      />
      </Grid>
     {/*  {categoriaSeleccionada === "Organismo público" && (
        <Controller
          name="organismo"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Select label="Organismo" {...field} error={!!errors.organismo}>
              {organismos.map((org, index) => (
                <MenuItem key={index} value={org.id}>{org.nombre}</MenuItem>
              ))}
            </Select>
          )}
        />
      )}
      {categoriaSeleccionada === "Instituciones privadas" && (
        <Controller
          name="institucion"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Select label="Institución" {...field} error={!!errors.institucion}>
              {instituciones.map((inst, index) => (
                <MenuItem key={index} value={inst.id}>{inst.nombre}</MenuItem>
              ))}
            </Select>
          )}
        />
      )} */}
      {/* ... otros campos ... */}

      </Grid>
      <Grid>
                        <Button size="small" variant="contained" color="primary" type='submit'>Guardar</Button>
                        <Button size="small" variant="contained" color="secondary" onClick={handleDialogClose}>Cancelar</Button>

                    </Grid>  
    </form>
    </Container>
  );
}

  export default ExpedientesForm
