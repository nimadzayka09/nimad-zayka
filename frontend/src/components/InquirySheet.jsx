import React, { useState } from "react";
import { X, Trash2, Minus, Plus, Loader2 } from "lucide-react";
import { useCart } from "../context/CartContext";
import { submitInquiry } from "../lib/api";
import { toast } from "sonner";

export const InquirySheet = () => {
    const { items, open, closeCart, count, subtotal, updateQty, removeItem, clear } =
        useCart();

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        city: "",
        message: "",
    });
    const [submitting, setSubmitting] = useState(false);

    const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (items.length === 0) {
            toast.error("Your inquiry list is empty. Add some spices first.");
            return;
        }
        if (!form.name || !form.email) {
            toast.error("Please fill your name and email.");
            return;
        }
        try {
            setSubmitting(true);
            await submitInquiry({
                type: "cart",
                ...form,
                items,
            });
            toast.success(
                "Inquiry received! Our team will reach out within 24 hours.",
            );
            clear();
            closeCart();
            setForm({ name: "", email: "", phone: "", city: "", message: "" });
        } catch (err) {
            toast.error("Could not submit inquiry. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            {open && (
                <div
                    data-testid="cart-backdrop"
                    className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
                    onClick={closeCart}
                />
            )}
            <aside
                data-testid="inquiry-cart-sheet"
                className={`fixed top-0 right-0 h-full w-full sm:w-[460px] bg-brand-parchment z-50 shadow-2xl transition-transform duration-300 flex flex-col ${
                    open ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <div className="bg-brand-black text-brand-parchment px-5 py-5 flex items-center justify-between">
                    <div>
                        <p className="kicker text-brand-turmeric">
                            Inquiry Cart
                        </p>
                        <h3 className="text-xl font-serif mt-1">
                            {count} {count === 1 ? "item" : "items"} —
                            ₹{subtotal}
                        </h3>
                    </div>
                    <button
                        data-testid="cart-close-btn"
                        onClick={closeCart}
                        className="text-brand-parchment hover:text-brand-turmeric"
                        aria-label="Close cart"
                    >
                        <X />
                    </button>
                </div>
                <div className="pithora-divider-light" />

                <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
                    {items.length === 0 ? (
                        <div className="text-center py-16">
                            <i className="fa-solid fa-basket-shopping text-4xl text-brand-chilli/30 mb-4" />
                            <p className="font-serif text-xl text-brand-earth">
                                Your inquiry list is empty.
                            </p>
                            <p className="text-sm text-brand-earth/70 mt-1">
                                Browse products and add the spices you love.
                            </p>
                        </div>
                    ) : (
                        items.map((it) => {
                            const key = `${it.product_slug}__${it.weight}`;
                            return (
                                <div
                                    key={key}
                                    data-testid={`cart-item-${it.product_slug}-${it.weight}`}
                                    className="flex items-center gap-3 border border-brand-earth/15 p-3 bg-white"
                                >
                                    <div className="flex-1">
                                        <p className="font-serif text-base">
                                            {it.product_name}
                                        </p>
                                        <p className="text-xs text-brand-earth/70">
                                            {it.weight} · ₹{it.price}
                                        </p>
                                        <div className="mt-2 inline-flex items-center border border-brand-earth/20">
                                            <button
                                                data-testid={`cart-qty-dec-${key}`}
                                                onClick={() =>
                                                    updateQty(key, it.quantity - 1)
                                                }
                                                className="px-2 py-1 hover:bg-brand-cream"
                                                aria-label="Decrease"
                                            >
                                                <Minus className="h-3 w-3" />
                                            </button>
                                            <span className="px-3 text-sm">
                                                {it.quantity}
                                            </span>
                                            <button
                                                data-testid={`cart-qty-inc-${key}`}
                                                onClick={() =>
                                                    updateQty(key, it.quantity + 1)
                                                }
                                                className="px-2 py-1 hover:bg-brand-cream"
                                                aria-label="Increase"
                                            >
                                                <Plus className="h-3 w-3" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium">
                                            ₹{it.quantity * it.price}
                                        </p>
                                        <button
                                            data-testid={`cart-remove-${key}`}
                                            onClick={() => removeItem(key)}
                                            className="mt-2 text-brand-chilli hover:text-brand-maroon"
                                            aria-label="Remove"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                <form
                    onSubmit={handleSubmit}
                    data-testid="inquiry-cart-form"
                    className="border-t border-brand-earth/15 px-5 py-4 bg-white space-y-3"
                >
                    <p className="kicker text-brand-chilli">Submit inquiry</p>
                    <div className="grid grid-cols-2 gap-3">
                        <input
                            data-testid="cart-input-name"
                            value={form.name}
                            onChange={(e) => update("name", e.target.value)}
                            required
                            placeholder="Your name *"
                            className="col-span-2 border border-brand-earth/25 px-3 py-2 text-sm focus:outline-none focus:border-brand-chilli bg-brand-parchment"
                        />
                        <input
                            data-testid="cart-input-email"
                            type="email"
                            value={form.email}
                            onChange={(e) => update("email", e.target.value)}
                            required
                            placeholder="Email *"
                            className="border border-brand-earth/25 px-3 py-2 text-sm focus:outline-none focus:border-brand-chilli bg-brand-parchment"
                        />
                        <input
                            data-testid="cart-input-phone"
                            value={form.phone}
                            onChange={(e) => update("phone", e.target.value)}
                            placeholder="Phone"
                            className="border border-brand-earth/25 px-3 py-2 text-sm focus:outline-none focus:border-brand-chilli bg-brand-parchment"
                        />
                        <input
                            data-testid="cart-input-city"
                            value={form.city}
                            onChange={(e) => update("city", e.target.value)}
                            placeholder="City"
                            className="col-span-2 border border-brand-earth/25 px-3 py-2 text-sm focus:outline-none focus:border-brand-chilli bg-brand-parchment"
                        />
                        <textarea
                            data-testid="cart-input-message"
                            value={form.message}
                            onChange={(e) => update("message", e.target.value)}
                            rows={2}
                            placeholder="Any special requirements (bulk / retail / gifting)..."
                            className="col-span-2 border border-brand-earth/25 px-3 py-2 text-sm focus:outline-none focus:border-brand-chilli bg-brand-parchment resize-none"
                        />
                    </div>
                    <button
                        data-testid="cart-submit-inquiry-btn"
                        type="submit"
                        disabled={submitting}
                        className="btn-primary-brand w-full disabled:opacity-60"
                    >
                        {submitting ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Submitting…
                            </>
                        ) : (
                            <>
                                Submit Inquiry · ₹{subtotal}
                                <i className="fa-solid fa-paper-plane text-xs" />
                            </>
                        )}
                    </button>
                    <p className="text-[11px] text-brand-earth/70 text-center">
                        No payment now. Our Indore team confirms availability &
                        price.
                    </p>
                </form>
            </aside>
        </>
    );
};

export default InquirySheet;
