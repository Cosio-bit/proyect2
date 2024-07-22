import CantidadH1 from './CantidadH1';

const tiposVehiculo = ['sedan', 'hatchback', 'suv'];
const tiposReparacion = Array.from({ length: 13 }, (_, i) => i + 1);

const H1 = () => {
    return (
        <table border="1">
            <thead>
                <tr>
                    <th>Tipo Vehiculo \ Tipo Reparacion</th>
                    {tiposReparacion.map((reparacion) => (
                        <th key={reparacion}>{reparacion}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {tiposVehiculo.map((vehiculo) => (
                    <tr key={vehiculo}>
                        <td>{vehiculo}</td>
                        {tiposReparacion.map((reparacion) => (
                            <CantidadH1 
                                key={`${vehiculo}-${reparacion}`} 
                                tipoVehiculo={vehiculo} 
                                tipoReparacion={reparacion} 
                            />
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default H1;
