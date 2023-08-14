import { Link as RouterLink } from 'react-router-dom';
import { Button, Grid, Link, TextField, Typography } from '@mui/material';

import LayoutAutentica from '../layout/LayoutAutentica';
import useFormu from '../../hooks/useFormu';
import { Global } from '../../helpers/Global.jsx'
import { useState } from 'react';
 


const formValidations ={
    correo:[(value)=>value.includes('@'), 'el correo debe de tener una @'],
    password:[(value)=>value.length>=6,'El password debe de tener mas de 6 letras'],
    nombre:[(value)=>value.length>=1,'El nombre es obligatorio']
}

/* comienza el componente------------------------------------------- */
const RegisterPage = () => {

const url = Global.url;  
const [formSubmitted,setFormSubmitted]=useState(false);

    let formData = {
        nombre: "",
        correo: "",
        password: "",
        
    }
    /* traigo del hookFormu-------------------------------------------------- */
    const { formState,setFormState, onInputChange,isFormValid ,nombreValid,correoValid,passwordValid,onResetForm } = useFormu(formData,formValidations);
     

 /* graba SUBMIT-------------------------------------------------- */
    const saveUser = async (e) => {
        e.preventDefault();
        setFormSubmitted(true);
        let newUser = formState;
        newUser.rol="INVITADO";
        
        setFormSubmitted(true);

        if ( !isFormValid ) return;

        const request = await fetch(`${url}/usuarios`, {
            method: "POST",
            body: JSON.stringify(newUser),
            headers: {
                "Content-Type": "application/json"
            }
        }) ;

        const data=await request.json();
    
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
        <LayoutAutentica title="Crear cuenta">
       {/*   <p>  {isFormValid ? "Válido": "Incorrecto"}</p>   */}
            <form onSubmit={saveUser}>
                <Grid container>
                
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="Nombre completo"
                            name="nombre"
                            type="text"
                            placeholder='Nombre completo'
                            onChange={onInputChange}
                            error={!!nombreValid && formSubmitted}
                            helperText={nombreValid}
                            value={formState.nombre}
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="Correo"
                            name="correo"
                            type="email"
                            placeholder='correo@google.com'
                            onChange={onInputChange}
                            error={!!correoValid && formSubmitted}
                            helperText={correoValid}
                            value={formState.correo}
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12} sx={{ mt: 2 }}>
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
                    </Grid>

                    <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
                        <Grid item xs={12}>
                            <Button type="submit" variant='contained' fullWidth>
                                Crear cuenta
                            </Button>
                        </Grid>
                    </Grid>


                    <Grid container direction='row' justifyContent='flex-between'>
                        <Link
                            component={RouterLink}
                            color='inherit'
                            to="/"
                            sx={{ fontSize: '14px', color: 'blue' }}>

                            Página Pública
                        </Link>
                        <Typography sx={{ mr: 1, fontSize: 14 }}>¿Ya tienes cuenta?</Typography>

                        <Link component={RouterLink}
                            to="/auth/login"
                            sx={{ color: 'blue', fontSize: 16 }}>
                            ingresar
                        </Link>
                    </Grid>

                </Grid>


            </form>

        </LayoutAutentica>
    )
}

export default RegisterPage
