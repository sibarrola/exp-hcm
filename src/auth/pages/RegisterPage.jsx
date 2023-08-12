import { Link as RouterLink } from 'react-router-dom';
import { Button, Grid, Link, TextField, Typography } from '@mui/material';

import LayoutAutentica from '../layout/LayoutAutentica';
import useFormu from '../../hooks/useFormu';
import { Global } from '../../helpers/Global.jsx'
/* 
const url = Global.url; */
 
const formValidations ={
    correo:[(value)=>value.includes('@'), 'el correo debe de tener una @'],
    password:[(value)=>value.length>=6,'El password debe de tener mas de 6 letras'],
    nombre:[(value)=>value.length>=1,'El nombre es obligatorio']
}
const RegisterPage = () => {

    let formData = {
        nombre: "",
        correo: "",
        password: "",
        rol: "INVITADO",
        estado: true,
        google: false
    }
    const { formState, onInputChange,isFormValid  } = useFormu(formData,formValidations);
   
    const saveUser = async (e) => {
        e.preventDefault();
        let newUser = formState;
      
      
      /*   const request = await fetch(`${url}/usuarios`, {
            method: "POST",
            body: JSON.stringify(newUser),
            headers: {
                "Content-Type": "application/json"
            }
        });

 
        console.log("data", data);
        if (data.errors) {
            data.errors.map(error => alert(error.msg));
            return
        }
        alert(`${data.usuarioGuardado.nombre} GUARDADO CORRECTAMENTE (pida el rol para poder operar el sistema)`);

        */
    } 
    return (
        <LayoutAutentica title="Crear cuenta">
         <p>  {isFormValid ? "Válido": "Incorrecto"}</p>  
            <form onSubmit={saveUser}>
                <Grid container>
                
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="Nombre completo"
                            name="nombre"
                            type="text"
                            placeholder='Nombre completo'
                            onChange={onInputChange}
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
