import React from 'react';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

import { PropTypes } from "prop-types";

const CustomAlert = ({ open, onClose, severity, message }) => {
  const severityColor = {
    error: 'red',
    warning: 'orange',
    success: 'green',
  };
console.log("severity",severity)
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert
        variant="filled"
        onClose={onClose}
        severity={severity}
        sx={{ width: '100%', backgroundColor: severityColor[severity] }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomAlert;

CustomAlert.propTypes = {
   open: PropTypes.bool,
   
    onClose: PropTypes.func,
    severity: PropTypes.string,
    message: PropTypes.string,
 
}