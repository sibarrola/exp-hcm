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
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { colortema } from '../../theme';
const navVectLinks = [
    {
        title: "Inicio", path: "/privado/menu", icon: <HomeIcon />
    },
    {
        title: "Pag Publica", path: "/", icon: <Diversity3Icon />
    },
 ];

const navVectGestion1 = [

    {
        title: "Motivos", path: "/privado/tablas/1", icon: <ListAltIcon />
    },
 
    {
        title: "Tablas", path: "/privado/tablas/2", icon: <PeopleIcon />
    },
    {
        title: "Usuarios", path: "/privado/usuarios", icon: <PersonIcon />
    },
    {
        title: "Organismos", path: "/privado/organismos", icon: <CorporateFareIcon />
    }
  
  ]

  const navVectGestion2 = [
    {
        title: "Ingresos", path: "/privado/ingresos", icon: <PlaylistAddIcon />
    },
    {
        title: "Pases", path: "/contacto", icon: <RunCircleIcon />
    },
    {
        title: "Organismos", path: "/contacto", icon: <TransferWithinAStationIcon />
    }

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
           
        /*EL BOX ES COMO UN DIV  */
        <Box sx={{ display: 'flex' , backgroundColor:"#c8e4fb", height:'950px'}}>

            <NavBar  navVectLinks={navVectLinks} navVectGestion1={navVectGestion1} navVectGestion2={navVectGestion2}  navVectGestion3={navVectGestion3}NavLink={NavLink} setOpen={setOpen} />

            <Box
                component='main'
                sx={{ flexGrow: 1, p: 2 ,background:colortema.fondo}}
            >
                <Toolbar />
                {/* aqui aparecen los hijos */}
                {children}

            </Box>
        </Box>
    
    )
}
export default LayoutPrivado