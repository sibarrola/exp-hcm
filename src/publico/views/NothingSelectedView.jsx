import { Box, Typography, Link, List, ListItem,Avatar } from '@mui/material';
import equipo from '../../assets/imagenconcejo.jpg'
import botonInstagram from '../../assets/botonInstagram.jpg'
import InstagramIcon from '@mui/icons-material/Instagram';

const NothingSelectedView = () => {
  return (
 
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, width: '100%' ,height:'113%',marginTop:'45px'}}>
      
    {/* Caja con la imagen */}
    <Box sx={{ flexGrow: 2, paddingRight: { md: 2 },marginLeft:'8%',   borderRadius: '8px',}}>

      <img src={equipo} alt="Descripción" style={{ width: '95%', height: 'auto' }} />
    </Box>
 
    {/* Links a las y telefonos redes--------------------------------------- */}
    <Box
    sx={{
        width: { xs: '90%', lg: '250px' },
        display: 'flex',
        flexDirection: 'column',
         height:'75%',
        alignContent: 'center',
       backgroundColor: '#cfd8dc',  // Ajusta el color de fondo aquí */
    
        border: 'none',
        borderRadius: '8px',  // Puedes ajustar esto para darle esquinas redondeadas
        padding: 2  // Ajusta el padding general de esta caja
    }}
>
    <Box sx={{ marginBottom: 2 }}>
        <Typography variant="body1">Redes Sociales</Typography>
        <Box sx={{display:'flex'}} >
           
          <Avatar sx={{ bgcolor: 'pink', color: 'red' ,   width: 40, height: 40 , marginTop:'20px'}}  size="small" onClick={() => window.open('https://www.instagram.com/concejo_municipal_rincon/', '_blank')}> 
                       <InstagramIcon />
                   </Avatar>
                    <div style={{fontSize:'12px', color:'red',marginLeft:'5px', marginTop:'30px'}}>Instagram</div> 
                    </Box>
                    <Box>

                   
   
    {/* Lista de teléfonos útiles---------------------------------------- */}
  
        <Typography variant="body1" sx={{marginTop:{ xs: '10px', md: '320px' }}}>Teléfonos útiles:</Typography>
        <List sx={{ '& .MuiListItem-root': { padding: '3px 0',fontSize:'12px' } }}>  {/* Ajusta el espacio entre los renglones aquí */}
            <ListItem>Concejo: 123-456-789</ListItem>
            <ListItem>Ejecutivo: 987-654-321</ListItem>
            <ListItem>Policía: 456-789-012</ListItem>
            <ListItem>Concejo: 123-456-789</ListItem>
            <ListItem>Ejecutivo: 987-654-321</ListItem>
            <ListItem>Policía: 456-789-012</ListItem>
        </List>
    </Box>
</Box>
</Box>
</Box>
  );
};

export default NothingSelectedView;
