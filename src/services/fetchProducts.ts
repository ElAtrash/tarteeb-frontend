import axios from 'axios';
import { ApiResponse } from '../types/Product';

const apiUrl = import.meta.env.VITE_API_BASE_URL
const apiVersion = import.meta.env.VITE_API_VERSION;

export const fetchProducts = async (
  page: number,
  pageSize: number,
  filters: Record<string, string | number>,
  sortBy?: string,
  sortOrder?: 'asc' | 'desc'
): Promise<ApiResponse> => {
  const response = await axios.get<ApiResponse>(`${apiUrl}/api/${apiVersion}/products`, {
    params: {
      page: page - 1,
      pageSize,
      ...filters,
      sort_by: sortBy,
      sort_order: sortOrder,
    },
  });
  return response.data;
};
