interface Supplier {
  id: number;
  name: string;
}

export interface ProductSupplier {
  id: number;
  supplier_id: number;
  supplier: Supplier;
  country: string;
  price: string;
  quantity: number;
  status: string;
  stock_condition: string;
  estimate: string;
  location: string;
}

export interface ProductAttributes {
  brand: string;
  model_label: string;
  memory: string;
  model_number: string | null;
  color: string;
  product_suppliers: ProductSupplier[];
}

export interface Product {
  id: string;
  type: string;
  attributes: ProductAttributes;
}

export interface ApiResponse {
  data: Product[];
}