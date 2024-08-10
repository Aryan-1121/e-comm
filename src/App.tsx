
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import ProductList from './pages/ProductList';

function App() {
  const token = localStorage.getItem('authToken');

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={token ? <ProductList /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
