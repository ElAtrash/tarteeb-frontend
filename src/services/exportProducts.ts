import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_BASE_URL;
const apiVersion = import.meta.env.VITE_API_VERSION;

export const exportProducts = async (
  filters: Record<string, any>,
  sortBy?: string,
  sortOrder?: string
): Promise<Blob> => {
  try {
    const response = await axios.post(
      `${apiUrl}/api/${apiVersion}/products/export`,
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
