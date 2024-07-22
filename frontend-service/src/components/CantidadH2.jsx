import { useState, useEffect } from 'react';
import httpClient from '../http-common';
import reparacionService from '../services/reparacion.service';

const CantidadH2 = ({ tipoReparacion, mes }) => {
    const [cantidad, setCantidad] = useState(null);

   
    const fetchData = async () => {
        try {
            const response = await reparacionService.cantidadH2(tipoReparacion, mes);
            setCantidad(response.data);
        } catch (error) {
            console.error(`Error fetching data for ${tipoReparacion} and ${mes}:`, error);
            setCantidad('Error');
        }
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
