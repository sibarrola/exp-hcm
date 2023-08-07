
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Container, Paper, Box, Typography } from '@mui/material';
 import {Global} from '../../helpers/Global.jsx';

const url=Global.url; 
const FormularioDem = () => {

    // estados
    const [dems, setDems] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editDem, setEditDem] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const fetchDems = async () => {
        try {
            const res = await axios.get(`${url}/dems`);
            if (Array.isArray(res.data.dems)) {
                setDems(res.data.dems);
                
            } else {
                console.error('Server did not return an array');
            }
        } catch (err) {
            console.error(err);
        }
    };

    const createDem = async dem => {
        try {
            await axios.post(`${url}/dems`, dem);
            fetchDems();  // Fetch latest list of 'dems' after creating a new one
        } catch (error) {
            console.error('Error', error);
        }
    };
    
    const updateDem = async dem => {
        try {
            await axios.put(`${url}/dems/${dem._id}`, dem);
            fetchDems();  // Fetch latest list of 'dems' after updating an existing one
        } catch (error) {
            console.error('Error', error);
        }
    };
    const deleteDem = async id => {
        await axios.delete(`${url}/dems/${id}`);
        setDems(dems.filter(m => m._id !== id));
    };

    useEffect(() => {
        fetchDems();
    }, []);

    useEffect(() => {
        console.log("dems", dems);
    }, [dems]);

    const handleDialogOpen = (dem = null) => {
        setEditDem(dem);
        setIsEditing(!!dem);
        setDialogOpen(true);
        
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
        setEditDem(null);
        setIsEditing(false);
    };

    const handleDialogConfirm = () => {
        if (isEditing) {
            updateDem(editDem);
        } else {
           createDem({ dem: editDem ? editDem.dem : '' });
        }
        handleDialogClose();
    };

    return (
        <>
           
            <Container component={Paper} maxWidth="sm" sx={{ padding: 2 }}>
            <Typography variant='h5'>TABLA DE REPARTICIONES DEL D.E.M </Typography>
            <hr/>
            <Box sx={{m:'30px',textAlign:'right' }}>
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
                                <TableCell>D.E.M.</TableCell>
                                <TableCell>Editar</TableCell>
                                <TableCell>Borrar</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dems.map(dem => (
                                <TableRow key={dem._id}>
                                    <TableCell>{dem.dem}</TableCell>
                                    <TableCell>
                                        <Button size="small" variant="contained" color="primary" onClick={() => handleDialogOpen(dem)}>
                                            Editar
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button size="small" variant="contained" color="error" onClick={() => deleteDem(dem._id)}>
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
                            height: '30%'
                        }
                    }}
                >
                    <DialogTitle>{isEditing ? 'Editar D.E.M.' : 'Nuevo D.E.M.'}</DialogTitle>
                    <DialogContent >
                        <DialogContentText>
                            Ingrese el dem
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Dem"
                            type="text"
                            fullWidth
                            value={editDem ? editDem.dem : ''}
                            onChange={e => setEditDem({ ...editDem, dem: e.target.value })}
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

export default FormularioDem;
