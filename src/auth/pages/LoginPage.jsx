/* ver como hacerlo */

import { Link as RouterLink} from 'react-router-dom';  /* le pongo un alias al link para que nos entre en conflicto con el Link de material */
import {  Button, Grid, Link, TextField, Typography,Box } from '@mui/material';
import { Google } from '@mui/icons-material';
import LayoutAutentica from '../layout/LayoutAutentica';

 
import { Global } from '../../helpers/Global.jsx'
import { useState } from 'react';
/* import CustomAlert from '../../privado/componentes/CustomAlert'; */
import CustomDialog from '../../privado/componentes/CustomDialog';
import { useNavigate } from 'react-router-dom';
 
const LoginPage = () => {
    const navigate = useNavigate();
   
    const url = Global.url;
    let formData = {
        correo: "",
        password: "",

    };
 
    const [formState, setFormState] = useState(formData);
    const [ingreso,setIngreso]=useState(false);
    const [passwordShown, setPasswordShown] = useState(false);
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
    const togglePassword = () => {
        setPasswordShown(!passwordShown);
      };
      
     
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
               console.log("data",data)       
                if (!!data.success) {

                 /*    console.log("data.succes",data.succes);
                    console.log("data.token",data.token); */
                                    
                     localStorage.setItem("token", data.token);

                 /*     console.log("JSON.stringify(data.usuario)",JSON.stringify(data.usuario)); */
                     localStorage.setItem("usuario", JSON.stringify(data.usuario));
                  
                    setIngreso(true);  
                   
                    setAlert({
                        open: true,
                        severity: 'error',
                        message: `${data.msg}`
                        
                    });  
                    setFormState(formData);  

                    navigate('/privado/menu');   
                
 
                } else {
             
                                  
                    setAlert({
                        open: true,
                        severity: 'error',
                        message: `${data.errors.errors[0].msg}`
                        
                    });
                }
            })
            .catch((error) => {
                setAlert({
                    open: true,
                    severity: 'error',
                    message: `Ocurrió un error en el inicio de sesión (puede ocurrir que no tenga el rol correspondiente)`
                   
                });
            });
        }
 
    return (
        <LayoutAutentica title='Ingreso al Sist.de Gestión (Login)'>
            
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
                        type={passwordShown ? "text" : "password"}
                        placeholder='Contraseña'
                        onChange={onInputChange}
                        value={formState.password}
                        fullWidth />

                </Grid>
                <Grid item xs={12} sx={{ mt: 2 }}>
                <Button   onClick={togglePassword} >{passwordShown ? "Ocultar" : "Mostrar"}</Button> 
                    </Grid>
                    <br/><br/>
                <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
                    <Grid item xs={12} sm={6}>
                        <Button type="submit" variant='contained' fullWidth color="primary"  >
                            Login
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button variant='contained' fullWidth color="secondary" >
                            <Google />
                            <Typography sx={{ ml: 1 }}>Google</Typography>
                        </Button>
                    </Grid>
                </Grid>

           
                <Grid container direction='row' justifyContent='end'>
                
                  {/*   <Link
                        component={RouterLink}
                        color='inherit'
                        to="/privado/menu"
                        sx={{ fontSize: '18px', color: 'blue' }}>
                        Pagina Privada

                    </Link>  */}
                    
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



