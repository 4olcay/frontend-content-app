import axios from 'axios';
import { Content, ApiResponse, ContentFilters } from '../types/content';
import { API_BASE_URL } from '../config/env';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const contentApi = {
  getContents: async (filters: ContentFilters = {}): Promise<ApiResponse<Content[]>> => {
    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, value.toString());
      }
    });

    const response = await api.get(`/api/v1/contents?${params.toString()}`);
    return response.data;
  },

  getContentById: async (id: string): Promise<ApiResponse<Content>> => {
    const response = await api.get(`/api/v1/contents/${id}`);
    return response.data;
  },
};

export default api;
