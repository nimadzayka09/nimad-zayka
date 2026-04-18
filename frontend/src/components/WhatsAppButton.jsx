import React from "react";
import { BRAND } from "../lib/brand";
import { useSettings } from "../context/SettingsContext";

export const WhatsAppButton = () => {
    const { whatsapp } = useSettings();
    const number = whatsapp || BRAND.whatsapp;
    const href = `https://wa.me/${number}?text=${encodeURIComponent(
        "Namaste! I would like to know more about Nimad Zayka spices.",
    )}`;
    return (
        <a
            data-testid="whatsapp-float-btn"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 group"
            aria-label="Chat on WhatsApp"
        >
            <span className="absolute inset-0 rounded-full bg-green-500/40 animate-ping" />
            <span className="relative flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-full shadow-xl transition-colors">
                <i className="fa-brands fa-whatsapp text-xl" />
                <span className="hidden sm:inline font-medium text-sm">
                    Chat with us
                </span>
            </span>
        </a>
    );
};

export default WhatsAppButton;
