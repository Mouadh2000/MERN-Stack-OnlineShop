import axiosInstance from "axiosApi";
import Swal from 'sweetalert2';
import "../assets/css/sweetAlertStyle.css";

export const getAllClients = async () => {
    try {
        const response = await axiosInstance.get('clients/');
        return response.data;
    } catch (error) {
        
        return false;
    }
};

export const deleteClientById = async (clientId) => {
    try {
        const response = await axiosInstance.delete(`client/delete/${clientId}/`);
        Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'The Client has been deleted successfully.',
            customClass: {
                container: 'custom-swal-container'
            }
        });
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 403) {
            Swal.fire({
                icon: 'error',
                title: 'Permission Denied',
                text: error.response?.data?.message || 'You do not have permission to delete this client.',
                customClass: {
                    container: 'custom-swal-container'
                }
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data?.message || 'An error occurred while deleting the client.',
                customClass: {
                    container: 'custom-swal-container'
                }
            });
        }
        throw error;
    }
};

export const disableClientById = async (clientId) => {
    try {
        const response = await axiosInstance.put(`client/disable/${clientId}/`);
        Swal.fire({
            icon: 'success',
            title: 'Disable!',
            text: 'The Client has been disabled successfully.',
            customClass: {
                container: 'custom-swal-container'
            }
        });
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 403) {
            Swal.fire({
                icon: 'error',
                title: 'Permission Denied',
                text: error.response?.data?.message || 'You do not have permission to disable this client.',
                customClass: {
                    container: 'custom-swal-container'
                }
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data?.message || 'An error occurred while disabling the client.',
                customClass: {
                    container: 'custom-swal-container'
                }
            });
        }
        throw error;
    }
};

export const enableClientById = async (clientId) => {
    try {
        const response = await axiosInstance.put(`client/enable/${clientId}/`);
        Swal.fire({
            icon: 'success',
            title: 'Enabled!',
            text: 'The Client has been enabled successfully.',
            customClass: {
                container: 'custom-swal-container'
            }
        });
        return response.data;
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.response?.data?.message || 'An error occurred while enabling the client.',
            customClass: {
                container: 'custom-swal-container'
            }
        });
        throw error;
    }
};

