import { FC } from "react";
import { Layout, Menu, Button, Avatar, Dropdown, Space } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Header.css";
import logo from "../assets/logo.svg";

const { Header: AntHeader } = Layout;

const Header: FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const userMenuItems = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: <Link to="/profile">Profile</Link>,
    },
    {
      type: "divider" as const,
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: handleLogout,
    },
  ];

  const getSelectedKey = () => {
    const path = location.pathname;
    if (path === "/") return "dashboard";
    if (path.startsWith("/products")) return "products";
    // Add more conditions for other paths
    return "";
  };

  return (
    <AntHeader className="app-header">
      <div>
        <img
          src={logo}
          alt="Logo"
          onClick={() => navigate("/")}
          style={{ cursor: "pointer", paddingTop: "20px" }}
        />
      </div>

      {isAuthenticated && (
        <div className="header-nav">
          <Menu
            mode="horizontal"
            selectedKeys={[getSelectedKey()]}
            className="nav-menu"
            items={[
              {
                key: "dashboard",
                label: <Link to="/">Dashboard</Link>,
              },
              {
                key: "products",
                label: <Link to="/products">Products</Link>,
              },
              // Add more menu items
            ]}
          />
        </div>
      )}

      <div>
        {isAuthenticated ? (
          <Dropdown menu={{ items: userMenuItems }} trigger={["hover"]}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <Avatar className="header-user">
                  {user?.first_name.charAt(0)}
                </Avatar>
              </Space>
            </a>
          </Dropdown>
        ) : (
          <Button type="primary" onClick={() => navigate("/login")}>
            Login
          </Button>
        )}
      </div>
    </AntHeader>
  );
};

export default Header;
