import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Container, Paper, Box, Typography } from '@mui/material';
import {Global} from '../../../helpers/Global';
import ConfirmDialog from '../ConfirmDialog';
import CustomAlert from '../CustomAlert';
import useAuth from "../../../hooks/useAuth";
const url = Global.url;
const InstitucionesForm = () => {
    const { auth } = useAuth();  // usuario logueado;
    let token = auth.token;
    const config = {
        headers: {
            "Content-Type": "application/json",
            "x-token": token
        }
    }
    // estados
    const [instituciones, setInstituciones] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editInstitucion, setEditInstitucion] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
// para los borrados--------------------------------------
const [dialogOpen2, setDialogOpen2] = useState(false);
const [isBorrando, setIsBorrando] = useState(false);
const [borraInstitucion, setBorraInstitucion] = useState(null);
const [nombre, setNombre] = useState("");
// alerta-----------------
const [avisoOpen, setAvisoOpen] = useState(false);
const [mensaje,setMensaje] = useState("");
//-------------------------------------------------------
    const fetchInstituciones = async () => {
        try {
            const res = await axios.get(`${url}/instituciones`);
            if (Array.isArray(res.data.instituciones)) {
                setInstituciones(res.data.instituciones);
                console.log("instituciones", instituciones)

            } else {
                console.error('Server did not return an array');
            }
        } catch (err) {
            console.error(err);
        }
    };

    const createInstitucion = async institucion => {
        try {
            await axios.post(`${url}/instituciones`, institucion);
            fetchInstituciones();
        } catch (error) {
            console.error('Error', error);
        }
    };

    const updateInstitucion = async institucion => {
        try {
            await axios.put(`${url}/instituciones/${institucion._id}`, institucion);
            fetchInstituciones();  // Fetch latest list of 'instituciones' after updating an existing one
        } catch (error) {
            console.error('Error', error);
        }
    };

    const OpenDeleteInstitucion = (id,nombre) => {
        setBorraInstitucion(id);
        setIsBorrando(true)
        setNombre(nombre);
        setDialogOpen2(true)
    };
    const deleteInstitucion = async id => {
        try{
            await axios.delete(`${url}/instituciones/${id}`,config);
            setInstituciones(instituciones.filter(m => m._id !== id));
        
    } catch (error) {
        console.error('Error', error);
        setAvisoOpen(true);
        setMensaje(error.response.data.msg);
    }
    };

    useEffect(() => {
        fetchInstituciones();
    }, []);

    useEffect(() => {
        console.log("instituciones", instituciones);
    }, [instituciones]);

    const handleDialogOpen = (institucion = null) => {
        setEditInstitucion(institucion);
        setIsEditing(!!institucion);
        setDialogOpen(true);

    };

    const handleDialogClose = () => {
        setDialogOpen(false);
        setEditInstitucion(null);
        setIsEditing(false);
    };

    const handleDialogConfirm = () => {
        if (isEditing) {
            updateInstitucion(editInstitucion);
        } else {
            createInstitucion({ institucion: editInstitucion ? editInstitucion.institucion : '' });
        }
        handleDialogClose();
    };
// ventana dialogo para confimar el borrado ---------------------------------
const handleDialogClose2= () => {
    setDialogOpen2(false);
    setBorraInstitucion(null)
};
const handleDialogConfirm2 = () => {
    if (isBorrando) {
        deleteInstitucion(borraInstitucion); //envia el id almacenado en BorraDEm
    }
    setBorraInstitucion(null)
    handleDialogClose2();
};
const handleAvisoClose= () => {
    setAvisoOpen(false);
    setMensaje("");
};
    return (
        <>

            <Container component={Paper} maxWidth="md" sx={{ padding: 2 }}>
                <Typography variant='h5'>TABLA DE INSTITUCIONES 
                </Typography>
             
                <Box sx={{ m: '20px', textAlign: 'right' }}>
          
                    <Button variant="contained" color="primary" onClick={() => handleDialogOpen()}>
                        Nuevo
                    </Button>
                    <hr />
                </Box>
                <TableContainer>
                <ConfirmDialog
                            open={dialogOpen2}
                            onClose={handleDialogClose2}
                            title="Eliminación de la Institucion"
                            contentText={`¿Estás seguro de que deseas borrar ${nombre} ?`}
                            onConfirm={handleDialogConfirm2}
                            titulo_fondo='#4dabf5'
                            titulo_color='black'
                            context_fondo='yellowlight'
                            context_color='secondary'
                        />
                         <CustomAlert
                            open={avisoOpen}
                            onClose={handleAvisoClose}
                            severity="warning"
                            message=  {mensaje}
                          
                        />
                    <Table>
                        <TableHead
                          sx={{     // Cambia el color de fondo
                            backgroundColor: '#cfd8dc', // Cambia el color de fondo
                            '& .MuiTableCell-root': {   // Aplica el estilo a todas las celdas de la cabecera
                             //   color: 'white',  // Cambia el color del texto
                             fontWeight:'900'
                            },
                        }}
                        >
                            <TableRow>
                                <TableCell>Institucion</TableCell>
                                <TableCell>Editar</TableCell>
                                <TableCell>Borrar</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {instituciones.map(institucion => (
                                <TableRow key={institucion._id}>
                                     <TableCell sx={{ padding: '6px 16px' }}   >
                                        {institucion.institucion}</TableCell>
                                        <TableCell sx={{ padding: '6px 10px' }}   >
                                        <Button size="small" variant="contained" color="primary" onClick={() => handleDialogOpen(institucion)}>
                                            Editar
                                        </Button>
                                    </TableCell>
                                     <TableCell sx={{ padding: '6px 10px' }}   >
                                        <Button size="small" variant="contained" color="secondary" onClick={() => OpenDeleteInstitucion(institucion._id,institucion.institucion)}>
                                            Borrar
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Dialog
                    open={dialogOpen}
                    onClose={handleDialogClose}
                    fullWidth
                    maxWidth="md"
                    PaperProps={{
                        sx: {
                            width: '30%',
                            maxWidth: 'none',
                            height: '40%'
                        }
                    }}
                >
                    <DialogTitle>{isEditing ? 'Editar Institucion' : 'Nuevo Institucion'}</DialogTitle>
                    <DialogContent >
                        <DialogContentText>
                            Ingrese el institucion
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Institucion"
                            type="text"
                            fullWidth
                            value={editInstitucion ? editInstitucion.institucion : ''}
                            onChange={e => setEditInstitucion({ ...editInstitucion, institucion: e.target.value })}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button size="small" variant="contained" color="primary" onClick={handleDialogConfirm}>Guardar</Button>
                        <Button size="small" variant="contained" color="secondary" onClick={handleDialogClose}>Cancelar</Button>

                    </DialogActions>
                </Dialog>
            </Container>
        </>
    );
};

export default InstitucionesForm;
