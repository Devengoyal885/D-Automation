"use client";

import { useState } from "react";
import {
  Settings,
  User,
  Sparkles,
  Grid3X3,
  Shield,
  Zap,
  HardDrive,
  Lock,
  Bell,
  ChevronRight,
  Save,
  Key,
  Trash2,
  Plus,
} from "lucide-react";
import { toastSuccess, toastInfo } from "@/components/ui/Toaster";

const sections = [
  { id: "account", label: "Account", icon: <User size={16} /> },
  { id: "ai", label: "AI Settings", icon: <Sparkles size={16} /> },
  { id: "templates", label: "Templates", icon: <Grid3X3 size={16} /> },
  { id: "privacy", label: "Privacy", icon: <Shield size={16} /> },
  { id: "formflow", label: "FormFlow", icon: <Zap size={16} /> },
  { id: "storage", label: "Storage", icon: <HardDrive size={16} /> },
  { id: "security", label: "Security", icon: <Lock size={16} /> },
  { id: "notifications", label: "Notifications", icon: <Bell size={16} /> },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("account");
  const [accountName, setAccountName] = useState("Deven Goyal");
  const [accountEmail, setAccountEmail] = useState("deven@example.com");
  const [aiModel, setAiModel] = useState("gemini-1.5-flash");
  const [defaultTone, setDefaultTone] = useState("professional");
  const [defaultLang, setDefaultLang] = useState("English");
  const [geminiKey, setGeminiKey] = useState("");
  const [keyVisible, setKeyVisible] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);
  const [dataSharingEnabled, setDataSharingEnabled] = useState(false);

  return (
    <div style={{ padding: "32px", maxWidth: "1100px", margin: "0 auto" }}>
      <div style={{ marginBottom: "28px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "6px" }}>Settings</h1>
        <p style={{ color: "var(--color-text-secondary)", fontSize: "14px" }}>
          Manage your account, AI preferences, privacy, and workspace settings.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: "24px" }}>
        {/* Sidebar */}
        <div className="card" style={{ padding: "8px", height: "fit-content", position: "sticky", top: "72px" }}>
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px 12px",
                borderRadius: "var(--radius-md)",
                border: "none",
                cursor: "pointer",
                fontSize: "14px",
                background: activeSection === s.id ? "rgba(37,99,235,0.1)" : "transparent",
                color: activeSection === s.id ? "var(--color-blue-light)" : "var(--color-text-secondary)",
                fontWeight: activeSection === s.id ? 500 : 400,
                textAlign: "left",
                transition: "all 0.15s ease",
              }}
            >
              <span style={{ flexShrink: 0 }}>{s.icon}</span>
              {s.label}
              {activeSection === s.id && <ChevronRight size={13} style={{ marginLeft: "auto" }} />}
            </button>
          ))}
        </div>

        {/* Content */}
        <div>
          {/* Account */}
          {activeSection === "account" && (
            <div>
              <h2 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "20px" }}>Account</h2>
              <div className="card" style={{ padding: "24px", marginBottom: "16px" }}>
                <div style={{ display: "flex", gap: "20px", alignItems: "flex-start", flexWrap: "wrap" }}>
                  <div style={{ width: "72px", height: "72px", borderRadius: "50%", background: "linear-gradient(135deg, #2563EB, #7C3AED)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px", fontWeight: 700, color: "white", flexShrink: 0 }}>
                    D
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                      <div>
                        <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--color-text-secondary)", display: "block", marginBottom: "6px" }}>Full Name</label>
                        <input value={accountName} onChange={(e) => setAccountName(e.target.value)} className="input" style={{ fontSize: "13px" }} />
                      </div>
                      <div>
                        <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--color-text-secondary)", display: "block", marginBottom: "6px" }}>Email</label>
                        <input value={accountEmail} onChange={(e) => setAccountEmail(e.target.value)} className="input" style={{ fontSize: "13px" }} />
                      </div>
                    </div>
                    <button onClick={() => toastSuccess("Profile saved!")} className="btn-primary" style={{ fontSize: "13px" }}>
                      <Save size={14} /> Save Changes
                    </button>
                  </div>
                </div>
              </div>

              <div className="card" style={{ padding: "20px" }}>
                <div style={{ fontSize: "14px", fontWeight: 600, marginBottom: "4px", color: "var(--color-rose-accent)" }}>Danger Zone</div>
                <div style={{ fontSize: "13px", color: "var(--color-text-secondary)", marginBottom: "12px" }}>
                  Permanently delete your account and all associated data. This cannot be undone.
                </div>
                <button onClick={() => toastInfo("Account deletion requires email confirmation.")} className="btn-ghost" style={{ color: "var(--color-rose-accent)", border: "1px solid rgba(244,63,94,0.3)", fontSize: "13px" }}>
                  <Trash2 size={14} /> Delete Account
                </button>
              </div>
            </div>
          )}

          {/* AI Settings */}
          {activeSection === "ai" && (
            <div>
              <h2 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "20px" }}>AI Settings</h2>

              <div className="card" style={{ padding: "24px", marginBottom: "16px" }}>
                <div style={{ fontSize: "14px", fontWeight: 600, marginBottom: "16px" }}>API Key</div>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--color-text-secondary)", display: "block", marginBottom: "6px" }}>
                  Google Gemini API Key
                </label>
                <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
                  <input
                    type={keyVisible ? "text" : "password"}
                    value={geminiKey}
                    onChange={(e) => setGeminiKey(e.target.value)}
                    placeholder="AIza..."
                    className="input"
                    style={{ fontSize: "13px", fontFamily: "monospace" }}
                  />
                  <button onClick={() => setKeyVisible((p) => !p)} className="btn-secondary" style={{ fontSize: "12px", padding: "8px 14px", flexShrink: 0 }}>
                    {keyVisible ? "Hide" : "Show"}
                  </button>
                </div>
                <div style={{ fontSize: "12px", color: "var(--color-text-tertiary)", marginBottom: "16px" }}>
                  Get your key at <a href="https://aistudio.google.com" target="_blank" style={{ color: "var(--color-blue-light)" }}>aistudio.google.com</a>. Keys are stored locally and never sent to D-Automation servers.
                </div>
                <button onClick={() => toastSuccess("API key saved securely!")} className="btn-primary" style={{ fontSize: "13px" }}>
                  <Key size={14} /> Save Key
                </button>
              </div>

              <div className="card" style={{ padding: "24px" }}>
                <div style={{ fontSize: "14px", fontWeight: 600, marginBottom: "16px" }}>Generation Defaults</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
                  <div>
                    <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--color-text-secondary)", display: "block", marginBottom: "6px" }}>Default Model</label>
                    <select value={aiModel} onChange={(e) => setAiModel(e.target.value)} className="input" style={{ fontSize: "13px", padding: "8px 12px" }}>
                      <option value="gemini-1.5-flash">Gemini 1.5 Flash (Fast)</option>
                      <option value="gemini-1.5-pro">Gemini 1.5 Pro (Quality)</option>
                      <option value="gemini-2.0-flash">Gemini 2.0 Flash</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--color-text-secondary)", display: "block", marginBottom: "6px" }}>Default Tone</label>
                    <select value={defaultTone} onChange={(e) => setDefaultTone(e.target.value)} className="input" style={{ fontSize: "13px", padding: "8px 12px" }}>
                      <option>professional</option>
                      <option>academic</option>
                      <option>technical</option>
                      <option>casual</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--color-text-secondary)", display: "block", marginBottom: "6px" }}>Language</label>
                    <select value={defaultLang} onChange={(e) => setDefaultLang(e.target.value)} className="input" style={{ fontSize: "13px", padding: "8px 12px" }}>
                      <option>English</option>
                      <option>Hindi</option>
                      <option>Spanish</option>
                      <option>French</option>
                      <option>German</option>
                    </select>
                  </div>
                </div>
                <button onClick={() => toastSuccess("AI settings saved!")} className="btn-primary" style={{ marginTop: "16px", fontSize: "13px" }}>
                  <Save size={14} /> Save Defaults
                </button>
              </div>
            </div>
          )}

          {/* Privacy */}
          {activeSection === "privacy" && (
            <div>
              <h2 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "20px" }}>Privacy</h2>
              <div className="card" style={{ padding: "24px" }}>
                {[
                  { label: "Analytics", desc: "Help improve D-Automation by sharing anonymous usage data", value: analyticsEnabled, onChange: setAnalyticsEnabled },
                  { label: "Data Sharing", desc: "Share anonymized document patterns with AI improvement team", value: dataSharingEnabled, onChange: setDataSharingEnabled },
                ].map((item) => (
                  <div key={item.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0", borderBottom: "1px solid var(--color-border-subtle)" }}>
                    <div>
                      <div style={{ fontSize: "14px", fontWeight: 500 }}>{item.label}</div>
                      <div style={{ fontSize: "12px", color: "var(--color-text-tertiary)", marginTop: "2px" }}>{item.desc}</div>
                    </div>
                    <div
                      onClick={() => item.onChange((p: boolean) => !p)}
                      style={{ width: "44px", height: "24px", borderRadius: "12px", background: item.value ? "var(--color-blue-primary)" : "var(--color-surface-4)", position: "relative", cursor: "pointer", transition: "background 0.2s ease", flexShrink: 0 }}
                    >
                      <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: "white", position: "absolute", top: "2px", left: item.value ? "22px" : "2px", transition: "left 0.2s ease", boxShadow: "0 1px 3px rgba(0,0,0,0.3)" }} />
                    </div>
                  </div>
                ))}
                <div style={{ marginTop: "16px" }}>
                  <button onClick={() => toastInfo("Data export requested — you'll receive an email within 24h.")} className="btn-secondary" style={{ fontSize: "13px" }}>
                    Export My Data
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* FormFlow settings */}
          {activeSection === "formflow" && (
            <div>
              <h2 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "20px" }}>FormFlow</h2>
              <div className="card" style={{ padding: "24px", marginBottom: "16px" }}>
                <div style={{ fontSize: "14px", fontWeight: 600, marginBottom: "4px" }}>Browser Extension Status</div>
                <div style={{ fontSize: "13px", color: "var(--color-text-secondary)", marginBottom: "12px" }}>
                  The FormFlow extension is required for direct Google Form interaction.
                </div>
                <div style={{ padding: "12px 16px", background: "rgba(245, 158, 11, 0.08)", border: "1px solid rgba(245, 158, 11, 0.2)", borderRadius: "var(--radius-md)", fontSize: "13px", color: "var(--color-amber-accent)", marginBottom: "12px" }}>
                  ⚡ Extension not installed. Install it from the Chrome Web Store to enable direct form filling.
                </div>
                <button onClick={() => toastInfo("Chrome Web Store page opening...")} className="btn-primary" style={{ fontSize: "13px" }}>
                  Install Extension
                </button>
              </div>

              <div className="card" style={{ padding: "24px" }}>
                <div style={{ fontSize: "14px", fontWeight: 600, marginBottom: "16px" }}>Profile Encryption</div>
                <div style={{ fontSize: "13px", color: "var(--color-text-secondary)", marginBottom: "12px" }}>
                  All FormFlow profiles are encrypted using AES-256. Your data never leaves your device.
                </div>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button onClick={() => toastInfo("Backup initiated — download starting...")} className="btn-secondary" style={{ fontSize: "13px" }}>
                    Backup Profiles
                  </button>
                  <button onClick={() => toastInfo("All profiles cleared from local storage.")} className="btn-ghost" style={{ fontSize: "13px", color: "var(--color-rose-accent)" }}>
                    <Trash2 size={14} /> Clear All Profiles
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Storage */}
          {activeSection === "storage" && (
            <div>
              <h2 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "20px" }}>Storage</h2>
              <div className="card" style={{ padding: "24px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                  <div>
                    <div style={{ fontSize: "15px", fontWeight: 600 }}>Workspace Storage</div>
                    <div style={{ fontSize: "13px", color: "var(--color-text-secondary)" }}>3.2 GB used of 5 GB (Free plan)</div>
                  </div>
                  <div style={{ fontSize: "24px", fontWeight: 700, color: "var(--color-blue-light)" }}>64%</div>
                </div>
                <div style={{ height: "8px", background: "var(--color-surface-4)", borderRadius: "4px", overflow: "hidden", marginBottom: "20px" }}>
                  <div style={{ height: "100%", width: "64%", background: "linear-gradient(90deg, var(--color-blue-primary), var(--color-violet-primary))", borderRadius: "4px" }} />
                </div>
                {[
                  { label: "Generated Documents", size: "1.4 GB", color: "#2563EB" },
                  { label: "Uploaded PDFs", size: "0.9 GB", color: "#7C3AED" },
                  { label: "Extracted Data (CSV/XLSX)", size: "0.5 GB", color: "#059669" },
                  { label: "Processed Files", size: "0.4 GB", color: "#D97706" },
                ].map((item) => (
                  <div key={item.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid var(--color-border-subtle)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: item.color }} />
                      <span style={{ fontSize: "13px" }}>{item.label}</span>
                    </div>
                    <span style={{ fontSize: "13px", color: "var(--color-text-secondary)" }}>{item.size}</span>
                  </div>
                ))}
                <div style={{ marginTop: "16px" }}>
                  <button onClick={() => toastInfo("Upgrade to Pro for 50GB storage.")} className="btn-primary" style={{ fontSize: "13px" }}>
                    Upgrade Storage
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Security */}
          {activeSection === "security" && (
            <div>
              <h2 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "20px" }}>Security</h2>
              <div className="card" style={{ padding: "24px", marginBottom: "16px" }}>
                <div style={{ fontSize: "14px", fontWeight: 600, marginBottom: "16px" }}>Change Password</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "400px" }}>
                  {["Current Password", "New Password", "Confirm New Password"].map((label) => (
                    <div key={label}>
                      <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--color-text-secondary)", display: "block", marginBottom: "6px" }}>{label}</label>
                      <input type="password" className="input" style={{ fontSize: "13px" }} />
                    </div>
                  ))}
                  <button onClick={() => toastSuccess("Password updated successfully!")} className="btn-primary" style={{ fontSize: "13px", width: "fit-content" }}>
                    <Lock size={14} /> Update Password
                  </button>
                </div>
              </div>

              <div className="card" style={{ padding: "24px" }}>
                <div style={{ fontSize: "14px", fontWeight: 600, marginBottom: "12px" }}>Active Sessions</div>
                {[
                  { device: "Chrome on Windows 11", location: "Chandigarh, India", time: "Active now", current: true },
                  { device: "Mobile Chrome", location: "Chandigarh, India", time: "2 days ago", current: false },
                ].map((session, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid var(--color-border-subtle)" }}>
                    <div>
                      <div style={{ fontSize: "13px", fontWeight: 500 }}>{session.device} {session.current && <span className="badge badge-emerald" style={{ fontSize: "9px", marginLeft: "6px" }}>Current</span>}</div>
                      <div style={{ fontSize: "12px", color: "var(--color-text-tertiary)" }}>{session.location} · {session.time}</div>
                    </div>
                    {!session.current && (
                      <button onClick={() => toastSuccess("Session terminated.")} className="btn-ghost" style={{ fontSize: "12px", color: "var(--color-rose-accent)" }}>
                        Revoke
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Default fallback */}
          {!["account", "ai", "privacy", "formflow", "storage", "security"].includes(activeSection) && (
            <div className="card" style={{ padding: "48px", textAlign: "center" }}>
              <Settings size={32} style={{ color: "var(--color-text-tertiary)", margin: "0 auto 12px" }} />
              <div style={{ fontWeight: 600, marginBottom: "8px" }}>
                {sections.find((s) => s.id === activeSection)?.label} Settings
              </div>
              <div style={{ fontSize: "13px", color: "var(--color-text-tertiary)" }}>
                Settings for this section are coming soon.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
