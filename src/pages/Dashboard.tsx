import React from "react";
import { Card, Typography, Row, Col } from "antd";
import { useAuth } from "../context/AuthContext";
import MainLayout from "../components/MainLayout";

const { Title, Text } = Typography;

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <MainLayout>
      <div style={{ padding: "25px" }}>
        <Title level={2}>Dashboard</Title>
        <Text type="secondary">
          Welcome back, {user?.first_name || user?.email}!
        </Text>
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card title="Quick Stats" variant="borderless">
            <p>content here</p>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card title="Recent Activity" variant="borderless">
            <p>content here</p>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card title="Notifications" variant="borderless">
            <p>content here</p>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card title="Tasks" variant="borderless">
            <p>content here</p>
          </Card>
        </Col>
      </Row>
    </MainLayout>
  );
};

export default Dashboard;
