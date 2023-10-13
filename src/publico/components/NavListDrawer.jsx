import { Box, Divider, List, ListItem, ListItemButton, Toolbar, Typography } from '@mui/material';
/* import HomeIcon from '@mui/icons-material/Home'; */
import logo1 from '../../assets/logo-160px.fw.png'
/* import ArticleIcon from '@mui/icons-material/Article'; */
import { PropTypes } from 'prop-types';
 
export const NavListDrawer = ({ navVectLinks,navVectCiudadanos, NavLink,setOpen }) => {
     return (
       /*  <Box sx={{ bgcolor: '#ede7f6', height: '100vh', width:'170px'}}  >  */
        <Box sx={{ bgcolor:  "#fffde7" , height: '100vh', width:'170px'   }}   >
            <Box sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center', boxSizing: 'border-box', color: 'black',bgcolor:  "#002984"  }} >
                <img src={logo1} alt="logo" height={90} />
                </Box>
            <Typography variant="body2" sx={{ paddingBottom:2, display: 'flex', justifyContent: 'center', fontWeight: 900, color:'#ffffff' ,bgcolor:  "#002984" }}>HCM S.J. del Rincón</Typography>
         
             
            <Typography variant="body1" fontWeight="bold" sx={{mt:3,ml:1,mr:1, justifyContent:'center'}} >Ciudadanos</Typography>
         
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
       
    )
}

NavListDrawer.propTypes = {
    navVectLinks: PropTypes.array,
    navVectCiudadanos:PropTypes.array,
    NavLink:PropTypes.any,
    setOpen: PropTypes.any
}