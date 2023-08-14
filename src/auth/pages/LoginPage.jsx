/* ver como hacerlo */

import { Link as RouterLink } from 'react-router-dom';  /* le pongo un alias al link para que nos entre en conflicto con el Link de material */
import { Box,  Button, Grid, Link, TextField, Typography } from '@mui/material';
import { Google } from '@mui/icons-material';
import LayoutAutentica from '../layout/LayoutAutentica';

import { Global } from '../../helpers/Global.jsx'
import { useState } from 'react';
import CustomAlert from '../../privado/componentes/CustomAlert';
import CustomDialog from '../../privado/componentes/CustomDialog';


const LoginPage = () => {

    const url = Global.url;
    let formData = {
        correo: "",
        password: "",

    };

    const [formState, setFormState] = useState(formData);

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [name]: value
        });
    }
    const [alert, setAlert] = useState({
        open: false,
        severity: 'success',
        message: '',
    });

    const loginUser = async (e) => {
        e.preventDefault();

        // datos del formulario
        let userToLogin = formState;
        console.log("user to login", userToLogin);

    
        // peticion al backend
        const request = await fetch(`${url}/auth/login`, {
            method: "POST",
            body: JSON.stringify(userToLogin),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("data",data);
                if (data.succes) {
                    setAlert({
                        open: true,
                        severity: 'success',
                        message: `${data.usuario.nombre}: Inicio de sesión exitoso!`
                        
                    });
                    setFormState(formData)
                } else {
                                  
                    setAlert({
                        open: true,
                        severity: 'error',
                        message: data.msg
                        
                    });
                }
            })
            .catch((error) => {
                setAlert({
                    open: true,
                    severity: 'error',
                    message: `Ocurrió un error en el inicio de sesión${data.errors[0].msg}`
                   
                });
            });
        }
 
    return (
        <LayoutAutentica title='Login'>
            
            <form onSubmit={loginUser}>
                <Grid container>

                
              {/*   <CustomAlert
                    open={alert.open}
                    onClose={() => setAlert({ ...alert, open: false })}
                    severity={alert.severity}
                    message={alert.message}
                
                /> */}
                <CustomDialog
                 open={alert.open}
                 onClose={() => setAlert({ ...alert, open: false })}
                 severity={alert.severity}
                 message={alert.message}
                 title="Aviso de ingreso" />
        
               
               
           
                 <Grid item xs={12} sx={{ mt: 2 }}>
                    <TextField
                        label="Correo"
                        name="correo"
                        type="mail"
                        placeholder='correo@google.com'
                        onChange={onInputChange}
                        value={formState.correo}
                        fullWidth />

                </Grid>
                <Grid item xs={12} sx={{ mt: 2 }}>
                    <TextField
                        label="Contraseña"
                        name="password"
                        type="password"
                        placeholder='Contraseña'
                        onChange={onInputChange}
                        value={formState.password}
                        fullWidth />

                </Grid>
                <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
                    <Grid item xs={12} sm={6}>
                        <Button type="submit" variant='contained' fullWidth>
                            Login
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button variant='contained' fullWidth>
                            <Google />
                            <Typography sx={{ ml: 1 }}>Google</Typography>
                        </Button>
                    </Grid>
                </Grid>
                <Grid container direction='row' justifyContent='space-between'>
                    <Link
                        component={RouterLink}
                        color='inherit'
                        to="/privado/menu"
                        sx={{ fontSize: '12px', color: 'blue' }}>
                        Pagina Privada

                    </Link>
                    <Link
                        component={RouterLink}
                        color='inherit'
                        to="/auth/register"
                        sx={{ fontSize: '16px', color: 'blue' }}>

                        Crear una cuenta
                    </Link>

                </Grid>


            </Grid>
        </form>

        </LayoutAutentica >



    )
}

export default LoginPage;
