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

const getCantidadTipoVehiculoYReparacion = (tipoVehiculo, tipoReparacion) => {
    return httpClient.get(`/api/v1/reparaciones/tipoVehiculo/${tipoVehiculo}/${tipoReparacion}`);
}

const getMontoTipoVehiculoYReparacion = (tipoVehiculo, tipoReparacion) => {
    return httpClient.get(`/api/v1/reparaciones/tipoVehiculo/${tipoVehiculo}/${tipoReparacion}/monto`);
}

const getCantidadTipoReparacionYMes = (tipoReparacion, mes) => {
    return httpClient.get(`/api/v1/reparaciones/tipoReparacion/${tipoReparacion}/${mes}`);
}

const getPorcentajeTipoReparacionYMes = (tipoReparacion, mes) => {
    return httpClient.get(`/api/v1/reparaciones/tipoReparacion/${tipoReparacion}/${mes}/porcentaje`);
}

const getReparacionYVehiculo = id => {
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
    getCantidadTipoVehiculoYReparacion,
    getMontoTipoVehiculoYReparacion,
    getCantidadTipoReparacionYMes,
    getPorcentajeTipoReparacionYMes,
    getReparacionYVehiculo
};
