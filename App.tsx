
import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';

import { CartItem, Product } from './types';
import { MOCK_PRODUCTS } from './constants';

import StoreLayout from './components/StoreLayout';
import HomePage from './pages/store/HomePage';
import ProductDetailPage from './pages/store/ProductDetailPage';
import CartPage from './pages/store/CartPage';
import CheckoutPage from './pages/store/CheckoutPage';
import StyleAdvisorPage from './pages/store/StyleAdvisorPage';

import AdminLayout from './pages/admin/AdminLayout';
import DashboardPage from './pages/admin/DashboardPage';
import InventoryPage from './pages/admin/InventoryPage';
import OrdersPage from './pages/admin/OrdersPage';
import SuppliersPage from './pages/admin/SuppliersPage';

function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);

  const addToCart = (product: Product, quantity: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { product, quantity }];
    });
    toast.success(`${product.name} added to cart!`);
  };

  const updateCartQuantity = (productId: number, quantity: number) => {
    setCart(prevCart => {
      if (quantity <= 0) {
        return prevCart.filter(item => item.product.id !== productId);
      }
      return prevCart.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      );
    });
  };

  const clearCart = () => {
    setCart([]);
  }

  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <div className="bg-neutral-light min-h-screen text-neutral-dark font-sans">
      <Toaster position="top-center" reverseOrder={false} />
      <HashRouter>
        <Routes>
          <Route path="/" element={<StoreLayout cartItemCount={cartItemCount} />}>
            <Route index element={<HomePage products={products} addToCart={addToCart} />} />
            <Route path="product/:id" element={<ProductDetailPage products={products} addToCart={addToCart} />} />
            <Route path="cart" element={<CartPage cart={cart} updateCartQuantity={updateCartQuantity} />} />
            <Route path="checkout" element={<CheckoutPage cart={cart} clearCart={clearCart} />} />
            <Route path="style-advisor" element={<StyleAdvisorPage products={products} />} />
          </Route>

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="inventory" element={<InventoryPage products={products} setProducts={setProducts} />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="suppliers" element={<SuppliersPage />} />
          </Route>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
