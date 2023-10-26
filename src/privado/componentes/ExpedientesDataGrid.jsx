import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Global } from '../../helpers/Global';
import Peticiones from '../../helpers/Peticiones';
import { formatearFecha, fechaReves } from '../../helpers/funcionesVarias';
import { Container, Paper, TextField, Box, Button, Fab } from '@mui/material';
import RestartAlt from '@mui/icons-material/RestartAlt';
import { PropTypes } from "prop-types";

const ExpedientesDataGrid = ({ handleExpedienteSelected, isEditing, setIsEditing, seleccionado, setSeleccionado, pases, setPases }) => {
    const [expedientes, setExpedientes] = useState([]);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [totalExpedientes, setTotalExpedientes] = useState(0);
    const [estadoExp, setEstadoExp] = useState('Abierto');
    const [titulo, setTitulo] = useState('Listado de Expedientes en Tratamiento');
   
    const fetchExpedientes = async (page, pageSize) => {
        /* le mando "Abierto", que no es un estado, pero que en el servidor interpreto como todos los estadoExp que no sean "Finalizado" */
        const url = `${Global.url}/expedientes/estadoExp/` + `${estadoExp}` + `?desde=${page * pageSize}&limite=${pageSize}`;

        try {
            const metodo = 'GET';
            let response = await Peticiones(url, metodo);
            setExpedientes(response.datos.expedientes);
            setTotalExpedientes(response.datos.total);
        }
        catch (error) {
            console.error("Hubo un error al leer expedientes:", error);
        }
    }

    useEffect(() => {
        fetchExpedientes(page, pageSize);
    }, [page, pageSize]);

    useEffect(() => {
        fetchExpedientes(page, pageSize);
        switch (estadoExp) {
            case 'Abierto':
                setTitulo("Listado de Expedientes en Tratamiento");
                break;

            case 'Notificado':
                setTitulo("Listado de Expedientes Aprobados y Notificados");
                break;
            case 'Archivado':
                setTitulo("Listado de Expedientes Archivados");
                break;

        }

    }, [estadoExp]);

    useEffect(() => {
        if (!!isEditing == true) {
            console.log("isEditing dataGrid cuando cambia", isEditing)
             fetchExpedientes(page, pageSize);
           
        }
        setIsEditing(false);
    }, [isEditing]);



    const columns = [
        { field: 'fechaIngreso', headerName: 'Fecha ing.', width: 100 },
        { field: 'legajo', headerName: 'Legajo', width: 70 },
        { field: 'folios', headerName: 'Folios', width: 50 },
        { field: 'motivo', headerName: 'Motivo', width: 270 },
        { field: 'comentario', headerName: 'Comentarios', width: 200 },
        { field: 'solicitante', headerName: 'Solicitante', width: 200 },
     
        { field: 'dni', headerName: 'DNI', width: 130 },
        { field: 'apellido', headerName: 'Apellido', width: 130 },
        { field: 'nombres', headerName: 'Nombres', width: 130 },
       

        { field: 'celular', headerName: 'Celular', width: 130 },
        { field: 'domicilio', headerName: 'Domicilio', width: 130 },
        /*   { field: 'id', headerName: 'Id', width: 130 }, */
        /*  { field: 'categoria', headerName: 'Categoría', width: 100 }, */
    ];

    const rows = expedientes.map((expediente) => ({
        fechaIngreso: fechaReves(formatearFecha(new Date(expediente.fechaIngreso))),
        legajo: expediente.legajo,
        folios: expediente.folios,
        motivo: expediente.motivo,
        comentario: expediente.comentario,
        solicitante: expediente.solicitante,
        dni: expediente.dni,
        apellido: expediente.apellido,
        nombres: expediente.nombres,
       
        celular: expediente.celular,
        domicilio: expediente.domicilio,
        id: expediente._id,
        categoria: expediente.categoria,
        sancion:expediente.sancion,
        pases: expediente.pases,
        estadoExp: expediente.estadoExp,
    }));

    const handleRowClick = ({ row }) => {
        let expediente = row;
        expediente._id = row.id;
        expediente.pases.usuario_pase_nombre = row.pases.usuario_pase_nombre;
        expediente.comentario = (expediente.comentario == null) ? " " : row.comentario;
        expediente.domicilio = expediente.domicilio == null ? " " : row.domicilio;
        const fechaISO = expediente.fechaIngreso.split('/').reverse().join('-');
        expediente.fechaIngreso = fechaISO;
 
        handleExpedienteSelected(expediente); 
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
        <Box
        component={Paper}
         sx={{
             m: '2px' ,  // Margen general (todos los lados)
             paddingLeft:{xs:'2px',md:'30px'},
             paddingRight:{xs:'2px',md:'30px'},
             mt: {xs:'60px', md:'9px'},
             border: 1,
             borderColor: 'blue',
             boxShadow: 2
         }}
     >
            <h3 style={{ width: '90%', textAlign: 'center' }}>{titulo} - (total: {totalExpedientes})  </h3>
            {/* ----------------------- */}
            <div style={{ paddingTop: '0px', paddingRight: '20px', textAlign: 'end' }} >

                {(estadoExp != 'Notificado') && <Button color="primary" aria-label="edit" variant='contained' onClick={() => { setEstadoExp('Notificado') }} sx={{ marginRight: '10px' }} size='small'>
                    Finalizados
                </Button>}
                {(estadoExp != 'Archivado') && <Button color="secondary" aria-label="edit" variant='contained' onClick={() => { setEstadoExp('Archivado') }} sx={{ marginRight: '10px' }} size='small'>
                    Archivados
                </Button>}
                {(estadoExp != 'Abierto') && <Button color="primary" aria-label="edit" variant='contained' onClick={() => { setEstadoExp('Abierto') }} sx={{ marginRight: '10px' }} size='small'>
                    En tratamiento
                </Button>}
            </div>

            {/* ------------------- */}
            <Box sx={{
                ml: '10px',
                mb: '10px',

            }} >
                <TextField label="Buscar" value={searchTerm} onChange={handleSearchChange} sx={{ backgroundColor: 'amarillo.secondary', fontSize: '10px' }} />
                {/* 
                <Button size="large" startIcon={<RestartAlt />} onClick={() => fetchExpedientes(page, pageSize)} sx={{ ml: '400px' }}>Refresca</Button> */}
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
        </Box>
    );
}
export default ExpedientesDataGrid

ExpedientesDataGrid.propTypes = {

    handleExpedienteSelected: PropTypes.func,
    isEditing: PropTypes.bool,
    setIsEditing: PropTypes.func,
    seleccionado: PropTypes.bool,
    setSeleccionado: PropTypes.func,
    pases: PropTypes.array,
    setPases: PropTypes.func

};