import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { toast } from "sonner";

export const ProductCard = ({ product }) => {
    const { addItem } = useCart();
    const [variantIdx, setVariantIdx] = useState(0);
    const variant = product.variants[variantIdx];

    const add = () => {
        addItem({
            product_slug: product.slug,
            product_name: product.name,
            weight: variant.weight,
            price: variant.price,
            quantity: 1,
        });
        toast.success(`${product.local_name} (${variant.weight}) added to inquiry`);
    };

    return (
        <article
            data-testid={`product-card-${product.slug}`}
            className="group bg-white border border-brand-earth/15 hover:border-brand-chilli/60 transition-colors duration-300 flex flex-col"
        >
            <div className="relative overflow-hidden aspect-square bg-brand-cream">
                <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 bg-brand-black/80 text-brand-parchment text-[10px] uppercase tracking-widest px-2 py-1">
                    {product.category === "premium_box"
                        ? "Premium Box"
                        : "Standard Pouch"}
                </span>
                {product.is_featured && (
                    <span className="absolute top-3 right-3 bg-brand-turmeric text-brand-black text-[10px] uppercase tracking-widest px-2 py-1 font-bold">
                        Bestseller
                    </span>
                )}
            </div>

            <div className="p-5 flex flex-col flex-1">
                <p className="kicker text-brand-chilli mb-1">
                    {product.local_name}
                </p>
                <h3 className="font-serif text-xl text-brand-black leading-tight">
                    {product.name}
                </h3>
                <p className="mt-2 text-sm text-brand-earth/80 leading-relaxed line-clamp-2">
                    {product.short_description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                    {product.variants.map((v, idx) => (
                        <button
                            key={v.weight}
                            data-testid={`variant-${product.slug}-${v.weight}`}
                            onClick={() => setVariantIdx(idx)}
                            className={`text-xs px-3 py-1 border transition-colors ${
                                idx === variantIdx
                                    ? "bg-brand-black text-brand-parchment border-brand-black"
                                    : "bg-transparent border-brand-earth/30 text-brand-earth hover:border-brand-chilli"
                            }`}
                        >
                            {v.weight}
                        </button>
                    ))}
                </div>

                <div className="mt-auto pt-5 flex items-center justify-between">
                    <div>
                        <p className="text-[11px] uppercase tracking-widest text-brand-earth/60">
                            Price
                        </p>
                        <p className="font-serif text-2xl text-brand-chilli">
                            ₹{variant.price}
                        </p>
                    </div>
                    <button
                        data-testid={`add-to-cart-btn-${product.slug}`}
                        onClick={add}
                        className="btn-primary-brand text-sm px-5 py-2.5"
                    >
                        <i className="fa-solid fa-basket-shopping text-xs" />
                        Add to Inquiry
                    </button>
                </div>
            </div>
        </article>
    );
};

export default ProductCard;
