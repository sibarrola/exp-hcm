import React from 'react';
import {
    Card,
    CardContent,
    CardHeader,
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
    Grid

} from '@mui/material';
import { fechaReves, formatearFecha } from '../../helpers/funcionesVarias'

const ExpedienteCard = ({ expediente }) => {

    const pasesOrdenados = [...expediente.pases].sort((a, b) => new Date(a.fecha_pase) - new Date(b.fecha_pase));
    /* los ... son para copiar y no perder el original */
    return (
        <Card variant="outlined" sx={{ borderColor: 'blue' }} >
             <Grid sx={{ml:"10px", display:'flex'}} >
               <h3>
                {`Legajo: ${expediente.legajo}`}
                </h3>
                <h4 mr="1">
                 --- Ingresado: { formatearFecha(new Date(expediente. fechaIngreso)) + "--- ("+ expediente.estadoExp+")"}  
                </h4>
             </Grid>
                

            <CardContent>
                <Typography variant="body1" sx={{ fontWeight:900}}>Motivo: {expediente.motivo}</Typography>
                <Typography variant="body1"> {expediente.comentario}</Typography>
                <Typography variant="body1">Solicitante: {expediente.solicitante}   </Typography>
                <Typography variant="body1">Presentó:{expediente.nombres} {expediente.apellido+"  "} / {expediente.dni? "DNI:"+expediente.dni:"" } {expediente.celular? "/ Cel.:"+expediente.celular:"" }    {expediente.domicilio? "/ Domicilio:"+expediente.domicilio:"" } </Typography>
              

                <Divider style={{ margin: "20px 0", backgroundColor: 'blue' }} />


                {/*   <TablaConBotones pases={expediente.pases} titulo="Pases del expediente" /> */}

                <Container component={Paper} maxWidth="100%" sx={{ padding: 2 }}>
                    <Typography variant='h5'>Pases del Expediente
                    </Typography>
           

                    <Table>
                        <TableHead
                            sx={{
                                backgroundColor: '#cfd8dc', // Cambia el color de fondo
                                '& .MuiTableCell-root': {
                                    fontWeight: '900'
                                },
                                padding: '0px'
                            }}
                        >
                            <TableRow>
                                <TableCell>Fecha</TableCell>
                                <TableCell>Pase a</TableCell>
                                <TableCell>Comentario</TableCell>
                                <TableCell>Permanencia</TableCell>
                                <TableCell>Editar</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {pasesOrdenados.map((pase, index) => {
                                let diasEnEstacion = null;
                                if (index < pasesOrdenados.length - 1) {
                                    const fechaActual = new Date(pase.fecha_pase);
                                    const fechaSiguiente = new Date(pasesOrdenados[index + 1].fecha_pase);
                                    diasEnEstacion = Math.ceil((fechaSiguiente - fechaActual) / (1000 * 60 * 60 * 24));
                                }
                                return (
                                    <TableRow key={pase._id}  >
                                        {/* he ajustado las celdas para que queden mas apretadas las filas , no tan altas */}
                                        <TableCell sx={{ padding: '4px 16px' }}>{formatearFecha(new Date(pase.fecha_pase))}</TableCell>
                                        <TableCell sx={{ padding: '5px 16px' }}>{pase.estacion} {pase.sub_estacion}</TableCell>
                                        <TableCell sx={{ padding: '5px 16px' }}>{pase.comentario}
                                        </TableCell>
                                        <TableCell>
                                            {diasEnEstacion !== null ? `${diasEnEstacion} días` : '-'}
                                        </TableCell>
                                        <TableCell sx={{ padding: '5px 16px' }}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                size="small"
                                                style={{ fontSize: '10px', padding: '4px 8px' }}
                                            > editar</Button>
                                        </TableCell>

                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>

                </Container>

                {/*  <List>
                    {expediente.pases.map((pase, index) => (
                        <ListItem key={index}>
                            <ListItemText
                                primary={`Fecha: ${new Date(pase.fecha_pase).toLocaleDateString()}`}
                                secondary={`Estación: ${pase.estacion} ${pase.sub_estacion ? `- Sub: ${pase.sub_estacion}` : ''}` }
                            />
                        </ListItem>
                    ))}
                </List> */}
                {/*  <List>
                    {expediente.pases.map((pase, index) => (
                        <ListItem key={index}>
                            <ListItemText
                                style={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}
                                primaryTypographyProps={{ variant: "body2" }} // Ajusta la variante de tipografía para un texto más pequeño.
                                primary={`Fecha: ${new Date(pase.fecha_pase).toLocaleDateString()} -  Estación: ${pase.estacion} ${pase.sub_estacion ? `- Sub: ${pase.sub_estacion}` : ''}`}
                               
                            />
                        </ListItem>
                    ))}
                </List> */}
            </CardContent>
        </Card>
    );
};

export default ExpedienteCard;
