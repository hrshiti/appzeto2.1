export const getMediaUrl = (url) => {
    if (!url) return '';
    if (typeof url !== 'string') return url;
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
        return url;
    }
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 
        (import.meta.env.VITE_API_BASE_URL ? import.meta.env.VITE_API_BASE_URL.replace(/\/api\/?$/, '') : 'http://localhost:5000');
    
    if (url.startsWith('/uploads') || url.startsWith('/assets')) {
        return `${backendUrl}${url}`;
    }
    return url;
};
