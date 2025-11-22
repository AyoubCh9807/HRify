"use client";

import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type NavbarItem = {
  icon: string;
  label: string;
  active: boolean;
  path: string;
};

type Suggestion = {
  label: string;
  path: string;
};

export const Navbar = () => {
  const [navItems, setNavItems] = useState<NavbarItem[]>([
    { icon: "📊", label: "Dashboard", active: false, path: "/dashboard" },
    { icon: "👥", label: "Teams", active: false, path: "/teams" },
    { icon: "📨", label: "Messages", active: false, path: "/messages" },
    { icon: "⚙️", label: "Settings", active: false, path: "/settings" },
  ]);

  const path = usePathname();

  useEffect(() => {
    setNavItems(
      navItems.map((item) => ({
        ...item,
        active: item.path === path,
      }))
    );
  }, [path]);

  const router = useRouter();

  // --- SEARCHBAR STATE ---
  const [search, setSearch] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<Suggestion[]>(
    []
  );
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Example suggestions array
  const suggestions: Suggestion[] = [
    { label: "My account", path: "/settings" },
    { label: "Sign out", path: "/settings" },
    { label: "Settings", path: "/settings" },
    { label: "Dashboard", path: "/dashboard" },
    { label: "Team Overview", path: "/dashboard" },
    { label: "Messages", path: "/messages" },
    { label: "My Teams", path: "/teams" },
    { label: "Teams", path: "/teams" },
    { label: "Create team", path: "/teams" },
    { label: "Terminate team", path: "/teams" },
    { label: "Fire team", path: "/teams" },
    { label: "Bulk message", path: "/teams" },
    { label: "My account", path: "/teams" },
  ];

  useEffect(() => {
    if (search.trim() === "") {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const filtered = suggestions.filter((s) =>
      s.label.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredSuggestions(filtered);
    setShowSuggestions(filtered.length > 0);
  }, [search]);

  return (
    <>
      <header className="font-sans fixed top-0 left-0 right-0 bg-(--surface) border-b border-(--border) z-40 px-8 py-4 flex items-center justify-between h-16">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 relative">
            <Image
              src="/logo.png"
              alt="HRify Logo"
              fill
              className="object-contain"
              onClick={() => {
                router.push("/");
              }}
            />
          </div>
          <h1
          onClick={() => {
            router.push("/");
          }} 
          className="text-3xl font-extrabold tracking-wide from-(--primary) to-(--primary-light) text-transparent bg-clip-text bg-linear-to-r">
            HRify
          </h1>
        </div>

        <div className="flex items-center gap-5 relative">
          <div className="relative w-80">
            <input
              type="text"
              placeholder="Search teams, employees, or actions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setShowSuggestions(filteredSuggestions.length > 0)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
              className="w-full pl-10 pr-4 py-2.5 bg-(--surface-alt) rounded-xl border border-(--border) text-(--text-main) placeholder-(--text-subtle) focus:outline-none focus:ring-2 focus:ring-(--primary)/30 transition-all"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 absolute left-3.5 top-3 text-(--text-subtle)"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>

            {showSuggestions && (
              <ul className="absolute top-full left-0 right-0 mt-1 bg-(--surface-alt) border border-(--border) rounded-lg shadow-lg max-h-60 overflow-auto z-50">
                {filteredSuggestions.map((s) => (
                  <li
                    key={s.path + s.label}
                    onMouseDown={() => {
                      setSearch(s.label);
                      setShowSuggestions(false);
                    }}
                    className="px-4 py-2 cursor-pointer hover:bg-(--surface) transition-colors"
                  >
                    {s.label}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button className="p-2.5 rounded-xl hover:bg-(--surface-alt) transition-colors relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-(--text-muted)"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-5 5v-5zM9 7H4l5-5v5z"
              />
            </svg>
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-(--warning) rounded-full border-2 border-(--surface)"></span>
          </button>

          <div className="w-9 h-9 rounded-xl bg-(--primary) flex items-center justify-center text-white text-sm font-medium">
            AC
          </div>
        </div>
      </header>

      <aside className="w-64 bg-(--surface) border-r border-(--border) flex flex-col p-6 fixed top-16 left-0 bottom-0 z-30">
        <nav className="mt-6 space-y-1.5">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.path}
              className={`flex font-sans items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                item.active
                  ? "bg-(--surface-alt) text-(--primary) font-medium"
                  : "text-(--text-muted) hover:bg-(--surface-alt) hover:text-(--text-main)"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
      </aside>
    </>
  );
};
