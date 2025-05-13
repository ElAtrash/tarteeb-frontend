import React, { useState } from "react";
import { Card, Avatar, Typography, Form, Input, Button, Divider, message } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import { useAuth } from "../context/AuthContext";
import "../styles/Profile.css";

const { Title, Text } = Typography;

interface PasswordChangeForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface ProfileUpdateForm {
  first_name: string;
  last_name: string;
}

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleProfileUpdate = async (values: ProfileUpdateForm) => {
    setIsLoading(true);
    try {
      // API to update the profile
      // const updatedUser = await updateProfile(values);

      message.success("Profile updated successfully");
    } catch (error) {
      message.error("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = async (values: PasswordChangeForm) => {
    setIsLoading(true);
    try {
      // API to change the password
      // await changePassword(values);

      message.success("Password changed successfully");
    } catch (error) {
      message.error("Failed to change password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="profile-container">
      <Card className="profile-card">
        <div className="profile-header">
          <Avatar
            size={80}
            icon={<UserOutlined />}
            className="profile-avatar"
          />
          <div className="profile-info">
            <Title level={3}>
              {user?.first_name && user?.last_name
                ? `${user.first_name} ${user.last_name}`
                : "Your Profile"}
            </Title>
            <Text type="secondary">{user?.email}</Text>
          </div>
        </div>

        <Divider />

        <Title level={4}>Personal Information</Title>
        <Form
          layout="vertical"
          initialValues={{
            first_name: user?.first_name || "",
            last_name: user?.last_name || "",
          }}
          onFinish={handleProfileUpdate}
        >
          <Form.Item
            name="first_name"
            label="First Name"
            rules={[
              { required: true, message: "Please enter your first name" },
            ]}
          >
            <Input prefix={<UserOutlined />} />
          </Form.Item>

          <Form.Item
            name="last_name"
            label="Last Name"
            rules={[{ required: true, message: "Please enter your last name" }]}
          >
            <Input prefix={<UserOutlined />} />
          </Form.Item>

          <Form.Item label="Email">
            <Input prefix={<MailOutlined />} value={user?.email} disabled />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Update Profile
            </Button>
          </Form.Item>
        </Form>

        <Divider />

        <Title level={4}>Change Password</Title>
        <Form layout="vertical" onFinish={handlePasswordChange}>
          <Form.Item
            name="currentPassword"
            label="Current Password"
            rules={[
              { required: true, message: "Please enter your current password" },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} />
          </Form.Item>

          <Form.Item
            name="newPassword"
            label="New Password"
            rules={[
              { required: true, message: "Please enter your new password" },
              { min: 6, message: "Password must be at least 6 characters" },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Confirm New Password"
            dependencies={["newPassword"]}
            rules={[
              { required: true, message: "Please confirm your new password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The two passwords do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined />} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Change Password
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Profile;
