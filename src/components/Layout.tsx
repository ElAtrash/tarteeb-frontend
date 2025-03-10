import { FC, useState, useEffect, useMemo } from "react";
import { Layout, Menu, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router";
import { fetchNavigationLinks } from "../services/navigationService";
import { NavigationLink, MenuItem, LayoutProps } from "../types/Layout";
import logo from "../assets/logo.svg";
import "../styles/layout.css";

const { Header, Content, Footer } = Layout;

const buildMenuItems = (navigationLinks: NavigationLink[]): MenuItem[] => {
  return navigationLinks.map((link) => {
    const menuItem: MenuItem = {
      label: link.attributes.title,
      key: link.attributes.id,
    };

    if (link.attributes.children) {
      menuItem.children = link.attributes.children.map((child) => ({
        label: <Link to={child.path}>{child.title}</Link>,
        key: child.id,
      }));
    }

    return menuItem;
  });
};

const LayoutComponent: FC<LayoutProps> = ({ children }) => {
  const [navigationLinks, setNavigationLinks] = useState<NavigationLink[]>([]);

  useEffect(() => {
    const loadNavigationLinks = async () => {
      try {
        const links = await fetchNavigationLinks();
        setNavigationLinks(links);
      } catch (error) {
        console.error("Failed to fetch navigation links:", error);
      }
    };

    loadNavigationLinks();
  }, []);

  const menuItems = useMemo(
    () => buildMenuItems(navigationLinks),
    [navigationLinks]
  );

  return (
    <Layout className="layout">
      <Header className="header">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <Menu
          className="menu"
          mode="horizontal"
          items={menuItems}
        />
        ;
        <Space style={{ cursor: "pointer", color: "black" }}>
          <UserOutlined style={{ fontSize: "24px" }} />
        </Space>
      </Header>

      <Content>
        <div className="site-layout-content">{children}</div>
      </Content>

      <Footer className="footer">Tarteeb@2025</Footer>
    </Layout>
  );
};

export default LayoutComponent;
