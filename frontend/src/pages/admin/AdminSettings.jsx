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
    async function loadSettings() {
      try {
        const response = await api.get("/settings");

        setForm({
          hero_slides: [],
          ...response.data,
        });
      } catch (error) {
        console.error(error);
        toast.error("Failed to load settings");
      }
    }

    loadSettings();
  }, []);

  if (!form) {
    return (
      <div className="flex items-center gap-2 text-brand-earth/70">
        <Loader2 className="h-4 w-4 animate-spin" />
        Loading settings...
      </div>
    );
  }

  const update = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const updateSlide = (index, key, value) => {
    setForm((prev) => ({
      ...prev,
      hero_slides: (prev.hero_slides || []).map((slide, i) =>
        i === index
          ? {
              ...slide,
              [key]: value,
            }
          : slide
      ),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);

      await adminApi.put("/admin/settings", form);

      await refresh();

      toast.success("Settings saved successfully");
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.detail ||
          "Save failed"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div data-testid="admin-settings-page">
      <p className="kicker text-brand-chilli">
        Site Settings
      </p>

      <h1 className="mt-2 font-serif text-4xl text-brand-black">
        Website ka poora control.
      </h1>

      <p className="mt-2 text-brand-earth/80">
        Yahan se Hero slides, Contact,
        About, CSR aur Join Us page ka
        content edit karein.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 space-y-10"
      >
        {/* CONTACT */}

        <section className="bg-white border border-brand-earth/15 p-6">
          <h2 className="font-serif text-2xl text-brand-black">
            Contact
          </h2>

          <div className="mt-5 grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs uppercase tracking-widest text-brand-earth/70">
                Display Phone
              </label>

              <input
                value={form.phone || ""}
                onChange={(e) =>
                  update("phone", e.target.value)
                }
                className="mt-2 w-full border border-brand-earth/25 bg-brand-parchment px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="text-xs uppercase tracking-widest text-brand-earth/70">
                Email
              </label>

              <input
                type="email"
                value={form.email || ""}
                onChange={(e) =>
                  update("email", e.target.value)
                }
                className="mt-2 w-full border border-brand-earth/25 bg-brand-parchment px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="text-xs uppercase tracking-widest text-brand-earth/70">
                WhatsApp
              </label>

              <input
                value={form.whatsapp || ""}
                onChange={(e) =>
                  update("whatsapp", e.target.value)
                }
                className="mt-2 w-full border border-brand-earth/25 bg-brand-parchment px-3 py-2 text-sm"
              />
            </div>
          </div>
        </section>

        {/* HERO SLIDES */}

        <section className="bg-white border border-brand-earth/15 p-6">
          <h2 className="font-serif text-2xl text-brand-black">
            Hero Slides
          </h2>

          <div className="mt-6 space-y-6">
            {(form.hero_slides || []).map(
              (slide, index) => (
                <div
                  key={index}
                  className="border border-brand-earth/15 p-5"
                >
                  <p className="mb-4 text-brand-chilli">
                    Slide {index + 1}
                  </p>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="text-xs uppercase tracking-widest text-brand-earth/70">
                        Title
                      </label>

                      <input
                        value={slide.title || ""}
                        onChange={(e) =>
                          updateSlide(
                            index,
                            "title",
                            e.target.value
                          )
                        }
                        className="mt-2 w-full border border-brand-earth/25 bg-white px-3 py-2"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-xs uppercase tracking-widest text-brand-earth/70">
                        Subtitle
                      </label>

                      <input
                        value={slide.subtitle || ""}
                        onChange={(e) =>
                          updateSlide(
                            index,
                            "subtitle",
                            e.target.value
                          )
                        }
                        className="mt-2 w-full border border-brand-earth/25 bg-white px-3 py-2"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-xs uppercase tracking-widest text-brand-earth/70">
                        Image URL
                      </label>

                      <input
                        value={slide.image || ""}
                        onChange={(e) =>
                          updateSlide(
                            index,
                            "image",
                            e.target.value
                          )
                        }
                        className="mt-2 w-full border border-brand-earth/25 bg-white px-3 py-2"
                      />
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </section>

        {/* ABOUT PAGE */}

        <section className="bg-white border border-brand-earth/15 p-6">
          <h2 className="font-serif text-2xl text-brand-black">
            About Page
          </h2>

          <div className="mt-5 space-y-4">
            <div>
              <label className="text-xs uppercase tracking-widest text-brand-earth/70">
                Banner Title
              </label>

              <input
                value={
                  form.about_banner_title || ""
                }
                onChange={(e) =>
                  update(
                    "about_banner_title",
                    e.target.value
                  )
                }
                className="mt-2 w-full border border-brand-earth/25 bg-brand-parchment px-3 py-2"
              />
            </div>

            <div>
              <label className="text-xs uppercase tracking-widest text-brand-earth/70">
                Story Text
              </label>

              <textarea
                rows={5}
                value={
                  form.about_story_text || ""
                }
                onChange={(e) =>
                  update(
                    "about_story_text",
                    e.target.value
                  )
                }
                className="mt-2 w-full border border-brand-earth/25 bg-brand-parchment px-3 py-2"
              />
            </div>
          </div>
        </section>

        {/* CSR PAGE */}

        <section className="bg-white border border-brand-earth/15 p-6">
          <h2 className="font-serif text-2xl text-brand-black">
            CSR Page
          </h2>

          <div className="mt-5">
            <textarea
              rows={5}
              value={form.csr_intro || ""}
              onChange={(e) =>
                update(
                  "csr_intro",
                  e.target.value
                )
              }
              className="w-full border border-brand-earth/25 bg-brand-parchment px-3 py-2"
            />
          </div>
        </section>

        {/* JOIN US */}

        <section className="bg-white border border-brand-earth/15 p-6">
          <h2 className="font-serif text-2xl text-brand-black">
            Join Us Page
          </h2>

          <div className="mt-5">
            <textarea
              rows={5}
              value={form.joinus_intro || ""}
              onChange={(e) =>
                update(
                  "joinus_intro",
                  e.target.value
                )
              }
              className="w-full border border-brand-earth/25 bg-brand-parchment px-3 py-2"
            />
          </div>
        </section>

        {/* SAVE */}

        <div className="sticky bottom-0 bg-brand-parchment/95 backdrop-blur py-4 border-t border-brand-earth/15 flex justify-end">
          <button
            type="submit"
            disabled={submitting}
            className="btn-primary-brand disabled:opacity-60"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>Save settings</>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
