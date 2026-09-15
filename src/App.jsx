import React from "react";
import { Routes, Route } from "react-router-dom";

import Landing from "./components/pages/Landing";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import ForgotPassword from "./components/pages/ForgotPassword";
import ResetPassword from "./components/pages/ResetPassword";

import Dashboard from "./components/pages/Dashboard";
import Marketplace from "./components/pages/Marketplace";
import ProductDetail from "./components/pages/ProductDetail";
import Profile from "./components/pages/Profile";
import Messages from "./components/pages/Messages";
import Notifications from "./components/pages/Notifications";

import Accommodation from "./components/pages/Accommodation";
import Services from "./components/pages/Services";
import Businesses from "./components/pages/Businesses";
import Schedule from "./components/pages/Schedule";
import SellItem from "./components/pages/SellItem";
import RevenueModel from "./components/pages/RevenueModel";
import Admin from "./components/pages/Admin";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/marketplace" element={<Marketplace />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/messages" element={<Messages />} />
      <Route path="/notifications" element={<Notifications />} />

      <Route path="/accommodation" element={<Accommodation />} />
      <Route path="/services" element={<Services />} />
      <Route path="/businesses" element={<Businesses />} />
      <Route path="/schedule" element={<Schedule />} />
      <Route path="/sell" element={<SellItem />} />
      <Route path="/revenue" element={<RevenueModel />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}