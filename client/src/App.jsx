import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "@/pages/Home";

import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import AdminLogin from "@/pages/auth/AdminLogin";
import ForgotPassword from "@/pages/ForgotPassword";

import Dashboard from "@/pages/student/Dashboard";
import Application from "@/pages/student/Application";
import Downloads from "@/pages/student/Downloads";

import AdminDashboard from "@/pages/admin/Dashboard";
import Applications from "@/pages/admin/Applications";
import ApplicationDetails from "@/pages/admin/ApplicationDetails";
import Brochure from "@/pages/admin/Brochure";

import StudentLayout from "@/layouts/StudentLayout";
import AdminLayout from "@/layouts/AdminLayout";

import ProtectedRoute from "@/routes/ProtectedRoute";

import AdminRoute from "@/routes/AdminRoute";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* PUBLIC */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        <Route
  path="/forgot-password"
  element={<ForgotPassword />}
/>

        {/* STUDENT */}

        <Route
          element={
            <ProtectedRoute>
              <StudentLayout />
            </ProtectedRoute>
          }
        >

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/dashboard/application"
            element={<Application />}
          />

          <Route
            path="/dashboard/downloads"
            element={<Downloads />}
          />

        </Route>

        {/* ADMIN */}

        <Route
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >

          <Route
            path="/admin/dashboard"
            element={<AdminDashboard />}
          />

<Route
  path="/admin/Applications"
  element={<Applications />}
/>

<Route
  path="/admin/applications/:id"
  element={<ApplicationDetails />}
/>


<Route
path="/admin/brochure"
  element={<Brochure />}
/>


        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;