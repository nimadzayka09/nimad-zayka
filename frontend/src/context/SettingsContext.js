import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { api } from "../lib/api";
import { HERO_SLIDES, BRAND } from "../lib/brand";

const SettingsContext = createContext(null);

const DEFAULT_SETTINGS = {
    phone: BRAND.phone,
    phone_raw: BRAND.phoneRaw,
    email: BRAND.email,
    whatsapp: BRAND.whatsapp,
    hero_slides: HERO_SLIDES.map((s) => ({
        key: s.key,
        chapter: s.chapter,
        title: s.title,
        subtitle: s.subtitle,
        image: s.image,
        cta_label: s.cta.label,
        cta_to: s.cta.to,
    })),
};

export function SettingsProvider({ children }) {
    const [settings, setSettings] = useState(DEFAULT_SETTINGS);
    const [loaded, setLoaded] = useState(false);

    const fetchSettings = useCallback(async () => {
        try {
            const { data } = await api.get("/settings");
            setSettings({
                phone: data.phone ?? DEFAULT_SETTINGS.phone,
                phone_raw: data.phone_raw ?? DEFAULT_SETTINGS.phone_raw,
                email: data.email ?? DEFAULT_SETTINGS.email,
                whatsapp: data.whatsapp ?? DEFAULT_SETTINGS.whatsapp,
                hero_slides:
                    Array.isArray(data.hero_slides) && data.hero_slides.length > 0
                        ? data.hero_slides
                        : DEFAULT_SETTINGS.hero_slides,
            });
        } catch {
            setSettings(DEFAULT_SETTINGS);
        } finally {
            setLoaded(true);
        }
    }, []);

    useEffect(() => {
        fetchSettings();
    }, [fetchSettings]);

    return (
        <SettingsContext.Provider value={{ ...settings, loaded, refresh: fetchSettings }}>
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings() {
    const ctx = useContext(SettingsContext);
    if (!ctx) return { ...DEFAULT_SETTINGS, loaded: true, refresh: () => {} };
    return ctx;
}
