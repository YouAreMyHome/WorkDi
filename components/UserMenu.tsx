// components/UserMenu.tsx
"use client";

import { useAuth } from '@/lib/auth-context';
import { LogIn, User, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function UserMenu() {
  const { user, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  if (!user) {
    return (
      <Link href="/login" className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white/80 backdrop-blur-md rounded-full hover:bg-white shadow-sm transition-all border border-gray-200">
        <LogIn className="w-4 h-4" />
        <span className="hidden sm:inline">Đăng nhập</span>
      </Link>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-md ring-2 ring-white hover:bg-emerald-700 transition-colors"
      >
        {user.email?.[0].toUpperCase()}
      </button>

      {isOpen && (
        <>
            {/* Overlay to close menu when clicking outside */}
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />

            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl py-2 border border-gray-100 animate-in fade-in zoom-in-95 duration-200 z-50 origin-top-right">
            <div className="px-4 py-3 border-b border-gray-50">
                <p className="text-xs font-medium text-gray-500 mb-0.5">Xin chào,</p>
                <p className="text-sm font-semibold text-gray-900 truncate">{user.email}</p>
            </div>
            <div className="py-1">
                <Link
                    href="/profile"
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-emerald-600 transition-colors"
                    onClick={() => setIsOpen(false)}
                >
                    <User className="w-4 h-4" />
                    Hồ sơ của tôi
                </Link>
            </div>
            <div className="border-t border-gray-50 pt-1">
                <button
                    onClick={() => {
                        signOut();
                        setIsOpen(false);
                    }}
                    className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
                >
                    <LogOut className="w-4 h-4" />
                    Đăng xuất
                </button>
            </div>
            </div>
        </>
      )}
    </div>
  );
}
