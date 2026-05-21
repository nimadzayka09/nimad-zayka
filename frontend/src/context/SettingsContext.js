import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

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

  about_banner_image: "",
  about_banner_title: "",
  about_story_heading: "",
  about_story_text: "",
  about_mission: "",
  about_vision: "",

  csr_banner_image: "",
  csr_banner_title: "",
  csr_intro: "",

  joinus_banner_image: "",
  joinus_banner_title: "",
  joinus_intro: "",
  joinus_benefits: "",
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
          Array.isArray(data.hero_slides) &&
          data.hero_slides.length > 0
            ? data.hero_slides
            : DEFAULT_SETTINGS.hero_slides,

        about_banner_image:
          data.about_banner_image ?? "",

        about_banner_title:
          data.about_banner_title ?? "",

        about_story_heading:
          data.about_story_heading ?? "",

        about_story_text:
          data.about_story_text ?? "",

        about_mission:
          data.about_mission ?? "",

        about_vision:
          data.about_vision ?? "",

        csr_banner_image:
          data.csr_banner_image ?? "",

        csr_banner_title:
          data.csr_banner_title ?? "",

        csr_intro:
          data.csr_intro ?? "",

        joinus_banner_image:
          data.joinus_banner_image ?? "",

        joinus_banner_title:
          data.joinus_banner_title ?? "",

        joinus_intro:
          data.joinus_intro ?? "",

        joinus_benefits:
          data.joinus_benefits ?? "",
      });
    } catch (error) {
      console.error("Settings fetch failed:", error);
      setSettings(DEFAULT_SETTINGS);
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  return (
    <SettingsContext.Provider
      value={{
        ...settings,
        loaded,
        refresh: fetchSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);

  if (!ctx) {
    return {
      ...DEFAULT_SETTINGS,
      loaded: true,
      refresh: () => {},
    };
  }

  return ctx;
}
