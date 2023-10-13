import { Grid, Container, Box ,IconButton,Button,Avatar, Typography} from "@mui/material"
import equipo from '../../assets/imagenconcejo.jpg'
import botonInstagram from '../../assets/botonInstagram.jpg'
import InstagramIcon from '@mui/icons-material/Instagram';
 
const NothingSelectedView = () => {
    return (
        <>
     
        <Box display='flex'
             marginTop='40px'
             height='100hx'
             marginLeft='15%'
             >
                 
           {/*   <Box width='100%'> */}
             <img
                     src={equipo}
                     alt="Descripción de la imagen"
                      height='90%'
                     
                 
                 />
                 <Box marginTop='25%'>

               
                 <Typography variant='body1' sx={{ textAlign: 'center' }}>
                   
                   <Box width="230px"  sx={{fontSize:'10px', color:'red', marginLeft:'150px'}} >
                  <Avatar sx={{ bgcolor: 'pink', color: 'red' ,   width: 40, height: 40   }}  size="small" onClick={() => window.open('https://www.instagram.com/concejo_municipal_rincon/', '_blank')}> 
                       <InstagramIcon />
                   </Avatar>
                    
                 </Box>
                 <Box sx={{color:'red', fontSize:'12px',marginLeft:'40px'}}>Instagram</Box>
                 <Box marginLeft='40px' width='400px' sx={{color:'black', fontSize:'16px', border:'2px',marginTop:'10px'}}>
                        Telefonos utiles
                      </Box>
           </Typography>  
                  </Box>
           {/*   </Box> */}
          
            
              
           </Box>
            
        
        
     
       
        
        </>
        
    
    )
}
export default NothingSelectedView

