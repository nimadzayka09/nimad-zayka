import React, { useEffect, useState } from "react";
import { X, Loader2 } from "lucide-react";
import { submitInquiry } from "../lib/api";
import { toast } from "sonner";

const TYPE_META = {
    supplier: {
        title: "Partner as a Supplier",
        description:
            "Supply high-grade raw spices to our Rajpur processing facility.",
        extra: "What raw materials / crops do you supply?",
    },
    career: {
        title: "Careers at Nimad Zayka",
        description:
            "Join a team passionate about authentic Nimadi flavours and modern craft.",
        extra: "Role of interest & a brief about yourself.",
    },
    distributor: {
        title: "Become a Distributor",
        description:
            "Wholesale & retail partnerships, handled from our Indore marketing office.",
        extra: "Region, current territory & monthly turnover (optional).",
    },
    influencer: {
        title: "Influencer & Brand Ambassador",
        description:
            "Food bloggers, home chefs and creators — tell Nimad's story with us.",
        extra: "Handle, reach and content focus.",
    },
};

export const PartnershipDialog = ({ type, open, onClose }) => {
    const meta = TYPE_META[type] ?? TYPE_META.supplier;
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        company: "",
        city: "",
        message: "",
    });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (open) {
            setForm({
                name: "",
                email: "",
                phone: "",
                company: "",
                city: "",
                message: "",
            });
        }
    }, [open, type]);

    if (!open) return null;

    const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.name || !form.email) {
            toast.error("Name and email are required.");
            return;
        }
        try {
            setSubmitting(true);
            await submitInquiry({ type, ...form });
            toast.success("Thanks! Our team will be in touch shortly.");
            onClose();
        } catch {
            toast.error("Submission failed. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div
            data-testid={`partnership-dialog-${type}`}
            className="fixed inset-0 z-50 grid place-items-center bg-black/70 backdrop-blur-sm p-4"
            onClick={onClose}
        >
            <div
                className="w-full max-w-lg bg-brand-parchment border border-brand-earth/20 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="bg-brand-black text-brand-parchment px-6 py-5 flex items-start justify-between">
                    <div>
                        <p className="kicker text-brand-turmeric">
                            Partnership
                        </p>
                        <h3 className="font-serif text-2xl mt-1">
                            {meta.title}
                        </h3>
                        <p className="text-sm text-brand-parchment/75 mt-1 max-w-sm">
                            {meta.description}
                        </p>
                    </div>
                    <button
                        data-testid={`partnership-close-${type}`}
                        onClick={onClose}
                        className="text-brand-parchment hover:text-brand-turmeric"
                        aria-label="Close"
                    >
                        <X />
                    </button>
                </div>
                <div className="pithora-divider-light" />
                <form
                    onSubmit={handleSubmit}
                    className="px-6 py-5 space-y-3"
                    data-testid={`partnership-form-${type}`}
                >
                    <div className="grid grid-cols-2 gap-3">
                        <input
                            required
                            data-testid={`part-name-${type}`}
                            value={form.name}
                            onChange={(e) => update("name", e.target.value)}
                            placeholder="Full name *"
                            className="col-span-2 border border-brand-earth/25 px-3 py-2 text-sm focus:outline-none focus:border-brand-chilli bg-white"
                        />
                        <input
                            required
                            type="email"
                            data-testid={`part-email-${type}`}
                            value={form.email}
                            onChange={(e) => update("email", e.target.value)}
                            placeholder="Email *"
                            className="border border-brand-earth/25 px-3 py-2 text-sm focus:outline-none focus:border-brand-chilli bg-white"
                        />
                        <input
                            data-testid={`part-phone-${type}`}
                            value={form.phone}
                            onChange={(e) => update("phone", e.target.value)}
                            placeholder="Phone"
                            className="border border-brand-earth/25 px-3 py-2 text-sm focus:outline-none focus:border-brand-chilli bg-white"
                        />
                        <input
                            data-testid={`part-company-${type}`}
                            value={form.company}
                            onChange={(e) => update("company", e.target.value)}
                            placeholder="Company / Brand"
                            className="border border-brand-earth/25 px-3 py-2 text-sm focus:outline-none focus:border-brand-chilli bg-white"
                        />
                        <input
                            data-testid={`part-city-${type}`}
                            value={form.city}
                            onChange={(e) => update("city", e.target.value)}
                            placeholder="City"
                            className="border border-brand-earth/25 px-3 py-2 text-sm focus:outline-none focus:border-brand-chilli bg-white"
                        />
                        <textarea
                            data-testid={`part-message-${type}`}
                            value={form.message}
                            onChange={(e) => update("message", e.target.value)}
                            rows={3}
                            placeholder={meta.extra}
                            className="col-span-2 border border-brand-earth/25 px-3 py-2 text-sm focus:outline-none focus:border-brand-chilli bg-white resize-none"
                        />
                    </div>
                    <button
                        data-testid={`part-submit-${type}`}
                        type="submit"
                        disabled={submitting}
                        className="btn-primary-brand w-full disabled:opacity-60"
                    >
                        {submitting ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Sending…
                            </>
                        ) : (
                            <>
                                Send Inquiry
                                <i className="fa-solid fa-arrow-right text-xs" />
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PartnershipDialog;
