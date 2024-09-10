import axiosInstance from "axiosApi";
import Swal from 'sweetalert2';
import "../assets/css/sweetAlertStyle.css";

export const getAllStaff = async () => {
    try {
        const response = await axiosInstance.get('staffs/');
        return response.data;
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.response?.data?.message || 'An error occurred while fetching staffs.',
            customClass: {
                container: 'custom-swal-container'
            }
        });
        return false;
    }
};

export const deleteStaffById = async (staffId) => {
    try {
        const response = await axiosInstance.delete(`staff/delete/${staffId}/`);
        Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'The Staff has been deleted successfully.',
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
                text: error.response?.data?.message || 'You do not have permission to delete this staff.',
                customClass: {
                    container: 'custom-swal-container'
                }
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data?.message || 'An error occurred while deleting the staff.',
                customClass: {
                    container: 'custom-swal-container'
                }
            });
        }
        throw error;
    }
};

export const addStaff = async (staffData) => {
    try {
        const response = await axiosInstance.post(`staff/create/`, staffData);

        if (response.status === 201) {
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Staff added successfully!',
                customClass: {
                    container: 'custom-swal-container'
                }
            });
        }
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred while adding the staff.';
        
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: errorMessage,
            customClass: {
                container: 'custom-swal-container'
            }
        });
        
        throw error;
    }
};

export const updateStaffById = async (staffId, staffData) => {
    try {
        const response = await axiosInstance.put(`staff/update/${staffId}/`, staffData);
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: `Staff updated successfully!`,
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
                text: error.response?.data?.message || 'You do not have permission to update this staff.',
                customClass: {
                    container: 'custom-swal-container'
                }
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data?.message || 'An error occurred while updating the staff.',
                customClass: {
                    container: 'custom-swal-container'
                }
            });
        }
        throw error;
    }
};
