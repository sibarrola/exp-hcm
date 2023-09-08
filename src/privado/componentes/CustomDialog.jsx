import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { styled, useTheme } from '@mui/system';

const CustomDialog = ({ open, onClose, title, message }) => {
 

  const CustomTitle = styled(DialogTitle)({
    backgroundColor: "blue", // fondo 
    color: "white", // texto blanco
  });

  const CustomContentText= styled(DialogContentText)({
    color: 'black',
    fontWeight:'800' // 
  });

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="md" // Puedes cambiar el ancho máximo
      style={{ margin: 'auto', top: 100 }} // Puedes ajustar la posición aquí
    >
      <CustomTitle id="alert-dialog-title">
        {title}
      </CustomTitle>
      <DialogContent>
        <CustomContentText id="alert-dialog-description">
          {message}
        </CustomContentText>
      </DialogContent>
      <DialogActions>
      <Button size="small" variant="contained" color="botonConfirma" onClick={onClose}  sx={{color:'black'}}> 
            Salir
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomDialog;
