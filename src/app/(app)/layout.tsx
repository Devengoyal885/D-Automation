"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { TopBar } from "@/components/layout/TopBar";
import { CommandPaletteProvider } from "@/components/layout/CommandPalette";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <CommandPaletteProvider>
      <div style={{ display: "flex", minHeight: "100vh" }}>
        {/* Sidebar */}
        <Sidebar />

        {/* Main content area — offset by sidebar width on desktop */}
        <div
          style={{
            flex: 1,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            marginLeft: "240px",
          }}
          className="app-main"
        >
          <TopBar />
          <main
            style={{
              flex: 1,
              overflowY: "auto",
              background: "var(--color-navy-900)",
            }}
            className="page-enter"
          >
            {children}
          </main>
        </div>
      </div>

      {/* Responsive: collapse sidebar margin on mobile */}
      <style>{`
        @media (max-width: 768px) {
          .app-main { margin-left: 0 !important; }
        }
      `}</style>
    </CommandPaletteProvider>
  );
}
