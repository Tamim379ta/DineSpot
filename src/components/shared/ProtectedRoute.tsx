"use client";

import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface Props {
  children: React.ReactNode;
  allowedRole?: "diner" | "owner";
}

export default function ProtectedRoute({ children, allowedRole }: Props) {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (isPending) return;

    if (!session) {
      router.push("/login");
      return;
    }

    if (allowedRole) {
      const role = (session.user as { role?: string })?.role;
      if (role !== allowedRole) {
        router.push("/");
      }
    }
  }, [session, isPending, allowedRole, router]);

  if (isPending) {
    return (
      <div className="min-h-screen bg-[#F7F7F7] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#00B37D] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!session) return null;

  if (allowedRole && (session.user as { role?: string })?.role !== allowedRole) {
    return null;
  }

  return <>{children}</>;
}