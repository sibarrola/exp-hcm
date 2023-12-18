 /* El contenido es lo que yo se que voy a reutilizar para el login y el register */
import { Grid,  Typography, Box } from "@mui/material"
import logo1 from "../../assets/logo-160px.fw.png"; 
import { PropTypes } from 'prop-types';
 
const LayoutAutentica = ({children,title=''}) => {
  return (
    <Grid
       container
       spacing={0}  /* para que no haya espacio entre los hijos */
       direction="column"
       alignItems="center"
       justifyContent="center"
       sx={{minHeight:'100vh',backgroundColor:'primary.main',padding:4}}
       >
     <Grid item
         className='box-shadow'
         xs={3}   /* em pág pequeñas va a tener 3 posiciones */
         sx={{
            width:{sm:459},
            backgroundColor: 'white', 
             padding:3, 
             borderRadius:2
             }}>
              
         
          <Box sx={{ display: 'flex',  m:1,mr:3,  boxSizing: 'border-box', color: 'black' }} >
                    <img src={logo1} alt="logo" height={80}   />
                    <Typography variant="h5" sx={{mb:1 ,ml:10,fontWeight:"bold", textAlign:'center' }}> {title} </Typography> 
                  </Box>
         
        {/*   children */}
          {children}

     </Grid>
     </Grid>
  )
}

export default LayoutAutentica

LayoutAutentica.propTypes = {
     children:PropTypes.any,
     title:PropTypes.string

}