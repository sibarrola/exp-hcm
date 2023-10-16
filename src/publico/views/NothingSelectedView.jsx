import { Box, Typography, Link, List, ListItem, ListItemButton,Avatar, Divider,Toolbar  } from '@mui/material';
import equipo from '../../assets/imagenconcejo.jpg'
import botonInstagram from '../../assets/botonInstagram.jpg'
import InstagramIcon from '@mui/icons-material/Instagram';
import logo1 from '../../assets/logo1.jpg';
import { NavLink } from 'react-router-dom';

import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
/* import AssignmentIcon from '@mui/icons-material/Assignment'; */
 
import { Article } from '@mui/icons-material';
import ContactPageIcon from '@mui/icons-material/ContactPage';
const navVectLinks = [
    
    {
        title: "Empleado", path: "/auth/login", icon: <PersonIcon />
    }
   

]
const navVectCiudadanos = [
    {
        title: "Inicio", path: "/", icon: <HomeIcon />
    },
    {
        title: "Expedientes", path: "/expedientes", icon: <Article />
    },
    {
        title: "Contacto", path: "/contacto", icon: <ContactPageIcon />
    },


]
const NothingSelectedView = () => {
  return (
 
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, width: '100%' ,height:'100hv',marginTop:'45px' }}>
      {/* menu izq */}
 
      <Box sx={{  height: '50vh', width:'160px'   }}   >
             
             
            <Typography variant="body1" fontWeight="bold" sx={{mt:5,ml:1,mr:1, justifyContent:'center'}} >MENU Ciudadanos</Typography>
            <hr color='blue' />
         
                <List>
                   
                      {/* slice(1) para obtener una nueva matriz que excluye el primer elemento del vector. Luego, aplicamos map a esa nueva matriz  */}
                    {navVectCiudadanos.map((item) => (
                                              
                        <ListItem disablePadding key={item.title}>
  
                            <ListItemButton
                                color="inherit"
                                key={item.title}
                                component={NavLink}
                                to={item.path}
                                onClick={() => setOpen(false)}
                                sx={{
                                    ":hover": {
                                        bgColor: '#e0e0e0'
                                    }
                                }}
                             >
                                {item.icon}
                                <Typography variant='subtitle1' sx={{ marginLeft: 2 }}  >
                                    {item.title}
                                </Typography>
                              
                            </ListItemButton  >
                         
                        </ListItem>  
                                           
                    )  
                         
                    )
                   
                    }
                  
                    <Toolbar/> 
                      {/* lo pongo en un box para ocultar si es pantalla mediana o grande */}
                      <Box sx={{display:{xs:'block',sm:'block', md:'none'},bgcolor:"#e8eaf6"}}>
                      <Typography variant="body1" fontWeight="bold" sx={{mt:3,ml:1,mr:1, justifyContent:'center'}} >Empleados</Typography>
                      {navVectLinks.slice(1).map((item) => (
                        <ListItem disablePadding key={item.title}>

                            <ListItemButton
                                color="inherit"
                                key={item.title}
                                component={NavLink}
                                to={item.path}
                                onClick={() => setOpen(false)}
                                sx={{
                                    ":hover": {
                                        bgColor: '#e0e0e0'
                                    }
                                }}
                            >
                                {item.icon}
                                <Typography variant='subtitle1' sx={{ marginLeft: 2 }}  >
                                    {item.title}
                                </Typography>
                            
                            </ListItemButton  >
                            <hr/>
                        </ListItem>
                    ))

                    }
              </Box>
            
            </List>   
         </Box>  


    {/* Caja con la imagen */}
    <Box sx={{ flexGrow: 2, paddingRight: { md: 2 },marginLeft:'8%',   }}>

      <img src={equipo} alt="Descripción" style={{ width: '95%', height: 'auto',borderRadius: '4px' }} />
    </Box>
 
    {/* Links a las y telefonos redes--------------------------------------- */}
    <Box  
    sx={{
        width: { xs: '90%', lg: '200px' },
        display: 'flex',
        flexDirection: 'column',
         height:{ xs: '20%', lg: '50%' },
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
  
        <Typography variant="body1">Redes Sociales</Typography>
        <hr color='blue' />
        <Box sx={{display:'flex'}} >
           
          <Avatar sx={{ bgcolor: 'pink', color: 'red' ,   width: 40, height: 40 , marginTop:'20px'}}  size="small" onClick={() => window.open('https://www.instagram.com/concejo_municipal_rincon/', '_blank')}> 
                       <InstagramIcon />
                   </Avatar>
                    <div style={{fontSize:'12px', color:'red',marginLeft:'5px', marginTop:'30px'}}>Instagram</div> 
                    </Box>
                    <Box>
                 
                   
   
    {/* Lista de teléfonos útiles---------------------------------------- */}

        <Typography variant="body1" sx={{marginTop:{ xs: '10px', md: '220px',color:'blue' }}}>  
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
