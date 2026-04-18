import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import Logo from "../../components/Logo";
import { toast } from "sonner";

function formatApiErrorDetail(detail) {
    if (detail == null) return "Something went wrong. Please try again.";
    if (typeof detail === "string") return detail;
    if (Array.isArray(detail))
        return detail
            .map((e) =>
                e && typeof e.msg === "string" ? e.msg : JSON.stringify(e),
            )
            .filter(Boolean)
            .join(" · ");
    if (detail && typeof detail.msg === "string") return detail.msg;
    return String(detail);
}

export default function AdminLogin() {
    const { login, admin } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submitting, setSubmitting] = useState(false);

    if (admin) {
        const from = location.state?.from ?? "/admin";
        navigate(from, { replace: true });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            toast.error("Email aur password required hai.");
            return;
        }
        try {
            setSubmitting(true);
            await login(email.trim().toLowerCase(), password);
            toast.success("Welcome back!");
            const from = location.state?.from ?? "/admin";
            navigate(from, { replace: true });
        } catch (err) {
            toast.error(formatApiErrorDetail(err.response?.data?.detail));
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div
            data-testid="admin-login-page"
            className="min-h-screen bg-brand-black text-brand-parchment grid lg:grid-cols-2"
        >
            <div className="hidden lg:flex flex-col justify-between p-12 relative overflow-hidden bg-brand-maroon">
                <div
                    className="absolute inset-0 opacity-25 bg-cover bg-center"
                    style={{
                        backgroundImage:
                            "url('https://customer-assets.emergentagent.com/job_spice-heritage-68/artifacts/9oqtmc1b_CF64513A-0.jpeg')",
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-brand-maroon/80 to-brand-black/90" />
                <div className="relative">
                    <Logo className="h-14 w-auto" />
                    <p className="mt-6 kicker text-brand-turmeric">
                        Nimad Zayka · Admin Console
                    </p>
                </div>
                <div className="relative">
                    <h1 className="font-serif text-5xl leading-tight">
                        Legacy of Purity,
                        <br />
                        <span className="italic text-brand-turmeric">
                            in your hands.
                        </span>
                    </h1>
                    <p className="mt-5 text-brand-parchment/70 max-w-sm">
                        Manage products, inquiries and site content — keep the
                        Nimadi story fresh for every customer.
                    </p>
                </div>
            </div>

            <div className="flex flex-col justify-center px-6 py-20 lg:p-16 bg-brand-parchment text-brand-black">
                <div className="max-w-md w-full mx-auto">
                    <p className="kicker text-brand-chilli">Welcome back</p>
                    <h2 className="mt-3 font-serif text-4xl text-brand-black">
                        Sign in to the console.
                    </h2>
                    <form
                        onSubmit={handleSubmit}
                        data-testid="admin-login-form"
                        className="mt-10 space-y-4"
                    >
                        <div>
                            <label className="text-xs uppercase tracking-widest text-brand-earth/80">
                                Email
                            </label>
                            <input
                                data-testid="admin-login-email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-2 w-full border border-brand-earth/25 bg-white px-4 py-3 text-sm focus:outline-none focus:border-brand-chilli"
                                placeholder="nimadzayka@gmail.com"
                            />
                        </div>
                        <div>
                            <label className="text-xs uppercase tracking-widest text-brand-earth/80">
                                Password
                            </label>
                            <input
                                data-testid="admin-login-password"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-2 w-full border border-brand-earth/25 bg-white px-4 py-3 text-sm focus:outline-none focus:border-brand-chilli"
                                placeholder="••••••••"
                            />
                        </div>
                        <button
                            data-testid="admin-login-submit"
                            type="submit"
                            disabled={submitting}
                            className="btn-primary-brand w-full disabled:opacity-60"
                        >
                            {submitting ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Signing in…
                                </>
                            ) : (
                                <>
                                    Sign in
                                    <i className="fa-solid fa-arrow-right text-xs" />
                                </>
                            )}
                        </button>
                        <p className="text-xs text-brand-earth/70 text-center pt-4">
                            Forgot password? Update{" "}
                            <code className="text-brand-chilli">
                                ADMIN_PASSWORD
                            </code>{" "}
                            in backend `.env` and restart.
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
