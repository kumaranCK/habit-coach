import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import HabitDetail from "./pages/HabitDetail";
import AIChat from "./pages/AIChat";
import Analytics from "./pages/Analytics";
import Profile from "./pages/Profile";

export default function App() {
  const stored = localStorage.getItem("hc_user");
  const user = stored ? JSON.parse(stored) : null;

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container py-6">
        <Routes>
          <Route path="/" element={user ? <Navigate to={`/u/${user.userId}`} replace /> : <Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/u/:userId" element={<Dashboard />} />
          <Route path="/habit/:habitId/:userId" element={<HabitDetail />} />
          <Route path="/coach" element={<AIChat />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
    </div>
  );
}
