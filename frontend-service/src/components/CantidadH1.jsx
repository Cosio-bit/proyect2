import { useState } from 'react';
import httpClient from '../http-common';

const CantidadH1 = () => {
    const [tipoVehiculo, setTipoVehiculo] = useState('');
    const [tipoReparacion, setTipoReparacion] = useState('');
    const [cantidad, setCantidad] = useState(null);

    const fetchData = async () => {
        const response = await httpClient.getCantidadTipoVehiculoYReparacion(tipoVehiculo, tipoReparacion);
        setCantidad(response.data);
    };

    return (
        <div>
            <h3>Cantidad Tipo Vehiculo y Reparacion</h3>
            <input
                type="text"
                placeholder="Tipo Vehiculo"
                value={tipoVehiculo}
                onChange={(e) => setTipoVehiculo(e.target.value)}
            />
            <input
                type="text"
                placeholder="Tipo Reparacion"
                value={tipoReparacion}
                onChange={(e) => setTipoReparacion(e.target.value)}
            />
            <button onClick={fetchData}>Fetch Data</button>
            {cantidad !== null && <p>Cantidad: {cantidad}</p>}
        </div>
    );
};

export default CantidadH1;
