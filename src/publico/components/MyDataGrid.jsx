import React, { useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First Name', width: 130 },
  { field: 'lastName', headerName: 'Last Name', width: 130 },
  { field: 'age', headerName: 'Age', type: 'number', width: 90 },
];

const rows = [
  { id: 1, firstName: 'John', lastName: 'Doe', age: 35 },
  { id: 2, firstName: 'Jane', lastName: 'Smith', age: 28 },
  { id: 3, firstName: 'Bob', lastName: 'Johnson', age: 42 },
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
    <div style={{ height: 400, width: '70%' }}>
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
