import { Grid, Container, Box } from "@mui/material"
import equipo from '../../assets/fotoconcejo1.jpg'
import logo1 from '../../assets/logo-160px.fw.png'

const NothingSelectedView = () => {
    return (
        <>
        <Box marginTop="50px">
        <Container
             
              
             alignitems="end"
             justifycontent="end"
             height="100hv"
             width='100%'
             
             >
                 
             
                 <img
                     src={equipo}
                     alt="Descripción de la imagen"
                     width='100%'
                     height='auto'
                 
                 />
            
         </Container>
        </Box>
       
        
        
        </>
        
    
    )
}

export default NothingSelectedView

