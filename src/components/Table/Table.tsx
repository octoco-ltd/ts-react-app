import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridPaginationModel, GridRowsProp } from '@mui/x-data-grid';
import { TableToolbar } from './components/TableToolbar';
import { FC, ReactElement, useState } from 'react';

interface TableProps {
    rows: GridRowsProp,
    columns: GridColDef[],
    pageSizeOptions: number[],
    loading: boolean,
    refetch: ()=> void,
    isFetching: boolean,
    paginationModel: GridPaginationModel, 
    setPaginationModel: (paginationModel: GridPaginationModel)=>void,
    totalRows: number,
}

export function Table({
    rows, 
    columns, 
    pageSizeOptions, 
    loading, 
    refetch, 
    isFetching,
    paginationModel, 
    setPaginationModel,
    totalRows
}: TableProps) {

  return (
      <DataGrid
        density="compact"
        components={{
            Toolbar: TableToolbar,
        }}
        componentsProps={{
            toolbar: { refetch: refetch, isFetching: isFetching },
        }}
        rows={rows}
        columns={columns}
        pagination={true}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        paginationMode='server'
        pageSizeOptions={pageSizeOptions}
        checkboxSelection
        disableRowSelectionOnClick
        loading={loading || isFetching}
        rowCount={totalRows}
      />
  );
}

export default Table;