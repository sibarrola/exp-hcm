import React from 'react'

import {
    Select,
    MenuItem,
    TextField,
    Button,
    Grid,
    FormControl,
    InputLabel,
    Container,
    Paper

} from '@mui/material';
import { Global } from '../../helpers/Global.jsx';
import { useState } from 'react';
  import useFetchCombos from '../../hooks/useFetchCombos.jsx'
/* import CustomAlert from '../../privado/componentes/CustomAlert'; */
import CustomDialog from '../../privado/componentes/CustomDialog';

const url = Global.url;


/* comienza el componente------------------------------------------- */
const PasesCarga = (onAdd) => {


    const {
        estaciones        
    } = useFetchCombos(url);

    const [formSubmitted, setFormSubmitted] = useState(false);

    let formData = {
        fecha_pase: "",
        estacion: "",
        subestacion: "",
        usuario_pase: "",
        comentario: ""
    }
    const [formState, setFormState] = useState(formData);
    /* traigo del hookFormu-------------------------------------------------- */
    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [name]: value
        });
    }

    /*  esto es para desactivar la tecla ENTER */
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    };
    const [alert, setAlert] = useState({
        open: false,
        severity: 'success',
        message: '',
    });

    /* graba SUBMIT-------------------------------------------------- */
    const savePase = async (e) => {
        e.preventDefault();
        setFormSubmitted(true);
           
        
        if (!isFormValid) return;
         console.log(formState);
        expediente.pase.push({fecha:formState.fecha_pase})
/* 
        const request = await fetch(`${url}/expedientes/${id}`, {
            method: "PUT",
            body: JSON.stringify(expediente),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await request.json();

        if (data.errors) {
            data.errors.map(error => alert(error.msg));
            return
        }
        /* si pudo grabar  muestro el mensaje que me trae y limpio estado formulario */
        alert(data.msg)
        setFormState(formData)
        setFormSubmitted(false)  
    }
    return (
      
        <Container    component={Paper}  sx={{ padding: 2 ,border:1,borderColor:'blue'}}>                         
      
            <form onSubmit={savePase}>
                  <Grid variant="Container">
           
                    <Grid item xs={12} sm={4}>
                    <TextField
 
                            label="Fecha del Pase"
                            type="date"
                            name="fecha_pase"
                            value={formState.fecha_pase}
                            onChange={onInputChange}
                            onKeyDown={handleKeyDown}
                            format="dd/MM/yyyy"
                            /* error={!!errors.fechaIngreso}
                            helperText={errors.fechaIngreso} */
                            fullWidth
                            InputLabelProps={{
                                shrink: true,  // <-- esta propiedad es necesaria para que el label no se superponga con la fecha predeterminada
                            }}
                        />
                    </Grid>

                  
                    <Grid item xs={12}  >
                        <FormControl fullWidth>
                            
                            <InputLabel
                                shrink={true}
                                style={{ backgroundColor: '#ffff' }}  // <-- Estilo en línea para cambiar el color de fondo
                            >
                                Estación</InputLabel>
                            <Select
                             required
                                name="estacion"
                                value={formState.estacion}
                                onChange={onInputChange}
                               /*  error={!!errors.motivo}
                                inputRef={motivoRef}
                                helperText={errors.motivo}*/
                                
                            > 
                            
                                {estaciones.map((estacion) => (
                                    <MenuItem key={estacion.estacion} value={estacion.estacion}>
                                        {estacion.estacion}
                                    </MenuItem>
                                ))}
                                <MenuItem value="Otro">Otro</MenuItem>
                            </Select>
                        </FormControl>
                    {/*     {errors.estacion && <p style={{ color: 'red' }}>{errors.estacion}</p>} */}
                    </Grid>
                   {/*  {values.motivo === "Otro" && (
                        <Grid item xs={12}>
                            <TextField
                                label="Nuevo Motivo"
                                name="nuevoMotivo"
                                value={values.nuevoMotivo}
                                onChange={handleChange}
                                onKeyDown={handleKeyDown}
                                /* error={!!errors.nuevoMotivo}
                                helperText={errors.nuevoMotivo} 
                             
                                fullWidth
                            />
                        </Grid>
                    )} */}

                    </Grid>

                    {/* <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="Contraseña"
                            name="password"
                            type="password"
                            placeholder='Contraseña'
                            onChange={onInputChange}
                            error={!!passwordValid && formSubmitted}
                            helperText={passwordValid}
                            value={formState.password}
                            fullWidth
                        />
                    </Grid> */}

                    <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
                        <Grid item xs={12}>
                            <Button type="submit" variant='contained' fullWidth>
                                Crear cuenta
                            </Button>
                        </Grid>
                    </Grid>


                   
                    </form>
            
</Container>

       

       
    )
}




export default PasesCarga
