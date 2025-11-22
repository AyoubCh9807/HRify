"use client";

import React from "react";

type NavbarItem = {
  icon: string;
  label: string;
  active: boolean;
};

export const Navbar = () => {
  const navItems: NavbarItem[] = [
    { icon: "📊", label: "Dashboard", active: true },
    { icon: "👥", label: "Teams", active: false },
    { icon: "📨", label: "Messages", active: false },
    { icon: "🧍", label: "Employees", active: false },
    { icon: "⚙️", label: "Settings", active: false },
  ];

  return (
    <>
      {/* Top Navbar */}
      <header className="fixed top-0 left-0 right-0 bg-(--surface) border-b border-(--border) z-40 px-8 py-4 flex items-center justify-between h-16">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-extrabold tracking-wide from-(--primary) to-(--primary-light) text-transparent bg-clip-text bg-linear-to-r">
            HRFlow
          </h1>
        </div>

        <div className="flex items-center gap-5">
          <div className="relative w-80">
            <input
              type="text"
              placeholder="Search teams, employees, or actions..."
              className="w-full pl-10 pr-4 py-2.5 bg-(--surface-alt) rounded-xl border border-(--border) text-(--text-main) placeholder-(--text-ubtle) focus:outline-none focus:ring-2 focus:ring-(--primary)/30 transition-all"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 absolute left-3.5 top-3 text-(--text-ubtle)"
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
          </div>

          <button className="p-2.5 rounded-xl hover:bg-(--surface-alt) transition-colors relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-(--text-mmuted)"
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

      {/* Sidebar */}
      <aside className="w-64 bg-(--surface) border-r border-(--border) flex flex-col p-6 fixed top-16 left-0 bottom-0 z-30">
        <nav className="mt-6 space-y-1.5">
          {navItems.map((item) => (
            <a
              key={item.label}
              href="#"
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
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
