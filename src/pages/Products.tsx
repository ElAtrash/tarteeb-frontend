import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../services/fetchProducts';
import Filters from '../components/products/Filters';
import Table from '../components/products/Table';
import { Product, FilterOption } from '../types/Product';
import ExportExcelButton from '../components/products/ExportExcelButton';

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalProducts, setTotalProducts] = useState(0);
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [statusOptions, setStatusOptions] = useState<FilterOption[]>([]);
  const [stockConditionOptions, setStockConditionOptions] = useState<FilterOption[]>([]);
  const [sortBy, setSortBy] = useState<string | undefined>(undefined);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | undefined>(undefined);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const response = await fetchProducts(
        page,
        pageSize,
        filters,
        sortBy,
        sortOrder
      );
      setProducts(response.data);
      setTotalProducts(response.meta.total_products);
      setStatusOptions(response.meta.status_options || []);
      setStockConditionOptions(response.meta.stock_condition_options || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [page, pageSize, filters, sortBy, sortOrder]);

  const handleApplyFilters = (newFilters: Record<string, string>) => {
    setFilters(newFilters);
    setPage(1);
  };

  const handleSort = (columnKey: string, order: 'asc' | 'desc' | undefined) => {
    setSortBy(columnKey);
    setSortOrder(order);
  };

  return (
    <div style={{ padding: '24px' }}>
      <Filters
        onApplyFilters={handleApplyFilters}
        statusOptions={statusOptions}
        stockConditionOptions={stockConditionOptions}
      />
      <ExportExcelButton filters={filters} sortBy={sortBy} sortOrder={sortOrder} />
      <Table
        data={products}
        loading={loading}
        currentPage={page}
        totalProducts={totalProducts}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onSort={handleSort}
      />
    </div>
  );
};

export default Products;