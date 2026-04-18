import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSettings } from "../context/SettingsContext";

const AUTO_MS = 5600;

export const HeroSlider = () => {
    const { hero_slides } = useSettings();
    const slides = hero_slides && hero_slides.length > 0 ? hero_slides : [];
    const [idx, setIdx] = useState(0);
    const count = slides.length;

    const go = useCallback(
        (next) => setIdx(count === 0 ? 0 : ((next % count) + count) % count),
        [count],
    );

    useEffect(() => {
        if (count === 0) return undefined;
        const t = setInterval(() => go(idx + 1), AUTO_MS);
        return () => clearInterval(t);
    }, [idx, go, count]);

    if (count === 0) return null;
    const current = slides[idx];

    return (
        <section
            data-testid="hero-slider"
            className="relative overflow-hidden bg-brand-black text-brand-parchment"
        >
            <div className="relative h-[82vh] min-h-[560px] max-h-[820px]">
                {/* SLIDE IMAGES */}
                {slides.map((s, i) => (
                    <div
                        key={s.key}
                        data-testid={`hero-slide-${i}`}
                        aria-hidden={i !== idx}
                        className={`absolute inset-0 transition-opacity duration-[1100ms] ease-out ${
                            i === idx ? "opacity-100" : "opacity-0"
                        }`}
                    >
                        <div
                            className={`absolute inset-0 bg-cover bg-center ${
                                i === idx ? "animate-slow-zoom" : ""
                            }`}
                            style={{ backgroundImage: `url(${s.image})` }}
                        />
                        {/* lighter overlay — image stays visible */}
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/55 to-brand-black/20" />
                        <div className="absolute inset-0 bg-gradient-to-r from-brand-black/80 via-brand-black/30 to-transparent" />
                    </div>
                ))}

                {/* TEXT OVERLAY — minimal */}
                <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-end lg:items-center pb-20 lg:pb-0">
                    <div className="max-w-2xl">
                        <p
                            key={`kicker-${idx}`}
                            data-testid="hero-kicker"
                            className="kicker text-brand-turmeric animate-fade-up"
                        >
                            <i className="fa-solid fa-mortar-pestle" />
                            {current.chapter}
                        </p>

                        <h1
                            key={`title-${idx}`}
                            data-testid="hero-slide-title"
                            className="mt-5 font-serif text-4xl sm:text-5xl lg:text-7xl leading-[1.05] tracking-tight animate-fade-up"
                            lang="hi"
                        >
                            {current.title}
                        </h1>

                        <p
                            key={`sub-${idx}`}
                            data-testid="hero-slide-subtitle"
                            className="mt-4 text-brand-parchment/85 text-base lg:text-lg animate-fade-up"
                        >
                            {current.subtitle}
                        </p>

                        <div className="mt-8">
                            <Link
                                to={current.cta_to || "/"}
                                data-testid="hero-primary-cta"
                                className="btn-primary-brand"
                            >
                                {current.cta_label}
                                <i className="fa-solid fa-arrow-right text-xs" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* MAIN TAGLINE — subtle, bottom */}
                <div className="absolute bottom-10 right-6 lg:right-12 z-10 hidden md:block max-w-xs text-right">
                    <p
                        data-testid="hero-main-tagline"
                        className="font-serif italic text-brand-turmeric text-lg lg:text-xl leading-snug"
                    >
                        Legacy of Purity · Powered by Women · Driven by Heritage
                    </p>
                </div>
            </div>

            {/* CONTROLS */}
            <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 z-20 flex items-center justify-between px-3 lg:px-6 pointer-events-none">
                <button
                    data-testid="hero-prev-btn"
                    onClick={() => go(idx - 1)}
                    aria-label="Previous slide"
                    className="pointer-events-auto h-11 w-11 grid place-items-center bg-brand-black/50 hover:bg-brand-chilli border border-white/20 text-brand-parchment transition-colors"
                >
                    <ChevronLeft />
                </button>
                <button
                    data-testid="hero-next-btn"
                    onClick={() => go(idx + 1)}
                    aria-label="Next slide"
                    className="pointer-events-auto h-11 w-11 grid place-items-center bg-brand-black/50 hover:bg-brand-chilli border border-white/20 text-brand-parchment transition-colors"
                >
                    <ChevronRight />
                </button>
            </div>

            {/* DOTS */}
            <div className="absolute bottom-5 left-0 right-0 z-20 flex items-center justify-center gap-3">
                {slides.map((s, i) => (
                    <button
                        key={s.key}
                        data-testid={`hero-dot-${i}`}
                        onClick={() => go(i)}
                        aria-label={`Go to slide ${i + 1}`}
                        className={`h-1.5 rounded-full transition-all ${
                            i === idx
                                ? "w-10 bg-brand-turmeric"
                                : "w-5 bg-brand-parchment/40 hover:bg-brand-parchment/70"
                        }`}
                    />
                ))}
            </div>
        </section>
    );
};

export default HeroSlider;
