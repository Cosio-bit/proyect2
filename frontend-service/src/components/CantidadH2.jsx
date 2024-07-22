import { useState, useEffect } from 'react';
import httpClient from '../http-common';

const CantidadH2 = ({ tipoReparacion, mes }) => {
    const [cantidad, setCantidad] = useState(null);

    const fetchData = async () => {
        const response = await httpClient.getCantidadTipoReparacionYMes(tipoReparacion, mes);
        setCantidad(response.data);
    };

    useEffect(() => {
        fetchData();
    }, [tipoReparacion, mes]);

    return (
        <td>
            {cantidad !== null ? cantidad : 'Loading...'}
        </td>
    );
};

export default CantidadH2;
