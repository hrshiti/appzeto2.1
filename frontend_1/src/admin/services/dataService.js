import api from './api';

export const dataService = {
    // --- Global Settings ---
    getSettings: async () => {
        try {
            const response = await api.get('/settings');
            return response.data.data;
        } catch (error) {
            console.error("Error fetching settings:", error);
            return null;
        }
    },
    saveSettings: async (data) => {
        const response = await api.put('/settings', data);
        return response.data.data;
    },

    // --- Services ---
    getServices: async () => {
        const response = await api.get('/services'); // Public
        return response.data.data;
    },
    getAdminServices: async () => {
        const response = await api.get('/services/admin/all');
        return response.data.data;
    },
    createService: async (data) => api.post('/services', data),
    updateService: async (id, data) => api.put(`/services/${id}`, data),
    deleteService: async (id) => api.delete(`/services/${id}`),

    // --- Projects ---
    getProjects: async () => {
        const response = await api.get('/projects');
        return response.data.data;
    },
    getAdminProjects: async () => {
        const response = await api.get('/projects/admin/all');
        return response.data.data;
    },
    createProject: async (data) => api.post('/projects', data),
    getProject: async (id) => {
        const response = await api.get(`/projects/${id}`);
        return response.data.data;
    },
    updateProject: async (id, data) => api.put(`/projects/${id}`, data),
    deleteProject: async (id) => api.delete(`/projects/${id}`),

    // --- Blogs ---
    getBlogs: async () => {
        const response = await api.get('/blogs');
        return response.data.data;
    },
    getAdminBlogs: async () => {
        const response = await api.get('/blogs/admin/all');
        return response.data.data;
    },
    createBlog: async (data) => api.post('/blogs', data),
    getBlog: async (id) => {
        const response = await api.get(`/blogs/${id}`);
        return response.data.data;
    },
    updateBlog: async (id, data) => api.put(`/blogs/${id}`, data),
    deleteBlog: async (id) => api.delete(`/blogs/${id}`),

    // --- Videos ---
    getVideos: async () => {
        const response = await api.get('/videos');
        return response.data.data;
    },
    createVideo: async (data) => api.post('/videos', data),
    updateVideo: async (id, data) => api.put(`/videos/${id}`, data),
    deleteVideo: async (id) => api.delete(`/videos/${id}`),

    // --- Products ---
    getProducts: async () => {
        const response = await api.get('/products');
        return response.data.data;
    },
    createProduct: async (data) => api.post('/products', data),
    updateProduct: async (id, data) => api.put(`/products/${id}`, data),
    deleteProduct: async (id) => api.delete(`/products/${id}`),

    // --- Jobs/Internships ---
    getJobs: async (type) => {
        const url = type ? `/jobs?type=${encodeURIComponent(type)}` : '/jobs';
        const response = await api.get(url);
        return response.data.data;
    },
    getInternships: async () => {
        const response = await api.get('/jobs?type=Internship');
        return response.data.data;
    },
    createJob: async (data) => api.post('/jobs', data),
    updateJob: async (id, data) => api.put(`/jobs/${id}`, data),
    deleteJob: async (id) => api.delete(`/jobs/${id}`),

    // --- Contact / Leads ---
    submitMessage: async (data) => api.post('/contact/message', data),
    submitLead: async (data) => api.post('/contact/lead', data),

    getMessages: async () => {
        const response = await api.get('/contact/messages');
        return response.data.data;
    },
    deleteMessage: async (id) => api.delete(`/contact/messages/${id}`),

    getLeads: async () => {
        const response = await api.get('/contact/leads');
        return response.data.data;
    },
    updateLead: async (id, data) => api.put(`/contact/leads/${id}`, data),
    deleteLead: async (id) => api.delete(`/contact/leads/${id}`),

    // --- Careers / Partners ---
    submitApplication: async (data) => api.post('/contact/application', data),
    getApplications: async () => {
        const response = await api.get('/contact/applications');
        return response.data.data;
    },
    deleteApplication: async (id) => api.delete(`/contact/applications/${id}`),

    submitPartner: async (data) => api.post('/contact/partner', data),
    getPartners: async () => {
        const response = await api.get('/contact/partners');
        return response.data.data;
    },
    deletePartner: async (id) => api.delete(`/contact/partners/${id}`),
};
