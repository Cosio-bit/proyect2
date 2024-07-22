import { useState } from 'react';
import httpClient from '../http-common';

const PorcentajeH2 = () => {
    const [tipoReparacion, setTipoReparacion] = useState('');
    const [mes, setMes] = useState('');
    const [porcentaje, setPorcentaje] = useState(null);

    const fetchData = async () => {
        const response = await httpClient.getPorcentajeTipoReparacionYMes(tipoReparacion, mes);
        setPorcentaje(response.data);
    };

    return (
        <div>
            <h3>Porcentaje Tipo Reparacion y Mes</h3>
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
            {porcentaje !== null && <p>Porcentaje: {porcentaje.join(", ")}</p>}
        </div>
    );
};

export default PorcentajeH2;
