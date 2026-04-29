import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ShoppingBag, Menu, X } from "lucide-react";
import Logo from "./Logo";
import { useCart } from "../context/CartContext";

const links = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/products", label: "Products" },
    { to: "/csr", label: "CSR" },
    { to: "/join-us", label: "Join Us" },
    { to: "/contact", label: "Contact" },
];

export const Navbar = () => {
    const [open, setOpen] = useState(false);
    const { count, openCart } = useCart();

    return (
        <header
            data-testid="site-navbar"
            className="sticky top-0 z-40 bg-brand-black/95 backdrop-blur border-b border-white/10"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="h-28 flex items-center justify-between gap-4">
                    <Link
                        to="/"
                        data-testid="nav-home-logo"
                        className="flex items-center gap-3"
                    >
                        <Logo className="h-20 w-auto" />
                        <div className="hidden sm:flex flex-col leading-tight">
                            <span className="text-brand-parchment font-serif text-lg">
                                Nimad Zayka
                            </span>
                            <span className="text-brand-turmeric/90 text-[10px] uppercase tracking-[0.25em]">
                                Since 1990
                            </span>
                        </div>
                    </Link>

                    <nav className="hidden lg:flex items-center gap-8">
                        {links.map((l) => (
                            <NavLink
                                key={l.to}
                                to={l.to}
                                data-testid={`nav-link-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
                                className={({ isActive }) =>
                                    `text-sm font-medium tracking-wide transition-colors ${
                                        isActive
                                            ? "text-brand-turmeric"
                                            : "text-brand-parchment/85 hover:text-brand-turmeric"
                                    }`
                                }
                                end={l.to === "/"}
                            >
                                {l.label}
                            </NavLink>
                        ))}
                    </nav>

                    <div className="flex items-center gap-3">
                        <button
                            data-testid="nav-open-cart-btn"
                            onClick={openCart}
                            className="relative flex items-center gap-2 text-brand-parchment border border-white/15 hover:border-brand-turmeric px-3 py-2 rounded-sm transition-colors"
                            aria-label="Open inquiry cart"
                        >
                            <ShoppingBag className="h-4 w-4" />
                            <span className="hidden sm:inline text-xs uppercase tracking-widest">
                                Inquiry
                            </span>
                            {count > 0 && (
                                <span
                                    data-testid="nav-cart-count"
                                    className="absolute -top-2 -right-2 bg-brand-turmeric text-brand-black text-[11px] font-bold h-5 w-5 rounded-full grid place-items-center"
                                >
                                    {count}
                                </span>
                            )}
                        </button>
                        <button
                            data-testid="nav-mobile-toggle"
                            onClick={() => setOpen((v) => !v)}
                            className="lg:hidden text-brand-parchment p-2"
                            aria-label="Toggle menu"
                        >
                            {open ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>

                {open && (
                    <div className="lg:hidden pb-4 flex flex-col gap-1">
                        {links.map((l) => (
                            <NavLink
                                key={l.to}
                                to={l.to}
                                onClick={() => setOpen(false)}
                                data-testid={`mnav-link-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
                                className={({ isActive }) =>
                                    `px-3 py-3 rounded-sm text-sm font-medium ${
                                        isActive
                                            ? "bg-brand-maroon text-brand-turmeric"
                                            : "text-brand-parchment/85 hover:bg-white/5"
                                    }`
                                }
                                end={l.to === "/"}
                            >
                                {l.label}
                            </NavLink>
                        ))}
                    </div>
                )}
            </div>
        </header>
    );
};

export default Navbar;
