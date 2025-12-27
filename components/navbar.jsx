"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Wrench, Menu, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const tabs = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Maintenance Calendar", path: "/maintenance" },
    { name: "Equipment", path: "/equipment" },
    { name: "Reporting", path: "/reporting" },
    { name: "Teams", path: "/teams" },
  ];

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* MAIN BAR */}
        <div className="flex items-center h-16">

          {/* LEFT: Logo + Desktop Tabs */}
          <div className="flex items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <Wrench className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold text-slate-900">
                GearGuard
              </span>
            </Link>

            {/* Desktop Navigation Tabs - SHIFTED RIGHT with ml-24 */}
            <div className="hidden md:flex items-center gap-6 ml-24">
              {tabs.map((tab) => {
                const isActive =
                  pathname === tab.path ||
                  (tab.path !== "/" && pathname.startsWith(tab.path));

                return (
                  <Link
                    key={tab.name}
                    href={tab.path}
                    className={`py-3 px-1 border-b-2 text-base font-semibold transition-all duration-200 ease-out ${isActive
                      ? "border-indigo-600 text-indigo-600"
                      : "border-transparent text-slate-600 hover:text-slate-900"
                      }`}
                  >
                    {tab.name}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* RIGHT: Desktop Auth Section */}
          <div className="hidden md:flex items-center gap-4 ml-auto">
            {!user ? (
              <>
                <Link
                  href="/auth"
                  className="text-sm font-medium text-slate-600 hover:text-slate-900"
                >
                  Login
                </Link>
                <Link
                  href="/auth"
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-slate-700">
                  Hi, {user.name}
                </span>
                <button
                  onClick={logout}
                  className="px-3 py-1.5 text-sm border border-red-200 text-red-600 rounded-md hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* MOBILE: Menu Button */}
          <div className="md:hidden flex items-center ml-auto">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

        </div>
      </div>

      {/* MOBILE: Dropdown Menu */}
      <div
        className={`md:hidden bg-white border-b border-slate-200 shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <div className="px-4 py-2 space-y-1">
          {tabs.map((tab) => {
            const isActive =
              pathname === tab.path ||
              (tab.path !== "/" && pathname.startsWith(tab.path));

            return (
              <Link
                key={tab.name}
                href={tab.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${isActive
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
              >
                {tab.name}
              </Link>
            );
          })}
        </div>

        <div className="pt-4 pb-4 border-t border-slate-200">
          <div className="px-4 space-y-3">
            {!user ? (
              <>
                <Link
                  href="/auth"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-center px-4 py-2 text-base font-medium text-slate-600 border border-slate-300 rounded-md hover:bg-slate-50"
                >
                  Login
                </Link>
                <Link
                  href="/auth"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-center px-4 py-2 text-base font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <div className="px-3 space-y-3">
                <div className="text-base font-medium text-slate-800">
                  Signed in as {user.name}
                </div>
                <button
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left text-base font-medium text-red-600 hover:text-red-700"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}