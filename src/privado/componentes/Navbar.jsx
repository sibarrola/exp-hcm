
import { useEffect, useState } from "react"
import { Alert, AppBar, Box, Drawer, IconButton, Toolbar, Typography } from '@mui/material'
import { NavListMenu } from './NavListMenu'
import { LogoutOutlined, MenuOutlined } from '@mui/icons-material';
import { PropTypes } from 'prop-types';
import useAuth from "../../hooks/useAuth";
 import logo1 from "../../assets/logo-160px.fw.png"
 import {colortema} from './../../theme/colortema'



export const NavBar = ({ navVectLinks, navVectGestion1, navVectGestion2, navVectGestion3, NavLink }) => {
    const [open, setOpen] = useState(false);
    const { auth } = useAuth();
    //nuevo
    let nombre=auth.nombre
    const [userEstado,setUserEstado]=useState(auth.nombre);

    useEffect(()=>{
        const user = localStorage.getItem("usuario");
        if(userEstado!=user.nombre){
            setUserEstado(user.nombre); 
            window.location.reload();    
        } 

        
    },[])

    return (
        <>


            <AppBar position='fixed'

            >
                {/* el toolbar va a activar los espaciados y todo lo que se escriba adentro tendra la prop flex */}
                <Toolbar>
                    {/* con el iconButtom hago un boton con un icono */}
                    <Box sx={{ display: 'flex',  m:1,mr:3,  boxSizing: 'border-box', color: 'black' }} >
                    <img src={logo1} alt="logo" height={90}   />
                  </Box>
                    <IconButton
                        color="inherit"
                   
                        onClick={() => setOpen(!open)}
                        sx={{ display: { xs: "flex" } }}
                        edge="start">
                        <MenuOutlined sx={{ fontSize: '32px' }} />
                    </IconButton>
                  <Box sx={{ flexGrow: 1, ml: 5 }} >
                  <Typography   sx={colortema.typography.texto1}    >  
                    SISTEMA DE GESTION DE EXPEDIENTES DEL HCM </Typography>
                    <Typography variant='body1' sx={{ mr: 10, fontStyle: 'italic', color:'#ffea00',fontSize:'12px' ,}} > usuario: {auth.nombre} </Typography>
                  </Box>
                   
                

                    <Box sx={{ display: { xs: "none", sm: "none", md: 'flex' }, variant: { xs: 'body1', xm: 'title1' } }}>
                 
                        {navVectLinks.map(item => (

                            <IconButton
                                color="inherit"
                                key={item.title}
                                component={NavLink}
                                to={item.path}
                                sx={{ m: 1, mr: 2 }}
                                onClick={() => { setOpen(true) }}
                            >

                                {item.icon}
                                <Typography variant='subtitle1' sx={{ ml: 0.5 }} >
                                    {item.title}
                                </Typography>

                            </IconButton  >


                        ))}

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
                sx={{marginTop:'100px',zIndex:'1'}}


            >
                <NavListMenu
                    navVectLinks={navVectLinks}
                    navVectGestion1={navVectGestion1}
                    navVectGestion2={navVectGestion2}
                    navVectGestion3={navVectGestion3}
                    NavLink={NavLink}
                    setOpen={setOpen} />

            </Drawer>  

        </>
    )
}


NavBar.propTypes = {
    navVectLinks: PropTypes.array,
    navVectGestion1: PropTypes.array,
    navVectGestion2: PropTypes.array,
    navVectGestion3: PropTypes.array,
    NavLink: PropTypes.any
}
/* https://www.youtube.com/watch?v=yMzzrg9j0lM&list=PLPl81lqbj-4J2xx_YAb97dpCG1rxl2wv-&index=13 */