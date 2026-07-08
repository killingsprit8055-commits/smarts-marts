import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import Uploads from './pages/Uploads';
import Profile from './pages/Profile';
import './App.css';

function App() {
  const { token } = useContext(AuthContext);

  return (
    <Router>
      <div className="App min-h-screen bg-gray-50">
        {token && <Navbar />}
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route 
              path="/" 
              element={token ? <Home /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/products" 
              element={token ? <Products /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/cart" 
              element={token ? <Cart /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/orders" 
              element={token ? <Orders /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/uploads" 
              element={token ? <Uploads /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/profile" 
              element={token ? <Profile /> : <Navigate to="/login" />} 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
