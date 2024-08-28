import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users'; // Your backend API base URL

// --- User API Functions ---

const getUsers = async (page, filters, searchQuery) => {
    try {
        const response = await axios.get(API_URL, {
            params: {
                page,
                domain: filters.domain.join(','),
                gender: filters.gender.join(','),
                available: filters.available,
                name: searchQuery
            }
        });
        return response.data;
    } catch (error) {
        // Enhanced error handling
        throw new Error(error.response?.data?.error || error.message); 
    }
};

const getUserById = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/${userId}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.error || error.message); 
    }
};

const createUser = async (userData) => {
    try {
        const response = await axios.post(API_URL, userData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.error || error.message); 
    }
};

const updateUser = async (userId, userData) => {
    try {
        const response = await axios.put(`${API_URL}/${userId}`, userData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.error || error.message); 
    }
};

const deleteUser = async (userId) => {
    try {
        const response = await axios.delete(`${API_URL}/${userId}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.error || error.message); 
    }
};

// --- Team API Functions ---

const createTeam = async (userIds) => {
    try {
        const response = await axios.post('http://localhost:5000/api/teams', { userIds }); 
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.error || error.message); 
    }
};

const getTeamById = async (teamId) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/teams/${teamId}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.error || error.message); 
    }
};

const userService = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    createTeam,
    getTeamById 
};

export default userService;