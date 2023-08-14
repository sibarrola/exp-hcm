import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { styled, useTheme } from '@mui/system';

const CustomDialog = ({ open, onClose, title, message }) => {
  const theme = useTheme();

  const CustomTitle = styled(DialogTitle)({
    backgroundColor: '#f00', // fondo rojo
    color: 'white', // texto blanco
  });

  const CustomContent = styled(DialogContent)({
    color: 'red', // texto rojo
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
      <CustomContent>
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
      </CustomContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" autoFocus>
          Salir
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomDialog;
