import { Box, Divider, List, ListItem, ListItemButton, Toolbar, Typography } from '@mui/material';
/* import HomeIcon from '@mui/icons-material/Home'; */
/* import logo1 from '../../assets/logo-160px.fw.png' */

 

import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
 
import { Article } from '@mui/icons-material';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import { NavLink } from 'react-router-dom';
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

export const NavListDrawer = ( ) => {
     return (
       /*  <Box sx={{ bgcolor: '#ede7f6', height: '100vh', width:'170px'}}  >  */
        <Box sx={{ height: '50vh', width:'150px'  }}   >
                  
             
            <Typography variant="body1" fontWeight="bold" sx={{mt:3,ml:1,mr:1, justifyContent:'center'}} >Menú Ciudadanos</Typography>
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
                               
                                sx={{
                                    ":hover": {
                                        bgColor: '#40c4ff'
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
       
    )
}

 