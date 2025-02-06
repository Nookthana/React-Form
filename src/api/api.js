import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,  
});

//user
export const getUser = () => api.get('/getUser');
export const getUserDetail = (userId) => api.post('/getUserId', { userId });
export const deleteUser = (userId) => api.post('/deleteUserId', { userId });
export const editUser = (userId) => api.post('/editUserId', { userId });
export const updateUser = (data) => api.post('/updateUserId', { data });

export default api;
