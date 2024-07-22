import { useState } from 'react';
import httpClient from '../http-common';

const ReparacionYVehiculo = () => {
    const [id, setId] = useState('');
    const [data, setData] = useState(null);

    const fetchData = async () => {
        const response = await httpClient.getReparacionYVehiculo(id);
        setData(response.data);
    };

    return (
        <div>
            <h3>Reparacion y Vehiculo</h3>
            <input
                type="text"
                placeholder="ID"
                value={id}
                onChange={(e) => setId(e.target.value)}
            />
            <button onClick={fetchData}>Fetch Data</button>
            {data !== null && (
                <div>
                    <p>Reparacion: {JSON.stringify(data[0])}</p>
                    <p>Vehiculo: {JSON.stringify(data[1])}</p>
                </div>
            )}
        </div>
    );
};

export default ReparacionYVehiculo;
