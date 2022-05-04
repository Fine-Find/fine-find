import { RequestedProductsTable } from '@/types/RequestedProducts';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import React from 'react';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'No', width: 90 },
  {
    field: 'productName',
    headerName: 'Product Name',
    width: 170,
  },
  {
    field: 'productType',
    headerName: 'Product Type',
    width: 190,
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 150,
  },
  {
    field: 'vendor',
    headerName: 'Vendor',
    width: 110,
  },
  {
    field: 'vendorContact',
    headerName: 'Vendor Contact',
    width: 210,
  },

  {
    field: 'requestedOn',
    headerName: 'Request Date',
    sortable: false,
    width: 160,
    valueGetter: () => `${new Date().toLocaleDateString()}`,
  },
  {
    field: 'lastUpdated',
    headerName: 'Last Updated',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 110,
    valueGetter: (params: GridValueGetterParams) =>
      ` ${params.getValue(params.id, 'status') || ''}`,
  },
  {
    field: 'description',
    headerName: 'Description',
    width: 350,
  },
];

type ProductsTableProps = {
  row?: RequestedProductsTable[];
};
export const ProductsTable = ({ row }: ProductsTableProps) => {
  return (
    <div style={{ height: 650, width: '100%' }}>
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[8]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
};
