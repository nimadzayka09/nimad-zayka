import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Loader2, Mail, Phone, MapPin } from "lucide-react";
import { adminApi } from "../../lib/adminApi";

const FILTERS = [
    { key: "", label: "All" },
    { key: "cart", label: "Cart" },
    { key: "contact", label: "Contact" },
    { key: "supplier", label: "Suppliers" },
    { key: "career", label: "Careers" },
    { key: "distributor", label: "Distributors" },
    { key: "influencer", label: "Influencers" },
    { key: "sample", label: "Samples" },
];

function formatDate(d) {
    try {
        return new Date(d).toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    } catch {
        return d;
    }
}

export default function AdminInquiries() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [type, setType] = useState("");
    const [selected, setSelected] = useState(null);

    const load = useCallback(() => {
        setLoading(true);
        adminApi
            .get("/inquiries", { params: type ? { type } : {} })
            .then((r) => setItems(r.data))
            .finally(() => setLoading(false));
    }, [type]);

    useEffect(() => {
        load();
    }, [load]);

    const total = useMemo(() => items.length, [items]);

    return (
        <div data-testid="admin-inquiries-page">
            <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                    <p className="kicker text-brand-chilli">Leads</p>
                    <h1 className="mt-2 font-serif text-4xl text-brand-black">
                        Inquiries ({total})
                    </h1>
                </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
                {FILTERS.map((f) => (
                    <button
                        key={f.key || "all"}
                        data-testid={`inq-filter-${f.key || "all"}`}
                        onClick={() => setType(f.key)}
                        className={`text-xs uppercase tracking-widest px-4 py-2 border transition-colors ${
                            type === f.key
                                ? "bg-brand-black text-brand-parchment border-brand-black"
                                : "border-brand-earth/30 text-brand-earth hover:border-brand-chilli"
                        }`}
                    >
                        {f.label}
                    </button>
                ))}
            </div>

            {loading ? (
                <div className="mt-8 flex items-center gap-2 text-brand-earth/70">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Loading…
                </div>
            ) : items.length === 0 ? (
                <div className="mt-10 bg-white border border-brand-earth/15 p-10 text-center text-brand-earth/70">
                    Abhi koi inquiry nahi aayi.
                </div>
            ) : (
                <div className="mt-8 bg-white border border-brand-earth/15 overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-brand-cream text-brand-earth/80">
                            <tr>
                                <th className="text-left px-4 py-3 font-medium">When</th>
                                <th className="text-left px-4 py-3 font-medium">Type</th>
                                <th className="text-left px-4 py-3 font-medium">Name</th>
                                <th className="text-left px-4 py-3 font-medium">Email</th>
                                <th className="text-left px-4 py-3 font-medium">Phone</th>
                                <th className="text-left px-4 py-3 font-medium">Items</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((i) => (
                                <tr
                                    key={i.id}
                                    data-testid={`inq-row-${i.id}`}
                                    onClick={() => setSelected(i)}
                                    className="border-t border-brand-earth/10 hover:bg-brand-cream/60 cursor-pointer"
                                >
                                    <td className="px-4 py-3 text-brand-earth/80 whitespace-nowrap">
                                        {formatDate(i.created_at)}
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className="text-[10px] uppercase tracking-widest bg-brand-black text-brand-parchment px-2 py-1">
                                            {i.type}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 font-serif text-brand-black">
                                        {i.name}
                                    </td>
                                    <td className="px-4 py-3 text-brand-earth/80">
                                        {i.email}
                                    </td>
                                    <td className="px-4 py-3 text-brand-earth/80">
                                        {i.phone || "—"}
                                    </td>
                                    <td className="px-4 py-3 text-brand-earth/80">
                                        {i.items?.length
                                            ? `${i.items.length} item${
                                                  i.items.length > 1 ? "s" : ""
                                              }`
                                            : "—"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {selected && (
                <div
                    data-testid="inq-detail-modal"
                    onClick={() => setSelected(null)}
                    className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm grid place-items-center p-4"
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="bg-brand-parchment w-full max-w-xl border border-brand-earth/20 shadow-2xl"
                    >
                        <div className="bg-brand-black text-brand-parchment px-6 py-5 flex items-center justify-between">
                            <div>
                                <p className="kicker text-brand-turmeric">
                                    {selected.type}
                                </p>
                                <h3 className="font-serif text-2xl mt-1">
                                    {selected.name}
                                </h3>
                                <p className="text-xs text-brand-parchment/70 mt-1">
                                    {formatDate(selected.created_at)}
                                </p>
                            </div>
                            <button
                                onClick={() => setSelected(null)}
                                data-testid="inq-detail-close"
                                className="text-brand-parchment hover:text-brand-turmeric"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="px-6 py-5 space-y-3 text-sm">
                            <p className="flex items-center gap-2 text-brand-earth">
                                <Mail className="h-4 w-4 text-brand-chilli" />
                                <a
                                    href={`mailto:${selected.email}`}
                                    className="hover:text-brand-chilli"
                                >
                                    {selected.email}
                                </a>
                            </p>
                            {selected.phone && (
                                <p className="flex items-center gap-2 text-brand-earth">
                                    <Phone className="h-4 w-4 text-brand-chilli" />
                                    <a
                                        href={`tel:${selected.phone}`}
                                        className="hover:text-brand-chilli"
                                    >
                                        {selected.phone}
                                    </a>
                                </p>
                            )}
                            {(selected.city || selected.company) && (
                                <p className="flex items-center gap-2 text-brand-earth">
                                    <MapPin className="h-4 w-4 text-brand-chilli" />
                                    {[selected.company, selected.city]
                                        .filter(Boolean)
                                        .join(" · ")}
                                </p>
                            )}
                            {selected.message && (
                                <div>
                                    <p className="kicker text-brand-chilli mb-2">
                                        Message
                                    </p>
                                    <p className="text-brand-earth leading-relaxed bg-white border border-brand-earth/15 p-3">
                                        {selected.message}
                                    </p>
                                </div>
                            )}
                            {selected.items?.length > 0 && (
                                <div>
                                    <p className="kicker text-brand-chilli mb-2">
                                        Cart items
                                    </p>
                                    <ul className="bg-white border border-brand-earth/15 divide-y divide-brand-earth/10">
                                        {selected.items.map((it, idx) => (
                                            <li
                                                key={idx}
                                                className="px-3 py-2 text-sm flex justify-between"
                                            >
                                                <span>
                                                    {it.product_name} ({it.weight}) × {it.quantity}
                                                </span>
                                                <span className="text-brand-chilli">
                                                    ₹{it.price * it.quantity}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
