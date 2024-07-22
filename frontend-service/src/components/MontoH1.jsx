import { useState } from 'react';
import httpClient from '../http-common';

const MontoH1 = () => {
    const [tipoVehiculo, setTipoVehiculo] = useState('');
    const [tipoReparacion, setTipoReparacion] = useState('');
    const [monto, setMonto] = useState(null);

    const fetchData = async () => {
        const response = await httpClient.getMontoTipoVehiculoYReparacion(tipoVehiculo, tipoReparacion);
        setMonto(response.data);
    };

    return (
        <div>
            <h3>Monto Tipo Vehiculo y Reparacion</h3>
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
            {monto !== null && <p>Monto: {monto}</p>}
        </div>
    );
};

export default MontoH1;
