import React from 'react';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const CustomAlert = ({ open, onClose, severity, message  }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}  // Posiciona la alerta en la parte superior y en el centro
     
    >
      <Alert variant="filled" onClose={onClose} severity={severity}  sx={{ width: '100%'  }} >
        {message}
      </Alert>
 
    </Snackbar>
  );
};

export default CustomAlert;