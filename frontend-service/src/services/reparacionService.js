import axios from 'axios';

const BASE_URL = "http://localhost:8080/api/v1/reparaciones/";

class reparacionService {
    getAll() {
        return axios.get(BASE_URL);
    }

    create(data) {
        return axios.post(BASE_URL + 'crearReparacion', data);
    }

    getFromVehiculo(idVehiculo) {
        return axios.get(BASE_URL + idVehiculo);
    }

    get(id) {
        return axios.get(BASE_URL + 'reparacion/' + id);
    }

    getByMarca(marca) {
        return axios.get(BASE_URL + 'marca/' + marca);
    }

    getByTipoMotor(tipoMotor) {
        return axios.get(BASE_URL + 'tipoMotor/' + tipoMotor);
    }

    getByTipoVehiculo(tipoVehiculo) {
        return axios.get(BASE_URL + 'tipoVehiculo/' + tipoVehiculo);
    }

    updateMonto(data) {
        return axios.put(BASE_URL + 'reparacion/monto', data);
    }

    update(data) {
        return axios.put(BASE_URL + 'reparacion', data);
    }

    remove(id) {
        return axios.delete(BASE_URL + 'reparacion/' + id);
    }
}

export default new reparacionService();
