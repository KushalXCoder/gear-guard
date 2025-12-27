"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

// TEMP: replace this with real auth (NextAuth / JWT / Supabase)
const useAuth = () => {
  // change to true to simulate logged-in user
  const isLoggedIn = true;
  const user = { username: "Nirav" };
  return { isLoggedIn, user };
};

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { isLoggedIn, user } = useAuth();

  const tabs = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Maintenance Calendar", path: "/maintenance" },
    { name: "Equipment", path: "/equipment" },
    { name: "Reporting", path: "/reporting" },
    { name: "Teams", path: "/teams" },
  ];

  return (
    <nav className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-14">

          {/* LEFT: Navigation Tabs */}
          <div className="flex items-center gap-8">
            {tabs.map((tab) => {
              const isActive =
                pathname === tab.path ||
                (tab.path !== "/" && pathname.startsWith(tab.path));

              return (
                <Link
                  key={tab.name}
                  href={tab.path}
                  className={`py-4 px-1 border-b-2 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "border-indigo-600 text-indigo-600"
                      : "border-transparent text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {tab.name}
                </Link>
              );
            })}
          </div>

          {/* RIGHT: Auth Section */}
          <div className="flex items-center gap-4">
            {!isLoggedIn ? (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium text-slate-600 hover:text-slate-900"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-slate-700">
                  Hi, {user.username}
                </span>
                <button
                  onClick={() => router.push("/profile")}
                  className="px-3 py-1.5 text-sm border rounded-md hover:bg-slate-100"
                >
                  Profile
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}
