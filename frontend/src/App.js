import React from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { SettingsProvider } from "@/context/SettingsContext";
import Layout from "@/components/Layout";
import ScrollToTop from "@/components/ScrollToTop";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Products from "@/pages/Products";
import CSR from "@/pages/CSR";
import JoinUs from "@/pages/JoinUs";
import Contact from "@/pages/Contact";
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminProducts from "@/pages/admin/AdminProducts";
import AdminInquiries from "@/pages/admin/AdminInquiries";
import AdminSettings from "@/pages/admin/AdminSettings";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminProtectedRoute from "@/components/admin/AdminProtectedRoute";

function App() {
    return (
        <div className="App">
            <SettingsProvider>
                <AuthProvider>
                    <CartProvider>
                        <BrowserRouter>
                            <ScrollToTop />
                            <Routes>
                                <Route element={<Layout />}>
                                    <Route index element={<Home />} />
                                    <Route path="/about" element={<About />} />
                                    <Route path="/products" element={<Products />} />
                                    <Route path="/csr" element={<CSR />} />
                                    <Route path="/join-us" element={<JoinUs />} />
                                    <Route path="/contact" element={<Contact />} />
                                </Route>
                                <Route path="/admin/login" element={<AdminLogin />} />
                                <Route
                                    path="/admin"
                                    element={
                                        <AdminProtectedRoute>
                                            <AdminLayout />
                                        </AdminProtectedRoute>
                                    }
                                >
                                    <Route index element={<AdminDashboard />} />
                                    <Route path="products" element={<AdminProducts />} />
                                    <Route path="inquiries" element={<AdminInquiries />} />
                                    <Route path="settings" element={<AdminSettings />} />
                                </Route>
                            </Routes>
                        </BrowserRouter>
                    </CartProvider>
                </AuthProvider>
            </SettingsProvider>
        </div>
    );
}

export default App;
