import React from "react";
import { BRAND } from "../lib/brand";

export const Logo = ({ className = "h-12 w-auto", onDark = true }) => {
    return (
        <div
            data-testid="brand-logo"
            className={`logo-badge ${onDark ? "" : "shadow-md"}`}
        >
            <img
                src={BRAND.logo}
                alt="Nimad Zayka logo"
                className={className}
                loading="eager"
            />
        </div>
    );
};

export default Logo;
