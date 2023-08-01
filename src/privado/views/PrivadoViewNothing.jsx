import { Grid, Container, Box } from "@mui/material"
import equipo from '../../assets/EQUIPO.jpeg'
 

const PrivadoViewNothing = () => {
  return (
    <Grid sx={{marginTop:0}}> 
       <Container
       spacing={0}
       direction="column"
       alignitems="top"
       justifycontent="center"
       sx={{minHeight:'90vh'  ,borderRadius:2}}>
                <Box  sx={{display:'flex' , textAlign:'center'} } >
                    <img src={equipo}  />
                      
                     </Box>  
       </Container>
    </Grid>
  )
}

export default PrivadoViewNothing

