import httpClient from "../http-common";

// Reparaciones endpoints
const getAll = () => {
    return httpClient.get('/api/v1/reparaciones/');
}

const create = data => {
    return httpClient.post('/api/v1/reparaciones/crearReparacion', data);
}

const getFromVehiculo = idVehiculo => {
    return httpClient.get(`/api/v1/reparaciones/${idVehiculo}`);
}

const get = id => {
    return httpClient.get(`/api/v1/reparaciones/reparacion/${id}`);
}

const getByMarca = marca => {
    return httpClient.get(`/api/v1/reparaciones/marca/${marca}`);
}

const getByTipoMotor = tipoMotor => {
    return httpClient.get(`/api/v1/reparaciones/tipoMotor/${tipoMotor}`);
}

const getByTipoVehiculo = tipoVehiculo => {
    return httpClient.get(`/api/v1/reparaciones/tipoVehiculo/${tipoVehiculo}`);
}

const updateMonto = data => {
    return httpClient.put('/api/v1/reparaciones/reparacion/monto', data);
}

const update = data => {
    return httpClient.put('/api/v1/reparaciones/reparacion', data);
}

const remove = id => {
    return httpClient.delete(`/api/v1/reparaciones/reparacion/${id}`);
}

const cantidadH1 = (tipoVehiculo, tipoReparacion) => {
    return httpClient.get(`/api/v1/reparaciones/tipoVehiculo/${tipoVehiculo}/${tipoReparacion}`);
}

const montoH1 = (tipoVehiculo, tipoReparacion) => {
    return httpClient.get(`/api/v1/reparaciones/tipoVehiculo/${tipoVehiculo}/${tipoReparacion}/monto`);
}

const cantidadH2 = (tipoReparacion, mes) => {
    return httpClient.get(`/api/v1/reparaciones/tipoReparacion/${tipoReparacion}/${mes}`);
}

const porcentajeH2 = (tipoReparacion, mes) => {
    return httpClient.get(`/api/v1/reparaciones/tipoReparacion/${tipoReparacion}/${mes}/porcentaje`);
}

const h3 = id => {
    return httpClient.get(`/api/v1/reparaciones/reparacion/vehiculo/${id}`);
}

// Export all functions
export default {
    getAll,
    create,
    getFromVehiculo,
    get,
    getByMarca,
    getByTipoMotor,
    getByTipoVehiculo,
    updateMonto,
    update,
    remove,
    cantidadH1,
    montoH1,
    cantidadH2,
    porcentajeH2,
    h3
};
