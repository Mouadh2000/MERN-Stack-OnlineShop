import axiosInstance from "axiosApi";
import Swal from 'sweetalert2';
import "../assets/css/sweetAlertStyle.css";

export const getAllClothesProduct = async () => {
    try {
        const response = await axiosInstance.get('products/');
        return response.data;
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.response?.data?.message || 'An error occurred while fetching clothes product.',
            customClass: {
                container: 'custom-swal-container'
            }
        });
        return false;
    }
};

export const deleteClothesProductById = async (clothesId) => {
    try {
        const response = await axiosInstance.delete(`clothes/delete/${clothesId}/`);
        Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'The clothes Product has been deleted successfully.',
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
                text: error.response?.data?.message || 'You do not have permission to delete this Clothes Product.',
                customClass: {
                    container: 'custom-swal-container'
                }
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data?.message || 'An error occurred while deleting the clothes Product.',
                customClass: {
                    container: 'custom-swal-container'
                }
            });
        }
        throw error;
    }
};

export const addClothesProduct = async (clothesData) => {
    try {
        const response = await axiosInstance.post(`clothes/create/`, clothesData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        if (response.status === 201) {
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'clothes product added successfully!',
                customClass: {
                    container: 'custom-swal-container'
                }
            });
        }
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred while adding the clothes Product.';
        
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

export const updateClothesProduct = async (clothesId, clothesData) => {
    try {
        const response = await axiosInstance.put(`clothes/update/${clothesId}/`, clothesData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: `clothes product updated successfully!`,
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
                text: error.response?.data?.message || 'You do not have permission to update this clothes product.',
                customClass: {
                    container: 'custom-swal-container'
                }
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data?.message || 'An error occurred while updating the clothes product.',
                customClass: {
                    container: 'custom-swal-container'
                }
            });
        }
        throw error;
    }
};
