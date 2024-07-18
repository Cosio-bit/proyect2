import httpClient from "../http-common";

// Precios endpoints
const getAllP = () => {
    return httpClient.get('/api/v1/precios/');
}

const createP = data => {
    return httpClient.post('/api/v1/precios/', data);
}

const getP = id => {
    return httpClient.get(`/api/v1/precios/${id}`);
}

const updateP = data => {
    return httpClient.put('/api/v1/precios/', data);
}

const removeP = id => {
    return httpClient.delete(`/api/v1/precios/${id}`);
}

// Export all functions
export default {
    getAllP,
    createP,
    getP,
    updateP,
    removeP,
};