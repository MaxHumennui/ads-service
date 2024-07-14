import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export const getAds = async () => {
    return await axios.get(`${API_URL}/ads`);
};

export const getAdStatistics = async () => {
    return await axios.get(`${API_URL}/ads/statistics`);
};

export const createAd = async (data) => {
    return await axios.post(`${API_URL}/ads`, data);
};

export const updateAd = async (id, data) => {
    return await axios.put(`${API_URL}/ads/${id}`, data);
};

export const deleteAd = async (id) => {
    return await axios.delete(`${API_URL}/ads/${id}`);
};

export const trackClick = async (adId) => {
    return await axios.post(`${API_URL}/visitor/track-click`, { ad_id: adId });
};

export const trackImpression = async (adId) => {
    return await axios.post(`${API_URL}/visitor/track-impression`, { ad_id: adId });
};
