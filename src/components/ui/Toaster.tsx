"use client";

import { useState, useEffect, createContext, useContext, useCallback } from "react";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";

type ToastType = "success" | "error" | "info" | "warning";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastContextValue {
  toast: (message: string, type?: ToastType, duration?: number) => void;
  success: (message: string) => void;
  error: (message: string) => void;
  info: (message: string) => void;
  warning: (message: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within Toaster");
  return ctx;
}

const icons: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle size={16} />,
  error: <AlertCircle size={16} />,
  info: <Info size={16} />,
  warning: <AlertTriangle size={16} />,
};

const colors: Record<ToastType, string> = {
  success: "#10B981",
  error: "#F43F5E",
  info: "#3B82F6",
  warning: "#F59E0B",
};

let globalToast: ToastContextValue["toast"] | null = null;

export function toast(message: string, type: ToastType = "info", duration = 4000) {
  globalToast?.(message, type, duration);
}

export const toastSuccess = (msg: string) => toast(msg, "success");
export const toastError = (msg: string) => toast(msg, "error");
export const toastInfo = (msg: string) => toast(msg, "info");
export const toastWarning = (msg: string) => toast(msg, "warning");

export function Toaster() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: ToastType = "info", duration = 4000) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, message, type, duration }]);
    if (duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    }
  }, []);

  useEffect(() => {
    globalToast = addToast;
    return () => { globalToast = null; };
  }, [addToast]);

  const contextValue: ToastContextValue = {
    toast: addToast,
    success: (m) => addToast(m, "success"),
    error: (m) => addToast(m, "error"),
    info: (m) => addToast(m, "info"),
    warning: (m) => addToast(m, "warning"),
  };

  return (
    <ToastContext.Provider value={contextValue}>
      <div
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          zIndex: 9999,
          maxWidth: "380px",
        }}
        role="region"
        aria-label="Notifications"
        aria-live="polite"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            role="alert"
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "10px",
              padding: "12px 16px",
              background: "var(--color-surface-2)",
              border: "1px solid var(--color-border-default)",
              borderLeft: `3px solid ${colors[t.type]}`,
              borderRadius: "var(--radius-lg)",
              boxShadow: "var(--shadow-modal)",
              animation: "toastIn 0.25s ease forwards",
              color: "var(--color-text-primary)",
              fontSize: "14px",
              lineHeight: "1.4",
            }}
          >
            <span style={{ color: colors[t.type], flexShrink: 0, marginTop: "1px" }}>
              {icons[t.type]}
            </span>
            <span style={{ flex: 1 }}>{t.message}</span>
            <button
              onClick={() => setToasts((prev) => prev.filter((x) => x.id !== t.id))}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "var(--color-text-tertiary)",
                padding: "0",
                flexShrink: 0,
              }}
              aria-label="Dismiss notification"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes toastIn {
          from { opacity: 0; transform: translateY(8px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </ToastContext.Provider>
  );
}
