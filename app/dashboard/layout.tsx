// app/dashboard/layout.tsx
"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MemoryDebugWrapper } from "@/features/charts/components/MemoryDebugWrapper";

export default function ChartsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="h-16 flex items-center justify-center border-b border-gray-200">
          <span className="text-xl font-semibold text-gray-800">Dashboard</span>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-3">
          <Link
            href="/charts"
            className="block text-gray-700 hover:text-blue-600"
          >
            📈 Charts
          </Link>
          <Link
            href="/reports"
            className="block text-gray-700 hover:text-blue-600"
          >
            📊 Reports
          </Link>
          <Link
            href="/settings"
            className="block text-gray-700 hover:text-blue-600"
          >
            ⚙️ Settings
          </Link>
        </nav>
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white px-6 flex items-center justify-between border-b border-gray-200">
          <h1 className="text-2xl font-semibold text-gray-800">
            Charts Overview
          </h1>
          <div className="flex items-center space-x-4">
            <input
              type="search"
              placeholder="Search..."
              className="px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="w-10 h-10 rounded-full overflow-hidden">
              <Image
                src="/images/hi-minion.gif"
                width={40}
                height={40}
                alt="User avatar"
                unoptimized
              />
            </button>
          </div>
        </header>

        <main className="p-6 bg-gray-100 flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
