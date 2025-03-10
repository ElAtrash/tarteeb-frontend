import {FC, useState, useCallback} from "react";
import { Input, Select, Row, Col } from "antd";
import { FiltersProps } from "../../types/Product";
import { debounce } from "lodash";

const { Option } = Select;

const Filters: FC<FiltersProps> = ({
  onApplyFilters,
  statusOptions,
  stockConditionOptions,
}) => {
  const [filters, setFilters] = useState<Record<string, string>>({});

  const debouncedApplyFilters = useCallback(
    debounce((filters: Record<string, string>) => {
      onApplyFilters(filters);
    }, 500),
    []
  );

  const handleInputChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    debouncedApplyFilters(newFilters);
  };

  return (
    <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
      <Col span={6}>
        <Input
          placeholder="Filter by brand"
          allowClear
          onChange={(e) => handleInputChange("brand", e.target.value)}
        />
      </Col>
      <Col span={6}>
        <Input
          placeholder="Filter by model"
          allowClear
          onChange={(e) => handleInputChange("model_label", e.target.value)}
        />
      </Col>
      <Col span={6}>
        <Input
          placeholder="Filter by model number"
          allowClear
          onChange={(e) => handleInputChange("model_number", e.target.value)}
        />
      </Col>
      <Col span={6}>
        <Input
          placeholder="Filter by memory"
          allowClear
          onChange={(e) => handleInputChange("memory", e.target.value)}
        />
      </Col>
      <Col span={6}>
        <Input
          placeholder="Filter by color"
          allowClear
          onChange={(e) => handleInputChange("color", e.target.value)}
        />
      </Col>

      <Col span={6}>
        <Input
          placeholder="Filter by supplier name"
          allowClear
          onChange={(e) => handleInputChange("supplier_name", e.target.value)}
        />
      </Col>
      <Col span={6}>
        <Input
          placeholder="Filter by country"
          allowClear
          onChange={(e) => handleInputChange("country", e.target.value)}
        />
      </Col>
      <Col span={6}>
        <Select
          placeholder="Filter by status"
          allowClear
          style={{ width: "100%" }}
          onChange={(value) => handleInputChange("status", value)}
        >
          {statusOptions.map((option) => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>
      </Col>
      <Col span={6}>
        <Select
          placeholder="Filter by stock condition"
          allowClear
          style={{ width: "100%" }}
          onChange={(value) => handleInputChange("stock_condition", value)}
        >
          {stockConditionOptions.map((option) => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>
      </Col>
      <Col span={6}>
        <Input
          placeholder="Filter by estimate"
          allowClear
          onChange={(e) => handleInputChange("estimate", e.target.value)}
        />
      </Col>
      <Col span={6}>
        <Input
          placeholder="Filter by location"
          allowClear
          onChange={(e) => handleInputChange("location", e.target.value)}
        />
      </Col>
    </Row>
  );
};

export default Filters;
