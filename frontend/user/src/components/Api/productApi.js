import axiosInstance from '../../axiosApi';
export const getProductsByCategory = async (category) => {
    try {
        const response = await axiosInstance.get(`products/category/${category}`);
        return response.data;
    } catch (error) {
        return false;
    }
};

export const getProductsById = async (productId) => {
    try {
        const response = await axiosInstance.get(`product/${productId}`);
        return response.data;
    } catch (error) {
        return false;
    }
};