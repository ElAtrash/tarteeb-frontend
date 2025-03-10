import { FC } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import { ConfigProvider } from "antd";
import MainLayout from "./components/Layout";
import Products from "./pages/Products";
import "./App.css";
import themeConfig from "./lib/theme/themeConfig";

const App: FC = () => (
  <Router>
    <ConfigProvider theme={themeConfig}>
      <MainLayout>
        <Routes>
          <Route path="/products" element={<Products />} />
        </Routes>
      </MainLayout>
    </ConfigProvider>
  </Router>
);

export default App;
