import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const handleApiError = (error) => {
    if (error.response) {

        console.error('API response error:', error.response.data);
        return { success: false, message: error.response.data.message || 'An error occurred' };
    } else if (error.request) {

        console.error('API request error:', error.request);
        return { success: false, message: 'No response from server' };
    } else {

        console.error('API general error:', error.message);
        return { success: false, message: error.message };
    }
};

export const getAds = async () => {
    try {
        const response = await axios.get(`${API_URL}/ads`);
        return { success: true, data: response.data.data };
    } catch (error) {
        return handleApiError(error);
    }
};

export const getAdStatistics = async () => {
    try {
        const response = await axios.get(`${API_URL}/ads/statistics`);
        return { success: true, data: response.data.data };
    } catch (error) {
        return handleApiError(error);
    }
};

export const createAd = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/ads`, data);
        return { success: true, data: response.data.data };
    } catch (error) {
        return handleApiError(error);
    }
};

export const updateAd = async (id, data) => {
    try {
        const response = await axios.put(`${API_URL}/ads/${id}`, data);
        return { success: true, data: response.data.data };
    } catch (error) {
        return handleApiError(error);
    }
};

export const deleteAd = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/ads/${id}`);
        return { success: true, data: response.data };
    } catch (error) {
        return handleApiError(error);
    }
};

export const trackClick = async (adId) => {
    try {
        const response = await axios.post(`${API_URL}/visitor/track-click`, { ad_id: adId });
        return { success: true, data: response.data };
    } catch (error) {
        return handleApiError(error);
    }
};

export const trackImpression = async (adId) => {
    try {
        const response = await axios.post(`${API_URL}/visitor/track-impression`, { ad_id: adId });
        return { success: true, data: response.data };
    } catch (error) {
        return handleApiError(error);
    }
};

export const cleanOldEntries = async () => {
    try {
        const response = await axios.delete(`${API_URL}/visitor/clean-old-entries`);
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, message: error.message };
    }
};
