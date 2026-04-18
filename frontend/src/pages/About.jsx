import React from "react";
import { Link } from "react-router-dom";
import { BRAND, TIMELINE } from "../lib/brand";
import PithoraDivider from "../components/PithoraDivider";

const About = () => {
    return (
        <div data-testid="about-page">
            <section className="bg-brand-black text-brand-parchment relative overflow-hidden">
                <div
                    className="absolute inset-0 opacity-25 bg-cover bg-center"
                    style={{ backgroundImage: `url(${BRAND.haatBazaar})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-brand-black/70 to-brand-black" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
                    <p className="kicker text-brand-turmeric">Heritage & Vision</p>
                    <h1 className="mt-4 font-serif text-5xl sm:text-6xl lg:text-7xl leading-[1.02]">
                        From a Rajpur Stone Mill to a
                        <br />
                        <span className="italic text-brand-turmeric">
                            Modern Pvt. Ltd. Powerhouse.
                        </span>
                    </h1>
                    <p className="mt-6 max-w-2xl text-brand-parchment/80 text-lg">
                        A family story three decades in the making — from the
                        weekly Haat Bazaars of Nimad to a women-powered
                        manufacturing plant in Rajpur.
                    </p>
                </div>
                <PithoraDivider variant="light" />
            </section>

            {/* FOUNDER */}
            <section className="py-20 lg:py-28 bg-parchment">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-10 items-center">
                    <div className="lg:col-span-5">
                        <div className="relative">
                            <img
                                src={BRAND.founderPhoto}
                                alt="Founder — Mukesh Kushwah"
                                data-testid="founder-photo"
                                className="w-full aspect-[4/5] object-cover object-top border border-brand-earth/20 shadow-xl"
                            />
                            <div className="absolute -bottom-6 -right-6 bg-brand-chilli text-brand-parchment px-5 py-4">
                                <p className="font-serif text-lg">Since 1990</p>
                                <p className="text-xs uppercase tracking-widest mt-1 text-brand-parchment/80">
                                    Founder · Mukesh Kushwah
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-7">
                        <p className="kicker text-brand-chilli">Founder</p>
                        <h2 className="mt-3 font-serif text-4xl sm:text-5xl text-brand-black">
                            Mukesh Kushwah
                        </h2>
                        <p className="mt-2 text-brand-earth/80 font-serif italic">
                            “Spice is memory. We don't manufacture it — we
                            preserve it.”
                        </p>
                        <div className="mt-6 space-y-4 text-brand-earth leading-relaxed">
                            <p>
                                In 1990, armed with a wooden plank, a hand
                                scale and a deep faith in Nimadi soil,
                                <strong> Mukesh Kushwah</strong> began trading
                                spices at the rural{" "}
                                <strong>Haat Bazaars</strong> of the Nimad
                                region — one customer, one hand-weighed pouch
                                at a time.
                            </p>
                            <p>
                                Three and a half decades later that humble
                                stall has become{" "}
                                <strong>
                                    Nimad Zayka Spices Pvt. Ltd.
                                </strong>{" "}
                                — a modern private limited company that still
                                hand-selects its chillies, still slow-sun-dries
                                its turmeric, and still carries the same
                                family promise of purity.
                            </p>
                        </div>
                        <div className="mt-8 grid grid-cols-3 gap-4">
                            {[
                                ["1990", "Established"],
                                ["451447", "Nimad Roots"],
                                ["Pvt. Ltd.", "Today"],
                            ].map(([n, l]) => (
                                <div
                                    key={l}
                                    className="border border-brand-earth/20 bg-white p-4"
                                >
                                    <p className="font-serif text-2xl text-brand-chilli">
                                        {n}
                                    </p>
                                    <p className="text-[11px] uppercase tracking-widest text-brand-earth/70 mt-1">
                                        {l}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* HAAT BAZAAR HERITAGE STRIP */}
            <section className="bg-brand-black text-brand-parchment py-16 lg:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-10 items-center">
                    <div className="lg:col-span-7 order-2 lg:order-1">
                        <p className="kicker text-brand-turmeric">
                            The Haat Bazaar days
                        </p>
                        <h2 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl leading-tight">
                            A wooden plank,{" "}
                            <span className="italic text-brand-turmeric">
                                a hand scale,
                            </span>{" "}
                            and a family dream.
                        </h2>
                        <p className="mt-5 text-brand-parchment/80 leading-relaxed">
                            Long before the factory, before the boxes, before
                            the logo — there was Papa's dukan in the Haat
                            Bazaar. No branding. No marketing. Just clean
                            spice, fair weight and a handshake. Every pouch
                            we pack today carries that same promise.
                        </p>
                    </div>
                    <div className="lg:col-span-5 order-1 lg:order-2">
                        <div className="relative">
                            <img
                                src={BRAND.papaDukan}
                                alt="Papa's Haat Bazaar spice stall — 1990s"
                                data-testid="papa-dukan-photo"
                                className="w-full aspect-[4/5] object-cover border border-brand-turmeric/30 shadow-2xl"
                            />
                            <span className="absolute -top-3 -left-3 bg-brand-turmeric text-brand-black font-serif text-xs uppercase tracking-widest px-3 py-1">
                                Archival · c. 1990
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* TIMELINE */}
            <section className="py-20 lg:py-28 bg-brand-cream">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="kicker text-brand-chilli">Our roots</p>
                    <h2 className="mt-3 font-serif text-4xl sm:text-5xl text-brand-black max-w-3xl">
                        From a Rajpur Stone Mill to a Modern Pvt. Ltd.
                        Powerhouse.
                    </h2>
                    <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {TIMELINE.map((t, i) => (
                            <div
                                key={t.year}
                                data-testid={`timeline-${i}`}
                                className="bg-white border border-brand-earth/15 p-6 hover:border-brand-chilli transition-colors"
                            >
                                <p className="font-serif text-4xl text-brand-chilli">
                                    {t.year}
                                </p>
                                <h3 className="mt-3 font-serif text-xl text-brand-black">
                                    {t.title}
                                </h3>
                                <p className="mt-2 text-sm text-brand-earth/80 leading-relaxed">
                                    {t.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* VALUES / QUALITY */}
            <section className="py-20 lg:py-28 bg-brand-black text-brand-parchment">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="kicker text-brand-turmeric">Quality standards</p>
                    <h2 className="mt-3 font-serif text-4xl sm:text-5xl max-w-3xl">
                        Unadulterated. Unhurried.{" "}
                        <span className="italic text-brand-turmeric">
                            Unmistakably Nimadi.
                        </span>
                    </h2>
                    <div className="mt-14 grid md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: "fa-solid fa-leaf",
                                title: "100% Pure",
                                text: "No fillers, no artificial colours — only hand-selected spices and time-tested blends.",
                            },
                            {
                                icon: "fa-solid fa-flask",
                                title: "FSSAI-Grade Plant",
                                text: "Our Rajpur facility follows FSSAI food-safety standards at every step.",
                            },
                            {
                                icon: "fa-solid fa-handshake",
                                title: "Farmer-First",
                                text: "Direct partnerships with Nimadi farmers ensure fair prices and traceable sourcing.",
                            },
                        ].map((v) => (
                            <div
                                key={v.title}
                                className="border border-white/10 p-8 hover:border-brand-turmeric transition-colors"
                            >
                                <i
                                    className={`${v.icon} text-3xl text-brand-turmeric`}
                                />
                                <h3 className="mt-4 font-serif text-2xl">
                                    {v.title}
                                </h3>
                                <p className="mt-2 text-brand-parchment/75 text-sm leading-relaxed">
                                    {v.text}
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-14 flex flex-wrap gap-4">
                        <Link
                            to="/products"
                            data-testid="about-shop-link"
                            className="btn-secondary-brand"
                        >
                            Taste our spices
                            <i className="fa-solid fa-arrow-right text-xs" />
                        </Link>
                        <Link
                            to="/contact"
                            data-testid="about-contact-link"
                            className="btn-outline-cream"
                        >
                            Visit our factory
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
