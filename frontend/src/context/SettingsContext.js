import React, { createContext, useCallback, useContext, useEffect, useState } from “react”;
import { api } from “../lib/api”;
import { HERO_SLIDES, BRAND } from “../lib/brand”;

const SettingsContext = createContext(null);

const DEFAULT_SETTINGS = {
// Contact
phone: BRAND.phone,
phone_raw: BRAND.phoneRaw,
email: BRAND.email,
whatsapp: BRAND.whatsapp,

```
// Hero Slides
hero_slides: HERO_SLIDES.map((s) => ({
    key: s.key,
    chapter: s.chapter,
    title: s.title,
    subtitle: s.subtitle,
    image: s.image,
    cta_label: s.cta.label,
    cta_to: s.cta.to,
})),

// About Page
about_banner_image: "",
about_banner_title: "हमारी कहानी",
about_story_heading: "निमाड़ की मिट्टी से जन्मा स्वाद",
about_story_text: "",
about_mission: "",
about_vision: "",

// CSR Page
csr_banner_image: "",
csr_banner_title: "सामाजिक दायित्व",
csr_intro: "",

// Join Us Page
joinus_banner_image: "",
joinus_banner_title: "Join Nimad Zayka",
joinus_intro: "",
joinus_benefits: "",
```

};

export function SettingsProvider({ children }) {
const [settings, setSettings] = useState(DEFAULT_SETTINGS);
const [loaded, setLoaded] = useState(false);

```
const fetchSettings = useCallback(async () => {
    try {
        const { data } = await api.get("/settings");
        setSettings({
            // Contact
            phone: data.phone ?? DEFAULT_SETTINGS.phone,
            phone_raw: data.phone_raw ?? DEFAULT_SETTINGS.phone_raw,
            email: data.email ?? DEFAULT_SETTINGS.email,
            whatsapp: data.whatsapp ?? DEFAULT_SETTINGS.whatsapp,

            // Hero Slides
            hero_slides:
                Array.isArray(data.hero_slides) && data.hero_slides.length > 0
                    ? data.hero_slides
                    : DEFAULT_SETTINGS.hero_slides,

            // About Page
            about_banner_image: data.about_banner_image ?? DEFAULT_SETTINGS.about_banner_image,
            about_banner_title: data.about_banner_title ?? DEFAULT_SETTINGS.about_banner_title,
            about_story_heading: data.about_story_heading ?? DEFAULT_SETTINGS.about_story_heading,
            about_story_text: data.about_story_text ?? DEFAULT_SETTINGS.about_story_text,
            about_mission: data.about_mission ?? DEFAULT_SETTINGS.about_mission,
            about_vision: data.about_vision ?? DEFAULT_SETTINGS.about_vision,

            // CSR Page
            csr_banner_image: data.csr_banner_image ?? DEFAULT_SETTINGS.csr_banner_image,
            csr_banner_title: data.csr_banner_title ?? DEFAULT_SETTINGS.csr_banner_title,
            csr_intro: data.csr_intro ?? DEFAULT_SETTINGS.csr_intro,

            // Join Us Page
            joinus_banner_image: data.joinus_banner_image ?? DEFAULT_SETTINGS.joinus_banner_image,
            joinus_banner_title: data.joinus_banner_title ?? DEFAULT_SETTINGS.joinus_banner_title,
            joinus_intro: data.joinus_intro ?? DEFAULT_SETTINGS.joinus_intro,
            joinus_benefits: data.joinus_benefits ?? DEFAULT_SETTINGS.joinus_benefits,
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
```

}

export function useSettings() {
const ctx = useContext(SettingsContext);
if (!ctx) return { …DEFAULT_SETTINGS, loaded: true, refresh: () => {} };
return ctx;
}
