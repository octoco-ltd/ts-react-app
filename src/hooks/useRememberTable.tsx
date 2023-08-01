import { GridFilterModel, GridPaginationModel } from '@mui/x-data-grid';
import { useState } from 'react';

/**
 * Used to handle pagination and filter of MUI table.
 * It sets the pagination and filter model within the params of the url (should maybe make this a boolean to choose if url needs to be used)
 *
 * @param initialFormValues Used to check of the form has changed, if not, it should not ask confirmation
 * @returns Pagination and Filter model
 * @returns Pagination and Filter model state update method
 */
export default function useRememberTable() {
    //TODO: Pagination model should typically be handled by query params in the url
    //TODO: Add filter model
    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
        page: 0,
        pageSize: 10,
    });

    const [filterModel, setFilterModel] = useState<GridFilterModel>({
        items: [],
        logicOperator: undefined,
        quickFilterValues: [],
        quickFilterLogicOperator: undefined,
    });

    return {
        paginationModel,
        setPaginationModel,
        filterModel,
        setFilterModel
    };
}