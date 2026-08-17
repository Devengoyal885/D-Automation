"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Sparkles,
  FileText,
  Presentation,
  BookOpen,
  FlaskConical,
  Lightbulb,
  FileType2,
  Merge,
  Scissors,
  Minimize2,
  RotateCcw,
  Image,
  Table2,
  Wand2,
  FolderOpen,
  History,
  Settings,
  HelpCircle,
  User,
  ChevronDown,
  ChevronRight,
  Zap,
  Menu,
  X,
  RefreshCw,
  Grid3X3,
} from "lucide-react";

interface NavItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  children?: NavItem[];
  badge?: string;
}

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard size={16} />,
  },
  {
    label: "AI Studio",
    icon: <Sparkles size={16} />,
    children: [
      { label: "Create", href: "/ai-studio", icon: <Wand2 size={14} /> },
      { label: "Presentations", href: "/ai-studio/presentations", icon: <Presentation size={14} /> },
      { label: "Documents", href: "/ai-studio/documents", icon: <FileText size={14} /> },
      { label: "Reports", href: "/ai-studio/reports", icon: <BookOpen size={14} /> },
      { label: "Research", href: "/ai-studio/research", icon: <FlaskConical size={14} /> },
      { label: "Patent Assistant", href: "/ai-studio/patent", icon: <Lightbulb size={14} /> },
    ],
  },
  {
    label: "Pandaz PDF",
    icon: <FileType2 size={16} />,
    children: [
      { label: "PDF Workspace", href: "/pandaz", icon: <Grid3X3 size={14} /> },
      { label: "Merge", href: "/pandaz/merge", icon: <Merge size={14} /> },
      { label: "Split", href: "/pandaz/split", icon: <Scissors size={14} /> },
      { label: "Compress", href: "/pandaz/compress", icon: <Minimize2 size={14} /> },
      { label: "Rotate & Organize", href: "/pandaz/organize", icon: <RotateCcw size={14} /> },
      { label: "Convert", href: "/pandaz/convert", icon: <RefreshCw size={14} /> },
      { label: "PDF → Images", href: "/pandaz/to-images", icon: <Image size={14} /> },
    ],
  },
  {
    label: "SmartExtract",
    href: "/smart-extract",
    icon: <Table2 size={16} />,
    badge: "NEW",
  },
  {
    label: "FormFlow",
    href: "/form-flow",
    icon: <Zap size={16} />,
  },
  {
    label: "Templates",
    href: "/templates",
    icon: <Grid3X3 size={16} />,
  },
  {
    label: "My Files",
    href: "/files",
    icon: <FolderOpen size={16} />,
  },
  {
    label: "History",
    href: "/history",
    icon: <History size={16} />,
  },
];

const bottomNav: NavItem[] = [
  { label: "Settings", href: "/settings", icon: <Settings size={16} /> },
  { label: "Help", href: "/help", icon: <HelpCircle size={16} /> },
  { label: "Account", href: "/account", icon: <User size={16} /> },
];

function NavGroup({ item, collapsed }: { item: NavItem; collapsed: boolean }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(() => {
    if (!item.children) return false;
    return item.children.some((c) => c.href && pathname.startsWith(c.href));
  });

  const isActive = item.href ? pathname === item.href || pathname.startsWith(item.href + "/") : false;

  if (!item.children) {
    return (
      <Link
        href={item.href || "#"}
        className={`sidebar-link ${isActive ? "active" : ""}`}
        title={collapsed ? item.label : undefined}
      >
        {item.icon && <span style={{ flexShrink: 0 }}>{item.icon}</span>}
        {!collapsed && (
          <>
            <span style={{ flex: 1 }}>{item.label}</span>
            {item.badge && (
              <span className="badge badge-blue" style={{ fontSize: "9px", padding: "2px 5px" }}>
                {item.badge}
              </span>
            )}
          </>
        )}
      </Link>
    );
  }

  return (
    <div>
      <button
        onClick={() => setOpen((p) => !p)}
        className={`sidebar-link`}
        style={{ width: "100%", border: "none", background: "none" }}
        title={collapsed ? item.label : undefined}
        aria-expanded={open}
      >
        {item.icon && <span style={{ flexShrink: 0 }}>{item.icon}</span>}
        {!collapsed && (
          <>
            <span style={{ flex: 1 }}>{item.label}</span>
            {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </>
        )}
      </button>
      {open && !collapsed && (
        <div style={{ marginLeft: "16px", marginTop: "2px" }}>
          {item.children!.map((child) => {
            const childActive = child.href
              ? pathname === child.href || pathname.startsWith(child.href + "/")
              : false;
            return (
              <Link
                key={child.href}
                href={child.href || "#"}
                className={`sidebar-link ${childActive ? "active" : ""}`}
                style={{ fontSize: "13px" }}
              >
                {child.icon && <span style={{ flexShrink: 0, opacity: 0.8 }}>{child.icon}</span>}
                <span>{child.label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const sidebarWidth = collapsed ? 64 : 240;

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            zIndex: 40,
          }}
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile toggle button */}
      <button
        className="hide-desktop btn-ghost"
        onClick={() => setMobileOpen(true)}
        style={{
          position: "fixed",
          top: "12px",
          left: "12px",
          zIndex: 50,
          padding: "8px",
        }}
        aria-label="Open navigation"
      >
        <Menu size={20} />
      </button>

      {/* Sidebar */}
      <aside
        style={{
          width: `${sidebarWidth}px`,
          height: "100vh",
          background: "var(--color-navy-800)",
          borderRight: "1px solid var(--color-border-subtle)",
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
          transition: "width 0.2s ease, transform 0.25s ease",
          overflow: "hidden",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 45,
          transform: "none",
        }}
        className={mobileOpen ? "sidebar-open" : ""}
        aria-label="Main navigation"
      >
        {/* Logo */}
        <div
          style={{
            padding: collapsed ? "16px 12px" : "16px 20px",
            borderBottom: "1px solid var(--color-border-subtle)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "8px",
          }}
        >
          {!collapsed && (
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "8px",
                  background: "linear-gradient(135deg, #2563EB, #7C3AED)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Zap size={14} color="white" fill="white" />
              </div>
              <div>
                <div style={{ fontSize: "14px", fontWeight: 700, color: "var(--color-text-primary)", lineHeight: 1 }}>
                  D-Automation
                </div>
                <div style={{ fontSize: "10px", color: "var(--color-text-tertiary)", marginTop: "2px" }}>
                  AI Productivity Suite
                </div>
              </div>
            </div>
          )}
          {collapsed && (
            <div
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "8px",
                background: "linear-gradient(135deg, #2563EB, #7C3AED)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Zap size={14} color="white" fill="white" />
            </div>
          )}
          <button
            onClick={() => { setCollapsed((p) => !p); setMobileOpen(false); }}
            className="btn-ghost hide-mobile"
            style={{ padding: "4px", marginLeft: "auto" }}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {mobileOpen ? <X size={16} /> : collapsed ? <ChevronRight size={16} /> : <ChevronRight size={16} style={{ transform: "rotate(180deg)" }} />}
          </button>
          <button
            onClick={() => setMobileOpen(false)}
            className="btn-ghost hide-desktop"
            style={{ padding: "4px" }}
            aria-label="Close navigation"
          >
            <X size={16} />
          </button>
        </div>

        {/* Nav items */}
        <nav
          style={{
            flex: 1,
            padding: "12px 8px",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "2px",
          }}
        >
          {navItems.map((item, i) => (
            <NavGroup key={i} item={item} collapsed={collapsed} />
          ))}
        </nav>

        {/* Divider */}
        <div style={{ height: "1px", background: "var(--color-border-subtle)", margin: "0 12px" }} />

        {/* Bottom nav */}
        <div style={{ padding: "8px" }}>
          {bottomNav.map((item, i) => (
            <NavGroup key={i} item={item} collapsed={collapsed} />
          ))}
        </div>
      </aside>
    </>
  );
}
