 /* ver como hacerlo */

  import { Link as RouterLink } from 'react-router-dom';  /* le pongo un alias al link para que nos entre en conflicto con el Link de material */
import { Button, Grid,Link, TextField, Typography } from '@mui/material';
import { Google } from '@mui/icons-material';
import LayoutAutentica from '../layout/LayoutAutentica';
/* import { AuthLayout } from '../layout/AuthLayout'; */
 

const LoginPage = () => {
  return (
      <LayoutAutentica title='Login'>
         <form>
            <Grid container>
         
            <Grid item xs={ 12 } sx={{ mt: 2 }}>
                    <TextField 
                     label="Correo"
                     type="mail"
                     placeholder='correo@google.com'
                     fullWidth/>
                     
                </Grid>
                <Grid item xs={ 12 } sx={{ mt: 2 }}>
                    <TextField 
                     label="Contraseña"
                     type="password"
                     placeholder='Contraseña'
                     fullWidth/>
                     
                </Grid>
                <Grid container spacing={2} sx={{mb:2, mt:1}}>
                    <Grid item xs={12} sm={6}>
                        <Button variant='contained' fullWidth>
                            Login
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button variant='contained' fullWidth>
                            <Google/>
                            <Typography sx={{ ml: 1 }}>Google</Typography>
                        </Button>
                    </Grid>
                </Grid>
                <Grid container direction='row' justifyContent='space-between'>
                <Link
                 component={ RouterLink }
                  color='inherit'
                   to="/privado/menu"
                   sx={{ fontSize:'12px', color:'blue'}}>
                Pagina Privada
                    
              </Link>
                <Link
                 component={ RouterLink }
                  color='inherit'
                   to="/auth/register"
                   sx={{ fontSize:'16px', color:'blue'}}>

                Crear una cuenta
              </Link>

            </Grid>


            </Grid>
           </form>

      </LayoutAutentica>
          

 
  )
}

export default LoginPage
