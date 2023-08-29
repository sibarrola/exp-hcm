import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Container, Paper, Box, Typography } from '@mui/material';
import {Global} from '../../../helpers/Global';

const url=Global.url; 
const EstacionesForm = () => {

    // estados
    const [estaciones, setEstaciones] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editEstacion, setEditEstacion] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const fetchEstacion= async () => {
        try {
            const res = await axios.get(`${url}/estaciones`);
            if (Array.isArray(res.data.estaciones)) {
                setEstaciones(res.data.estaciones);
                console.log("estaciones",estaciones)
                
            } else {
                console.error('Server did not return an array');
            }
        } catch (err) {
            console.error(err);
        }
    };

    const createEstacion = async estacion => {
        try {
            await axios.post(`${url}/estaciones`, estacion);
            fetchEstacion();   
        } catch (error) {
            console.error('Error', error);
        }
    };
    
    const updateEstacion = async estacion => {
        try {
            await axios.put(`${url}/estaciones/${estacion._id}`, estacion);
            fetchEstacion();  // Fetch latest list of 'estaciones' after updating an existing one
        } catch (error) {
            console.error('Error', error);
        }
    };
    const deleteEstacion = async id => {
        await axios.delete(`${url}/estaciones/${id}`);
        setEstaciones(estaciones.filter(m => m._id !== id));
    };

    useEffect(() => {
        fetchEstacion();
    }, []);

    useEffect(() => {
        console.log("estaciones", estaciones);
    }, [estaciones]);

    const handleDialogOpen = (estacion = null) => {
        setEditEstacion(estacion);
        setIsEditing(!!estacion);
        setDialogOpen(true);
      
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
        setEditEstaciones(null);
        setIsEditing(false);
    };

    const handleDialogConfirm = () => {
        if (isEditing) {
            updateEstacion(editEstacion);
        } else {
            createEstacion({ estacion: editEstacion ? editEstacion.estacion : '' });
        }
        handleDialogClose();
    };

    return (
        <>
   
            <Container component={Paper} maxWidth="sm" sx={{ padding: 2 }}>  
            <Typography variant='h5'>TABLA DE ESTACIONES </Typography>
            <hr/>
            <Box sx={{m:'30px',textAlign:'lefth' }}>
                <Button variant="contained" color="primary" onClick={() => handleDialogOpen()}>
                    Nuevo
                </Button>
            </Box>
                <TableContainer>
                    <Table>
                    <TableHead
                            sx={{
                                backgroundColor: '#cfd8dc', // Cambia el color de fondo
                                '& .MuiTableCell-root': {   // Aplica el estilo a todas las celdas de la cabecera
                                 //   color: 'white',  // Cambia el color del texto
                                 fontWeight:'900'
                                },
                            }}
                        >
                            <TableRow>
                                <TableCell>Estacion</TableCell>
                                <TableCell  width="20%">Editar</TableCell>
                                <TableCell  width="20%">Borrar</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {estaciones.map(estacion => (
                                <TableRow key={estacion._id}>
                                    <TableCell>{estacion.estacion}</TableCell>
                                    <TableCell>
                                        <Button size="small" variant="contained" color="primary" onClick={() => handleDialogOpen(estacion)}>
                                            Editar
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button size="small" variant="contained" color="error" onClick={() => deleteEstacion(estacion._id)}>
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
                    <DialogTitle>{isEditing ? 'Editar Estacion' : 'Nueva Estacion'}</DialogTitle>
                    <DialogContent >
                        <DialogContentText>
                            Ingrese el estacion
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Estación"
                            type="text"
                            fullWidth
                            value={editEstacion ? editEstacion.estacion : ''}
                            onChange={e => setEditEstacion({ ...editEstacion, estacion: e.target.value })}
                        />
                    </DialogContent>
                    <DialogActions>
                    <Button   size="small" variant="contained" color="primary" onClick={handleDialogConfirm}>Guardar</Button>
                        <Button   size="small" variant="contained" color="secondary" onClick={handleDialogClose}>Cancelar</Button>
                       
                    </DialogActions>
                </Dialog>
            </Container>  
       
        </>
    );
};

export default EstacionesForm;