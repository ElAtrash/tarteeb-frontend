import ApiClient from './apiClient';
import { ApiResponse } from '../types/Product';

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

    const response = await ApiClient.get<ApiResponse>('/products', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
