// components/products/ExportExcelButton.tsx
import React from 'react';
import { Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { exportProducts } from '../../services/exportProducts';

interface ExportExcelButtonProps {
  filters: Record<string, any>;
  sortBy?: string;
  sortOrder?: string;
}

const ExportExcelButton: React.FC<ExportExcelButtonProps> = ({ filters, sortBy, sortOrder }) => {
  const handleExport = async () => {
    try {
      const blob = await exportProducts(filters, sortBy, sortOrder);

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'products.xlsx');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error exporting products:', error);
    }
  };

  return (
    <Button
      type="primary"
      icon={<DownloadOutlined />}
      onClick={handleExport}
      style={{ float: 'right', marginBottom: '10px' }}
    >
      Export to Excel
    </Button>
  );
};

export default ExportExcelButton;
