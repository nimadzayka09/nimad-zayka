import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    Package,
    Inbox,
    Settings as SettingsIcon,
    LogOut,
    ExternalLink,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import Logo from "../Logo";

const links = [
    { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
    { to: "/admin/products", label: "Products", icon: Package, end: false },
    { to: "/admin/inquiries", label: "Inquiries", icon: Inbox, end: false },
    { to: "/admin/settings", label: "Settings", icon: SettingsIcon, end: false },
];

export const AdminLayout = () => {
    const { admin, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/admin/login", { replace: true });
    };

    return (
        <div
            data-testid="admin-layout"
            className="min-h-screen bg-brand-parchment flex"
        >
            <aside className="hidden lg:flex lg:w-64 flex-col bg-brand-black text-brand-parchment sticky top-0 h-screen">
                <div className="px-6 py-6 border-b border-white/10">
                    <Logo className="h-12 w-auto" />
                    <p className="mt-3 text-[10px] uppercase tracking-[0.28em] text-brand-turmeric">
                        Admin Console
                    </p>
                </div>
                <nav className="flex-1 px-3 py-6 space-y-1">
                    {links.map((l) => (
                        <NavLink
                            key={l.to}
                            to={l.to}
                            end={l.end}
                            data-testid={`admin-nav-${l.label.toLowerCase()}`}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2.5 text-sm transition-colors ${
                                    isActive
                                        ? "bg-brand-chilli text-brand-parchment"
                                        : "text-brand-parchment/80 hover:bg-white/5 hover:text-brand-turmeric"
                                }`
                            }
                        >
                            <l.icon className="h-4 w-4" />
                            {l.label}
                        </NavLink>
                    ))}
                </nav>
                <div className="px-3 py-4 border-t border-white/10 space-y-2">
                    <a
                        href="/"
                        target="_blank"
                        rel="noreferrer"
                        data-testid="admin-open-site"
                        className="flex items-center gap-3 px-3 py-2 text-xs uppercase tracking-widest text-brand-parchment/70 hover:text-brand-turmeric"
                    >
                        <ExternalLink className="h-4 w-4" />
                        View Site
                    </a>
                    <button
                        data-testid="admin-logout-btn"
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2 text-xs uppercase tracking-widest text-brand-chilli hover:text-brand-turmeric"
                    >
                        <LogOut className="h-4 w-4" />
                        Log out
                    </button>
                    <p className="px-3 pt-2 text-[10px] text-brand-parchment/50 border-t border-white/10">
                        {admin?.email}
                    </p>
                </div>
            </aside>

            {/* MOBILE TOPBAR */}
            <div className="lg:hidden fixed top-0 inset-x-0 z-40 bg-brand-black text-brand-parchment border-b border-white/10">
                <div className="px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Logo className="h-8 w-auto" />
                        <span className="text-[10px] uppercase tracking-[0.28em] text-brand-turmeric">
                            Admin
                        </span>
                    </div>
                    <button
                        data-testid="admin-logout-mobile"
                        onClick={handleLogout}
                        className="text-xs uppercase tracking-widest text-brand-chilli"
                    >
                        Log out
                    </button>
                </div>
                <nav className="flex overflow-x-auto">
                    {links.map((l) => (
                        <NavLink
                            key={l.to}
                            to={l.to}
                            end={l.end}
                            className={({ isActive }) =>
                                `px-4 py-3 text-xs uppercase tracking-widest whitespace-nowrap ${
                                    isActive
                                        ? "bg-brand-chilli text-brand-parchment"
                                        : "text-brand-parchment/75"
                                }`
                            }
                        >
                            {l.label}
                        </NavLink>
                    ))}
                </nav>
            </div>

            <main className="flex-1 lg:pl-0 pt-28 lg:pt-0">
                <div className="max-w-6xl mx-auto px-4 sm:px-8 py-10">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
