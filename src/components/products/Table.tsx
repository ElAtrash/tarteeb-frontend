import React from 'react';
import { Table } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import { Product, FTableProps } from '../../types/Product';
import { startCase } from 'lodash';

const FTable: React.FC<FTableProps> = ({
  data,
  loading,
  currentPage,
  totalProducts,
  onPageChange,
  onPageSizeChange,
  onSort,
}) => {
  const columns: ColumnsType<Product> = [
    { title: 'Brand', dataIndex: ['attributes', 'brand'], key: 'brand', sorter: true },
    { title: 'Model', dataIndex: ['attributes', 'model_label'], key: 'model_label', sorter: true },
    { title: 'Model Number', dataIndex: ['attributes', 'model_number'], key: 'model_number', sorter: true },
    { title: 'Memory', dataIndex: ['attributes', 'memory'], key: 'memory', sorter: true },
    { title: 'Color', dataIndex: ['attributes', 'color'], key: 'color', sorter: true },
  ];

  const expandedRowRender = (record: Product) => (
    <Table
      columns={[
        { title: 'Supplier Name', dataIndex: ['attributes', 'supplier_name'], key: 'supplier_name' },
        { title: 'Country', dataIndex: ['attributes', 'country'], key: 'country' },
        { title: 'Price', dataIndex: ['attributes', 'price'], key: 'price' },
        { title: 'Quantity', dataIndex: ['attributes', 'quantity'], key: 'quantity' },
        {
          title: 'Status',
          dataIndex: ['attributes', 'status'],
          key: 'status',
          render: (text: string) => startCase(text),
        },
        { title: 'Location', dataIndex: ['attributes', 'location'], key: 'location' },
        { title: 'Estimate', dataIndex: ['attributes', 'estimate'], key: 'estimate' },
        {
          title: 'Stock Condition',
          dataIndex: ['attributes', 'stock_condition'],
          key: 'stock_condition',
          render: (text: string) => startCase(text),
        },
      ]}
      dataSource={record.attributes.product_suppliers.data}
      pagination={false}
      rowKey="id"
    />
  );

  const handleTableChange: TableProps<Product>['onChange'] = (_, __, sorter) => {
    if (sorter && 'field' in sorter) {
      const columnKey = sorter.columnKey as string;
      const order = sorter.order === 'ascend' ? 'asc' : sorter.order === 'descend' ? 'desc' : undefined;
      onSort(columnKey, order);
    }
  };

  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={loading}
      rowKey="id"
      showSorterTooltip={false}
      expandable={{ expandedRowRender }}
      pagination={{
        current: currentPage,
        total: totalProducts,
        pageSizeOptions: ['10', '20', '50'],
        showSizeChanger: true,
        onChange: onPageChange,
        onShowSizeChange: (_, size) => onPageSizeChange(size),
        showTotal: (total, range) => (
          <div style={{ textAlign: 'left', marginRight: '16px' }}>
            {range[0]}-{range[1]} of {total} products
          </div>
        ),
      }}
      onChange={handleTableChange}
    />
  );
};

export default FTable;
