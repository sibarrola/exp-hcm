import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Container, Paper, Box, Typography } from '@mui/material';
import {Global} from '../../../helpers/Global';

const url=Global.url; 
const OrganismosForm = () => {

    // estados
    const [organizaciones, setOrganizaciones] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editOrganismo, setEditOrganizaciones] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const fetchOrganismos = async () => {
        try {
            const res = await axios.get(`${url}/organizaciones`);
            if (Array.isArray(res.data.organizaciones)) {
                setOrganizaciones(res.data.organizaciones);
                console.log("organizaciones",organizaciones)
                
            } else {
                console.error('Server did not return an array');
            }
        } catch (err) {
            console.error(err);
        }
    };

    const createOrganismo = async organizacion => {
        try {
            await axios.post(`${url}/organizaciones`, organizacion);
            fetchOrganismos();   
        } catch (error) {
            console.error('Error', error);
        }
    };
    
    const updateOrganismo = async organizacion => {
        try {
            await axios.put(`${url}/organizaciones/${organizacion._id}`, organizacion);
            fetchOrganismos();  // Fetch latest list of 'organizaciones' after updating an existing one
        } catch (error) {
            console.error('Error', error);
        }
    };
    const deleteOrganismo = async id => {
        await axios.delete(`${url}/organizaciones/${id}`);
        setOrganizaciones(organizaciones.filter(m => m._id !== id));
    };

    useEffect(() => {
        fetchOrganismos();
    }, []);

    useEffect(() => {
        console.log("organizaciones", organizaciones);
    }, [organizaciones]);

    const handleDialogOpen = (organizacion = null) => {
        setEditOrganizaciones(organizacion);
        setIsEditing(!!organizacion);
        setDialogOpen(true);
      
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
        setEditOrganizaciones(null);
        setIsEditing(false);
    };

    const handleDialogConfirm = () => {
        if (isEditing) {
            updateOrganismo(editOrganismo);
        } else {
            createOrganismo({ organizacion: editOrganismo ? editOrganismo.organizacion : '' });
        }
        handleDialogClose();
    };

    return (
        <>
   
            <Container component={Paper} maxWidth="sm" sx={{ padding: 2 }}>  
            <Typography variant='h5'>TABLA DE ORGANISMOS PUBLICOS </Typography>
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
                                <TableCell>Organismo</TableCell>
                                <TableCell  width="20%">Editar</TableCell>
                                <TableCell  width="20%">Borrar</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {organizaciones.map(organizacion => (
                                <TableRow key={organizacion._id}>
                                    <TableCell>{organizacion.organizacion}</TableCell>
                                    <TableCell>
                                        <Button size="small" variant="contained" color="primary" onClick={() => handleDialogOpen(organizacion)}>
                                            Editar
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button size="small" variant="contained" color="error" onClick={() => deleteOrganismo(organizacion._id)}>
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
                    <DialogTitle>{isEditing ? 'Editar Organismo' : 'Nuevo Organismo'}</DialogTitle>
                    <DialogContent >
                        <DialogContentText>
                            Ingrese el organizacion
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Organizacion"
                            type="text"
                            fullWidth
                            value={editOrganismo ? editOrganismo.organizacion : ''}
                            onChange={e => setEditOrganizaciones({ ...editOrganismo, organizacion: e.target.value })}
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

export default OrganismosForm;
