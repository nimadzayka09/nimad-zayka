import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { adminApi } from "../../lib/adminApi";
import { api } from "../../lib/api";
import { useSettings } from "../../context/SettingsContext";
import { toast } from "sonner";

export default function AdminSettings() {
    const { refresh } = useSettings();
    const [form, setForm] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        api.get("/settings").then((r) => setForm(r.data));
    }, []);

    if (!form) {
        return (
            <div className="flex items-center gap-2 text-brand-earth/70">
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading settings…
            </div>
        );
    }

    const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));
    const updateSlide = (idx, k, v) =>
        setForm((f) => ({
            ...f,
            hero_slides: f.hero_slides.map((s, i) =>
                i === idx ? { ...s, [k]: v } : s,
            ),
        }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setSubmitting(true);
            await adminApi.put("/admin/settings", form);
            await refresh();
            toast.success("Settings saved. Public site updated.");
        } catch (err) {
            toast.error(err.response?.data?.detail ?? "Save failed");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div data-testid="admin-settings-page">
            <p className="kicker text-brand-chilli">Site settings</p>
            <h1 className="mt-2 font-serif text-4xl text-brand-black">
                Hero slides, contact & more.
            </h1>
            <p className="mt-2 text-brand-earth/80">
                Yahan se public website ka hero text, email, phone aur
                WhatsApp number change karein.
            </p>

            <form
                onSubmit={handleSubmit}
                data-testid="admin-settings-form"
                className="mt-10 space-y-10"
            >
                <section className="bg-white border border-brand-earth/15 p-6">
                    <h2 className="font-serif text-2xl text-brand-black">
                        Contact
                    </h2>
                    <div className="mt-5 grid sm:grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs uppercase tracking-widest text-brand-earth/70">
                                Display phone
                            </label>
                            <input
                                data-testid="set-phone"
                                value={form.phone || ""}
                                onChange={(e) => update("phone", e.target.value)}
                                className="mt-2 w-full border border-brand-earth/25 bg-brand-parchment px-3 py-2 text-sm focus:outline-none focus:border-brand-chilli"
                            />
                        </div>
                        <div>
                            <label className="text-xs uppercase tracking-widest text-brand-earth/70">
                                Phone (for tel: link, no spaces)
                            </label>
                            <input
                                data-testid="set-phone-raw"
                                value={form.phone_raw || ""}
                                onChange={(e) => update("phone_raw", e.target.value)}
                                className="mt-2 w-full border border-brand-earth/25 bg-brand-parchment px-3 py-2 text-sm"
                            />
                        </div>
                        <div>
                            <label className="text-xs uppercase tracking-widest text-brand-earth/70">
                                Email
                            </label>
                            <input
                                data-testid="set-email"
                                type="email"
                                value={form.email || ""}
                                onChange={(e) => update("email", e.target.value)}
                                className="mt-2 w-full border border-brand-earth/25 bg-brand-parchment px-3 py-2 text-sm"
                            />
                        </div>
                        <div>
                            <label className="text-xs uppercase tracking-widest text-brand-earth/70">
                                WhatsApp (digits with country code)
                            </label>
                            <input
                                data-testid="set-whatsapp"
                                value={form.whatsapp || ""}
                                onChange={(e) => update("whatsapp", e.target.value)}
                                className="mt-2 w-full border border-brand-earth/25 bg-brand-parchment px-3 py-2 text-sm"
                            />
                        </div>
                    </div>
                </section>

                <section className="bg-white border border-brand-earth/15 p-6">
                    <h2 className="font-serif text-2xl text-brand-black">
                        Hero slides
                    </h2>
                    <p className="mt-1 text-sm text-brand-earth/70">
                        Home page ke 3 slides ka text yahin edit karein — Hindi
                        + English dono.
                    </p>

                    <div className="mt-6 space-y-6">
                        {form.hero_slides?.map((s, i) => (
                            <div
                                key={s.key || i}
                                data-testid={`set-slide-${i}`}
                                className="border border-brand-earth/15 p-5 bg-brand-cream/50"
                            >
                                <p className="kicker text-brand-chilli mb-4">
                                    Slide {i + 1}
                                </p>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="sm:col-span-2">
                                        <label className="text-xs uppercase tracking-widest text-brand-earth/70">
                                            Chapter / Kicker (Hindi + English OK)
                                        </label>
                                        <input
                                            data-testid={`set-slide-chapter-${i}`}
                                            value={s.chapter || ""}
                                            onChange={(e) =>
                                                updateSlide(i, "chapter", e.target.value)
                                            }
                                            className="mt-2 w-full border border-brand-earth/25 bg-white px-3 py-2 text-sm"
                                        />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label className="text-xs uppercase tracking-widest text-brand-earth/70">
                                            Main title (Hindi)
                                        </label>
                                        <input
                                            data-testid={`set-slide-title-${i}`}
                                            lang="hi"
                                            value={s.title || ""}
                                            onChange={(e) =>
                                                updateSlide(i, "title", e.target.value)
                                            }
                                            className="mt-2 w-full border border-brand-earth/25 bg-white px-3 py-2 text-base font-serif"
                                        />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label className="text-xs uppercase tracking-widest text-brand-earth/70">
                                            Subtitle (English, short)
                                        </label>
                                        <input
                                            data-testid={`set-slide-sub-${i}`}
                                            value={s.subtitle || ""}
                                            onChange={(e) =>
                                                updateSlide(i, "subtitle", e.target.value)
                                            }
                                            className="mt-2 w-full border border-brand-earth/25 bg-white px-3 py-2 text-sm"
                                        />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label className="text-xs uppercase tracking-widest text-brand-earth/70">
                                            Background image URL
                                        </label>
                                        <input
                                            data-testid={`set-slide-image-${i}`}
                                            value={s.image || ""}
                                            onChange={(e) =>
                                                updateSlide(i, "image", e.target.value)
                                            }
                                            className="mt-2 w-full border border-brand-earth/25 bg-white px-3 py-2 text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs uppercase tracking-widest text-brand-earth/70">
                                            CTA button text
                                        </label>
                                        <input
                                            data-testid={`set-slide-cta-label-${i}`}
                                            value={s.cta_label || ""}
                                            onChange={(e) =>
                                                updateSlide(i, "cta_label", e.target.value)
                                            }
                                            className="mt-2 w-full border border-brand-earth/25 bg-white px-3 py-2 text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs uppercase tracking-widest text-brand-earth/70">
                                            CTA link (/about, /products…)
                                        </label>
                                        <input
                                            data-testid={`set-slide-cta-to-${i}`}
                                            value={s.cta_to || ""}
                                            onChange={(e) =>
                                                updateSlide(i, "cta_to", e.target.value)
                                            }
                                            className="mt-2 w-full border border-brand-earth/25 bg-white px-3 py-2 text-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="sticky bottom-0 bg-brand-parchment/95 backdrop-blur py-4 border-t border-brand-earth/15 flex justify-end">
                    <button
                        type="submit"
                        data-testid="set-submit"
                        disabled={submitting}
                        className="btn-primary-brand disabled:opacity-60"
                    >
                        {submitting ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Saving…
                            </>
                        ) : (
                            <>
                                Save settings
                                <i className="fa-solid fa-check text-xs" />
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
