import axios from 'axios';

const BASE_URL = "http://localhost:8080/api/v1/marcas/";

class marcaService {
    getAll() {
        return axios.get(BASE_URL);
    }

    create(data) {
        return axios.post(BASE_URL + 'marca', data);
    }

    get(id) {
        return axios.get(BASE_URL + 'marca/' + id);
    }

    update(data) {
        return axios.put(BASE_URL + 'marca', data);
    }

    remove(id) {
        return axios.delete(BASE_URL + 'marca/' + id);
    }
}

export default new marcaService();
