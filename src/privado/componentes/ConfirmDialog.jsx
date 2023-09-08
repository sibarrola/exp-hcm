import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';
import { styled } from '@mui/system';
const ConfirmDialog = ({ open, onClose, title, contentText, onConfirm, titulo_fondo, titulo_color, context_fondo, context_color }) => {

    const CustomTitle = styled(DialogTitle)({
        backgroundColor: `#648dae`, // fondo 
        color: `#00000`, // texto blanco
    });

    

    const CustomContent = styled(DialogContentText)({
        color: 'black', // texto rojo'context_color'
    });

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            minHight="300px"
        >
            {/*   <DialogTitle>{title}</DialogTitle> */}
            <CustomTitle id="alert-dialog-title">
                {title}
            </CustomTitle>
            {/*   <DialogContent> */}
            <DialogContent>
            <CustomContent>
                
                {contentText}
           
        </CustomContent>
            </DialogContent>
           
            <DialogActions>
                <Button size="small" variant="contained" color="botonConfirma" onClick={onConfirm}>Confirmar</Button>
                <Button size="small" variant="contained" color="botonCancela" onClick={onClose}>Cancelar</Button>

            </DialogActions>
        </Dialog>
    );
}

export default ConfirmDialog;
