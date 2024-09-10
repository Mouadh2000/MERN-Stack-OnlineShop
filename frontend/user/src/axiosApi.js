import axios from 'axios';

const baseURL = 'http://127.0.0.1:5000/api/user';

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
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));
        const now = Math.ceil(Date.now() / 1000);

        if (tokenParts.exp > now) {
          originalRequest._retry = true;
          try {
            const response = await axiosInstance.post('/login/refresh/', { refresh: refreshToken });
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            axiosInstance.defaults.headers['Authorization'] = "Bearer " + response.data.access;
            originalRequest.headers['Authorization'] = "Bearer " + response.data.access;
            return axiosInstance(originalRequest);
          } catch (err) {
            console.log(err);
            localStorage.clear();
            window.location.replace('/sign-in');
            return Promise.reject(err);
          }
        } else {
          localStorage.clear();
          window.location.replace('/sign-in');
        }
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
