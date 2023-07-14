import { Link as RouterLink } from 'react-router-dom';
import { Button, Grid, Link, TextField, Typography } from '@mui/material';

import LayoutAutentica from '../layout/LayoutAutentica';

const RegisterPage = () => {
  return (
    <LayoutAutentica title="Crear cuenta">
      <form>
          <Grid container>
           
            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Nombre completo" 
                type="text" 
                placeholder='Nombre completo' 
                fullWidth
              />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Correo" 
                type="email" 
                placeholder='correo@google.com' 
                fullWidth
              />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Contraseña" 
                type="password" 
                placeholder='Contraseña' 
                fullWidth
              />
            </Grid>
            
            <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
              <Grid item xs={ 12 }>
                <Button variant='contained' fullWidth>
                  Crear cuenta
                </Button>
              </Grid>
            </Grid>


            <Grid container direction='row' justifyContent='flex-between'>
            <Link
                 component={ RouterLink }
                  color='inherit'
                   to="/"
                   sx={{ fontSize:'14px', color:'blue'}}>
                   
                    Página Pública
              </Link>
              <Typography sx={{ mr: 1,fontSize:14 }}>¿Ya tienes cuenta?</Typography>
              
              <Link component={ RouterLink }
               to="/auth/login"
               sx={{color:'blue', fontSize:16}}>
                ingresar
              </Link>
            </Grid>

          </Grid>


        </form>

    </LayoutAutentica>
  )
}

export default RegisterPage
