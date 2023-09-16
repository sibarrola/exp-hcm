import { Toolbar } from '@mui/material';
import { Box } from '@mui/system'
import { NavBarFijo } from '../components/NavBarFijo';

import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
/* import AssignmentIcon from '@mui/icons-material/Assignment'; */
import { useState } from 'react';
import { Article } from '@mui/icons-material';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import { NavLink } from 'react-router-dom';
const navVectLinks = [
  /*   {
        title: "Inicio", path: "/", icon: <HomeIcon />
    }, */
    {
        title: "Empleado", path: "/auth/login", icon: <PersonIcon />
    }
   /*  {
        title: "Registro", path: "/auth/register", icon: <AssignmentIcon />
    }, */

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


// eslint-disable-next-line react/prop-types
export const LayoutPublico = ({ children }) => {

    const [open, setOpen] = useState(true)
    /*lo traje  */
    console.log(open)
    return (

        /*EL BOX ES COMO UN DIV  */
        <Box sx={{ display: 'flex' }}>

            <NavBarFijo navVectLinks={navVectLinks} navVectCiudadanos={navVectCiudadanos} NavLink={NavLink} setOpen={setOpen} />

            <Box
                component='main'
                sx={{ flexGrow: 1, p: 2 }}
            >
                <Toolbar />
                {/* aqui aparecen los hijos */}
                {children}

            </Box>
        </Box>
    )
}