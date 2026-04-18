import React from "react";

export const PithoraDivider = ({ variant = "light", className = "" }) => {
    const cls = variant === "light" ? "pithora-divider-light" : "pithora-divider";
    return (
        <div
            aria-hidden="true"
            data-testid="pithora-divider"
            className={`${cls} w-full ${className}`}
        />
    );
};

export default PithoraDivider;
