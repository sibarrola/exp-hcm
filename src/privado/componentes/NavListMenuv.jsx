import { Box, Divider, List, ListItem, ListItemButton, Toolbar, Typography } from '@mui/material';
/* import HomeIcon from '@mui/icons-material/Home'; */
import logo1 from '../../assets/logo-160px.fw.png'
/* import ArticleIcon from '@mui/icons-material/Article'; */
import { PropTypes } from 'prop-types';
 
export const NavListMenu = ({ navVectLinks,navVectGestion, NavLink,setOpen }) => {

    console.log("navVectGestion",navVectGestion)
     return (
     
        <Box sx={{ bgcolor: '#ede7f6', height: '100vh', width:'160px', marginTop:'100px',zIndex:'-1' }}  >
            <Box sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center', boxSizing: 'border-box', color: 'black' }} >
                <img src={logo1} alt="logo" height={80} />
            </Box>
            <Typography sx={{ display: 'flex', justifyContent: 'center', fontWeight: 900 }}>HCM</Typography>
            <Divider />
            <Typography variant="body1" fontWeight="bold" sx={{mt:3,ml:1,mr:1, justifyContent:'center'}} >Ciudadanos</Typography>
         
                <List>
           
                    { navVectGestion.map((item) => (
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
                    ))
                    }
                    <Divider />
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
                        </ListItem>
                    ))

                    }
              </Box>
            </List>   
         </Box>  
       
    )
}

NavListMenu.propTypes = {
    navVectLinks: PropTypes.array,
    navVectGestion:PropTypes.array,
    NavLink:PropTypes.any,
    setOpen: PropTypes.any
}