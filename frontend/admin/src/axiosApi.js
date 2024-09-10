import axios from 'axios';

const baseURL = 'http://127.0.0.1:5000/api/admin';
const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers: {
        'Authorization': localStorage.getItem('access_token') ? `Bearer ${localStorage.getItem('access_token')}` : null,
        'Content-Type': 'application/json',
        'accept': 'application/json'
    }
});

axiosInstance.interceptors.response.use(
    response => {
        return response;
    },

    error => {
        const originalRequest = error.config;

        if (error.response.status === 403 && !originalRequest._retry) {
            if (originalRequest.url === baseURL + '/login/refresh/') {
                // Redirect to login if refresh token request fails
                window.location.replace('/auth/login/');
                return Promise.reject(error);
            }

            if (error.response.data.code === "Invalid or expired token") {
                const refreshToken = localStorage.getItem('refresh_token');
                if (refreshToken) {
                    const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));
                    const now = Math.ceil(Date.now() / 1000);

                    if (tokenParts.exp > now) {
                        originalRequest._retry = true;

                        return axiosInstance
                            .post('/login/refresh/', { refresh: refreshToken })
                            .then(response => {
                                localStorage.setItem('access_token', response.data.access_token);
                                localStorage.setItem('refresh_token', response.data.refresh_token);
                                axiosInstance.defaults.headers['Authorization'] = "Bearer " + response.data.access_token;
                                originalRequest.headers['Authorization'] = "Bearer " + response.data.access_token;
                                return axiosInstance(originalRequest);
                            })
                            .catch(err => {
                                console.log(err);
                                // Clear local storage and redirect to login
                                localStorage.clear();
                                window.location.replace('/auth/login/');
                                return Promise.reject(err);
                            });
                    } else {
                        console.log("Refresh token is expired", tokenParts.exp, now);
                        // Clear local storage and redirect to login
                        localStorage.clear();
                        window.location.replace('/auth/login/');
                    }
                } else {
                    console.log("Refresh token not available.");
                    // Clear local storage and redirect to login
                    localStorage.clear();
                    window.location.replace('/auth/login/');
                }
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;