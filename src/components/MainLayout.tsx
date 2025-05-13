import { FC, ReactNode } from "react";
import { Layout } from "antd";

const { Content } = Layout;

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content>{children}</Content>
    </Layout>
  );
};

export default MainLayout;
