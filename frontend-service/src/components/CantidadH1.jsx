import { useState, useEffect } from 'react';
import httpClient from '../http-common';

const CantidadH1 = ({ tipoVehiculo, tipoReparacion }) => {
    const [cantidad, setCantidad] = useState(null);

    const fetchData = async () => {
        const response = await httpClient.getCantidadTipoVehiculoYReparacion(tipoVehiculo, tipoReparacion);
        setCantidad(response.data);
    };

    useEffect(() => {
        fetchData();
    }, [tipoVehiculo, tipoReparacion]);

    return (
        <td>
            {cantidad !== null ? cantidad : 'Loading...'}
        </td>
    );
};

export default CantidadH1;
