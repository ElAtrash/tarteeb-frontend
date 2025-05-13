import { FC } from "react";
import { Form, Input, Button, Card, Typography, Divider, Space } from "antd";
import { UserOutlined, LockOutlined, MailOutlined, UserAddOutlined } from "@ant-design/icons";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { RegisterData } from "../types/Auth";
import logo from "../assets/logo.svg";
import "../styles/Auth.css";

const { Text } = Typography;

const Register: FC = () => {
  const { register, isAuthenticated, isLoading } = useAuth();

  const onFinish = async (values: RegisterData) => {
    await register(values);
  };

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="auth-wrapper">
      <div>
        <div className="auth-logo">
          <img src={logo} alt="Logo" />
        </div>
        <Card className="auth-card">
          <div className="auth-header">
            <Text type="secondary">Sign up to get started</Text>
          </div>

          <Form
            name="register"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            layout="vertical"
            size="large"
          >
            <Form.Item
              name="first_name"
              rules={[
                { required: true, message: "Please input your first name!" },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="First Name" />
            </Form.Item>

            <Form.Item
              name="last_name"
              rules={[
                { required: true, message: "Please input your last name!" },
              ]}
            >
              <Input prefix={<UserAddOutlined />} placeholder="Last Name" />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Please enter a valid email address!" },
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="Email" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
                { min: 6, message: "Password must be at least 6 characters!" },
              ]}
              hasFeedback
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Password" />
            </Form.Item>

            <Form.Item
              name="password_confirmation"
              dependencies={["password"]}
              hasFeedback
              rules={[
                { required: true, message: "Please confirm your password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Passwords do not match!"));
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Confirm Password"
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={isLoading} block>
                Sign up
              </Button>
            </Form.Item>
          </Form>

          <Divider>
            <Text type="secondary">
              Or
            </Text>
          </Divider>

          <div className="auth-footer">
            <Space>
              <Text>Already have an account?</Text>
              <Link to="/login">
                <Button type="link" className="auth-link-button">
                  Sign in
                </Button>
              </Link>
            </Space>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Register;
