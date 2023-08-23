import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Global } from '../../helpers/Global';
import Peticiones from '../../helpers/Peticiones';
import { formatearFecha,fechaReves } from '../../helpers/funcionesVarias';
import { Container,Paper, TextField,Box ,Button} from '@mui/material';
import RestartAlt from '@mui/icons-material/RestartAlt';



const  ExpedientesDataGrid=({ onSelectExpediente }) =>{
    const [expedientes, setExpedientes] = useState([]);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [totalExpedientes, setTotalExpedientes] = useState(0);

    const fetchExpedientes = async(page, pageSize) => {

      const url = `${Global.url}/expedientes/estadoExp/Estudio?desde=${page * pageSize}&limite=${pageSize}`;
    try {
       const metodo = 'GET';
       let  response= await Peticiones(url, metodo);
         console.log("response del fetch",response);
        setExpedientes(response.datos.expedientes);
        setTotalExpedientes(response.datos.total); 
        console.log(totalExpedientes ,"total expedientes");
       }
       catch (error)  {
        console.error("Hubo un error al obtener los expedientes:", error);
      }   
    
}
 
     useEffect(() => {
      fetchExpedientes(page, pageSize);
       }, [page, pageSize]);  

  const columns = [
    { field: 'fechaIngreso', headerName: 'Fecha ing.', width: 100 },
    { field: 'legajo', headerName: 'Legajo', width: 100 },
    { field: 'folios', headerName: 'Folios', width: 100 },
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
    folios:expediente.folios,
    motivo: expediente.motivo,
    solicitante: expediente.solicitante,
    apellido: expediente.apellido,
    nombres:expediente.nombres,
    comentario:expediente.comentario,
    dni:expediente.dni,
    celular:expediente.celular,
    domicilio:expediente.domicilio,
    id: expediente._id,
    categoria: expediente.categoria,
  }));
  
  const handleRowClick = ({row}, event) => {

     let expediente=row;
     expediente.comentario=(expediente.comentario==null)?" ":row.comentario;
     expediente.domicilio=expediente.domicilio==null?" ":row.domicilio;
     const fechaISO = expediente.fechaIngreso.split('/').reverse().join('-');
     expediente.fechaIngreso=fechaISO;
     onSelectExpediente(expediente);

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
      <h3 sx={{width:'500px'}}>Lista de Expedientes en estudio {totalExpedientes} </h3>
     
      <Box  sx={{
        margin:'10px',
         
      }} >
      <TextField label="Buscar" value={searchTerm} onChange={handleSearchChange}  sx={{backgroundColor:'amarillo.secondary'}}/>
      <Button size="large" startIcon ={<RestartAlt/>} onClick={ ()=> fetchExpedientes(page, pageSize)} sx={{ml:'400px'}}>Refresca</Button>  
      </Box>
     
      <DataGrid
        rows={filteredRows}  
        columns={columns}
        initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
                page:0
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
            console.log(params,"parametros del onPageChange")
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
 

 
