import { useState } from 'react';

import {  Box, Typography,Paper } from '@mui/material';

import { NavListDrawer } from '../components/NavListDrawer';
import FormuContacto from '../components/FormuContacto';
import banner from '../../assets/banner.jpg'

const Contacto = () => {
 


    return (
        <Box sx={{ display: 'flex', mt: '3%' }}>

            <Box sx={{
                display: { xs: 'none', sm: 'none', md: 'none', lg: 'none', xl: 'flex' }
            }}>
                <NavListDrawer />
            </Box>
          
            <Box component={Paper} sx={{ paddingRight: 10, border: 1, borderColor: 'blue', width:'50%', mt:'5%',display:'flex',ml:'15%', boxShadow: "2" }}>
             
            <Box  >
          
       
                <img src={banner} alt="Descripción" style={{ width: 'auto', height: '100%', borderRadius: '4px' }} />

            </Box>
            
            <Box sx={{ display: 'flex', ml: '10%', justifyContent: 'center' }}    >
                <FormuContacto />

            </Box>
            </Box>

        </Box>
    );
}



export default Contacto;
