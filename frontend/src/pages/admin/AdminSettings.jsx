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
    const loadSettings = async () => {
      try {
        const response = await api.get("/settings");

        setForm({
          hero_slides: [],
          ...response.data,
        });
      } catch (error) {
        console.error("Failed to load settings:", error);
        toast.error("Failed to load settings");
      }
    };

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

  const update = (k, v) =>
    setForm((f) => ({
      ...f,
      [k]: v,
    }));

  const updateSlide = (idx, k, v) =>
    setForm((f) => ({
      ...f,
      hero_slides: (f.hero_slides || []).map((s, i) =>
        i === idx
          ? {
              ...s,
              [k]: v,
            }
          : s
      ),
    }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);

      await adminApi.put("/admin/settings", form);

      await refresh();

      toast.success("Settings saved successfully");
    } catch (err) {
      console.error(err);

      toast.error(
        err.response?.data?.detail || "Save failed"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div data-testid="admin-settings-page">
      <p className="kicker text-brand-chilli">
        Site settings
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
          </div>
        </section>

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
              <>
                Save settings
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
