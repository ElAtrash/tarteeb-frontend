import axios from 'axios';
import { ApiResponse } from '../types/Product';

const apiUrl = import.meta.env.VITE_API_BASE_URL
const apiVersion = import.meta.env.VITE_API_VERSION;

export const fetchProducts = async (
  page: number,
  pageSize: number,
  filters: Record<string, any>,
  sortBy?: string,
  sortOrder?: string
): Promise<ApiResponse> => {
  try {
    const params = {
      page,
      page_size: pageSize,
      sort_by: sortBy,
      sort_order: sortOrder,
      filters,
    };

    const response = await axios.get<ApiResponse>(`${apiUrl}/api/${apiVersion}/products`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
