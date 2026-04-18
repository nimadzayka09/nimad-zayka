import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { adminApi, clearToken, getToken, setToken } from "../lib/adminApi";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);

    const refresh = useCallback(async () => {
        const t = getToken();
        if (!t) {
            setAdmin(null);
            setLoading(false);
            return;
        }
        try {
            const { data } = await adminApi.get("/admin/me");
            setAdmin(data);
        } catch {
            setAdmin(null);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        refresh();
    }, [refresh]);

    const login = useCallback(async (email, password) => {
        const { data } = await adminApi.post("/admin/login", { email, password });
        setToken(data.token);
        setAdmin({ email: data.email, role: data.role });
        return data;
    }, []);

    const logout = useCallback(() => {
        clearToken();
        setAdmin(null);
    }, []);

    return (
        <AuthContext.Provider value={{ admin, loading, login, logout, refresh }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}
