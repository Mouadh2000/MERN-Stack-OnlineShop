import axiosInstance from "axiosApi";
import Swal from 'sweetalert2';
import "../assets/css/sweetAlertStyle.css";

// Fetch all animes
export const getAllAnimes = async () => {
    try {
        const response = await axiosInstance.get('animes/');
        return response.data;
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.response?.data?.message || 'An error occurred while fetching animes characters.',
            customClass: {
                container: 'custom-swal-container'
            }
        });
        return false;
    }
};

// Delete anime by ID
export const deleteAnimeById = async (animeId) => {
    try {
        const response = await axiosInstance.delete(`anime/delete/${animeId}/`);
        Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'The anime character has been deleted successfully.',
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
                text: error.response?.data?.message || 'You do not have permission to delete this anime character.',
                customClass: {
                    container: 'custom-swal-container'
                }
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data?.message || 'An error occurred while deleting the anime character.',
                customClass: {
                    container: 'custom-swal-container'
                }
            });
        }
        throw error;
    }
};

// Add a new anime
export const addAnime = async (animeData) => {
    try {
        const response = await axiosInstance.post(`anime/create/`, animeData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        if (response.status === 201) {
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Anime character added successfully!',
                customClass: {
                    container: 'custom-swal-container'
                }
            });
        }
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred while adding the anime character.';
        
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


// Update a anime by ID
export const updateAnimeById = async (animeId, animeData) => {
    try {
        const response = await axiosInstance.put(`anime/update/${animeId}/`, animeData);
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: `anime character updated successfully!`,
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
                text: error.response?.data?.message || 'You do not have permission to update this anime character.',
                customClass: {
                    container: 'custom-swal-container'
                }
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data?.message || 'An error occurred while updating the anime character.',
                customClass: {
                    container: 'custom-swal-container'
                }
            });
        }
        throw error;
    }
};
