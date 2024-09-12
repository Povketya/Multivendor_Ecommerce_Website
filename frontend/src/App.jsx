import { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import Login from "./views/auth/login"; // Importing the 'Login' component.
import Register from "./views/auth/Register";
import Dashboard from "./views/auth/Dashboard";
import Logout from "./views/auth/Logout";
import ForgotPassword from "./views/auth/ForgotPassword";
import CreatePassword from "./views/auth/CreatePassword";
import StoreHeader from "./views/base/StoreHeader";
import StoreFooter from "./views/base/StoreFooter";
import MainWrapper from "./layout/MainWrapper";
import Products from "./views/store/Products";
import ProductDetail from "./views/store/ProductDetail";
import Cart from "./views/store/Cart";
import AllStores from './views/store/Stores';
import AllProducts from './views/store/AllProducts';
import AllCategories from './views/store/AllCategories';
import Checkout from "./views/store/Checkout";


function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <StoreHeader />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/create-new-password" element={<CreatePassword />} />
        

        {/* Store Components */}
        <Route path='/' element={<Products />} />
        <Route path='/detail/:slug/' element={<ProductDetail />} />
        <Route path='/cart/' element={<Cart />} />
        <Route path="/stores" element={<AllStores />} />
        <Route path="/products" element={<AllProducts />} />
        <Route path="/categories" element={<AllCategories />} />
        <Route path="/checkout" element={<Checkout />} />
        

      </Routes>

      <StoreFooter />
      <MainWrapper />
    </BrowserRouter>
  );
}

export default App;
