import { Container, Toolbar } from '@mui/material';
import { Box } from '@mui/system'
import { NavBar  } from '../componentes/Navbar';
import PeopleIcon from '@mui/icons-material/People';
import HomeIcon from '@mui/icons-material/Home';
 import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import PersonIcon from '@mui/icons-material/Person';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import ListAltIcon from '@mui/icons-material/ListAlt';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import RunCircleIcon from '@mui/icons-material/RunCircle';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import { NavLink, Navigate, Outlet } from 'react-router-dom';
import { useState } from 'react';

import { Edit } from '@mui/icons-material';
 
 

const navVectLinks = [
    {
        title: "Inicio", path: "/privado/menu", icon: <HomeIcon />
    },
    {
        title: "Pag Pública", path: "/", icon: <Diversity3Icon />
    }
    
 ];

const navVectGestion1 = [

    {
       /*  title: "Motivos", path: "/privado/tablas/1", icon: <ListAltIcon /> */
       title: "Motivos", path: "/privado/tablas/1"  
    },
 
    {
        title: "Instituciones", path: "/privado/tablas/2" 
    },
    {
        title: "Organismos", path: "/privado/tablas/3" 
    },
    {
        title: "DEM", path: "/privado/tablas/4" 
    }
  
  ]

  const navVectGestion2 = [
    {
        title: "Ingresos", path: "/privado/ingresos", icon: <PlaylistAddIcon />
    },
    {
        title: "Lis./Edición", path: "/privado/edicion", icon: <Edit />
    },
    {
        title: "Pases", path: "/contacto", icon: <RunCircleIcon />
    },
   

]
const navVectGestion3 = [
    {
        title: "ListaxEstado", path: "/privado/listae", icon: <PlaylistAddIcon />
    },
    {
        title: "Estacion", path: "/privado/estacion", icon: <RunCircleIcon />
    },
    {
        title: "Estadistica", path: "/privado/estadistica", icon: <TransferWithinAStationIcon />
    }

]

// eslint-disable-next-line react/prop-types
  const LayoutPrivado = ({ children }) => {

    const [open, setOpen] = useState(true)
  
    return (
      
        /*EL BOX ES COMO UN DIV  pongo un fondo amarillo "#e8e5cc"*/
        <Box sx={{ display: 'flex' , height:'950px', backgroundColor:'antiquewhite' }}>

            <NavBar  navVectLinks={navVectLinks} navVectGestion1={navVectGestion1} navVectGestion2={navVectGestion2}  navVectGestion3={navVectGestion3}NavLink={NavLink} setOpen={setOpen} />

            <Box
                component='main'
                sx={{ flexGrow: 1, p: 2 
                }}
            >
     
                <Toolbar />
                {/* aqui aparecen los hijos */}
                {children}

            </Box>
        </Box>
     
    )
}
export default LayoutPrivado