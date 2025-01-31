import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Products from './pages/Products';

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Products />} />
    </Routes>
  </Router>
)

export default App
