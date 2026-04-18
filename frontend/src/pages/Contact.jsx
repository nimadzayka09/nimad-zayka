import React, { useState } from "react";
import { BRAND } from "../lib/brand";
import PithoraDivider from "../components/PithoraDivider";
import { submitInquiry } from "../lib/api";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const Contact = () => {
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
        if (!form.name || !form.email || !form.message) {
            toast.error("Name, email and message are required.");
            return;
        }
        try {
            setSubmitting(true);
            await submitInquiry({ type: "contact", ...form });
            toast.success("Thanks for reaching out! We'll respond shortly.");
            setForm({ name: "", email: "", phone: "", city: "", message: "" });
        } catch {
            toast.error("Could not send. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div data-testid="contact-page">
            <section className="bg-brand-black text-brand-parchment py-24 lg:py-32 relative overflow-hidden">
                <div
                    className="absolute inset-0 opacity-20 bg-cover bg-center"
                    style={{
                        backgroundImage:
                            "url('https://images.unsplash.com/photo-1601375867753-edc18a1bde8e?auto=format&fit=crop&w=1920&q=80')",
                    }}
                />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="kicker text-brand-turmeric">Reach us</p>
                    <h1 className="mt-4 font-serif text-5xl sm:text-6xl lg:text-7xl leading-[1.02]">
                        Let's talk{" "}
                        <span className="italic text-brand-turmeric">
                            spices.
                        </span>
                    </h1>
                    <p className="mt-6 max-w-xl text-brand-parchment/80 text-lg">
                        Orders, bulk inquiries, factory tours, collabs — we'd
                        love to hear from you.
                    </p>
                </div>
                <PithoraDivider variant="light" className="mt-16" />
            </section>

            <section className="py-20 lg:py-28 bg-parchment">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-5 gap-10">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white border border-brand-earth/15 p-7">
                            <p className="kicker text-brand-chilli">
                                Manufacturing
                            </p>
                            <h3 className="mt-2 font-serif text-2xl text-brand-black">
                                Rajpur Factory
                            </h3>
                            <p className="mt-3 text-brand-earth/85 text-sm leading-relaxed">
                                {BRAND.addresses.factory.line}
                            </p>
                        </div>
                        <div className="bg-white border border-brand-earth/15 p-7">
                            <p className="kicker text-brand-chilli">Marketing</p>
                            <h3 className="mt-2 font-serif text-2xl text-brand-black">
                                Indore Office
                            </h3>
                            <p className="mt-3 text-brand-earth/85 text-sm leading-relaxed">
                                {BRAND.addresses.office.line}
                            </p>
                        </div>
                        <div className="bg-brand-black text-brand-parchment p-7">
                            <p className="kicker text-brand-turmeric">
                                Direct connect
                            </p>
                            <ul className="mt-4 space-y-3 text-sm">
                                <li>
                                    <a
                                        data-testid="contact-email-link"
                                        href={`mailto:${BRAND.email}`}
                                        className="flex items-center gap-3 hover:text-brand-turmeric"
                                    >
                                        <i className="fa-solid fa-envelope text-brand-turmeric" />
                                        {BRAND.email}
                                    </a>
                                </li>
                                <li>
                                    <a
                                        data-testid="contact-phone-link"
                                        href={`tel:${BRAND.phoneRaw}`}
                                        className="flex items-center gap-3 hover:text-brand-turmeric"
                                    >
                                        <i className="fa-solid fa-phone text-brand-turmeric" />
                                        {BRAND.phone}
                                    </a>
                                </li>
                                <li>
                                    <a
                                        data-testid="contact-whatsapp-link"
                                        href={`https://wa.me/${BRAND.whatsapp}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex items-center gap-3 hover:text-brand-turmeric"
                                    >
                                        <i className="fa-brands fa-whatsapp text-green-500" />
                                        Chat on WhatsApp
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        data-testid="contact-form"
                        className="lg:col-span-3 bg-white border border-brand-earth/15 p-8 lg:p-10 space-y-4"
                    >
                        <p className="kicker text-brand-chilli">
                            Send us a message
                        </p>
                        <h3 className="font-serif text-3xl text-brand-black">
                            Tell us how we can help.
                        </h3>
                        <div className="grid sm:grid-cols-2 gap-4 pt-3">
                            <input
                                required
                                data-testid="contact-name"
                                value={form.name}
                                onChange={(e) => update("name", e.target.value)}
                                placeholder="Full name *"
                                className="sm:col-span-2 border border-brand-earth/25 px-4 py-3 focus:outline-none focus:border-brand-chilli bg-brand-parchment"
                            />
                            <input
                                required
                                type="email"
                                data-testid="contact-email"
                                value={form.email}
                                onChange={(e) => update("email", e.target.value)}
                                placeholder="Email *"
                                className="border border-brand-earth/25 px-4 py-3 focus:outline-none focus:border-brand-chilli bg-brand-parchment"
                            />
                            <input
                                data-testid="contact-phone"
                                value={form.phone}
                                onChange={(e) => update("phone", e.target.value)}
                                placeholder="Phone"
                                className="border border-brand-earth/25 px-4 py-3 focus:outline-none focus:border-brand-chilli bg-brand-parchment"
                            />
                            <input
                                data-testid="contact-city"
                                value={form.city}
                                onChange={(e) => update("city", e.target.value)}
                                placeholder="City"
                                className="sm:col-span-2 border border-brand-earth/25 px-4 py-3 focus:outline-none focus:border-brand-chilli bg-brand-parchment"
                            />
                            <textarea
                                required
                                data-testid="contact-message"
                                value={form.message}
                                onChange={(e) => update("message", e.target.value)}
                                rows={5}
                                placeholder="How can we help you? *"
                                className="sm:col-span-2 border border-brand-earth/25 px-4 py-3 focus:outline-none focus:border-brand-chilli bg-brand-parchment resize-none"
                            />
                        </div>
                        <button
                            data-testid="contact-submit-btn"
                            type="submit"
                            disabled={submitting}
                            className="btn-primary-brand disabled:opacity-60"
                        >
                            {submitting ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Sending…
                                </>
                            ) : (
                                <>
                                    Send Message
                                    <i className="fa-solid fa-paper-plane text-xs" />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default Contact;
