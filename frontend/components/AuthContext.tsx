"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axiosInstance from "../lib/axios";

type User = {
    name: string;
    role: string;
};

type AuthContextType = {
    user: User | null;
    accessToken: string | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    loading: boolean;
    error: string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Load user from cookie on mount
    useEffect(() => {
        const token = Cookies.get("access_token");
        const userStr = Cookies.get("user");
        if (token && userStr) {
            setAccessToken(token);
            setUser(JSON.parse(userStr));
        }
        setLoading(false);
    }, []);

    // Login function
    const login = async (email: string, password: string) => {
        setLoading(true);
        setError(null);
        try {
            const res = await axiosInstance.post("/auth/login", {
                email,
                password,
            });
            const { access_token, ...userData } = res.data;
            setAccessToken(access_token);
            setUser(userData);
            Cookies.set("access_token", access_token, { expires: 1 });
            Cookies.set("user", JSON.stringify(userData), { expires: 1 });
        } catch (err) {
            setError("Invalid credentials");
            setUser(null);
            setAccessToken(null);
            Cookies.remove("access_token");
            Cookies.remove("user");
        } finally {
            setLoading(false);
        }
    };

    // Logout function
    const logout = () => {
        setUser(null);
        setAccessToken(null);
        Cookies.remove("access_token");
        Cookies.remove("user");
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                accessToken,
                isAuthenticated: !!user && !!accessToken,
                login,
                logout,
                loading,
                error,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
};
