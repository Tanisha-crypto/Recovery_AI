import React from 'react';
import { useRecovery } from '../context/RecoveryContext';
import { formatINR } from '../utils/formatters';
import {
  Zap,
  CheckCircle2,
  Clock,
  Send,
  MessageSquare,
  RefreshCw,
  Gift,
  CreditCard,
  Sparkles,
  ShieldCheck,
  Activity,
  Check
} from 'lucide-react';

export default function ActionsPage() {
  const { playbooks, runPlaybook, recoveryLogs, customers } = useRecovery();

  const getPlaybookIcon = (category) => {
    switch (category) {
      case 'failed_payment': return RefreshCw;
      case 'abandoned_cart': return MessageSquare;
      case 'cancelled_subscription': return Gift;
      case 'expired_card': return CreditCard;
      default: return Zap;
    }
  };

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">
            <Zap size={28} color="#10b981" />
            <span>Automated Recovery Campaigns & Playbooks</span>
          </h1>
          <p className="page-subtitle">
            Deploy intelligent multi-channel recovery workflows to automatically capture lost sales, recover failed transactions, and reduce involuntary churn.
          </p>
        </div>

        {/* Global Action */}
        <button
          onClick={() => {
            playbooks.forEach(p => runPlaybook(p.id));
          }}
          className="btn-analyze-ai"
        >
          <Sparkles size={16} />
          <span>Launch All 4 Campaigns</span>
        </button>
      </div>

      {/* Playbooks Grid */}
      <div className="playbooks-grid">
        {playbooks.map((playbook) => {
          const Icon = getPlaybookIcon(playbook.category);
          const isRunning = playbook.status === 'Active (Running)';
          const matchingCustomers = customers.filter(c => c.category === playbook.category);
          const pendingCount = matchingCustomers.filter(c => c.status !== 'recovered').length;

          return (
            <div key={playbook.id} className="playbook-card">
              <div>
                {/* Header */}
                <div className="playbook-header">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
                      background: 'rgba(16, 185, 129, 0.15)',
                      border: '1px solid rgba(16, 185, 129, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#34d399'
                    }}>
                      <Icon size={22} />
                    </div>
                    <div>
                      <span style={{
                        fontSize: '0.72rem',
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        padding: '2px 8px',
                        borderRadius: '999px',
                        background: playbook.tagColor === 'emerald' ? 'rgba(16, 185, 129, 0.15)' : playbook.tagColor === 'amber' ? 'rgba(245, 158, 11, 0.15)' : playbook.tagColor === 'purple' ? 'rgba(139, 92, 246, 0.15)' : 'rgba(6, 182, 212, 0.15)',
                        color: playbook.tagColor === 'emerald' ? '#34d399' : playbook.tagColor === 'amber' ? '#fbbf24' : playbook.tagColor === 'purple' ? '#c084fc' : '#22d3ee',
                        border: '1px solid currentColor'
                      }}>
                        {playbook.tag}
                      </span>
                      <div className="playbook-title">{playbook.title}</div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="playbook-desc">
                  {playbook.description}
                </p>

                {/* Metrics Bar */}
                <div className="playbook-metrics-bar" style={{ marginTop: '16px' }}>
                  <div className="playbook-metric-col">
                    <span className="playbook-metric-label">Target Accounts</span>
                    <span className="playbook-metric-num">{pendingCount} pending</span>
                  </div>
                  <div className="playbook-metric-col">
                    <span className="playbook-metric-label">At-Risk Value</span>
                    <span className="playbook-metric-num" style={{ color: '#f87171' }}>{formatINR(playbook.atRiskAmount, true)}</span>
                  </div>
                  <div className="playbook-metric-col">
                    <span className="playbook-metric-label">Expected Yield</span>
                    <span className="playbook-metric-num" style={{ color: '#34d399' }}>{formatINR(playbook.potentialRecovery, true)}</span>
                  </div>
                </div>

                {/* Channels */}
                <div style={{ marginTop: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Automated Channels:</span>
                  <div className="channels-tag-row">
                    {playbook.channels.map((ch, idx) => (
                      <span key={idx} className="channel-tag">{ch}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div style={{ marginTop: '10px' }}>
                {isRunning && pendingCount === 0 ? (
                  <div style={{
                    background: 'rgba(16, 185, 129, 0.15)',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    borderRadius: '10px',
                    padding: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    color: '#34d399',
                    fontWeight: '700',
                    fontSize: '0.9rem'
                  }}>
                    <CheckCircle2 size={18} />
                    <span>Recovery campaign started successfully!</span>
                  </div>
                ) : (
                  <button
                    onClick={() => runPlaybook(playbook.id)}
                    className="btn-start-recovery-big"
                  >
                    <Send size={16} />
                    <span>Start Recovery ({pendingCount} Opportunities)</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Live AI Execution Logs */}
      <div className="table-container" style={{ marginTop: '30px', padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Activity size={20} color="var(--primary)" />
            <div style={{ fontSize: '1.15rem', fontWeight: '800', color: '#ffffff' }}>
              Live Autonomous Recovery Activity Log
            </div>
          </div>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            Real-time webhook and campaign dispatch feeds
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {recoveryLogs.map((log) => (
            <div
              key={log.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '8px',
                fontSize: '0.84rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: log.type === 'success' ? '#10b981' : log.type === 'alert' ? '#f59e0b' : '#3b82f6'
                }} />
                <span style={{ color: '#e2e8f0' }}>{log.text}</span>
              </div>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', whiteSpace: 'nowrap' }}>
                {log.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
