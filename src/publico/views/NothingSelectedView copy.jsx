import { Box, Typography, Link, List, ListItem,Avatar } from '@mui/material';
import equipo from '../../assets/imagenconcejo.jpg'
import botonInstagram from '../../assets/botonInstagram.jpg'
import InstagramIcon from '@mui/icons-material/Instagram';

const NothingSelectedView = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, width: '100%' ,height:'75%',marginTop:'45px'}}>
      
      {/* Caja con la imagen */}
      <Box sx={{ flexGrow: 2, paddingRight: { md: 2 },marginLeft:'8%'}}>
 
        <img src={equipo} alt="Descripción" style={{ width: '95%', height: 'auto' }} />
      </Box>

      {/* Caja de redes y teléfonos */}
      <Box sx={{ width: { xs: '90%', md: '200px'},marginTop:'20px',marginRight:'20px' ,marginLeft:'20px'  , display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        
        {/* Links a las redes */}
        <Box sx={{ marginBottom: 2 , border:0.5, borderColor:'grey', padding:'5px',backgroundColor: 'lavenderblush' ,height:'160px'}} >
          <Typography variant="body1" sx={{fontWeight:'bold'}}>Redes Sociales:</Typography>
           <Box sx={{display:'flex'}} >
           
          <Avatar sx={{ bgcolor: 'pink', color: 'red' ,   width: 40, height: 40 , marginTop:'20px'}}  size="small" onClick={() => window.open('https://www.instagram.com/concejo_municipal_rincon/', '_blank')}> 
                       <InstagramIcon />
                   </Avatar>
                    <div style={{fontSize:'12px', color:'red',marginLeft:'5px', marginTop:'30px'}}>Instagram</div> 
                    </Box>
        </Box>

        {/* Lista de teléfonos útiles */}
        <Box sx={{backgroundColor: 'lavenderblush', marginTop:{ xs: '10px', md: '50px' } ,border:0.5  , borderColor: 'grey',padding:'5px'}}>
          <Typography variant="body1" sx={{fontWeight:'bold',}}>Teléfonos útiles:</Typography>
         
          <List >
            <ListItem> <Typography sx={{fontSize:'14px',textAlign:'right'}}> Concejo : 123-456-789 </Typography></ListItem>
            <ListItem> <Typography sx={{fontSize:'14px'}}> Ejecutivo : 123-456-789 </Typography></ListItem>
            <ListItem> <Typography sx={{fontSize:'14px'}}> Policía : 123-456-789 </Typography></ListItem>
            <ListItem> <Typography sx={{fontSize:'14px'}}> Concejo : 123-456-789 </Typography></ListItem>
            <ListItem> <Typography sx={{fontSize:'14px'}}> Ejecutivo : 123-456-789 </Typography></ListItem>
            <ListItem> <Typography sx={{fontSize:'14px'}}> Policía : 123-456-789 </Typography></ListItem>
          </List>
         
          
        </Box>

      </Box>
    </Box>
  );
};

export default NothingSelectedView;
