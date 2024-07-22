import { useState } from 'react';
import CantidadH2 from './CantidadH2';

const tiposReparacion = Array.from({ length: 13 }, (_, i) => i + 1);
const meses = [
    { nombre: 'Enero', valor: '01' },
    { nombre: 'Febrero', valor: '02' },
    { nombre: 'Marzo', valor: '03' },
    { nombre: 'Abril', valor: '04' },
    { nombre: 'Mayo', valor: '05' },
    { nombre: 'Junio', valor: '06' },
    { nombre: 'Julio', valor: '07' },
    { nombre: 'Agosto', valor: '08' },
    { nombre: 'Septiembre', valor: '09' },
    { nombre: 'Octubre', valor: '10' },
    { nombre: 'Noviembre', valor: '11' },
    { nombre: 'Diciembre', valor: '12' },
];

const H2 = () => {
    const [mesSeleccionado, setMesSeleccionado] = useState(meses[0].valor);

    const handleChangeMes = (event) => {
        setMesSeleccionado(event.target.value);
    };

    return (
        <div>
            <h3>Cantidad de Reparaciones por Mes</h3>
            <label>
                Selecciona el mes:
                <select value={mesSeleccionado} onChange={handleChangeMes}>
                    {meses.map((mes) => (
                        <option key={mes.valor} value={mes.valor}>
                            {mes.nombre}
                        </option>
                    ))}
                </select>
            </label>
            <table border="1">
                <thead>
                    <tr>
                        <th>Tipo Reparacion \ Mes</th>
                        <th>{meses.find(m => m.valor === mesSeleccionado)?.nombre}</th>
                    </tr>
                </thead>
                <tbody>
                    {tiposReparacion.map((reparacion) => (
                        <tr key={reparacion}>
                            <td>{reparacion}</td>
                            <CantidadH2 
                                key={`${reparacion}-${mesSeleccionado}`} 
                                tipoReparacion={reparacion} 
                                mes={mesSeleccionado} 
                            />
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default H2;
