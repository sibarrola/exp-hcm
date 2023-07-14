
import { useState } from "react"
import { AppBar,  Box,   Drawer, IconButton, Toolbar, Typography } from '@mui/material'
import {NavListDrawer} from './NavListDrawer'
import {LogoutOutlined, MenuOutlined } from '@mui/icons-material';
import { PropTypes } from 'prop-types';
 
 



export const NavBarFijo = ({navVectLinks, navVectCiudadanos,NavLink}) => {
    const [open, setOpen] = useState(false)
    return (
        <>
     <AppBar position='fixed' 
              
                >
                {/* el toolbar va a activar los espaciados y todo lo que se escriba adentro tendra la prop flex */}
                <Toolbar>
                    {/* con el iconButtom hago un boton con un icono */}
                    <IconButton
                        color="inherit"
                        size="large"
                        onClick={() => setOpen(true)}
                        sx={{display:{xs:"flex" }}}  /* quite el sm:"none" */
                        edge="start">
                        <MenuOutlined />
                    </IconButton>
                     <Typography variant='h6' sx={{flexGrow:1,ml:16 }} >SISTEMA DE EXPEDIENTES</Typography> 
  
                   {/*  <Button color="inherit">Inicio</Button>
                    <Button color="inherit">Login</Button>
                    <Button color="inherit">Registro</Button> */}

                    {/* meto los botones en un box para ocultar cuando sea pequeño */}
              <Box sx={{display:{xs:"none", sm:"none" , md:'flex'},variant:{xs:'body1',xm:'title1'}}}> 
                    {navVectLinks.map(item=>( 
                    <IconButton 
                        color="inherit"
                         key={item.title}
                         component={NavLink}
                         to={item.path}
                         sx={{m:1,mr:2}}
                         onClick={() => setOpen(false)}
                         >
                           
                           {item.icon}  
                           <Typography variant='subtitle1'  sx={{ml:0.5}} >
                            { item.title}
                           </Typography>
                          
                   </IconButton  > 
                     ))
               
                    }

                </Box>
                    <IconButton
                        color="error"
                        size="large"
                        onClick={() => setOpen(true)}
                        sx={{ marginRight:2}}>
                        <LogoutOutlined />
                    </IconButton>
        
                </Toolbar>
            </AppBar>

            <Drawer
                open={open}
                anchor="left"
                onClose={() => setOpen(false)}
                                 

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
 

NavBarFijo.propTypes={
    navVectLinks:PropTypes.array,
    navVectCiudadanos:PropTypes.array,
    NavLink:PropTypes.any
}
/* https://www.youtube.com/watch?v=yMzzrg9j0lM&list=PLPl81lqbj-4J2xx_YAb97dpCG1rxl2wv-&index=13 */