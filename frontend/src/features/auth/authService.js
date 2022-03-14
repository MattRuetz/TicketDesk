import axios from 'axios';

const API_URL = '/api/users';

const register = async (userData) => {
    const response = await axios.post(API_URL, userData);

    // Store userdata in LS
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
};

// login user
const login = async (userData) => {
    // Post email and password from user to /login endpt
    const response = await axios.post(API_URL + '/login', userData);

    // Store userdata & token in LS
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
};

// Log out user
const logout = () => {
    localStorage.removeItem('user');
};

// include functions in export object
const authService = {
    register,
    logout,
    login,
};

export default authService;
