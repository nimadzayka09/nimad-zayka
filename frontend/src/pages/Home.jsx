import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProducts } from "../lib/api";
import { BRAND, JOURNEY_STEPS } from "../lib/brand";
import ProductCard from "../components/ProductCard";
import HeroSlider from "../components/HeroSlider";

const Home = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts({ featured: true })
            .then(setProducts)
            .catch(() => setProducts([]));
    }, []);

    return (
        <div data-testid="home-page">
            <HeroSlider />

            {/* STORY OF NIMAD */}
            <section className="bg-parchment py-20 lg:py-28 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-2xl">
                        <p className="kicker text-brand-chilli">
                            The Story of Nimad
                        </p>
                        <h2 className="mt-3 font-serif text-4xl sm:text-5xl text-brand-black leading-tight">
                            Tradition behind{" "}
                            <span className="italic text-brand-chilli">
                                every spice.
                            </span>
                        </h2>
                        <p className="mt-5 text-brand-earth text-base leading-relaxed">
                            Five hands, five generations of wisdom — from the
                            farmers of Rajpur to the grandmothers grinding on
                            warm Nimadi soil. This is the journey every Nimad
                            Zayka masala travels before it enters your kitchen.
                        </p>
                    </div>

                    <div className="mt-10 relative border border-brand-earth/20 shadow-xl bg-white">
                        <img
                            src={BRAND.journey}
                            alt="Tradition Behind Every Spice — the Nimadi spice-making journey"
                            className="w-full block"
                        />
                    </div>

                    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
                        {JOURNEY_STEPS.map((step, i) => (
                            <div
                                key={step.title}
                                data-testid={`journey-step-${i}`}
                                className="relative bg-white border border-brand-earth/15 p-5 hover:border-brand-chilli transition-colors group"
                            >
                                <div className="absolute -top-3 -left-3 h-8 w-8 bg-brand-chilli text-brand-parchment grid place-items-center font-serif text-sm">
                                    {i + 1}
                                </div>
                                <i
                                    className={`${step.icon} text-2xl text-brand-turmeric`}
                                />
                                <h3 className="mt-3 font-serif text-lg text-brand-black">
                                    {step.title}
                                </h3>
                                <p className="mt-1 text-xs text-brand-earth/80 leading-relaxed">
                                    {step.detail}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FEATURED PRODUCTS */}
            <section className="bg-brand-black text-brand-parchment py-20 lg:py-28">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
                        <div className="max-w-2xl">
                            <p className="kicker text-brand-turmeric">
                                The Collection
                            </p>
                            <h2 className="mt-3 font-serif text-4xl sm:text-5xl leading-tight">
                                Standard Pouch &{" "}
                                <span className="italic text-brand-turmeric">
                                    Premium Box
                                </span>
                                .
                            </h2>
                            <p className="mt-4 text-brand-parchment/75">
                                Everyday essentials and small-batch premium
                                boxes — each masala is ground, blended and
                                packed at our Rajpur plant.
                            </p>
                        </div>
                        <Link
                            to="/products"
                            data-testid="home-view-all-products"
                            className="btn-outline-cream self-start"
                        >
                            View all products
                            <i className="fa-solid fa-arrow-right text-xs" />
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {products.slice(0, 4).map((p) => (
                            <ProductCard key={p.slug} product={p} />
                        ))}
                    </div>
                </div>
            </section>

            {/* RAJPUR x INDORE */}
            <section className="relative py-20 lg:py-28 bg-brand-cream">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-stretch">
                    <div className="bg-brand-black text-brand-parchment p-10 lg:p-14 relative overflow-hidden">
                        <div className="absolute inset-0 opacity-20 bg-cover bg-center"
                            style={{
                                backgroundImage:
                                    "url('https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=1200&q=80')",
                            }}
                        />
                        <div className="relative">
                            <p className="kicker text-brand-turmeric">
                                Rajpur · 451447
                            </p>
                            <h3 className="mt-3 font-serif text-3xl">
                                Our Manufacturing Unit.
                            </h3>
                            <p className="mt-3 text-brand-parchment/80">
                                A modern, hygienic plant rooted in the Nimad
                                heartland — where tradition meets food-safe
                                processing.
                            </p>
                            <ul className="mt-6 space-y-2 text-sm text-brand-parchment/85">
                                <li>
                                    <i className="fa-solid fa-check text-brand-turmeric mr-2" />
                                    FSSAI-grade hygienic processing
                                </li>
                                <li>
                                    <i className="fa-solid fa-check text-brand-turmeric mr-2" />
                                    Low-heat stone milling
                                </li>
                                <li>
                                    <i className="fa-solid fa-check text-brand-turmeric mr-2" />
                                    Direct Nimadi farmer partnerships
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="bg-brand-chilli text-brand-parchment p-10 lg:p-14 relative overflow-hidden">
                        <div className="absolute inset-0 opacity-15 bg-cover bg-center"
                            style={{
                                backgroundImage:
                                    "url('https://images.unsplash.com/photo-1599909533693-4c5e68b1c636?auto=format&fit=crop&w=1200&q=80')",
                            }}
                        />
                        <div className="relative">
                            <p className="kicker text-brand-turmeric">
                                Scheme 51 · Indore
                            </p>
                            <h3 className="mt-3 font-serif text-3xl">
                                Our Marketing Office.
                            </h3>
                            <p className="mt-3 text-brand-parchment/85">
                                Distribution, wholesale partnerships and
                                customer care — handled by our Indore team for
                                retailers across India.
                            </p>
                            <Link
                                to="/join-us"
                                data-testid="home-distributor-cta"
                                className="mt-6 inline-flex btn-secondary-brand"
                            >
                                Become a Distributor
                                <i className="fa-solid fa-arrow-right text-xs" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA STRIP */}
            <section className="bg-brand-turmeric text-brand-black py-14">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <h3 className="font-serif text-3xl sm:text-4xl leading-tight">
                            Taste the{" "}
                            <span className="italic">heritage of Nimad.</span>
                        </h3>
                        <p className="mt-2 text-brand-black/80 max-w-lg">
                            Request samples, bulk pricing, or curated gift
                            hampers — no payment online, we confirm everything
                            personally.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <Link
                            to="/products"
                            data-testid="strip-order-samples"
                            className="bg-brand-black text-brand-parchment hover:bg-brand-maroon px-7 py-3 rounded-sm font-medium transition-colors"
                        >
                            Order Samples
                        </Link>
                        <Link
                            to="/contact"
                            data-testid="strip-contact"
                            className="border-2 border-brand-black text-brand-black hover:bg-brand-black hover:text-brand-parchment px-7 py-3 rounded-sm font-medium transition-colors"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
