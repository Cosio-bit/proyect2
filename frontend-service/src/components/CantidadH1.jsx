import { useState, useEffect } from 'react';
import reparacionService from '../services/reparacion.service';
import TableCell from '@mui/material/TableCell';

const CantidadH1 = ({ tipoVehiculo, tipoReparacion }) => {
    const [cantidad, setCantidad] = useState(null);

    const fetchData = async () => {
        try {
            const response = await reparacionService.cantidadH1(tipoVehiculo, tipoReparacion);
            setCantidad(response.data);
        } catch (error) {
            console.error(`Error fetching data for ${tipoVehiculo} and ${tipoReparacion}:`, error);
            setCantidad('Error');
        }
    };

    useEffect(() => {
        fetchData();
    }, [tipoVehiculo, tipoReparacion]);

    return (
        <TableCell align="right">
            {cantidad !== null ? cantidad : 'Loading...'}
        </TableCell>
    );
};

export default CantidadH1;
