import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Container, Paper, Box, Typography } from '@mui/material';
import { Global } from '../../../helpers/Global';
import ConfirmDialog from '../ConfirmDialog';
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
    //-------------------------------------------------------------
    const fetchUsuario = async () => {
   
        try {
            const res = await axios.get(`${url}/usuarios`);
            console.log("data",res.data.usuarios)
            if (Array.isArray(res.data.usuarios)) {
                setUsuarios(res.data.usuarios);
                console.log("usuarios", usuarios)

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
        try {
            console.log("updateUsuario");
            await axios.put(`${url}/usuarios/${usuario.uid}`, usuario);
           await  fetchUsuario();  // Fetch latest list of 'usuarios' after updating an existing one
        } catch (error) {
            console.log('Error', error);
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
    // ventana dialogo para confimar el borrado ---------------------------------
    const handleDialogClose2 = () => {
        setDialogOpen2(false);
        setBorraUsuario(null)
    };
    const handleDialogConfirm2 = async() => {
        if (isBorrando) {
            setEditUsuario(...editUsuario,estado='false');

           await updateUsuario(editUsuario); //envia el id almacenado en BorraDEm
        }
        setBorraUsuario(null)
        handleDialogClose2();
    };


    return (
        <>

            <Container component={Paper} maxWidth="sm" sx={{ padding: 2 }}>
                <Typography variant='h5'>TABLA DE USUARIOS </Typography>
                <hr />
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
                                        <Button size="small" variant="contained" color="error" onClick={() => OpenUsuario(usuario._id, usuario.correo, usuario.rol)}>
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
