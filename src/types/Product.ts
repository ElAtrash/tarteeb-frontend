export interface ProductSupplier {
  id: number;
  supplier_id: number;
  country: string;
  estimate: string;
  location: string;
  price: string;
  quantity: number;
  status: string;
  stock_condition: string;
  supplier_name: string;
}

export interface ProductAttributes {
  brand: string;
  model_label: string;
  memory: string;
  model_number: string | null;
  color: string;
  product_suppliers: {
    data: ProductSupplier[];
  };
}

export interface Product {
  id: string;
  type: string;
  attributes: ProductAttributes;
}

export interface ApiResponse {
  data: Product[];
  meta: {
    pages: number;
    total_products: number;
    status_options: FilterOption[];
    stock_condition_options: FilterOption[];
  };
}

export interface FiltersProps {
  onApplyFilters: (filters: Record<string, any>) => void;
  statusOptions: FilterOption[];
  stockConditionOptions: FilterOption[];
}

export interface FTableProps {
  data: Product[];
  loading: boolean;
  currentPage: number;
  totalProducts: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  onSort: (columnKey: string, order: 'asc' | 'desc' | undefined) => void;
}

export interface FilterOption {
  label: string;
  value: string;
}
