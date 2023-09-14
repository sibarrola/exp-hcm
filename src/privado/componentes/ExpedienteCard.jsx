import React, { useEffect, useState } from 'react';
import {

    Typography,
    Divider,
    Container,
    Paper,
    Box,
    Button,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Grid,
    Card,
    CardContent

} from '@mui/material';
import { fechaReves, formatearFecha } from '../../helpers/funcionesVarias'
import { colortema } from '../../theme';
import ConfirmDialog from './ConfirmDialog';

/* ====================================================================== */
const ExpedienteCard = ({ expediente,  onPaseEdit, onPaseDelete }) => {

  let pasesOrdenados = [...expediente.pases].sort((a, b) => new Date(a.fecha_pase) - new Date(b.fecha_pase));
    /* los ... son para copiar y no perder el original */

    console.log("expedienteCarrd",expediente.pases)
    const columnWidths = [
        { width: '100px' },   // Para la columna 'Fecha'
        { width: '150px' },   // Para la columna 'Pase a'
        { width: '200px' },   // Para la columna 'Comentario'
        { width: '100px' },   // Para la columna 'permanencia'

        { width: '200px' },   // Para la columna 'Usuario'
        { width: '100px' },   // Para la columna 'Usuario'
        { width: '100px' },   // Para la columna 'Usuario'
    ];
    /* para borrar */
    const [dialogOpen, setDialogOpen] = useState(false);
    const [paseToDelete, setPaseToDelete] = useState(null);

    const handleOpenDialog = (id) => {
        setPaseToDelete(id);
        console.log("paseToDelete", paseToDelete)
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setPaseToDelete(null);
        setDialogOpen(false);
    };

    const handleDialogConfirm = async () => {
        await onPaseDelete(paseToDelete);
        console.log("paseTodelete", paseToDelete)
        setDialogOpen(false);
    };
    /* -------------------- */
/*     useEffect(()=>{

       let pasesOrdenados = [...expediente.pases].sort((a, b) => new Date(a.fecha_pase) - new Date(b.fecha_pase));
      
              
    },[expediente]) */
    return (
        <Card variant="outlined" sx={{ borderColor: 'blue' }} >
            <Grid sx={{ ml: "30px" }} >
                <h3>
                    VISUALIZACION EXPEDIENTE - {`Legajo: ${expediente.legajo}`}
                </h3>
                <Typography sx={{ fontWeight: 800 }}  > Ingresado:</Typography>
                <Typography sx={colortema.typography.texto} >{formatearFecha(new Date(expediente.fechaIngreso)) + "-- (" + expediente.estadoExp + ")"}</Typography>

            </Grid>


            <CardContent>
                <Grid component={Paper} maxWidth="100%" sx={{ paddingLeft: 2 }}>
                    <Typography sx={{ fontWeight: 800 }}  >Motivo:</Typography>
                    <Typography sx={colortema.typography.texto} >{expediente.motivo}</Typography>
                    <Typography sx={colortema.typography.texto} >{expediente.comentario}</Typography>
                    <Typography sx={{ fontWeight: 800 }}>Solicitante:</Typography>  <Typography sx={colortema.typography.texto}>{expediente.solicitante}</Typography>
                    <Typography sx={{ fontWeight: 800 }}>Presentó:</Typography>
                    <Typography sx={colortema.typography.texto}>{expediente.nombres} {expediente.apellido + "  "} / {expediente.dni ? "DNI:" + expediente.dni : ""} {expediente.celular ? "/ Cel.:" + expediente.celular : ""}    {expediente.domicilio ? "/ Domicilio:" + expediente.domicilio : ""} </Typography>
                    <Divider style={{ marginTop: '20px', backgroundColor: 'blue' }} />
                </Grid>

                <Grid component={Paper} maxWidth="100%" sx={{ padding: 2 }}>
                    <Typography variant="body1" sx={{ fontWeight: 800, ml: "3px" }}>
                        PASES DEL EXPEDIENTE
                    </Typography>
                    <div style={{ overflowY: 'auto',  Height: '300px' }}>
                        <ConfirmDialog
                            open={dialogOpen}
                            onClose={handleCloseDialog}
                            title="Eliminación del Pase"
                            contentText="¿Estás seguro de que deseas borrar el pase?"
                            onConfirm={handleDialogConfirm}
                            titulo_fondo='#4dabf5'
                            titulo_color='black'
                            context_fondo='yellowlight'
                            context_color='secondary'
                        />


                        <Table sx={{ minWidth: "100%" }}>
                            <TableHead
                                sx={{
                                    backgroundColor: '#cfd8dc',
                                    position: 'sticky',
                                    top: 0,
                                    zIndex: 1,  // Esto asegura que la cabecera esté por encima de las filas del cuerpo de la tabla
                                    '& .MuiTableCell-root': {
                                        fontWeight: '900'
                                    },
                                    padding: '0px',
                                    maxWidth: "100%"
                                }}
                            >
                                {/* Tus celdas de cabecera */}


                                <TableRow >
                                    <TableCell sx={{ borderBottom: '1px solid #888888' }} >Fecha</TableCell  >
                                    <TableCell sx={{ borderBottom: '1px solid #888888' }}>Pase a</TableCell>
                                    <TableCell sx={{ borderBottom: '1px solid #888888' }}>Comentario</TableCell>
                                    <TableCell sx={{ borderBottom: '1px solid #888888' }}>Permanencia</TableCell>
                                    <TableCell sx={{ borderBottom: '1px solid #888888' }}>Usuario</TableCell>
                                    <TableCell sx={{ borderBottom: '1px solid #888888' }}>Editar</TableCell>
                                    <TableCell sx={{ borderBottom: '1px solid #888888' }}>Borrar</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody  >
                                {/* map ---------------------------------------------------- */}
                                {pasesOrdenados.map((pase, index) => {
                                    let diasEnEstacion = 0;
                                    
                             // Determina  si es la última fila
                                const isLastRow = index === pasesOrdenados.length - 1;  
                                    /* calculo dias de estación----------------- */
                                    if (index < pasesOrdenados.length - 1) {
                                        const fechaActual = new Date(pasesOrdenados[index].fecha_pase);
                                        const fechaSiguiente = new Date(pasesOrdenados[index + 1].fecha_pase);
                                        diasEnEstacion = Math.ceil((fechaSiguiente - fechaActual) / (1000 * 60 * 60 * 24));
                                    }
                                    return (
                                        <TableRow key={pase._id}  >
                                            {/* he ajustado las celdas para que queden mas apretadas las filas , no tan altas */}

                                             
                                            <TableCell sx={{ padding: '4px 16px', borderBottom: isLastRow ? 'none' : '1px solid #888888' }}  style={columnWidths[0]} > <Typography sx={colortema.typography.texto} > {formatearFecha(new Date(pase.fecha_pase))}</Typography>
                                            </TableCell>
                                            <TableCell sx={{ padding: '4px 16px', borderBottom: isLastRow ? 'none' : '1px solid #888888' }}  style={columnWidths[1]}>
                                                <Typography sx={colortema.typography.texto}    >
                                                    {pase.estacion} {pase.sub_estacion}</Typography></TableCell>
                                            <TableCell sx={{ padding: '4px 16px', borderBottom: isLastRow ? 'none' : '1px solid #888888' }}  style={columnWidths[2]}>
                                                <Typography sx={colortema.typography.texto} style={columnWidths[5]}  >
                                                    {pase.comentario}
                                                </Typography>
                                            </TableCell>
                                            <TableCell sx={{ padding: '4px 16px', borderBottom: isLastRow ? 'none' : '1px solid #888888' }}  style={columnWidths[3]}>
                                                {diasEnEstacion !== null ? `${diasEnEstacion} días` : '-'}
                                            </TableCell>
                                            <TableCell sx={{ padding: '4px 16px', borderBottom: isLastRow ? 'none' : '1px solid #888888' }}  style={columnWidths[4]}>
                                                {pase.usuario_pase_nombre}
                                            </TableCell>

                                            <TableCell sx={{ padding: '4px 16px', borderBottom: isLastRow ? 'none' : '1px solid #888888' }}   style={columnWidths[5]}>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    size="small"
                                                    style={{ fontSize: '10px', padding: '4px 8px' }}
                                                    onClick={() => onPaseEdit(pase) }

                                                > Editar</Button>

                                            </TableCell>
                                            <TableCell sx={{ padding: '4px 16px', borderBottom: isLastRow ? 'none' : '1px solid #888888' }}  style={columnWidths[6]}>
                                                <Button
                                                    variant="contained"
                                                    color="botonBorra"
                                                    size="small"
                                                    style={{ fontSize: '10px', padding: '4px 8px' }}

                                                    onClick={() => handleOpenDialog(pase._id)}
                                                /*   onClick={() => onPaseDelete(pase._id)} */
                                                > borrar</Button>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>

                        </Table>
                    </div>
                </Grid>
            </CardContent>

        </Card>
    );
};

export default ExpedienteCard;