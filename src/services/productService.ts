import apiClient from './apiClient';
import { Product, ApiResponse } from '../types/Product';

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await apiClient('/products');
    const data: ApiResponse = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
