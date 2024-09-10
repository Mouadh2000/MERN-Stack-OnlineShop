import axiosInstance from "axiosApi";
import Swal from 'sweetalert2';
import "../assets/css/sweetAlertStyle.css";

// Fetch all categories
export const getAllCategory = async () => {
    try {
        const response = await axiosInstance.get('categories/');
        return response.data;
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.response?.data?.message || 'An error occurred while fetching categories.',
            customClass: {
                container: 'custom-swal-container'
            }
        });
        return false;
    }
};

// Delete category by ID
export const deleteCategoryById = async (categoryId) => {
    try {
        const response = await axiosInstance.delete(`category/delete/${categoryId}/`);
        Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'The category has been deleted successfully.',
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
                text: error.response?.data?.message || 'You do not have permission to delete this category.',
                customClass: {
                    container: 'custom-swal-container'
                }
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data?.message || 'An error occurred while deleting the category.',
                customClass: {
                    container: 'custom-swal-container'
                }
            });
        }
        throw error;
    }
};

// Add a new category
export const addCategory = async (categoryData) => {
    try {
        const response = await axiosInstance.post(`category/create/`, categoryData);

        if (response.status === 201) {
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Category added successfully!',
                customClass: {
                    container: 'custom-swal-container'
                }
            });
        }
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred while adding the category.';
        
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

// Update a category by ID
export const updateCategoryById = async (categoryId, categoryData) => {
    try {
        const response = await axiosInstance.put(`category/update/${categoryId}/`, categoryData);
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: `Category updated successfully!`,
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
                text: error.response?.data?.message || 'You do not have permission to update this category.',
                customClass: {
                    container: 'custom-swal-container'
                }
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data?.message || 'An error occurred while updating the category.',
                customClass: {
                    container: 'custom-swal-container'
                }
            });
        }
        throw error;
    }
};
