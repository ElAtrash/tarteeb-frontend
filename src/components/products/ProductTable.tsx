import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { fetchProducts } from '../../services/productService';
import { Product, ProductSupplier } from '../../types/Product';
import { message } from 'antd';

const ProductTable: React.FC = () => {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await fetchProducts();
        setData(products);
      } catch (error) {
        console.error('Failed to load products:', error);
        setError('Failed to load products. Please try again later.');
        message.error('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const columns: ColumnsType<Product> = [
    { title: 'Brand', dataIndex: ['attributes', 'brand'], key: 'brand' },
    { title: 'Model', dataIndex: ['attributes', 'model_label'], key: 'model_label' },
    { title: 'Model number', dataIndex: ['attributes', 'model_number'], key: 'model_number' },
    { title: 'Memory', dataIndex: ['attributes', 'memory'], key: 'memory' },
    { title: 'Color', dataIndex: ['attributes', 'color'], key: 'color' },
  ];

  const expandedRowRender = (record: Product) => {
    const supplierColumns: ColumnsType<ProductSupplier> = [
      { title: 'Supplier Name', dataIndex: ['supplier', 'name'], key: 'supplier_name' },
      { title: 'Country', dataIndex: 'country', key: 'country' },
      { title: 'Price', dataIndex: 'price', key: 'price' },
      { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
      { title: 'Status', dataIndex: 'status', key: 'status' },
      { title: 'Stock Condition', dataIndex: 'stock_condition', key: 'stock_condition' },
      { title: 'Estimate', dataIndex: 'estimate', key: 'estimate' },
      { title: 'Location', dataIndex: 'location', key: 'location' },
    ];

    return (
      <Table
        columns={supplierColumns}
        dataSource={record.attributes.product_suppliers}
        pagination={false}
        rowKey="id"
      />
    );
  };

  return (
    <Table
      columns={columns}
      dataSource={data}
      expandable={{ expandedRowRender }}
      rowKey="id"
    />
  );
};

export default ProductTable;