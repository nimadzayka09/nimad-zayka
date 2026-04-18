import React, { useState } from "react";
import PartnershipDialog from "../components/PartnershipDialog";
import PithoraDivider from "../components/PithoraDivider";

const cards = [
    {
        type: "supplier",
        icon: "fa-solid fa-wheat-awn",
        title: "Suppliers",
        subtitle: "Raw material sourcing",
        text: "Partner with us for turmeric, chilli, coriander, whole spices and packaging — from farm, FPO or wholesaler.",
    },
    {
        type: "career",
        icon: "fa-solid fa-user-tie",
        title: "Careers",
        subtitle: "Join the Nimad Zayka team",
        text: "Open roles across food technology, operations, sales, design and marketing. Build a legacy with us.",
    },
    {
        type: "distributor",
        icon: "fa-solid fa-truck-fast",
        title: "Distributors",
        subtitle: "Wholesale & retail partnerships",
        text: "Expand our footprint in your city. Handled personally by our Indore marketing office.",
    },
    {
        type: "influencer",
        icon: "fa-solid fa-camera",
        title: "Influencers",
        subtitle: "Food bloggers & ambassadors",
        text: "Tell Nimad's story through reels, recipes and reviews — curated collabs with full creative freedom.",
    },
];

const JoinUs = () => {
    const [activeType, setActiveType] = useState(null);

    return (
        <div data-testid="join-us-page">
            <section className="bg-brand-black text-brand-parchment relative overflow-hidden">
                <div
                    className="absolute inset-0 opacity-25 bg-cover bg-center"
                    style={{
                        backgroundImage:
                            "url('https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1920&q=80')",
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-brand-black/70 to-brand-black" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
                    <p className="kicker text-brand-turmeric">
                        Strategic Partnerships
                    </p>
                    <h1 className="mt-4 font-serif text-5xl sm:text-6xl lg:text-7xl leading-[1.02]">
                        Grow the Nimad story
                        <br />
                        <span className="italic text-brand-turmeric">
                            with us.
                        </span>
                    </h1>
                    <p className="mt-6 max-w-2xl text-brand-parchment/80 text-lg">
                        Four ways to partner — pick the one that fits, share
                        your details, and our team will personally get in
                        touch.
                    </p>
                </div>
                <PithoraDivider variant="light" />
            </section>

            <section className="py-20 lg:py-28 bg-parchment">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-6">
                        {cards.map((c) => (
                            <button
                                key={c.type}
                                data-testid={`partner-card-${c.type}`}
                                onClick={() => setActiveType(c.type)}
                                className="group text-left bg-white border border-brand-earth/15 p-8 lg:p-10 hover:border-brand-chilli hover:-translate-y-1 transition-all duration-300"
                            >
                                <div className="flex items-start justify-between">
                                    <i
                                        className={`${c.icon} text-4xl text-brand-chilli group-hover:text-brand-turmeric transition-colors`}
                                    />
                                    <span className="text-xs uppercase tracking-widest text-brand-earth/60 group-hover:text-brand-chilli transition-colors">
                                        Inquire
                                        <i className="fa-solid fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </div>
                                <h3 className="mt-6 font-serif text-3xl text-brand-black">
                                    {c.title}
                                </h3>
                                <p className="mt-1 text-xs uppercase tracking-widest text-brand-chilli">
                                    {c.subtitle}
                                </p>
                                <p className="mt-4 text-brand-earth/80 leading-relaxed">
                                    {c.text}
                                </p>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            <PartnershipDialog
                type={activeType}
                open={activeType !== null}
                onClose={() => setActiveType(null)}
            />
        </div>
    );
};

export default JoinUs;
