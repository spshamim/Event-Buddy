"use client";
import { useAuth } from "./AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import Loader from "./Loader";

export default function PrivateRoute({
    children,
}: {
    children: React.ReactNode;
}) {
    const { isAuthenticated, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.replace(
                `/signin?callbackUrl=${encodeURIComponent(pathname)}`
            );
        }
    }, [isAuthenticated, loading, router, pathname]);

    if (loading) return <Loader />;
    if (!isAuthenticated) return null;

    return <>{children}</>;
}
