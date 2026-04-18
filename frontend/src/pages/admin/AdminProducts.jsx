import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Loader2, Plus, Pencil, Trash2, X, Star, StarOff } from "lucide-react";
import { adminApi } from "../../lib/adminApi";
import { toast } from "sonner";

const emptyProduct = {
    slug: "",
    name: "",
    local_name: "",
    category: "standard_pouch",
    short_description: "",
    long_description: "",
    image: "",
    variants: [{ weight: "100g", price: 0 }],
    tags: [],
    is_featured: false,
};

function ProductForm({ initial, onClose, onSaved, isEdit }) {
    const [form, setForm] = useState(initial);
    const [submitting, setSubmitting] = useState(false);

    const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));
    const setVariant = (idx, k, v) =>
        setForm((f) => ({
            ...f,
            variants: f.variants.map((x, i) => (i === idx ? { ...x, [k]: v } : x)),
        }));
    const addVariant = () =>
        setForm((f) => ({
            ...f,
            variants: [...f.variants, { weight: "", price: 0 }],
        }));
    const removeVariant = (idx) =>
        setForm((f) => ({
            ...f,
            variants: f.variants.filter((_, i) => i !== idx),
        }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.slug || !form.name || !form.image) {
            toast.error("Slug, name aur image required hain.");
            return;
        }
        const payload = {
            ...form,
            tags: Array.isArray(form.tags)
                ? form.tags
                : String(form.tags || "")
                      .split(",")
                      .map((t) => t.trim())
                      .filter(Boolean),
            variants: form.variants
                .filter((v) => v.weight && v.price > 0)
                .map((v) => ({ weight: v.weight, price: Number(v.price) })),
        };
        if (payload.variants.length === 0) {
            toast.error("Kam se kam ek variant chahiye.");
            return;
        }
        try {
            setSubmitting(true);
            if (isEdit) {
                const { slug: _s, ...rest } = payload;
                await adminApi.put(`/admin/products/${form.slug}`, rest);
                toast.success("Product updated.");
            } else {
                await adminApi.post("/admin/products", payload);
                toast.success("Product created.");
            }
            onSaved();
            onClose();
        } catch (err) {
            toast.error(err.response?.data?.detail ?? "Save failed");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div
            data-testid="product-form-modal"
            className="fixed inset-0 z-50 grid place-items-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto"
            onClick={onClose}
        >
            <form
                onClick={(e) => e.stopPropagation()}
                onSubmit={handleSubmit}
                className="w-full max-w-3xl bg-brand-parchment border border-brand-earth/20 shadow-2xl my-10"
                data-testid="product-form"
            >
                <div className="bg-brand-black text-brand-parchment px-6 py-5 flex items-center justify-between">
                    <div>
                        <p className="kicker text-brand-turmeric">
                            {isEdit ? "Edit" : "New"} product
                        </p>
                        <h3 className="font-serif text-2xl mt-1">
                            {form.name || "Untitled product"}
                        </h3>
                    </div>
                    <button
                        type="button"
                        data-testid="product-form-close"
                        onClick={onClose}
                        className="text-brand-parchment hover:text-brand-turmeric"
                    >
                        <X />
                    </button>
                </div>
                <div className="px-6 py-5 grid sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2 grid sm:grid-cols-3 gap-3">
                        <input
                            data-testid="pf-slug"
                            required
                            disabled={isEdit}
                            placeholder="slug (e.g. meat-masala-premium)"
                            value={form.slug}
                            onChange={(e) =>
                                update("slug", e.target.value.trim().toLowerCase())
                            }
                            className="border border-brand-earth/25 bg-white px-3 py-2 text-sm disabled:bg-brand-cream"
                        />
                        <input
                            data-testid="pf-name"
                            required
                            placeholder="Display name"
                            value={form.name}
                            onChange={(e) => update("name", e.target.value)}
                            className="border border-brand-earth/25 bg-white px-3 py-2 text-sm"
                        />
                        <input
                            data-testid="pf-local"
                            placeholder="Local name (e.g. Haldi)"
                            value={form.local_name}
                            onChange={(e) => update("local_name", e.target.value)}
                            className="border border-brand-earth/25 bg-white px-3 py-2 text-sm"
                        />
                    </div>
                    <select
                        data-testid="pf-category"
                        value={form.category}
                        onChange={(e) => update("category", e.target.value)}
                        className="border border-brand-earth/25 bg-white px-3 py-2 text-sm"
                    >
                        <option value="standard_pouch">Standard Pouch</option>
                        <option value="premium_box">Premium Box</option>
                    </select>
                    <label className="flex items-center gap-3 text-sm">
                        <input
                            data-testid="pf-featured"
                            type="checkbox"
                            checked={form.is_featured}
                            onChange={(e) => update("is_featured", e.target.checked)}
                            className="h-4 w-4"
                        />
                        Feature on home page
                    </label>
                    <input
                        data-testid="pf-image"
                        required
                        placeholder="Image URL"
                        value={form.image}
                        onChange={(e) => update("image", e.target.value)}
                        className="sm:col-span-2 border border-brand-earth/25 bg-white px-3 py-2 text-sm"
                    />
                    <input
                        data-testid="pf-tags"
                        placeholder="Tags (comma-separated)"
                        value={Array.isArray(form.tags) ? form.tags.join(", ") : form.tags}
                        onChange={(e) => update("tags", e.target.value)}
                        className="sm:col-span-2 border border-brand-earth/25 bg-white px-3 py-2 text-sm"
                    />
                    <textarea
                        data-testid="pf-short"
                        required
                        rows={2}
                        placeholder="Short description (for cards)"
                        value={form.short_description}
                        onChange={(e) => update("short_description", e.target.value)}
                        className="sm:col-span-2 border border-brand-earth/25 bg-white px-3 py-2 text-sm resize-none"
                    />
                    <textarea
                        data-testid="pf-long"
                        required
                        rows={4}
                        placeholder="Long description"
                        value={form.long_description}
                        onChange={(e) => update("long_description", e.target.value)}
                        className="sm:col-span-2 border border-brand-earth/25 bg-white px-3 py-2 text-sm resize-none"
                    />

                    <div className="sm:col-span-2">
                        <p className="kicker text-brand-chilli mb-3">
                            Variants
                        </p>
                        <div className="space-y-2">
                            {form.variants.map((v, i) => (
                                <div key={i} className="flex gap-2">
                                    <input
                                        data-testid={`pf-variant-weight-${i}`}
                                        placeholder="Weight (e.g. 100g)"
                                        value={v.weight}
                                        onChange={(e) =>
                                            setVariant(i, "weight", e.target.value)
                                        }
                                        className="flex-1 border border-brand-earth/25 bg-white px-3 py-2 text-sm"
                                    />
                                    <input
                                        data-testid={`pf-variant-price-${i}`}
                                        type="number"
                                        placeholder="Price ₹"
                                        value={v.price}
                                        onChange={(e) =>
                                            setVariant(i, "price", e.target.value)
                                        }
                                        className="w-32 border border-brand-earth/25 bg-white px-3 py-2 text-sm"
                                    />
                                    <button
                                        type="button"
                                        data-testid={`pf-variant-remove-${i}`}
                                        onClick={() => removeVariant(i)}
                                        className="px-3 text-brand-chilli hover:bg-brand-chilli hover:text-brand-parchment border border-brand-chilli"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <button
                            type="button"
                            data-testid="pf-add-variant"
                            onClick={addVariant}
                            className="mt-3 text-sm text-brand-chilli hover:underline"
                        >
                            + Add variant
                        </button>
                    </div>
                </div>
                <div className="px-6 py-5 border-t border-brand-earth/15 bg-white flex justify-end gap-3">
                    <button
                        type="button"
                        data-testid="pf-cancel"
                        onClick={onClose}
                        className="px-6 py-2.5 border border-brand-earth/30 text-brand-earth hover:bg-brand-cream"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        data-testid="pf-save"
                        disabled={submitting}
                        className="btn-primary-brand disabled:opacity-60"
                    >
                        {submitting ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Saving…
                            </>
                        ) : isEdit ? (
                            "Save changes"
                        ) : (
                            "Create product"
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default function AdminProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("all");
    const [showForm, setShowForm] = useState(null); // null | "new" | productObj

    const load = useCallback(() => {
        setLoading(true);
        adminApi
            .get("/products")
            .then((r) => setProducts(r.data))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        load();
    }, [load]);

    const visible = useMemo(() => {
        if (filter === "all") return products;
        return products.filter((p) => p.category === filter);
    }, [filter, products]);

    const handleDelete = async (slug) => {
        if (!window.confirm(`Delete ${slug}? Yeh undo nahi hoga.`)) return;
        try {
            await adminApi.delete(`/admin/products/${slug}`);
            toast.success("Product deleted.");
            load();
        } catch (err) {
            toast.error(err.response?.data?.detail ?? "Delete failed");
        }
    };

    const handleToggleFeatured = async (p) => {
        try {
            await adminApi.put(`/admin/products/${p.slug}`, {
                is_featured: !p.is_featured,
            });
            toast.success(
                p.is_featured ? "Removed from featured" : "Marked as featured",
            );
            load();
        } catch (err) {
            toast.error(err.response?.data?.detail ?? "Update failed");
        }
    };

    return (
        <div data-testid="admin-products-page">
            <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                    <p className="kicker text-brand-chilli">Catalog</p>
                    <h1 className="mt-2 font-serif text-4xl text-brand-black">
                        Products ({products.length})
                    </h1>
                </div>
                <button
                    data-testid="admin-new-product-btn"
                    onClick={() => setShowForm("new")}
                    className="btn-primary-brand"
                >
                    <Plus className="h-4 w-4" />
                    New Product
                </button>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
                {[
                    ["all", "All"],
                    ["standard_pouch", "Standard Pouch"],
                    ["premium_box", "Premium Box"],
                ].map(([k, l]) => (
                    <button
                        key={k}
                        data-testid={`admin-filter-${k}`}
                        onClick={() => setFilter(k)}
                        className={`text-xs uppercase tracking-widest px-4 py-2 border transition-colors ${
                            filter === k
                                ? "bg-brand-black text-brand-parchment border-brand-black"
                                : "border-brand-earth/30 text-brand-earth hover:border-brand-chilli"
                        }`}
                    >
                        {l}
                    </button>
                ))}
            </div>

            {loading ? (
                <div className="mt-8 text-brand-earth/70">Loading products…</div>
            ) : (
                <div
                    data-testid="admin-products-table"
                    className="mt-8 bg-white border border-brand-earth/15 overflow-x-auto"
                >
                    <table className="w-full text-sm">
                        <thead className="bg-brand-cream text-brand-earth/80">
                            <tr>
                                <th className="text-left px-4 py-3 font-medium">Product</th>
                                <th className="text-left px-4 py-3 font-medium">Category</th>
                                <th className="text-left px-4 py-3 font-medium">Variants</th>
                                <th className="text-left px-4 py-3 font-medium">Featured</th>
                                <th className="text-right px-4 py-3 font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {visible.map((p) => (
                                <tr
                                    key={p.slug}
                                    data-testid={`admin-row-${p.slug}`}
                                    className="border-t border-brand-earth/10"
                                >
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={p.image}
                                                alt={p.name}
                                                className="h-12 w-12 object-cover border border-brand-earth/15"
                                            />
                                            <div>
                                                <p className="font-serif text-base text-brand-black">
                                                    {p.name}
                                                </p>
                                                <p className="text-xs text-brand-earth/60">
                                                    {p.slug}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-brand-earth/80">
                                        {p.category === "premium_box"
                                            ? "Premium Box"
                                            : "Standard Pouch"}
                                    </td>
                                    <td className="px-4 py-3 text-brand-earth/80">
                                        {p.variants
                                            .map((v) => `${v.weight} ₹${v.price}`)
                                            .join(" · ")}
                                    </td>
                                    <td className="px-4 py-3">
                                        <button
                                            data-testid={`admin-feat-${p.slug}`}
                                            onClick={() => handleToggleFeatured(p)}
                                            className={`flex items-center gap-1 text-xs ${
                                                p.is_featured
                                                    ? "text-brand-turmeric"
                                                    : "text-brand-earth/50 hover:text-brand-turmeric"
                                            }`}
                                        >
                                            {p.is_featured ? (
                                                <Star className="h-4 w-4 fill-current" />
                                            ) : (
                                                <StarOff className="h-4 w-4" />
                                            )}
                                            {p.is_featured ? "Featured" : "Off"}
                                        </button>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                data-testid={`admin-edit-${p.slug}`}
                                                onClick={() => setShowForm(p)}
                                                className="p-2 border border-brand-earth/25 text-brand-earth hover:border-brand-chilli hover:text-brand-chilli"
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </button>
                                            <button
                                                data-testid={`admin-del-${p.slug}`}
                                                onClick={() => handleDelete(p.slug)}
                                                className="p-2 border border-brand-chilli text-brand-chilli hover:bg-brand-chilli hover:text-brand-parchment"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {visible.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="px-4 py-10 text-center text-brand-earth/60"
                                    >
                                        No products. Click "New Product" to add one.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {showForm && (
                <ProductForm
                    isEdit={showForm !== "new"}
                    initial={
                        showForm === "new"
                            ? emptyProduct
                            : {
                                  ...showForm,
                                  tags: showForm.tags ?? [],
                              }
                    }
                    onClose={() => setShowForm(null)}
                    onSaved={load}
                />
            )}
        </div>
    );
}
