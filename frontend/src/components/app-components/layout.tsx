// components/Layout.tsx
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen relative bg-black text-white">
      <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-orange-900"></div>
      <div className="fixed inset-0 bg-[url('/grid.svg')] opacity-20"></div>

      <div className="fixed inset-0">
        <div className="firefly"></div>
        <div className="firefly"></div>
        <div className="firefly"></div>
        <div className="firefly"></div>
        <div className="firefly"></div>
        <div className="firefly"></div>
        <div className="firefly"></div>
        <div className="firefly"></div>
      </div>

      <div className="relative z-10">{children}</div>
    </div>
  );
}
