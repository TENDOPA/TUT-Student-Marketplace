import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import AIAssistant from './components/AIAssistant.jsx';

import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import ResetPassword from './pages/ResetPassword.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Marketplace from './pages/Marketplace.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import Profile from './pages/Profile.jsx';
import Messages from './pages/Messages.jsx';
import Notifications from './pages/Notifications.jsx';
import Accommodation from './pages/Accommodation.jsx';
import Services from './pages/Services.jsx';
import Businesses from './pages/Businesses.jsx';
import Schedule from './pages/Schedule.jsx';
import Sell from './pages/Sell.jsx';
import Revenue from './pages/Revenue.jsx';
import Admin from './pages/Admin.jsx';
import About from './pages/About.jsx';
import NotFound from './pages/NotFound.jsx';

// Every route below renders without requiring login — the app never gates
// the public landing page or marketplace behind auth. Pages like Dashboard,
// Profile, Messages etc. show a "demo mode" prompt if no mock user is
// logged in yet, rather than redirecting or blocking render.
export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
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
        <Route path="/sell" element={<Sell />} />
        <Route path="/revenue" element={<Revenue />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <AIAssistant />
    </>
  );
}
