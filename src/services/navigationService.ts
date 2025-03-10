import axios from "axios";

interface NavigationLink {
  id: string;
  type: string;
  attributes: {
    id: string;
    title: string;
    path: string;
    children?: {
      id: string;
      title: string;
      path: string;
    }[];
  };
}

const apiUrl = import.meta.env.VITE_API_BASE_URL;
const apiVersion = import.meta.env.VITE_API_VERSION;

export const fetchNavigationLinks = async (): Promise<NavigationLink[]> => {
  try {
    const response = await axios.get<{ data: NavigationLink[] }>(
      `${apiUrl}/api/${apiVersion}/navigation`
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching navigation links:", error);
    throw error;
  }
};
