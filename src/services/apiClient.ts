const apiUrl = import.meta.env.VITE_API_BASE_URL;

const apiClient = async (endpoint: string, options?: RequestInit): Promise<Response> => {
  const url = `${apiUrl}${endpoint}`;

  const headers = {
    'Content-Type': 'application/json',
    ...(options?.headers || {}),
  };

  const config: RequestInit = {
    ...options,
    headers,
  };

  const response = await fetch(url, config);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response;
};

export default apiClient;
