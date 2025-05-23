import { StrictMode } from "react";
import ReactDOM from 'react-dom/client';
import App from "./App.tsx";
import "./styles/Index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
