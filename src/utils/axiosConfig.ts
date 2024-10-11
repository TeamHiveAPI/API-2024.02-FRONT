import axios from 'axios';

// Crie uma instância do Axios
const api = axios.create({
    baseURL: 'http://localhost:8080', // Altere para o endereço da sua API
});

// Adicione um interceptor para adicionar o token JWT
api.interceptors.request.use(
    (config) => {
        // Obtenha o token do localStorage
        const token = localStorage.getItem('token'); // Altere 'token' para o nome que você usou

        // Se o token existir, adicione ao cabeçalho Authorization
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config; // Retorne a configuração modificada
    },
    (error) => {
        // Se ocorrer um erro, você pode lidar com isso aqui
        return Promise.reject(error);
    }
);

export default api;
