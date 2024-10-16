import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
    withCredentials: true,
})

// get the CSRF token from the cookie
const getCsrfToken = () => {
    const match = document.cookie.match(new RegExp('(^| )csrftoken=([^;]+)'));
    return match ? match[2] : null;
};

// Request Interceptor
axiosInstance.interceptors.request.use(config => {
    const csrfToken = getCsrfToken();
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
        config.headers['Authorization'] = `Token ${authToken}`;
    }
    if (csrfToken) {
        config.headers['X-CSRFToken'] = csrfToken;
    }
    return config;
});

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.error('Response error:', error);
        if (error.response) {
            // Handle HTTP status codes (e.g., show alert for 404)
            switch (error.response.status) {
                case 404:
                    console.log('Resource not found');
                    break;
                case 500:
                    console.log('Server error, please try again later');
                    break;
                default:
                    console.log('An unexpected error occurred');
            }
        }
        return Promise.reject(error);
    }
)

export default axiosInstance;
