import { Box, Typography, Link, List, ListItem, ListItemButton,Avatar, Divider,Toolbar  } from '@mui/material';
import equipo from '../../assets/imagenconcejo.jpg'
 
import InstagramIcon from '@mui/icons-material/Instagram';
 
 
import { Article } from '@mui/icons-material';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import { NavListDrawer } from '../components/NavListDrawer';
 
const NothingSelectedView = () => {
  return (
 
    <Box sx={{display: 'flex', flexDirection: { xs: 'column',   md:'row' } , width: '100%' ,height:'100hv',marginTop:'45px' }}>
      {/* menu izq */}
      <Box sx={{display:{xs:'none', sm:'none',md:'flex' } 
        }}> 
          <NavListDrawer/>
          </Box>
             
 
        
   
    {/* Caja con la imagen */}
    <Box sx={{ flexGrow: 2, paddingRight: { md: 2 },marginLeft:'8%', marginTop:{xs:'50px',md:'10px'}  }}>

      <img src={equipo} alt="Descripción" style={{ width:'95%', height: 'auto',borderRadius: '4px' }} />
    </Box>
 
    {/* Links a las y telefonos redes--------------------------------------- */}
    <Box  
    sx={{
        width: { xs: '90%', md: '200px' },
        display: 'flex',
        flexDirection: 'column',
         height:{ xs: '20%', lg: '50%' },
         minWidth:'200px',
    /*     alignContent: 'center', */
       
      /*  backgroundColor: '#cfd8dc', */  // Ajusta el color de fondo aquí */
        
      /*   borderRight: 1 , 
        borderColor:'blue', */
        /* borderRadius: '8px' */   // Puedes ajustar esto para darle esquinas redondeadas
        padding: 2  // Ajusta el padding general de esta caja
    }}
>

<br/>
    <Box sx={{ marginBottom: 2 }}  >
  
        <Typography sx={{color:'blue',fontStyle:'italic'}} variant="body1">Redes Sociales</Typography>
        <hr color='blue' />
        <Box sx={{display:'flex'}} >
           
          <Avatar sx={{ bgcolor: 'pink', color: 'red' ,   width: 40, height: 40 , marginTop:'20px'}}  size="small" onClick={() => window.open('https://www.instagram.com/concejo_municipal_rincon/', '_blank')}> 
                       <InstagramIcon />
                   </Avatar>
                    <div style={{fontSize:'12px', color:'red',marginLeft:'5px', marginTop:'30px'}}>Instagram</div> 
                    </Box>
                    <Box>
                 
                   
   
    {/* Lista de teléfonos útiles---------------------------------------- */}

        <Typography variant="body1" sx={{marginTop:{ xs: '10px', lg: '220px'},color:'blue',fontStyle:'italic' }}>  
            Teléfonos útiles:</Typography>
            <hr color='blue' /><br/>
        <List sx={{ '& .MuiListItem-root': { padding: '3px 0',fontSize:'12px'  ,justifyContent:'start'}}}>  {/* Ajusta el espacio entre los renglones aquí */}
            <ListItem  >Concejo: 123-456-789</ListItem>
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
