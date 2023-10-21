import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Global } from '../../helpers/Global';
import Peticiones from '../../helpers/Peticiones';
import { formatearFecha, fechaReves, calculaDias } from '../../helpers/funcionesVarias';
import { Container, Paper, TextField, Box, Button, Fab } from '@mui/material';

import { PropTypes } from "prop-types";
 
// data grid
 
const InformeEstacion = ({ handleExpedienteSelected, isEditing, setIsEditing, seleccionado, setSeleccionado, pases, setPases }) => {
    const [expedientes, setExpedientes] = useState([]);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [totalExpedientes, setTotalExpedientes] = useState(0);
    const [estadoExp, setEstadoExp] = useState('Abierto');
 


    const [titulo, setTitulo] = useState('Listado de Expedientes en Tratamiento - Estación actual');

    const fetchExpedientes = async (page, pageSize) => {
      
        const url = `${Global.url}/expedientes/porestacion/1`;

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
    }, []);
    useEffect(() => {
        if (!!isEditing == true) {
            console.log("isEditing dataGrid cuando cambia", isEditing)
             fetchExpedientes(page, pageSize);
           
        }
        setIsEditing(false);
    }, [isEditing]);

    useEffect(() => {
        fetchExpedientes(page, pageSize);
        switch (estadoExp) {
            case 'Abierto':
                setTitulo("Estación Actual de expedientes en Tratamiento");
                break;

            case 'Notificado':
                setTitulo("Listado de Expedientes Aprobados y Notificados");
                break;
            case 'Archivado':
                setTitulo("Listado de Expedientes Archivados");
                break;

        }

    }, [estadoExp]);
 


    const columns = [

        {field: 'estacion', headerName: 'Estación', width: 180 },
        {field:'fecha_pase', headerName: 'Fecha pase', width: 100 },
        {field:'dias', headerName: 'Dias', width: 70 },
        { field: 'legajo', headerName: 'Exp.N°', width: 70 },
       
        { field: 'motivo', headerName: 'Motivo', width: 200 },
       

        { field: 'solicitante', headerName: 'Solicitante', width: 200 },
      /*   { field: 'dni', headerName: 'DNI', width: 130 }, */
        { field: 'responsable', headerName: 'Responsable', width: 200 },
    /*     { field: 'nombres', headerName: 'Nombres', width: 100 }, */
       /*  { field: 'comentario', headerName: 'Comentarios', width: 130 }, */

       /*  { field: 'celular', headerName: 'Celular', width: 130 }, */
     /*    { field: 'domicilio', headerName: 'Domicilio', width: 130 },  */ 
        /*   { field: 'id', headerName: 'Id', width: 130 },  */ 
        /*  { field: 'categoria', headerName: 'Categoría', width: 100 }, */
    ];

    const rows = expedientes.map((expediente) => ({
         
        fecha_pase: fechaReves(formatearFecha(new Date(expediente.fecha_pase))),
        estacion:expediente.estacion,
        dias:calculaDias(new Date(expediente.fecha_pase)),
        legajo: expediente.legajo,
        
        motivo: expediente.motivo,
        solicitante: expediente.solicitante,
        
        responsable: expediente.apellido+" "+expediente.nombres,
        /* nombres: expediente.nombres, */
        /* comentario: expediente.comentario,
        celular: expediente.celular,
        domicilio: expediente.domicilio, */
         id: expediente._id,
       /* categoria: expediente.categoria,
        sancion:expediente.sancion,
        pases: expediente.pases,
        estadoExp: expediente.estadoExp, */
    }));


    const handleRowClick = async ({ row }) => {
        const url = `${Global.url}/expedientes/${row.id}`;
        try {
            const metodo = 'GET';
            let respuesta = await Peticiones(url, metodo);
            console.log("respuesta",respuesta);
            let expediente=respuesta.datos.expediente;
            console.log("expediente elegido",expediente);
            /* expediente.comentario = (expediente.comentario == null) ? " " : row.comentario;
            expediente.domicilio = expediente.domicilio == null ? " " : row.domicilio; */
            const fechaISO = expediente.fechaIngreso.split('/').reverse().join('-');
            expediente.fechaIngreso = fechaISO;
           
            handleExpedienteSelected(expediente); 
            setSeleccionado(false);
        }
        catch (error) {
            console.error("Hubo un error al leer expedientes:", error);
        }
    }
         


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
        <Box component={Paper} sx={{ paddingLeft: 5, paddingRight: 5, border: 1, borderColor: 'blue', margin: '5px', boxShadow: "2" }}>
            <h3 style={{ width: '90%', textAlign: 'center' }}>{titulo} - (total: {totalExpedientes})  </h3>
            {/* ----------------------- */}
           

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
                sx={{fontSize:'14px'}}
            />
        </Box>
    );
}
export default InformeEstacion;

InformeEstacion.propTypes = {

    handleExpedienteSelected: PropTypes.func,
    isEditing: PropTypes.bool,
    setIsEditing: PropTypes.func,
    seleccionado: PropTypes.bool,
    setSeleccionado: PropTypes.func,
    pases: PropTypes.array,
    setPases: PropTypes.func

};