import axios from 'axios';

const BASE_URL = "http://localhost:8080/api/v1/vehiculos/";

class VehiculoService {
    getAll() {
        return axios.get(BASE_URL);
    }

    create(data) {
        return axios.post(BASE_URL + 'vehiculo', data);
    }

    get(id) {
        return axios.get(BASE_URL + 'vehiculo/' + id);
    }

    update(data) {
        return axios.put(BASE_URL + 'vehiculo', data);
    }

    remove(id) {
        return axios.delete(BASE_URL + 'vehiculo/' + id);
    }
}

export default new VehiculoService();
