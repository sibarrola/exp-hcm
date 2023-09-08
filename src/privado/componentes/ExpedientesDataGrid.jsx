import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Global } from '../../helpers/Global';
import Peticiones from '../../helpers/Peticiones';
import { formatearFecha, fechaReves } from '../../helpers/funcionesVarias';
import { Container, Paper, TextField, Box, Button } from '@mui/material';
import RestartAlt from '@mui/icons-material/RestartAlt';
import { PropTypes } from "prop-types";
   

const ExpedientesDataGrid = ({ onSelectExpediente, isEditing, setIsEditing, seleccionado, setSeleccionado, pases, setPases }) => {
    const [expedientes, setExpedientes] = useState([]);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [totalExpedientes, setTotalExpedientes] = useState(0);

    const fetchExpedientes = async (page, pageSize) => {
        /* le mando "Abierto", que no es un estado, pero que en el servidor interpreto como todos los estadoExp que no sean "Finalizado" */
        const url = `${Global.url}/expedientes/estadoExp/Abierto?desde=${page * pageSize}&limite=${pageSize}`;
        try {
            const metodo = 'GET';
            let response = await Peticiones(url, metodo);

            setExpedientes(response.datos.expedientes);
            setTotalExpedientes(response.datos.total);

        }
        catch (error) {
            console.error("Hubo un error al obtener los expedientes:", error);
        }

    }

    useEffect(() => {
        fetchExpedientes(page, pageSize);

    }, [page, pageSize]);

    useEffect(() => {
        if (isEditing == true) {
            console.log("isEditing dataGrid cuando cambia", isEditing)
            fetchExpedientes(page, pageSize);
            setIsEditing(false);
        }
    }, [isEditing]);

    const columns = [
        { field: 'fechaIngreso', headerName: 'Fecha ing.', width: 100 },
        { field: 'legajo', headerName: 'Legajo', width: 100 },
        { field: 'folios', headerName: 'Folios', width: 50 },
        { field: 'motivo', headerName: 'Motivo', width: 230 },

        { field: 'solicitante', headerName: 'Solicitante', width: 160 },
        { field: 'apellido', headerName: 'Apellido', width: 130 },
        { field: 'nombres', headerName: 'Nombres', width: 130 },
        { field: 'comentario', headerName: 'Comentarios', width: 130 },
        { field: 'dni', headerName: 'DNI', width: 130 },
        { field: 'celular', headerName: 'Celular', width: 130 },
        { field: 'domicilio', headerName: 'Domicilio', width: 130 },
        { field: 'id', headerName: 'Id', width: 130 },
        { field: 'categoria', headerName: 'Categoría', width: 130 },
    ];

    const rows = expedientes.map((expediente) => ({

        fechaIngreso: fechaReves(formatearFecha(new Date(expediente.fechaIngreso))),
        legajo: expediente.legajo,
        folios: expediente.folios,
        motivo: expediente.motivo,
        solicitante: expediente.solicitante,
        apellido: expediente.apellido,
        nombres: expediente.nombres,
        comentario: expediente.comentario,
        dni: expediente.dni,
        celular: expediente.celular,
        domicilio: expediente.domicilio,
        id: expediente._id,
        categoria: expediente.categoria,
        pases: expediente.pases,
        estadoExp: expediente.estadoExp,
        
    }));

    const handleRowClick = ({ row }) => {

        let expediente = row;
        expediente._id=row.id;
        expediente.pases.usuario_pase_nombre=row.pases.usuario_pase_nombre;
        expediente.comentario = (expediente.comentario == null) ? " " : row.comentario;
        expediente.domicilio = expediente.domicilio == null ? " " : row.domicilio;
        const fechaISO = expediente.fechaIngreso.split('/').reverse().join('-');
        expediente.fechaIngreso = fechaISO;
        console.log(expediente,"expediente de handleRowClick")
        onSelectExpediente(expediente);
        setSeleccionado(false);
       /*  const pasesOrdenados = [...expediente.pases].sort((a, b) => new Date(a.fecha_pase) - new Date(b.fecha_pase)); */
       /*  setPases(pasesOrdenados); */
    };

    const [searchTerm, setSearchTerm] = useState('');

    // Manejador para actualizar el estado cuando cambia el campo de búsqueda
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };
    // Filtrar las filas en función del término de búsqueda
    const filteredRows = rows.filter((row) => {
        return Object.values(row).some((value) => {
            if (value === null || value === undefined) {
                return false;
            }
            return value.toString().toLowerCase().includes(searchTerm.toLowerCase());
        });
    });



    return (
        <Container component={Paper} sx={{ padding: 2, border: 1, borderColor: 'blue' }}>
            <h3 sx={{ width: '500px' }}>Lista de Expedientes en estudio {totalExpedientes}  </h3>

            <Box sx={{
                ml: '10px',
                mb: '10px',

            }} >
                <TextField label="Buscar" value={searchTerm} onChange={handleSearchChange} sx={{ backgroundColor: 'amarillo.secondary' }} />
                <Button size="large" startIcon={<RestartAlt />} onClick={() => fetchExpedientes(page, pageSize)} sx={{ ml: '400px' }}>Refresca</Button>
            </Box>

            <DataGrid
                rows={filteredRows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 10,
                            page: 0
                        },
                    },
                }}
                rowCount={totalExpedientes}

                pageSize={pageSize}
                paginationMode="client"
                page={page}
                pageSizeOptions={[5, 10, 25, 50, 100]} // incluyendo 10 en las opciones
                onPageChange={(params) => {
                    // Actualizar el estado con los nuevos valores de página y tamaño de página
                
                    setPage(params.page);
                    setPageSize(params.pageSize);
                }}
                onRowClick={handleRowClick}
                slots={{
                    Toolbar: GridToolbar,
                }}

            />
        </Container>
    );
}
export default ExpedientesDataGrid

ExpedientesDataGrid.propTypes = {

    onSelectExpediente: PropTypes.func,
    isEditing: PropTypes.bool,
    setIsEditing: PropTypes.func,
    seleccionado: PropTypes.bool,
    setSeleccionado: PropTypes.func,
    pases: PropTypes.array,
    setPases: PropTypes.func

};

