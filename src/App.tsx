
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import ProductList from './pages/ProductList';
import Cart from './pages/Cart';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';

function App() {
  const token = localStorage.getItem('authToken');

  return (
    <Router>
      {token && <Navbar />} {/* Only show Navbar if the user is logged in */}

      <Routes>
        <Route
          path="/products"
          element={token ? <ProductList /> : <Navigate to="/login" />}
        />
        <Route
          path="/cart"
          element={token ? <Cart /> : <Navigate to="/login" />}
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={<Navigate to={token ? "/products" : "/login"} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
