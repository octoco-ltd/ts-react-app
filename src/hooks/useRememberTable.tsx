import { useState, useEffect } from 'react';

export default function useRememberTable() {
    //TODO: Pagination modal should typically be handled by query params in the url
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    });

    return {
        paginationModel,
        setPaginationModel
    };
}