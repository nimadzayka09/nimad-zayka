import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Package, Inbox, Truck, User, Briefcase, Camera, ShoppingBag, Mail } from "lucide-react";
import { adminApi } from "../../lib/adminApi";

const TYPE_META = {
    cart: { label: "Cart Inquiries", icon: ShoppingBag },
    contact: { label: "Contact Messages", icon: Mail },
    sample: { label: "Sample Requests", icon: ShoppingBag },
    supplier: { label: "Suppliers", icon: Truck },
    career: { label: "Careers", icon: User },
    distributor: { label: "Distributors", icon: Briefcase },
    influencer: { label: "Influencers", icon: Camera },
};

export default function AdminDashboard() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        adminApi
            .get("/admin/stats")
            .then((r) => setStats(r.data))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div data-testid="admin-dashboard">
            <p className="kicker text-brand-chilli">Overview</p>
            <h1 className="mt-2 font-serif text-4xl text-brand-black">
                Nimad Zayka · Admin
            </h1>
            <p className="mt-2 text-brand-earth/80">
                Namaste! Yahaan se poori website manage karein.
            </p>

            <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <Link
                    to="/admin/products"
                    data-testid="dash-products-card"
                    className="group bg-white border border-brand-earth/15 hover:border-brand-chilli p-6 transition-colors"
                >
                    <Package className="h-6 w-6 text-brand-chilli" />
                    <p className="mt-4 font-serif text-4xl text-brand-black">
                        {loading ? "…" : stats?.products ?? 0}
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-widest text-brand-earth/70">
                        Products live
                    </p>
                    <p className="mt-3 text-sm text-brand-earth/80 group-hover:text-brand-chilli transition-colors">
                        Manage catalog →
                    </p>
                </Link>
                <Link
                    to="/admin/inquiries"
                    data-testid="dash-inquiries-card"
                    className="group bg-brand-black text-brand-parchment p-6 border border-transparent hover:border-brand-turmeric transition-colors"
                >
                    <Inbox className="h-6 w-6 text-brand-turmeric" />
                    <p className="mt-4 font-serif text-4xl text-brand-turmeric">
                        {loading ? "…" : stats?.inquiries ?? 0}
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-widest text-brand-parchment/70">
                        Total inquiries
                    </p>
                    <p className="mt-3 text-sm text-brand-parchment/80 group-hover:text-brand-turmeric transition-colors">
                        View leads →
                    </p>
                </Link>
                <Link
                    to="/admin/settings"
                    data-testid="dash-settings-card"
                    className="group bg-brand-turmeric text-brand-black p-6 border border-transparent hover:border-brand-black transition-colors"
                >
                    <i className="fa-solid fa-sliders text-xl" />
                    <p className="mt-4 font-serif text-xl">
                        Edit hero, phone, email & WhatsApp
                    </p>
                    <p className="mt-3 text-sm group-hover:translate-x-1 transition-transform">
                        Open site settings →
                    </p>
                </Link>
            </div>

            {stats && (
                <div className="mt-12">
                    <p className="kicker text-brand-chilli">By type</p>
                    <h2 className="mt-2 font-serif text-2xl text-brand-black">
                        Inquiry breakdown
                    </h2>
                    <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {Object.entries(TYPE_META).map(([key, meta]) => {
                            const count = stats.inquiries_by_type?.[key] ?? 0;
                            const Icon = meta.icon;
                            return (
                                <div
                                    key={key}
                                    data-testid={`dash-type-${key}`}
                                    className="bg-white border border-brand-earth/15 p-5"
                                >
                                    <div className="flex items-center gap-3">
                                        <Icon className="h-5 w-5 text-brand-chilli" />
                                        <p className="text-xs uppercase tracking-widest text-brand-earth/70">
                                            {meta.label}
                                        </p>
                                    </div>
                                    <p className="mt-3 font-serif text-3xl text-brand-black">
                                        {count}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
