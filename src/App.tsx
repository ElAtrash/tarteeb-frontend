import { FC } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ConfigProvider, Layout } from "antd";
import { AuthProvider, useAuth } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Profile from './pages/Profile';
import "./App.css";
import themeConfig from "./lib/theme/themeConfig";

const { Content, Footer } = Layout;

const AppContent: FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Layout className="app-layout">
      {isAuthenticated && <Header />}
      <Content className="app-content">
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="profile" element={<Profile />} />
            {/* Add other protected routes here */}
          </Route>

          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Content>
      <Footer className="app-footer">
        © {new Date().getFullYear()} Tarteeb. All Rights Reserved.
      </Footer>
    </Layout>
  );
};

const App: FC = () => {
  return (
    <ConfigProvider theme={themeConfig}>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </ConfigProvider>
  );
};

export default App;