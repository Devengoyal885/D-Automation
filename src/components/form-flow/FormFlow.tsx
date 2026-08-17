"use client";

import { useState } from "react";
import {
  Zap,
  Plus,
  Edit2,
  Trash2,
  User,
  Mail,
  Phone,
  Building,
  BookOpen,
  Link2,
  Lock,
  Shield,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  Globe,
} from "lucide-react";
import { toastSuccess, toastError, toastInfo } from "@/components/ui/Toaster";

interface Profile {
  id: string;
  name: string;
  type: "college" | "personal" | "team" | "work";
  fieldCount: number;
  fields: ProfileField[];
  createdAt: string;
}

interface ProfileField {
  id: string;
  label: string;
  value: string;
  icon: React.ReactNode;
  sensitive?: boolean;
}

const defaultProfiles: Profile[] = [
  {
    id: "p1",
    name: "College Profile",
    type: "college",
    fieldCount: 12,
    createdAt: "Aug 10, 2025",
    fields: [
      { id: "f1", label: "Full Name", value: "Deven Goyal", icon: <User size={14} /> },
      { id: "f2", label: "Email", value: "deven@example.com", icon: <Mail size={14} /> },
      { id: "f3", label: "Phone", value: "+91 98765 43210", icon: <Phone size={14} />, sensitive: true },
      { id: "f4", label: "University", value: "Chandigarh University", icon: <Building size={14} /> },
      { id: "f5", label: "Course", value: "B.Tech Computer Science", icon: <BookOpen size={14} /> },
      { id: "f6", label: "Semester", value: "6th Semester", icon: <BookOpen size={14} /> },
      { id: "f7", label: "GitHub", value: "github.com/devengoyal", icon: <Link2 size={14} /> },
      { id: "f8", label: "LinkedIn", value: "linkedin.com/in/devengoyal", icon: <Link2 size={14} /> },
      { id: "f9", label: "Portfolio", value: "devengoyal.dev", icon: <Globe size={14} /> },
    ],
  },
  {
    id: "p2",
    name: "Team Profile",
    type: "team",
    fieldCount: 8,
    createdAt: "Aug 12, 2025",
    fields: [
      { id: "t1", label: "Team Name", value: "Team Nexus", icon: <Building size={14} /> },
      { id: "t2", label: "Team Lead", value: "Deven Goyal", icon: <User size={14} /> },
      { id: "t3", label: "Member 2", value: "Ananya Singh", icon: <User size={14} /> },
      { id: "t4", label: "Member 3", value: "Rahul Kumar", icon: <User size={14} /> },
      { id: "t5", label: "GitHub Repo", value: "github.com/team-nexus", icon: <Link2 size={14} /> },
      { id: "t6", label: "Project URL", value: "nexus-project.vercel.app", icon: <Globe size={14} /> },
    ],
  },
];

const DEMO_FORM_FIELDS = [
  { label: "Full Name", matched: true, profileField: "Full Name", confidence: 0.98 },
  { label: "Email Address", matched: true, profileField: "Email", confidence: 0.95 },
  { label: "University Name", matched: true, profileField: "University", confidence: 0.92 },
  { label: "Department / Course", matched: true, profileField: "Course", confidence: 0.87 },
  { label: "Current Semester", matched: true, profileField: "Semester", confidence: 0.90 },
  { label: "GitHub Profile URL", matched: true, profileField: "GitHub", confidence: 0.99 },
  { label: "LinkedIn URL", matched: true, profileField: "LinkedIn", confidence: 0.98 },
  { label: "Portfolio Website", matched: true, profileField: "Portfolio", confidence: 0.85 },
  { label: "Roll Number", matched: false, profileField: null, confidence: 0 },
  { label: "Section / Batch", matched: false, profileField: null, confidence: 0 },
];

const typeColors: Record<string, string> = {
  college: "#2563EB",
  personal: "#7C3AED",
  team: "#059669",
  work: "#D97706",
};

export function FormFlow() {
  const [profiles, setProfiles] = useState<Profile[]>(defaultProfiles);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [showMatchDemo, setShowMatchDemo] = useState(false);
  const [formUrl, setFormUrl] = useState("");
  const [matchStep, setMatchStep] = useState<"input" | "matching" | "review" | "filled">("input");
  const [showAddProfile, setShowAddProfile] = useState(false);

  const startMatching = async () => {
    if (!selectedProfile) { toastError("Select a profile first."); return; }
    setMatchStep("matching");
    await new Promise((r) => setTimeout(r, 1800));
    setMatchStep("review");
    setShowMatchDemo(true);
    toastSuccess("8 of 10 fields matched!");
  };

  const matchedCount = DEMO_FORM_FIELDS.filter((f) => f.matched).length;

  return (
    <div style={{ padding: "32px", maxWidth: "1200px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ marginBottom: "32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
          <div style={{
            width: "32px", height: "32px", borderRadius: "var(--radius-md)",
            background: "linear-gradient(135deg, #BE185D, #DB2777)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Zap size={16} color="white" fill="white" />
          </div>
          <h1 style={{ fontSize: "24px", fontWeight: 700 }}>FormFlow</h1>
        </div>
        <p style={{ color: "var(--color-text-secondary)", fontSize: "14px" }}>
          Stop typing the same information again and again. Save profiles, match fields, fill instantly.
        </p>
      </div>

      {/* Privacy banner */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "12px 16px",
          background: "rgba(124, 58, 237, 0.08)",
          border: "1px solid rgba(124, 58, 237, 0.2)",
          borderRadius: "var(--radius-md)",
          marginBottom: "28px",
          fontSize: "13px",
          color: "var(--color-text-secondary)",
        }}
      >
        <Shield size={16} style={{ color: "#7C3AED", flexShrink: 0 }} />
        <span>
          All profile data is stored locally and encrypted. FormFlow never stores Google credentials or submits forms without your explicit confirmation.
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: "24px", alignItems: "start" }}>
        {/* Profiles */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h2 style={{ fontSize: "16px", fontWeight: 600 }}>Saved Profiles</h2>
            <button
              onClick={() => setShowAddProfile(true)}
              className="btn-primary"
              style={{ fontSize: "13px", padding: "8px 16px" }}
            >
              <Plus size={14} /> New Profile
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "28px" }}>
            {profiles.map((profile) => (
              <div
                key={profile.id}
                onClick={() => setSelectedProfile(selectedProfile?.id === profile.id ? null : profile)}
                className="card"
                style={{
                  padding: "20px",
                  cursor: "pointer",
                  borderColor: selectedProfile?.id === profile.id ? typeColors[profile.type] + "60" : undefined,
                  background: selectedProfile?.id === profile.id ? `${typeColors[profile.type]}08` : undefined,
                  transition: "all 0.2s ease",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                    <div
                      style={{
                        width: "40px", height: "40px",
                        borderRadius: "var(--radius-md)",
                        background: `${typeColors[profile.type]}18`,
                        border: `1px solid ${typeColors[profile.type]}30`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: typeColors[profile.type],
                        fontSize: "18px",
                        fontWeight: 700,
                      }}
                    >
                      {profile.name.charAt(0)}
                    </div>
                    <div>
                      <div style={{ fontSize: "15px", fontWeight: 600, marginBottom: "2px" }}>{profile.name}</div>
                      <div style={{ fontSize: "12px", color: "var(--color-text-tertiary)" }}>
                        {profile.fields.length} fields • Created {profile.createdAt}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "4px" }}>
                    <button className="btn-ghost" style={{ padding: "4px" }} onClick={(e) => { e.stopPropagation(); toastInfo("Edit profile — coming soon!"); }}>
                      <Edit2 size={14} />
                    </button>
                    <button
                      className="btn-ghost"
                      style={{ padding: "4px", color: "var(--color-rose-accent)" }}
                      onClick={(e) => { e.stopPropagation(); setProfiles((p) => p.filter((x) => x.id !== profile.id)); if (selectedProfile?.id === profile.id) setSelectedProfile(null); }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                {/* Field preview */}
                {selectedProfile?.id === profile.id && (
                  <div style={{ marginTop: "16px", paddingTop: "16px", borderTop: "1px solid var(--color-border-subtle)" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                      {profile.fields.map((field) => (
                        <div
                          key={field.id}
                          style={{
                            display: "flex",
                            gap: "8px",
                            alignItems: "center",
                            padding: "8px 10px",
                            background: "var(--color-surface-3)",
                            borderRadius: "var(--radius-md)",
                          }}
                        >
                          <span style={{ color: "var(--color-text-tertiary)", flexShrink: 0 }}>{field.icon}</span>
                          <div style={{ minWidth: 0 }}>
                            <div style={{ fontSize: "10px", color: "var(--color-text-tertiary)", textTransform: "uppercase", letterSpacing: "0.04em" }}>{field.label}</div>
                            <div style={{ fontSize: "12px", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                              {field.sensitive ? "••••••••" : field.value}
                            </div>
                          </div>
                          {field.sensitive && <Lock size={10} style={{ color: "var(--color-text-tertiary)", flexShrink: 0 }} />}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Empty state */}
            {profiles.length === 0 && (
              <div style={{ padding: "48px 24px", textAlign: "center", border: "1px dashed var(--color-border-default)", borderRadius: "var(--radius-lg)" }}>
                <Zap size={32} style={{ color: "var(--color-text-tertiary)", margin: "0 auto 12px" }} />
                <div style={{ fontWeight: 600, marginBottom: "8px" }}>No profiles yet</div>
                <div style={{ fontSize: "13px", color: "var(--color-text-tertiary)", marginBottom: "16px" }}>
                  Create your first profile to auto-fill Google Forms.
                </div>
                <button onClick={() => setShowAddProfile(true)} className="btn-primary">
                  <Plus size={14} /> Create Profile
                </button>
              </div>
            )}
          </div>

          {/* Extension info */}
          <div
            style={{
              padding: "20px",
              background: "rgba(37, 99, 235, 0.06)",
              border: "1px solid rgba(37, 99, 235, 0.15)",
              borderRadius: "var(--radius-lg)",
            }}
          >
            <div style={{ fontSize: "14px", fontWeight: 600, marginBottom: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
              🔌 Browser Extension
            </div>
            <p style={{ fontSize: "13px", color: "var(--color-text-secondary)", lineHeight: 1.6, marginBottom: "12px" }}>
              For direct Google Form filling, install the D-Automation browser extension. It detects form fields and fills them from your saved profiles — with your confirmation before every fill.
            </p>
            <button className="btn-secondary" style={{ fontSize: "13px" }}>
              View Extension Documentation
              <ArrowRight size={13} />
            </button>
          </div>
        </div>

        {/* Match preview panel */}
        <div>
          <div style={{ marginBottom: "16px", fontSize: "16px", fontWeight: 600 }}>Form Matcher</div>

          {/* URL input */}
          <div className="card" style={{ padding: "20px", marginBottom: "16px" }}>
            <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--color-text-secondary)", display: "block", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Google Form URL (Demo)
            </label>
            <input
              value={formUrl}
              onChange={(e) => setFormUrl(e.target.value)}
              placeholder="https://forms.google.com/..."
              className="input"
              style={{ fontSize: "13px", marginBottom: "12px" }}
            />
            <div style={{ fontSize: "12px", color: "var(--color-text-tertiary)", marginBottom: "12px" }}>
              Or try with demo form:
            </div>
            <button
              onClick={() => {
                setFormUrl("https://forms.google.com/demo/college-registration");
                setMatchStep("input");
                setShowMatchDemo(false);
              }}
              className="btn-ghost"
              style={{ fontSize: "12px", padding: "5px 10px", border: "1px solid var(--color-border-subtle)", width: "100%", justifyContent: "center" }}
            >
              Load Demo — College Registration Form
            </button>

            {!selectedProfile && (
              <div style={{ marginTop: "10px", padding: "8px 10px", background: "rgba(245, 158, 11, 0.08)", border: "1px solid rgba(245, 158, 11, 0.2)", borderRadius: "var(--radius-md)", fontSize: "12px", color: "var(--color-amber-accent)" }}>
                ← Select a profile on the left to match fields
              </div>
            )}

            <button
              onClick={startMatching}
              disabled={!selectedProfile || matchStep === "matching"}
              className="btn-primary"
              style={{ width: "100%", justifyContent: "center", marginTop: "12px", fontSize: "13px" }}
            >
              {matchStep === "matching" ? "Matching fields..." : "Match Fields"}
            </button>
          </div>

          {/* Match results */}
          {showMatchDemo && (matchStep === "review" || matchStep === "filled") && (
            <div className="card" style={{ padding: "20px", overflow: "hidden" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <div style={{ fontSize: "13px", fontWeight: 700 }}>
                  Matched Fields: <span style={{ color: "#10B981" }}>{matchedCount}/{DEMO_FORM_FIELDS.length}</span>
                </div>
                <span className="badge badge-emerald">{Math.round((matchedCount / DEMO_FORM_FIELDS.length) * 100)}% match</span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "16px" }}>
                {DEMO_FORM_FIELDS.map((field, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "8px 10px",
                      borderRadius: "var(--radius-md)",
                      background: field.matched ? "rgba(16, 185, 129, 0.06)" : "rgba(244, 63, 94, 0.06)",
                      border: `1px solid ${field.matched ? "rgba(16, 185, 129, 0.15)" : "rgba(244, 63, 94, 0.15)"}`,
                    }}
                  >
                    {field.matched
                      ? <CheckCircle size={13} style={{ color: "#10B981", flexShrink: 0 }} />
                      : <AlertTriangle size={13} style={{ color: "#F43F5E", flexShrink: 0 }} />
                    }
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: "12px", fontWeight: 500 }}>{field.label}</div>
                      {field.matched && field.profileField && (
                        <div style={{ fontSize: "10px", color: "var(--color-text-tertiary)" }}>
                          → {field.profileField} ({Math.round(field.confidence * 100)}% confidence)
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div
                style={{
                  padding: "12px",
                  background: "rgba(245, 158, 11, 0.08)",
                  border: "1px solid rgba(245, 158, 11, 0.2)",
                  borderRadius: "var(--radius-md)",
                  fontSize: "12px",
                  color: "var(--color-amber-accent)",
                  marginBottom: "12px",
                }}
              >
                ⚠️ Review all matched values before filling. FormFlow will never auto-submit.
              </div>

              <button
                onClick={() => { setMatchStep("filled"); toastSuccess("Fields filled successfully! Please review before submitting."); }}
                className="btn-primary"
                style={{ width: "100%", justifyContent: "center", fontSize: "13px" }}
              >
                <CheckCircle size={14} />
                Confirm & Fill {matchedCount} Fields
              </button>

              {matchStep === "filled" && (
                <div style={{ marginTop: "10px", padding: "10px", background: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.2)", borderRadius: "var(--radius-md)", fontSize: "12px", color: "#10B981", textAlign: "center" }}>
                  ✓ {matchedCount} fields filled. Submit the form when you are ready.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
