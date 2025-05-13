import ApiClient from './apiClient';

export const exportProducts = async (
  filters: Record<string, any>,
  sortBy?: string,
  sortOrder?: string
): Promise<Blob> => {
  try {
    const response = await ApiClient.post<Blob>(
      '/products/export',
      {
        filters,
        sort_by: sortBy,
        sort_order: sortOrder,
      },
      {
        responseType: 'blob',
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error exporting products:', error);
    throw error;
  }
};
