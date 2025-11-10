const getApiUrl = () => {
    // If in production
    if (import.meta.env.PROD) {
        return import.meta.env.VITE_API_URL || '';
    }

    return 'http://localhost:5000';
};

export const API_URL = getApiUrl();