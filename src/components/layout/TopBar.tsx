"use client";

import { useState } from "react";
import { Search, Bell, Command } from "lucide-react";

export function TopBar() {
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <header
      style={{
        height: "56px",
        borderBottom: "1px solid var(--color-border-subtle)",
        background: "var(--color-navy-800)",
        display: "flex",
        alignItems: "center",
        padding: "0 24px",
        gap: "16px",
        flexShrink: 0,
        position: "sticky",
        top: 0,
        zIndex: 30,
      }}
    >
      {/* Search bar */}
      <div
        style={{
          flex: 1,
          maxWidth: "480px",
          position: "relative",
        }}
      >
        <Search
          size={15}
          style={{
            position: "absolute",
            left: "12px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "var(--color-text-tertiary)",
            pointerEvents: "none",
          }}
        />
        <input
          placeholder="Search files, documents, history..."
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          style={{
            width: "100%",
            padding: "7px 12px 7px 36px",
            background: searchFocused ? "var(--color-surface-3)" : "var(--color-surface-2)",
            border: `1px solid ${searchFocused ? "var(--color-blue-primary)" : "var(--color-border-default)"}`,
            borderRadius: "var(--radius-md)",
            fontSize: "13px",
            color: "var(--color-text-primary)",
            outline: "none",
            transition: "border-color 0.15s ease, background 0.15s ease",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            alignItems: "center",
            gap: "2px",
            pointerEvents: "none",
          }}
        >
          <kbd
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2px",
              background: "var(--color-surface-4)",
              border: "1px solid var(--color-border-default)",
              borderRadius: "4px",
              padding: "2px 5px",
              fontSize: "10px",
              color: "var(--color-text-tertiary)",
            }}
          >
            <Command size={9} />K
          </kbd>
        </div>
      </div>

      <div style={{ flex: 1 }} />

      {/* Right actions */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <button
          className="btn-ghost"
          style={{ padding: "8px", position: "relative" }}
          aria-label="Notifications"
        >
          <Bell size={17} />
          <span
            style={{
              position: "absolute",
              top: "6px",
              right: "6px",
              width: "7px",
              height: "7px",
              background: "var(--color-blue-primary)",
              borderRadius: "50%",
              border: "2px solid var(--color-navy-800)",
            }}
          />
        </button>

        {/* Avatar */}
        <button
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #2563EB, #7C3AED)",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "13px",
            fontWeight: 700,
            color: "white",
            flexShrink: 0,
          }}
          aria-label="Account menu"
        >
          D
        </button>
      </div>
    </header>
  );
}
