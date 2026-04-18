import React, { useEffect, useMemo, useState } from "react";
import { fetchProducts } from "../lib/api";
import ProductCard from "../components/ProductCard";
import PithoraDivider from "../components/PithoraDivider";

const FILTERS = [
    { key: "all", label: "All Spices" },
    { key: "standard_pouch", label: "Standard Pouch" },
    { key: "premium_box", label: "Premium Box" },
];

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        setLoading(true);
        fetchProducts()
            .then((data) => setProducts(data))
            .finally(() => setLoading(false));
    }, []);

    const visible = useMemo(() => {
        if (filter === "all") return products;
        return products.filter((p) => p.category === filter);
    }, [filter, products]);

    return (
        <div data-testid="products-page">
            <section className="bg-brand-black text-brand-parchment py-20 lg:py-28 relative overflow-hidden">
                <div
                    className="absolute inset-0 opacity-20 bg-cover bg-center"
                    style={{
                        backgroundImage:
                            "url('https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1920&q=80')",
                    }}
                />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="kicker text-brand-turmeric">
                        The Spice Collection
                    </p>
                    <h1 className="mt-3 font-serif text-5xl sm:text-6xl leading-tight">
                        Ground, blended &{" "}
                        <span className="italic text-brand-turmeric">
                            packed fresh.
                        </span>
                    </h1>
                    <p className="mt-5 max-w-2xl text-brand-parchment/80 text-lg">
                        Choose your favourites — we'll confirm availability,
                        dispatch times and bulk pricing personally.
                    </p>
                </div>
                <PithoraDivider variant="light" className="mt-16" />
            </section>

            <section className="bg-parchment py-16 lg:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap gap-2 mb-10">
                        {FILTERS.map((f) => (
                            <button
                                key={f.key}
                                data-testid={`filter-${f.key}`}
                                onClick={() => setFilter(f.key)}
                                className={`text-sm uppercase tracking-widest px-5 py-2.5 border transition-colors ${
                                    filter === f.key
                                        ? "bg-brand-black text-brand-parchment border-brand-black"
                                        : "border-brand-earth/30 text-brand-earth hover:border-brand-chilli hover:text-brand-chilli"
                                }`}
                            >
                                {f.label}
                            </button>
                        ))}
                    </div>

                    {loading ? (
                        <div
                            data-testid="products-loading"
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {Array.from({ length: 6 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="h-[420px] bg-white/60 border border-brand-earth/10 animate-pulse"
                                />
                            ))}
                        </div>
                    ) : visible.length === 0 ? (
                        <p
                            data-testid="products-empty"
                            className="text-brand-earth"
                        >
                            No products in this category yet.
                        </p>
                    ) : (
                        <div
                            data-testid="products-grid"
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {visible.map((p) => (
                                <ProductCard key={p.slug} product={p} />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Products;
