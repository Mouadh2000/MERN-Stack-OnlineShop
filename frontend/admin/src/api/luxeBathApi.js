import axiosInstance from "axiosApi";
import Swal from 'sweetalert2';
import "../assets/css/sweetAlertStyle.css";

export const getAllLuxeBathProduct = async () => {
    try {
        const response = await axiosInstance.get('products/');
        return response.data;
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.response?.data?.message || 'An error occurred while fetching luxebath.',
            customClass: {
                container: 'custom-swal-container'
            }
        });
        return false;
    }
};

export const deleteLuxeBathProductById = async (luxeBathId) => {
    try {
        const response = await axiosInstance.delete(`luxebath/delete/${luxeBathId}/`);
        Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'The luxeBath Product has been deleted successfully.',
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
                text: error.response?.data?.message || 'You do not have permission to delete this luxeBath Product.',
                customClass: {
                    container: 'custom-swal-container'
                }
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data?.message || 'An error occurred while deleting the luxeBath character.',
                customClass: {
                    container: 'custom-swal-container'
                }
            });
        }
        throw error;
    }
};

export const addLuxeBathProduct = async (luxeBathData) => {
    try {
        const response = await axiosInstance.post(`luxebath/create/`, luxeBathData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        if (response.status === 201) {
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'luxeBath product added successfully!',
                customClass: {
                    container: 'custom-swal-container'
                }
            });
        }
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred while adding the luxeBath character.';
        
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

export const updateLuxeBathProduct = async (luxeBathId, luxeBathData) => {
    try {
        const response = await axiosInstance.put(`luxebath/update/${luxeBathId}/`, luxeBathData);
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: `luxeBath product updated successfully!`,
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
                text: error.response?.data?.message || 'You do not have permission to update this luxeBath product.',
                customClass: {
                    container: 'custom-swal-container'
                }
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data?.message || 'An error occurred while updating the luxeBath product.',
                customClass: {
                    container: 'custom-swal-container'
                }
            });
        }
        throw error;
    }
};
