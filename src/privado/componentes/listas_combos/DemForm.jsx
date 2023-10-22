
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Container, Paper, Box, Typography } from '@mui/material';
 import {Global} from '../../../helpers/Global';
import ConfirmDialog from '../ConfirmDialog';
 import CustomAlert from '../CustomAlert';
  import useAuth from "../../../hooks/useAuth";
const url=Global.url; 
const FormularioDem = () => {
    const { auth } = useAuth();  // usuario logueado;
    let token = auth.token;
    const config = {
        headers: {
            "Content-Type": "application/json",
            "x-token": token
        }
    }
    // estados
    const [dems, setDems] = useState([]);
    const [nombre, setNombre] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false); // la ventana de carga y ediicion
    const [editDem, setEditDem] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [dialogOpen2, setDialogOpen2] = useState(false); // la ventana de carga 
    const [isBorrando, setIsBorrando] = useState(false);
   const [borraDem, setBorraDem] = useState(null);
// alerta--------------------------------------------------
 const [avisoOpen, setAvisoOpen] = useState(false);
 const [mensaje,setMensaje] = useState("");

    //----------------------------------------------------------------------
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
    useEffect(() => {
        fetchDems();
    }, []);

    useEffect(() => {
        console.log("dems", dems);
    }, [dems]);
// borrar ---------------------------------------------------
    const OpenDeleteDem = (id,nombre) => {
        setBorraDem(id);
        setIsBorrando(true)
        setNombre(nombre);
        setDialogOpen2(true)
    };
    const deleteDem = async id => {
        try{
            await axios.delete(`${url}/dems/${id}`,config);
            setDems(dems.filter(m => m._id !== id));

        }

        catch(error){
            setAvisoOpen(true);
            setMensaje(error.response.data.msg);
            console.log(error)
        }
    };

   

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

    // ventana dialogo para confimar el borrado ---------------------------------
    const handleDialogClose2= () => {
        setDialogOpen2(false);
        setBorraDem(null)
    };
    const handleDialogConfirm2 = () => {
        if (isBorrando) {
            deleteDem(borraDem); //envia el id almacenado en BorraDEm
        }
        setBorraDem(null)
        handleDialogClose2();
    };
    const handleAvisoClose= () => {
        setAvisoOpen(false);
        setMensaje("");
    };

    return (
        <>
           
            <Container component={Paper} maxWidth="sm" sx={{ padding: 2 }}>
            <Typography variant='h5'>TABLA DE REPARTICIONES DEL D.E.M </Typography>
         
            <Box sx={{m:'30px',textAlign:'right' }}>
                <Button variant="contained" color="primary" onClick={() => handleDialogOpen()}>
                    Nuevo
                </Button>
                <hr/>
            </Box>
                <TableContainer>
                <ConfirmDialog
                            open={dialogOpen2}
                            onClose={handleDialogClose2}
                            title="Eliminación de la Repartición"
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
                                <TableCell>D.E.M.</TableCell>
                                <TableCell>Editar</TableCell>
                                <TableCell>Borrar</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dems.map(dem => (
                                <TableRow key={dem._id}>
                                       <TableCell sx={{ padding: '6px 16px' }}   >
                                        {dem.dem}</TableCell>
                                        <TableCell sx={{ padding: '6px 16px' }}   >
                                        <Button size="small" variant="contained" color="primary" onClick={() => handleDialogOpen(dem)}>
                                            Editar
                                        </Button>
                                    </TableCell>
                                    <TableCell sx={{ padding: '6px 16px' }}   >
                                        <Button size="small" variant="contained" color="error" onClick={() => OpenDeleteDem(dem._id,dem.dem)}>
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
