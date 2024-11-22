import axiosInstance from '../../axiosApi';
export const getAllAnime = async () => {
    try {
        const response = await axiosInstance.get('animes/');
        return response.data;
    } catch (error) {
        return false;
    }
};

export const getAnimeById = async (animeId) => {
    try {
        const response = await axiosInstance.get(`anime/${animeId}`);
        return response.data;
    } catch (error) {
        return false;
    }
};