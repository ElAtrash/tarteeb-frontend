import { FC } from "react";
import { Form, Input, Button, Card, Typography, Divider, Space } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LoginCredentials } from "../types/Auth";
import logo from "../assets/logo.svg";
import "../styles/Auth.css";

const { Text } = Typography;

const Login: FC = () => {
  const { login, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || "/";

  const onFinish = async (values: LoginCredentials) => {
    await login(values);
  };

  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <div className="auth-logo">
          <img src={logo} alt="Logo" />
        </div>
        <Card className="auth-card">
          <div className="auth-header">
            <Text type="secondary">Sign in to your account</Text>
          </div>

          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            layout="vertical"
            size="large"
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Please enter a valid email address!" },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Email" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: "Please input your password!" }]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Password" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={isLoading} block>
                Sign in
              </Button>
            </Form.Item>
          </Form>

          <Divider>
            <Text type="secondary">Or</Text>
          </Divider>

          <div className="auth-footer">
            <Space>
              <Text>Don't have an account?</Text>
              <Link to="/register">
                <Button type="link" className="auth-link-button">
                  Sign up
                </Button>
              </Link>
            </Space>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
