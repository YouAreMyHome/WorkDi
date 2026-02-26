"use client";

import { AuthProvider } from "@/lib/auth-context";
import UserMenu from "@/components/UserMenu";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
        {/* We can put global auth-dependent UI here if we want */}
        <div className="fixed top-4 right-4 z-50">
            <UserMenu />
        </div>
      {children}
    </AuthProvider>
  );
}
