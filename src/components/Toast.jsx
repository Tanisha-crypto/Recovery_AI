import React from 'react';
import { useRecovery } from '../context/RecoveryContext';
import { CheckCircle2, Info, Sparkles, X } from 'lucide-react';

export default function Toast() {
  const { toasts, removeToast } = useRecovery();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => {
        return (
          <div key={toast.id} className={`toast-item ${toast.type || ''}`}>
            {toast.type === 'ai' ? (
              <Sparkles size={18} color="#c084fc" style={{ flexShrink: 0, marginTop: '2px' }} />
            ) : toast.type === 'info' ? (
              <Info size={18} color="#38bdf8" style={{ flexShrink: 0, marginTop: '2px' }} />
            ) : (
              <CheckCircle2 size={18} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
            )}

            <div className="toast-content">
              <div className="toast-title">{toast.title}</div>
              <div className="toast-msg">{toast.message}</div>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              style={{ color: 'var(--text-muted)', padding: '2px' }}
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
