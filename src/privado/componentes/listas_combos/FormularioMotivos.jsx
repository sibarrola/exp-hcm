import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Container, Paper, Box, Typography } from '@mui/material';
import {Global} from '../../../helpers/Global';
import ConfirmDialog from '../ConfirmDialog';
import CustomAlert from '../CustomAlert';
const url=Global.url; 
import useAuth from "../../../hooks/useAuth";

const FormularioMotivos = () => {
    const { auth } = useAuth();  // usuario logueado;
    let token = auth.token;
    const config = {
        headers: {
            "Content-Type": "application/json",
            "x-token": token
        }
    }
    // estados
    const [motivos, setMotivos] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editMotivo, setEditMotivo] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
// para los borrados--------------------------------------
const [dialogOpen2, setDialogOpen2] = useState(false);
const [isBorrando, setIsBorrando] = useState(false);
const [borraMotivo, setBorraMotivo] = useState(null);
const [nombre, setNombre] = useState("");
//-------------------------------------------------------------

const [avisoOpen, setAvisoOpen] = useState(false);
const [mensaje,setMensaje] = useState("");

    const fetchMotivos = async () => {
        try {
            const res = await axios.get(`${url}/motivos`);
            if (Array.isArray(res.data.motivos)) {
                setMotivos(res.data.motivos);
                
            } else {
                console.error('Server did not return an array');
            }
        } catch (err) {
            console.error(err);
        }
    };

    const createMotivo = async motivo => {
        try {
            await axios.post(`${url}/motivos`, motivo);
            fetchMotivos();  // Fetch latest list of 'motivos' after creating a new one
        } catch (error) {
            console.error('Error', error);
        }
    };
    
    const updateMotivo = async motivo => {
        try {
            await axios.put(`${url}/motivos/${motivo._id}`, motivo);
            fetchMotivos();  // Fetch latest list of 'motivos' after updating an existing one
        } catch (error) {
            console.error('Error', error);
        }
    };

// borrar ---------------------------------------------------
const OpenDeleteMotivo = (id,nombre) => {
    setBorraMotivo(id);
    setIsBorrando(true)
    setNombre(nombre);
    setDialogOpen2(true)
};
 // borrar ---------------------------------------------------
const OpenDeleteEstacion = (id,nombre) => {
    setBorraEstacion(id);
    setIsBorrando(true)
    setNombre(nombre);
    setDialogOpen2(true)
};
 
    const deleteMotivo = async id => {
        try{
            await axios.delete(`${url}/motivos/${id}`,config);
            setMotivos(motivos.filter(m => m._id !== id));
        }
        catch(error){
            setAvisoOpen(true);
                  setMensaje(error.response.data.msg);
            console.log(error)
        }
     
    };
    const handleAvisoClose= () => {
        setAvisoOpen(false);
        setMensaje("");
    };

    useEffect(() => {
        fetchMotivos();
    }, []);

    useEffect(() => {
        console.log("motivos", motivos);
    }, [motivos]);

    const handleDialogOpen = (motivo = null) => {
        setEditMotivo(motivo);
        setIsEditing(!!motivo);
        setDialogOpen(true);
        
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
        setEditMotivo(null);
        setIsEditing(false);
    };

    const handleDialogConfirm = () => {
        if (isEditing) {
            updateMotivo(editMotivo);
        } else {
            createMotivo({ motivo: editMotivo ? editMotivo.motivo : '' });
        }
        handleDialogClose();
    };

    // ventana dialogo para confimar el borrado ---------------------------------
    const handleDialogClose2= () => {
        setDialogOpen2(false);
        setBorraMotivo(null)
    };
    const handleDialogConfirm2 = () => {
        if (isBorrando) {
            deleteMotivo(borraMotivo); //envia el id almacenado en BorraDEm
        }
        setBorraMotivo(null)
        handleDialogClose2();
    };

    return (
        <>
           
            <Container component={Paper} maxWidth="sm" sx={{ padding: 2 }}>
            <Typography variant='h5'>TABLA DE MOTIVOS </Typography>
                   <Box sx={{m:'20px',textAlign:'right' }}>
                <Button variant="contained" color="primary" onClick={() => handleDialogOpen()}>
                    Nuevo
                </Button>
                <hr/>
            </Box>
                <TableContainer>
                <ConfirmDialog
                            open={dialogOpen2}
                            onClose={handleDialogClose2}
                            title="Eliminación de la Estación"
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
                                <TableCell>Motivo</TableCell>
                                <TableCell>Editar</TableCell>
                                <TableCell>Borrar</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {motivos.map(motivo => (
                                <TableRow key={motivo._id} sx={{height:'10px'}}>
                                    <TableCell sx={{ padding: '4px 16px' }}   >{motivo.motivo}</TableCell>
                                    
                                    <TableCell sx={{ padding: '8px 16px'  }}   >
                                        <Button size="small" variant="contained" color="primary" onClick={() => handleDialogOpen(motivo)}>
                                            Editar
                                        </Button>
                                    </TableCell>
                                    <TableCell sx={{ padding: '4px 16px'  }}    >
                                        <Button size="small" variant="contained" color="error" onClick={() => OpenDeleteMotivo(motivo._id,motivo.motivo)}>
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
                    <DialogTitle>{isEditing ? 'Editar Motivo' : 'Nuevo Motivo'}</DialogTitle>
                    <DialogContent >
                        <DialogContentText>
                            Ingrese el motivo
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Motivo"
                            type="text"
                            fullWidth
                            value={editMotivo ? editMotivo.motivo : ''}
                            onChange={e => setEditMotivo({ ...editMotivo, motivo: e.target.value })}
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

export default FormularioMotivos;
