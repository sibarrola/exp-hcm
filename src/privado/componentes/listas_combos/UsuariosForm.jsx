import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Container, Paper, Box, Typography, Alert } from '@mui/material';
import { Global } from '../../../helpers/Global';
import ConfirmDialog from '../ConfirmDialog';
import CustomAlert from '../CustomAlert';    
import useAuth from "../../../hooks/useAuth.jsx";
const url = Global.url;

const UsuariosForm = () => {

    // estados
    const [usuarios, setUsuarios] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editUsuario, setEditUsuario] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    // para los borrados--------------------------------------
    const [dialogOpen2, setDialogOpen2] = useState(false);
    const [isBorrando, setIsBorrando] = useState(false);
    const [borraUsuario, setBorraUsuario] = useState(null);
    const [nombre, setNombre] = useState("");
    // para mostrar un Alert----------------------------
    const [open, setOpen] = useState(false);  
const [errorMessage, setErrorMessage] = useState('');
  
    const { auth } = useAuth();
    const token=auth.token;
    //-------------------------------------------------------------
    const fetchUsuario = async () => {
   
        try {
            const res = await axios.get(`${url}/usuarios`);
            console.log("data",res.data.usuarios)
            if (Array.isArray(res.data.usuarios)) {
                setUsuarios(res.data.usuarios);
         
            } else {
                console.error('Server did not return an array');
            }
        } catch (err) {
            console.error(err);
        }
    };

    const createUsuario = async (usuario) => {
        try {
            await axios.post(`${url}/usuarios`, usuario);
           await fetchUsuario();
        } catch (error) {
            console.error('Error', error);
        }
    };

    const updateUsuario = async usuario => {
        console.log("update Usuario",usuario);
        try {
            
            const config = {
                headers: {
                    "Content-Type":"application/json",
                    "x-token":token
                }
            };
            console.log("updateUsuario");
           await axios.put(`${url}/usuarios/${usuario.uid}`, usuario,config);
           
            
           await  fetchUsuario();  // Fetch latest list of 'usuarios' after updating an existing one
        } catch (error) {
            console.log('Error', error.response.data.msg);
            setErrorMessage(error.response.data.msg);
            setOpen(true);
             
        }
    };
    // borrar ---------------------------------------------------
 
 

    useEffect(() => {
        fetchUsuario();
        console.log(usuarios)
    }, []);

    useEffect(() => {
        console.log(`${url}/usuarios`);
    }, [usuarios]);

    const handleDialogOpen = (usuario = null) => {
        setEditUsuario(usuario);
        setIsEditing(!!usuario);
        setDialogOpen(true);

    };

    const handleDialogClose = () => {
        setDialogOpen(false);
        setEditUsuario(null);
        setIsEditing(false);
    };

    const handleDialogConfirm = () => {
        if (isEditing) {
            updateUsuario(editUsuario);
        } else {
            createUsuario({ usuario: editUsuario ? editUsuario.correo : '' });
        }
        handleDialogClose();
    };


    const OpenDeletUsuario = (usuario) => {
        setBorraUsuario(usuario);
        setIsBorrando(true)
        setNombre(usuario.correo);
        setDialogOpen2(true)
    };
    // ventana dialogo para confimar el borrado ---------------------------------
    const handleDialogClose2 = () => {
        setDialogOpen2(false);
        setBorraUsuario(null)
    };
    const handleDialogConfirm2 = async() => {
        if (isBorrando) {
            console.log("borraUsuario", borraUsuario);
            const updatedUser = { ...borraUsuario, estado: false };
            setBorraUsuario(updatedUser);
            await updateUsuario(updatedUser); 
        }
        setBorraUsuario(null);
        handleDialogClose2();
    };


    return (
        <>

            <Container component={Paper} maxWidth="sm" sx={{ padding: 2 }}>
                <Typography variant='h5'>TABLA DE USUARIOS </Typography>
                <hr />
                {open && (
            <CustomAlert 
                open={open}
                onClose={() => setOpen(false)} // opcional: para cerrar el me
                message={errorMessage}
            />
                
             
        )}
                <Box sx={{ m: '30px', textAlign: 'lefth' }}>
                    <Button variant="contained" color="primary" onClick={() => handleDialogOpen()}>
                        Nuevo
                    </Button>
                </Box>
                <TableContainer>
                    <ConfirmDialog
                        open={dialogOpen2}
                        onClose={handleDialogClose2}
                        title="Eliminación del usuario"
                        contentText={`¿Estás seguro de que deseas borrar ${nombre} ?`}
                        onConfirm={handleDialogConfirm2}
                        titulo_fondo='#4dabf5'
                        titulo_color='black'
                        context_fondo='yellowlight'
                        context_color='secondary'
                    />
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
                                <TableCell>Usuario</TableCell>
                                <TableCell>Rol</TableCell>
                                <TableCell width="20%">Editar</TableCell>
                                <TableCell width="20%">Borrar</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {usuarios.map(usuario => (
                                <TableRow key={usuario._id}>
                                    <TableCell>{usuario.correo}</TableCell>
                                    <TableCell>{usuario.rol}</TableCell>
                                    <TableCell>
                                        <Button size="small" variant="contained" color="primary" onClick={() => handleDialogOpen(usuario)}>
                                            Editar
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button size="small" variant="contained" color="error" onClick={() => OpenDeletUsuario(usuario)}>
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
                    <DialogTitle>{isEditing ? 'Editar Usuario' : 'Nueva Usuario'}</DialogTitle>
                    <DialogContent >
                        <DialogContentText>
                            Ingrese el usuario
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Usuario"
                            type="text"
                            fullWidth
                            value={editUsuario ? editUsuario.correo : ''}
                            onChange={e => setEditUsuario({ ...editUsuario, correo: e.target.value })}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Rol"
                            type="text"
                            fullWidth
                            value={editUsuario ? editUsuario.rol : ''}
                            onChange={e => setEditUsuario({ ...editUsuario, rol: e.target.value })}
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

export default UsuariosForm;
