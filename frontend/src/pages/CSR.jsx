import React from "react";
import PithoraDivider from "../components/PithoraDivider";
import { BRAND } from "../lib/brand";

const pillars = [
    {
        icon: "fa-solid fa-wheat-awn",
        title: "Farmer Partnerships",
        text: "Direct, long-term contracts with Nimadi farmers — fair prices, assured offtake, and no middlemen.",
    },
    {
        icon: "fa-solid fa-people-group",
        title: "Tribal Employment",
        text: "60% of our workforce comes from neighbouring tribal communities around Rajpur and Barwani.",
    },
    {
        icon: "fa-solid fa-recycle",
        title: "Zero-Waste Plant",
        text: "Spice residues are composted; husks and stalks fuel clean boilers — nothing leaves the plant as waste.",
    },
    {
        icon: "fa-solid fa-droplet",
        title: "Water Stewardship",
        text: "Rainwater harvesting and drip-fed washing cycles cut our freshwater use by over 40%.",
    },
    {
        icon: "fa-solid fa-book-open",
        title: "Skill & Literacy",
        text: "Evening literacy classes and food-safety training for women at the Rajpur unit.",
    },
    {
        icon: "fa-solid fa-sun",
        title: "Tradition Preserved",
        text: "Documenting Nimadi recipes, Pithora art and oral spice traditions with local elders.",
    },
];

const CSR = () => {
    return (
        <div data-testid="csr-page">
            <section className="bg-brand-chilli text-brand-parchment relative overflow-hidden">
                <div
                    className="absolute inset-0 opacity-20 bg-cover bg-center"
                    style={{
                        backgroundImage:
                            "url('https://images.unsplash.com/photo-1536657464919-892534f60d6e?auto=format&fit=crop&w=1920&q=80')",
                    }}
                />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
                    <p className="kicker text-brand-turmeric">
                        Community & Sustainability
                    </p>
                    <h1 className="mt-4 font-serif text-5xl sm:text-6xl lg:text-7xl leading-[1.02]">
                        Rooted in Nimad.
                        <br />
                        <span className="italic text-brand-turmeric">
                            Accountable to its people.
                        </span>
                    </h1>
                    <p className="mt-6 max-w-2xl text-brand-parchment/90 text-lg">
                        Every pouch we sell funds farmer payouts, tribal
                        employment and the preservation of Nimadi tradition —
                        our scorecard sits alongside every spice recipe.
                    </p>
                </div>
                <PithoraDivider variant="light" />
            </section>

            {/* PILLARS */}
            <section className="bg-parchment py-20 lg:py-28">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-2xl">
                        <p className="kicker text-brand-chilli">Six pillars</p>
                        <h2 className="mt-3 font-serif text-4xl sm:text-5xl text-brand-black">
                            The way we give back.
                        </h2>
                    </div>
                    <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {pillars.map((p, i) => (
                            <div
                                key={p.title}
                                data-testid={`csr-pillar-${i}`}
                                className="bg-white border border-brand-earth/15 p-7 hover:border-brand-chilli transition-colors group"
                            >
                                <i
                                    className={`${p.icon} text-3xl text-brand-chilli group-hover:text-brand-turmeric transition-colors`}
                                />
                                <h3 className="mt-4 font-serif text-2xl text-brand-black">
                                    {p.title}
                                </h3>
                                <p className="mt-2 text-sm text-brand-earth/80 leading-relaxed">
                                    {p.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* IMPACT NUMBERS */}
            <section className="py-20 lg:py-28 bg-brand-black text-brand-parchment">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="kicker text-brand-turmeric">Our impact, so far</p>
                    <h2 className="mt-3 font-serif text-4xl sm:text-5xl max-w-3xl">
                        Small batches.{" "}
                        <span className="italic text-brand-turmeric">
                            Large ripples.
                        </span>
                    </h2>
                    <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            ["350+", "Farmer families"],
                            ["68%", "Women workforce"],
                            ["40%", "Less water used"],
                            ["0", "Landfill waste"],
                        ].map(([n, l]) => (
                            <div
                                key={l}
                                className="border-l-2 border-brand-turmeric pl-5 py-3"
                            >
                                <p className="font-serif text-5xl text-brand-turmeric">
                                    {n}
                                </p>
                                <p className="mt-2 text-xs uppercase tracking-[0.22em] text-brand-parchment/70">
                                    {l}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* VILLAGE IMAGE STRIP */}
            <section className="bg-brand-cream py-20 lg:py-28">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-center">
                    <div>
                        <p className="kicker text-brand-chilli">
                            Women of Nimad
                        </p>
                        <h2 className="mt-3 font-serif text-4xl sm:text-5xl text-brand-black">
                            Hands that hold our{" "}
                            <span className="italic text-brand-chilli">
                                entire story.
                            </span>
                        </h2>
                        <p className="mt-4 text-brand-earth leading-relaxed">
                            From sorting chillies to stone-grinding, filling
                            pouches and sealing every Premium Box — Nimad
                            Zayka's processing and packaging operations are
                            <strong> led by local women</strong> from Rajpur
                            and neighbouring villages. We invest in child-care
                            support, on-site health checkups, and skill
                            workshops — because tradition without dignity is
                            no tradition at all.
                        </p>
                        <ul className="mt-6 space-y-2 text-sm text-brand-earth">
                            <li>
                                <i className="fa-solid fa-check text-brand-chilli mr-2" />
                                68% women workforce at our Rajpur plant
                            </li>
                            <li>
                                <i className="fa-solid fa-check text-brand-chilli mr-2" />
                                Paid menstrual leave & on-site child care
                            </li>
                            <li>
                                <i className="fa-solid fa-check text-brand-chilli mr-2" />
                                Quarterly food-safety & leadership workshops
                            </li>
                        </ul>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <img
                            src="https://i.ibb.co/RTdWMZHh/womens.png"
                            alt="Nimadi women at work"
                            className="aspect-[4/5] object-cover border border-brand-earth/20"
                        />
                        <img
                            src="https://i.ibb.co/zHF9nGSx/TN5-Dhar090425084132.jpg"
                            alt="NIMAD KI MAHILAON ko Atmanirbhar banane mein PMFME yojana ki major bhoomika hai"
                            className="aspect-[4/5] object-cover border border-brand-earth/20 mt-10"
                        />
                    </div>
                </div>
            </section>

            {/* GOVERNMENT PARTNERSHIPS */}
            <section
                data-testid="csr-gov-schemes"
                className="py-20 lg:py-28 bg-parchment"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-12 gap-10 items-start">
                        <div className="lg:col-span-5">
                            <p className="kicker text-brand-chilli">
                                Built on public-private trust
                            </p>
                            <h2 className="mt-3 font-serif text-4xl sm:text-5xl text-brand-black leading-tight">
                                Growing with{" "}
                                <span className="italic text-brand-chilli">
                                    government schemes
                                </span>
                                .
                            </h2>
                            <p className="mt-5 text-brand-earth leading-relaxed">
                                Our modern Rajpur facility was set up in
                                partnership with Government of India's food
                                processing & micro-enterprise schemes — a
                                public-private journey that put Nimad's spice
                                economy on the national map.
                            </p>
                            <ul className="mt-6 space-y-3 text-brand-earth">
                                <li className="flex items-start gap-3">
                                    <i className="fa-solid fa-landmark text-brand-chilli mt-1" />
                                    <span>
                                        Actively working with select{" "}
                                        <strong>
                                            Government spice & supply tenders
                                        </strong>{" "}
                                        across Madhya Pradesh.
                                    </span>
                                </li>
                            </ul>
                        </div>

                        <div className="lg:col-span-7 grid sm:grid-cols-2 gap-5">
                            <div
                                data-testid="csr-pmfme"
                                className="bg-white border border-brand-earth/15 p-6 hover:border-brand-chilli transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 grid place-items-center bg-brand-chilli text-brand-parchment">
                                        <i className="fa-solid fa-industry" />
                                    </div>
                                    <p className="kicker text-brand-chilli">
                                        PMFME Scheme
                                    </p>
                                </div>
                                <h3 className="mt-4 font-serif text-2xl text-brand-black">
                                    PM Formalisation of Micro Food Enterprises
                                </h3>
                                <p className="mt-2 text-sm text-brand-earth/80 leading-relaxed">
                                    Our Rajpur manufacturing expansion was
                                    enabled by the{" "}
                                    <strong>PMFME scheme</strong> — a Ministry
                                    of Food Processing Industries initiative
                                    that supports authentic regional food
                                    brands with infrastructure, credit and
                                    branding.
                                </p>
                            </div>
                            <div
                                data-testid="csr-mahila-samooh"
                                className="bg-white border border-brand-earth/15 p-6 hover:border-brand-chilli transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 grid place-items-center bg-brand-turmeric text-brand-black">
                                        <i className="fa-solid fa-venus" />
                                    </div>
                                    <p className="kicker text-brand-chilli">
                                        Mahila Samooh
                                    </p>
                                </div>
                                <h3 className="mt-4 font-serif text-2xl text-brand-black">
                                    Self-Help Group Partnerships
                                </h3>
                                <p className="mt-2 text-sm text-brand-earth/80 leading-relaxed">
                                    We partner with local{" "}
                                    <strong>Mahila Samooh</strong> (women's
                                    self-help groups) for sorting, cleaning,
                                    packing and regional distribution —
                                    directly channelling income into women-led
                                    households around Rajpur.
                                </p>
                            </div>
                            <div
                                data-testid="csr-gov-tenders"
                                className="sm:col-span-2 bg-brand-black text-brand-parchment p-7 hover:border-brand-turmeric border border-transparent transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 grid place-items-center bg-brand-turmeric text-brand-black">
                                        <i className="fa-solid fa-file-signature" />
                                    </div>
                                    <p className="kicker text-brand-turmeric">
                                        Government tenders
                                    </p>
                                </div>
                                <h3 className="mt-4 font-serif text-2xl">
                                    Supplying Madhya Pradesh — at scale.
                                </h3>
                                <p className="mt-2 text-sm text-brand-parchment/80 leading-relaxed max-w-2xl">
                                    Nimad Zayka is empanelled / in-process
                                    with select Madhya Pradesh Government
                                    spice-supply tenders — a quiet validation
                                    of our processing standards and pricing
                                    integrity.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* NIMAD SPICES MAP */}
            <section
                data-testid="csr-spices-map"
                className="py-20 lg:py-28 bg-brand-cream"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-2xl">
                        <p className="kicker text-brand-chilli">
                            The Nimad Spice Belt
                        </p>
                        <h2 className="mt-3 font-serif text-4xl sm:text-5xl text-brand-black leading-tight">
                            One region.{" "}
                            <span className="italic text-brand-chilli">
                                An entire spice bowl.
                            </span>
                        </h2>
                        <p className="mt-5 text-brand-earth leading-relaxed">
                            From Khargone's Bediya Mandi — Asia's
                            second-largest red chilli market — to the turmeric,
                            coriander, ginger and fenugreek fields fed by the
                            Narmada, the Nimad region of Madhya Pradesh is
                            quietly India's spice heartland. Every Nimad Zayka
                            jar is sourced within this map.
                        </p>
                    </div>
                    <div className="mt-10 bg-white border border-brand-earth/20 p-3 lg:p-5 shadow-xl">
                        <img
                            src={BRAND.spicesMap}
                            alt="Nimad Region, Madhya Pradesh — Pictorial Spices Map"
                            data-testid="nimad-spices-map-img"
                            className="w-full h-auto"
                        />
                    </div>
                    <div className="mt-10 grid md:grid-cols-4 gap-4">
                        {[
                            ["Khargone", "West Nimar · Red Chilli capital"],
                            ["Khandwa", "East Nimar · Turmeric & Coriander"],
                            ["Barwani", "Rajpur · Our home ground (451447)"],
                            ["Burhanpur", "Ginger, Garlic, Red Chilli"],
                        ].map(([t, s]) => (
                            <div
                                key={t}
                                className="bg-white border border-brand-earth/15 p-4"
                            >
                                <p className="font-serif text-xl text-brand-chilli">
                                    {t}
                                </p>
                                <p className="mt-1 text-xs uppercase tracking-widest text-brand-earth/70">
                                    {s}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CSR;
