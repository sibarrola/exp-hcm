
import { useState } from "react"
import { AppBar, Box, Drawer, Grid, Button, IconButton, Toolbar, Typography, Avatar } from '@mui/material'
import { NavListDrawer } from './NavListDrawer'
import { LogoutOutlined, MenuOutlined } from '@mui/icons-material';
import { PropTypes } from 'prop-types';
import logo1 from '../../assets/logo-160px.fw.png'
import useMediaQuery from '@mui/material/useMediaQuery';
import InstagramIcon from '@mui/icons-material/Instagram';


export const NavBarFijo = ({ navVectLinks, navVectCiudadanos, NavLink }) => {
    const [open, setOpen] = useState(false)
    const ancho1 = 140;
    const ancho2 = 0;
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    return (
        <>

            <AppBar position='fixed'
                sx={{ minHeighteight: '75px', fontSize: { xs: '8px', md: '18px' } }}
            >
                {/* el toolbar va a activar los espaciados y todo lo que se escriba adentro tendra la prop flex */}
                <Toolbar>
                    {/* con el iconButtom hago un boton con un icono */}
                    <Box width="100px">
                        <img
                            src={logo1}
                            alt="Logo"
                            height='90px'

                        />
                       <div style={{fontSize:'10px', mb:'2px'}}>HCM S.J. del Rincón</div>  

                    </Box>
                    <IconButton
                        color="inherit"
                        size="large"
                        onClick={() => setOpen(true)}
                        sx={{ display: { xs: "flex",md:'flex',lg:'none'} }}  /* quite el sm:"none" */
                        edge="start">

                        <MenuOutlined sx={{ fontSize: '38px' }} />
                        <Box marginLeft={2} fontSize={13}>Menu ciudadano</Box>

                    </IconButton>


                    <Typography variant='h6' sx={{
                        flexGrow: 1,
                        ml: '10%',
                        fontSize: { xs: '12px', md:'18',lg: '20px' },  // Tamaño de fuente para diferentes tamaños de pantalla
                    }} > {isSmallScreen ? 'SISTEMA EXPEDIENTES- HCM RINCON' : 'SISTEMA DE GESTION DE EXPEDIENTES DEL HONORABLE CONCEJO MUNICIPAL DE S.J. DEL RINCON'} </Typography>
                   {/*  <Box width="230px"   sx={{fontSize:'10px', color:'pink'}}>
                    <Avatar sx={{ bgcolor: 'pink', color: 'red' ,   width: 30, height: 30   }}  size="small" onClick={() => window.open('https://www.instagram.com/concejo_municipal_rincon/', '_blank')}>
                    <InstagramIcon />
                </Avatar>
                Instagram
                    </Box> */}
                    

                    {/*  <Button color="inherit">Inicio</Button>
                    <Button color="inherit">Login</Button>
                    <Button color="inherit">Registro</Button> */}

                    {/* meto los botones en un box para ocultar cuando sea pequeño */}
                    <Box sx={{ display: { xs: "none", sm: "none", md: 'flex' }, variant: { xs: 'body1', xm: 'title1' } }}>
                        {/* pruebo */}
                        {/*   <IconButton aria-label="instagram"   color="error"  variant="contained"   onClick={() => window.open('https://www.instagram.com/concejo_municipal_rincon/', '_blank')}>
                        <InstagramIcon /><span style={{fontSize:'12px'}}>Instagram</span>
                                    </IconButton> */}
                        
                        {/* dddddddd */}
                        {navVectLinks.map(item => (
                            <IconButton
                                color="inherit"
                                key={item.title}
                                component={NavLink}
                                to={item.path}
                                sx={{ m: 1, mr: 2 }}
                                onClick={() => setOpen(false)}
                            >

                                {item.icon}
                                <Typography variant='subtitle1' sx={{ ml: 0.5 }} >
                                    {item.title}
                                </Typography>

                            </IconButton  >
                        ))

                        }

                    </Box>
                    <IconButton
                        component={NavLink}
                        color="error"
                        size="large"
                        to={"/auth/logout"}
                        onClick={() => { setOpen(true) }}
                        sx={{ mr: 2 }}>
                        <LogoutOutlined />
                    </IconButton>

                </Toolbar>
            </AppBar>

            <Drawer
                open={open}
                anchor="left"
                onClose={() => setOpen(false)}
                variant='temporary'    // temporary            

            >
                <NavListDrawer
                    navVectLinks={navVectLinks}
                    navVectCiudadanos={navVectCiudadanos}
                    NavLink={NavLink}
                    setOpen={setOpen} />

            </Drawer>


        </>
    )
}


NavBarFijo.propTypes = {
    navVectLinks: PropTypes.array,
    navVectCiudadanos: PropTypes.array,
    NavLink: PropTypes.any
}
/* https://www.youtube.com/watch?v=yMzzrg9j0lM&list=PLPl81lqbj-4J2xx_YAb97dpCG1rxl2wv-&index=13 */