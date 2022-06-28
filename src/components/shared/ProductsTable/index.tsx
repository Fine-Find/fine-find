import { RequestedProductsTable } from '@/types/RequestedProducts';
import EyeIcon from '@material-ui/icons/RemoveRedEye';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import moment from 'moment';
import Link from 'next/link';
import React from 'react';

const format = 'DD-MM-yyyy';
const columns: GridColDef[] = [
  {
    field: 'no',
    headerName: 'No',
    width: 90,
  },
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
    field: 'vendorContactInfo',
    headerName: 'Vendor Contact',
    width: 210,
  },

  {
    field: 'requestedOn',
    headerName: 'Request Date',
    sortable: false,
    width: 160,
    renderCell: (params: GridValueGetterParams) => {
      return <>{moment(params.row.requestedOn).format(format)}</>;
    },
  },
  {
    field: 'lastUpdated',
    headerName: 'Last Updated',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 110,
    renderCell: (params: GridValueGetterParams) => {
      return <>{moment(params.row.requestedOn).format(format)}</>;
    },
  },
  {
    field: 'description',
    headerName: 'Description',
    width: 350,
  },
  {
    headerName: 'Actions',
    field: 'actions',
    renderCell: (params: GridValueGetterParams) => {
      return (
        <>
          <div>
            <Link href={`requests/${params.row.id}`}>
              <EyeIcon color="primary" />
            </Link>
          </div>
        </>
      );
    },
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
