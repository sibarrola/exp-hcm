import React, { useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'Nombre', headerName: 'Nombre', width: 130 },
  { field: 'Apellido', headerName: 'Apellido', width: 130 },
  { field: 'DNI', headerName: 'DNI', width: 130 },
  { field: 'Expediente', headerName: 'Expediente', type: 'number', width: 90 }
];

const rows = [
  { id: 1, Nombre: 'Florencia', Apellido: 'Gómez', DNI:'13.589.028', Expediente: 35 },
  { id: 2, Nombre: 'Pedro', Apellido: 'Gonzales',DNI:'6.458.253', Expediente: 28 },
  { id: 3, Nombre: 'Maria', Apellido: 'Puentes',DNI:'11.342.121', Expediente: 42 },
  // Agrega más filas si lo deseas
];

const MyDataGrid = () => {
  const [selectedRow, setSelectedRow] = useState(null);

  const handleRowSelected = (params) => {
    const selectedRowData = params.data;
    setSelectedRow(selectedRowData);
    // Aquí puedes realizar otra acción con los datos de la línea seleccionada
     console.log(params)
  };

  return (
    <div style={{ height: 400, width: '50%' }}>
      <DataGrid  
        rows={rows}
        columns={columns}
        pageSize={5}
        onRowSelected={handleRowSelected}
        slots={{
          Toolbar: GridToolbar,
        }}
        slotPropsProps={{
          Toolbar: {
            style: { backgroundColor: 'blue', color: 'white' },
          },
        }}
      />
      {selectedRow && (
        <div>
          Línea seleccionada: {selectedRow.id} - {selectedRow.firstName} {selectedRow.lastName}
        </div>
      )}
    </div>
  );
};

export default MyDataGrid;
