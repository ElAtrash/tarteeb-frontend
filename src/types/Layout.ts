import { ReactNode } from "react";

export interface NavigationLink {
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

export interface MenuItem {
  label: ReactNode;
  key: string;
  children?: MenuItem[];
}

export interface LayoutProps {
  children: ReactNode;
}
