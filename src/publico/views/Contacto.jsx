import { useState } from 'react';

import {  Box, Typography,Paper } from '@mui/material';

import { NavListDrawer } from '../components/NavListDrawer';
import FormuContacto from '../components/FormuContacto';
import banner from '../../assets/banner.jpg'

const Contacto = () => {
 


    return (
        <Box sx={{ display: 'flex', mt: '3%' }}>

            <Box sx={{
                display: { xs: 'none', sm: 'none', md: 'flex', lg: 'flex', xl: 'flex' }
            }}>
                <NavListDrawer />
            </Box>
          
            <Box component={Paper} sx={{ paddingRight: 10, border: 1, borderColor: 'blue',   width:{xs:'95%',md:'50%' ,xl:'50%'},height:{xs:'90%',md:'100%'}, mt:{xs:'10%',md:'4%'},display:'flex',ml:{xs:'5%',md:'20%'}, boxShadow: "2" }}>
             
            <Box sx={{display:{xs:'none',lg:'flex'}}} >
          
       
                <img src={banner} alt="Descripción" style={{ width: 'auto', height: '100%', borderRadius: '4px' }} />

            </Box>
            
            <Box sx={{ display: 'flex',   ml:{xs:'15%',md:'30%'} }}    >
                <FormuContacto />

            </Box>
            </Box>

        </Box>
    );
}



export default Contacto;
