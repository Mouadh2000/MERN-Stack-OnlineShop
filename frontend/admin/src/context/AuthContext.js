import React, { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from 'axiosApi';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentAdmin, setCurrentAdmin] = useState(null);
  const navigate = useNavigate();

  const login = async (email, password) => {
    try {
      const response = await axiosInstance.post('/login/', {
        email,
        password,
      });

      const { access_token, refresh_token } = response.data;

      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);
      axiosInstance.defaults.headers['Authorization'] = "Bearer " + access_token;

      const adminResponse = await axiosInstance.get('/details/');
      const admin = adminResponse.data;

      setCurrentAdmin(admin);
      setIsLoggedIn(true);
      navigate("/admin/dashboard");
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setIsLoggedIn(false);
    setCurrentAdmin(null);
    delete axiosInstance.defaults.headers['Authorization'];
    navigate("/auth/login");
  };

  const refreshAccessToken = async () => {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      if (!refreshToken) throw new Error("No refresh token available");

      const response = await axiosInstance.post('/login/refresh', {
        refresh_token: refreshToken,
      });

      const { access_token, refresh_token: newRefreshToken } = response.data;
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', newRefreshToken);
      axiosInstance.defaults.headers['Authorization'] = "Bearer " + access_token;

      return access_token;
    } catch (error) {
      console.error("Error refreshing access token:", error);
      logout();
      return null;
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      const accessToken = localStorage.getItem('access_token');
      const refreshToken = localStorage.getItem('refresh_token');
      const isAuthenticated = !!accessToken && !!refreshToken;
      setIsLoggedIn(isAuthenticated);

      if (isAuthenticated) {
        try {
          const adminResponse = await axiosInstance.get('/details/');
          const admin = adminResponse.data;
          setCurrentAdmin(admin);
        } catch (error) {
          if (error.response && error.response.status === 403) {
            // Refresh the token instead of logging out
            const newAccessToken = await refreshAccessToken();
            if (newAccessToken) {
              try {
                const adminResponse = await axiosInstance.get('/details/');
                const admin = adminResponse.data;
                setCurrentAdmin(admin);
              } catch (innerError) {
                console.error("Error fetching admin details after token refresh:", innerError);
              }
            }
          } else {
            console.error("Error fetching admin details:", error);
          }
        }
      }

      setLoading(false);
    };

    initializeAuth();
  }, []);

  const value = {
    isLoggedIn,
    currentAdmin,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
