import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CustomerChat from './pages/CustomerChat';
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/chat" element={<CustomerChat />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  );
}

