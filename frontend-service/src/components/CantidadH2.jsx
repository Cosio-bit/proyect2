import { useState } from 'react';
import httpClient from '../http-common';

const CantidadH2 = () => {
    const [tipoReparacion, setTipoReparacion] = useState('');
    const [mes, setMes] = useState('');
    const [cantidad, setCantidad] = useState(null);

    const fetchData = async () => {
        const response = await httpClient.getCantidadTipoReparacionYMes(tipoReparacion, mes);
        setCantidad(response.data);
    };

    return (
        <div>
            <h3>Cantidad Tipo Reparacion y Mes</h3>
            <input
                type="text"
                placeholder="Tipo Reparacion"
                value={tipoReparacion}
                onChange={(e) => setTipoReparacion(e.target.value)}
            />
            <input
                type="text"
                placeholder="Mes"
                value={mes}
                onChange={(e) => setMes(e.target.value)}
            />
            <button onClick={fetchData}>Fetch Data</button>
            {cantidad !== null && <p>Cantidad: {cantidad}</p>}
        </div>
    );
};

export default CantidadH2;
