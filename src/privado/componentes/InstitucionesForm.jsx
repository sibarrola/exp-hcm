import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Container, Paper, Box, Typography } from '@mui/material';
import { Global } from '../../helpers/Global.jsx';

const url = Global.url;
const InstitucionesForm = () => {

    // estados
    const [instituciones, setInstituciones] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editInstitucion, setEditInstitucion] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

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
    const deleteInstitucion = async id => {
        await axios.delete(`${url}/instituciones/${id}`);
        setInstituciones(instituciones.filter(m => m._id !== id));
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

    return (
        <>

            <Container component={Paper} maxWidth="sm" sx={{ padding: 2 }}>
                <Typography variant='h5'>TABLA DE INSTITUCIONES </Typography>
                <hr />
                <Box sx={{ m: '30px', textAlign: 'right' }}>
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
                                    fontWeight: '900'
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
                                    <TableCell>{institucion.institucion}</TableCell>
                                    <TableCell>
                                        <Button size="small" variant="contained" color="primary" onClick={() => handleDialogOpen(institucion)}>
                                            Editar
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button size="small" variant="contained" color="error" onClick={() => deleteInstitucion(institucion._id)}>
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
