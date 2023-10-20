import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Container, Paper, Box, Typography } from '@mui/material';
import {Global} from '../../../helpers/Global';
import ConfirmDialog from '../ConfirmDialog';
import CustomAlert from '../CustomAlert';
const url=Global.url; 
import useAuth from "../../../hooks/useAuth";

const OrganismosForm = () => {
    const { auth } = useAuth();  // usuario logueado;
    let token = auth.token;
    const config = {
        headers: {
            "Content-Type": "application/json",
            "x-token": token
        }
    }
    // estados
    const [organizaciones, setOrganizaciones] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editOrganismo, setEditOrganizaciones] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
// para los borrados--------------------------------------
const [dialogOpen2, setDialogOpen2] = useState(false);
const [isBorrando, setIsBorrando] = useState(false);
const [borraOrganismo, setBorraOrganismo] = useState(null);
//------------------------------------------------------------
// alerta-----------------
const [avisoOpen, setAvisoOpen] = useState(false);
const [mensaje,setMensaje] = useState("");
//-------------------------------------------------------------
const [nombre, setNombre] = useState("");
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
    // borrar ---------------------------------------------------
const OpenDeleteOrganizacion = (id,nombre) => {
    setBorraOrganismo(id);
    setIsBorrando(true)
    setNombre(nombre);
    setDialogOpen2(true)
};
 
    const deleteOrganismo = async id => {
        try{
            await axios.delete(`${url}/organizaciones/${id}`,config);
            setOrganizaciones(organizaciones.filter(m => m._id !== id));
        
    } catch (error) {
        console.error('Error', error);
        setAvisoOpen(true);
        setMensaje(error.response.data.msg);
    }
      
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
      // ventana dialogo para confimar el borrado ---------------------------------
      const handleDialogClose2= () => {
        setDialogOpen2(false);
        setBorraOrganismo(null)
    };
    const handleDialogConfirm2 = () => {
        if (isBorrando) {
            deleteOrganismo(borraOrganismo); //envia el id almacenado en BorraDEm
        }
        setBorraOrganismo(null)
        handleDialogClose2();
    };
    const handleAvisoClose= () => {
        setAvisoOpen(false);
        setMensaje("");
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
                <ConfirmDialog
                            open={dialogOpen2}
                            onClose={handleDialogClose2}
                            title="Eliminación de la Organización"
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
                                        <Button size="small" variant="contained" color="error" onClick={() => OpenDeleteOrganizacion(organizacion._id,organizacion.organizacion)}>
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
