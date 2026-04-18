import React from "react";
import { Link } from "react-router-dom";
import { BRAND } from "../lib/brand";
import Logo from "./Logo";
import PithoraDivider from "./PithoraDivider";

export const Footer = () => {
    return (
        <footer
            data-testid="site-footer"
            className="bg-brand-black text-brand-parchment"
        >
            <PithoraDivider variant="light" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                <div>
                    <Logo className="h-14 w-auto" />
                    <p className="mt-5 text-sm text-brand-parchment/75 leading-relaxed max-w-xs font-serif italic">
                        “{BRAND.tagline}” — the taste that comes from Nimad.
                    </p>
                    <div className="mt-5 flex items-center gap-3 text-brand-parchment/80">
                        <a
                            href={BRAND.social.instagram}
                            target="_blank"
                            rel="noreferrer"
                            data-testid="footer-insta"
                            className="h-9 w-9 grid place-items-center border border-white/15 hover:border-brand-turmeric hover:text-brand-turmeric transition-colors"
                            aria-label="Instagram"
                        >
                            <i className="fa-brands fa-instagram" />
                        </a>
                        <a
                            href={BRAND.social.facebook}
                            target="_blank"
                            rel="noreferrer"
                            data-testid="footer-facebook"
                            className="h-9 w-9 grid place-items-center border border-white/15 hover:border-brand-turmeric hover:text-brand-turmeric transition-colors"
                            aria-label="Facebook"
                        >
                            <i className="fa-brands fa-facebook-f" />
                        </a>
                        <a
                            href={BRAND.social.youtube}
                            target="_blank"
                            rel="noreferrer"
                            data-testid="footer-youtube"
                            className="h-9 w-9 grid place-items-center border border-white/15 hover:border-brand-turmeric hover:text-brand-turmeric transition-colors"
                            aria-label="YouTube"
                        >
                            <i className="fa-brands fa-youtube" />
                        </a>
                    </div>
                </div>

                <div>
                    <h4 className="kicker text-brand-turmeric mb-4">
                        Explore
                    </h4>
                    <ul className="space-y-2 text-sm">
                        {[
                            ["/", "Home"],
                            ["/about", "About"],
                            ["/products", "Products"],
                            ["/csr", "CSR"],
                            ["/join-us", "Join Us"],
                            ["/contact", "Contact"],
                        ].map(([to, label]) => (
                            <li key={to}>
                                <Link
                                    to={to}
                                    data-testid={`footer-link-${label.toLowerCase().replace(/\s+/g, "-")}`}
                                    className="text-brand-parchment/80 hover:text-brand-turmeric transition-colors"
                                >
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h4 className="kicker text-brand-turmeric mb-4">
                        Rajpur — Factory
                    </h4>
                    <p className="text-sm text-brand-parchment/80 leading-relaxed">
                        {BRAND.addresses.factory.line}
                    </p>
                    <h4 className="kicker text-brand-turmeric mt-6 mb-3">
                        Indore — Office
                    </h4>
                    <p className="text-sm text-brand-parchment/80 leading-relaxed">
                        {BRAND.addresses.office.line}
                    </p>
                </div>

                <div>
                    <h4 className="kicker text-brand-turmeric mb-4">
                        Get in Touch
                    </h4>
                    <ul className="space-y-3 text-sm text-brand-parchment/85">
                        <li>
                            <a
                                href={`mailto:${BRAND.email}`}
                                data-testid="footer-email"
                                className="hover:text-brand-turmeric"
                            >
                                <i className="fa-solid fa-envelope mr-2 text-brand-turmeric" />
                                {BRAND.email}
                            </a>
                        </li>
                        <li>
                            <a
                                href={`tel:${BRAND.phoneRaw}`}
                                data-testid="footer-phone"
                                className="hover:text-brand-turmeric"
                            >
                                <i className="fa-solid fa-phone mr-2 text-brand-turmeric" />
                                {BRAND.phone}
                            </a>
                        </li>
                        <li>
                            <a
                                href={`https://wa.me/${BRAND.whatsapp}`}
                                target="_blank"
                                rel="noreferrer"
                                data-testid="footer-whatsapp"
                                className="hover:text-brand-turmeric"
                            >
                                <i className="fa-brands fa-whatsapp mr-2 text-green-500" />
                                WhatsApp
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="border-t border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-brand-parchment/60">
                    <p>
                        © {new Date().getFullYear()} Nimad Zayka Spices Pvt.
                        Ltd. All rights reserved.
                    </p>
                    <p className="font-serif italic">
                        Handcrafted in the heart of the Narmada valley.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
