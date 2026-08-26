import React, { useState } from 'react';
import { useRecovery } from '../context/RecoveryContext';
import { formatINR, formatINRLakhs } from '../utils/formatters';
import {
  BrainCircuit,
  Sparkles,
  Zap,
  CheckCircle2,
  TrendingUp,
  AlertCircle,
  ShieldCheck,
  Cpu,
  ArrowRight,
  Sliders,
  Send
} from 'lucide-react';

export default function AIInsightsPage() {
  const { insights, runPlaybook, playbooks, setActiveTab } = useRecovery();
  const [simulationAggressiveness, setSimulationAggressiveness] = useState(85);

  const getPlaybookIdForInsight = (insightId) => {
    switch (insightId) {
      case 'insight-1': return 'playbook-dunning';
      case 'insight-2': return 'playbook-cart';
      case 'insight-3': return 'playbook-churn';
      case 'insight-4': return 'playbook-card';
      default: return 'playbook-dunning';
    }
  };

  const simulatedAdditionalRecovery = Math.round(780000 * (simulationAggressiveness / 100));

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">
            <BrainCircuit size={28} color="#c084fc" />
            <span>Autonomous AI Intelligence & Insights</span>
          </h1>
          <p className="page-subtitle">
            Heuristic neural engine scanning payment gateway latency, exit behavior, and recurring billing patterns to formulate optimal recovery interventions.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('actions')}
          className="btn-analyze-ai"
        >
          <Zap size={16} />
          <span>Execute All AI Recommendations</span>
        </button>
      </div>

      {/* AI Overview Banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.12) 0%, rgba(6, 182, 212, 0.08) 100%)',
        border: '1px solid rgba(139, 92, 246, 0.3)',
        borderRadius: '18px',
        padding: '22px 28px',
        marginBottom: '30px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#c084fc', fontWeight: '700', fontSize: '0.88rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          <Sparkles size={16} />
          <span>Global AI Executive Synthesis</span>
        </div>

        <div style={{ fontSize: '1.25rem', fontWeight: '800', color: '#ffffff', marginTop: '8px', lineHeight: '1.4' }}>
          "₹12.5 Lakhs revenue is currently at risk across 38 enterprise transactions. AI models predict ₹7.8 Lakhs can be autonomously recovered within 24 hours with minimal friction."
        </div>

        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '8px', maxWidth: '900px' }}>
          By orchestrating multi-channel fallback routes (WhatsApp 1-Click Pay, intelligent UPI retry schedules matching bank server uptime, and dynamic discount sweeteners), RecoverAI prevents involuntary churn before it impacts monthly ARR.
        </p>

        {/* AI Simulator Bar */}
        <div style={{
          marginTop: '20px',
          paddingTop: '18px',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: '280px' }}>
            <Sliders size={18} color="var(--primary)" />
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                <span>Recovery Sensitivity: <strong>{simulationAggressiveness}%</strong></span>
                <span>Targeted Recovery: <strong>{formatINR(simulatedAdditionalRecovery)}</strong></span>
              </div>
              <input
                type="range"
                min="50"
                max="100"
                value={simulationAggressiveness}
                onChange={(e) => setSimulationAggressiveness(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#10b981', cursor: 'pointer' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            <ShieldCheck size={16} color="#34d399" />
            <span>Zero impact on customer CSAT score</span>
          </div>
        </div>
      </div>

      {/* AI Insight Diagnostic Cards Grid */}
      <div className="ai-insights-grid">
        {insights.map((insight) => {
          const playbookId = getPlaybookIdForInsight(insight.id);
          const matchingPlaybook = playbooks.find(p => p.id === playbookId);
          const isExecuted = matchingPlaybook?.status === 'Active (Running)';

          return (
            <div key={insight.id} className="insight-card">
              <div>
                {/* Top Tag & Confidence */}
                <div className="insight-card-top">
                  <span
                    className="insight-tag"
                    style={{
                      background: insight.badgeColor === 'red' ? 'rgba(239, 68, 68, 0.15)' : insight.badgeColor === 'amber' ? 'rgba(245, 158, 11, 0.15)' : insight.badgeColor === 'purple' ? 'rgba(139, 92, 246, 0.15)' : 'rgba(6, 182, 212, 0.15)',
                      color: insight.badgeColor === 'red' ? '#f87171' : insight.badgeColor === 'amber' ? '#fbbf24' : insight.badgeColor === 'purple' ? '#c084fc' : '#22d3ee',
                      border: `1px solid ${insight.badgeColor === 'red' ? 'rgba(239, 68, 68, 0.3)' : insight.badgeColor === 'amber' ? 'rgba(245, 158, 11, 0.3)' : insight.badgeColor === 'purple' ? 'rgba(139, 92, 246, 0.3)' : 'rgba(6, 182, 212, 0.3)'}`
                    }}
                  >
                    {insight.badge}
                  </span>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#34d399', fontWeight: '700' }}>
                    <Sparkles size={14} />
                    <span>AI Confidence: {insight.confidence}%</span>
                  </div>
                </div>

                {/* Problem Title */}
                <div className="insight-title">
                  {insight.problemDetected}
                </div>

                {/* AI Narrative Quote */}
                <div className="insight-narrative" style={{ marginTop: '12px' }}>
                  <div style={{ fontStyle: 'italic', color: '#e2e8f0', marginBottom: '8px' }}>
                    "{insight.narrative}"
                  </div>

                  {/* AI Reasoning Points */}
                  <div className="ai-reasoning-box">
                    <div className="ai-reasoning-title">
                      <Cpu size={13} />
                      <span>AI Model Inference:</span>
                    </div>
                    <ul className="ai-reasoning-list">
                      {insight.aiReasoning.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Stats and Action Footer */}
              <div>
                <div className="insight-stats-row">
                  <div className="insight-stat-item">
                    <span className="insight-stat-label">Revenue At Risk</span>
                    <span className="insight-stat-val" style={{ color: '#f87171' }}>
                      {formatINR(insight.revenueAffected)}
                    </span>
                  </div>

                  <div className="insight-stat-item">
                    <span className="insight-stat-label">Estimated Recovery</span>
                    <span className="insight-stat-val" style={{ color: '#34d399' }}>
                      {formatINR(insight.estimatedRecovery)}
                    </span>
                  </div>

                  <div className="insight-stat-item">
                    <span className="insight-stat-label">Recovery Chance</span>
                    <span className="insight-stat-val" style={{ color: '#60a5fa' }}>
                      {insight.recoveryProbability}%
                    </span>
                  </div>
                </div>

                <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '10px' }}>
                    <strong>Recommended Action:</strong> {insight.recommendedAction}
                  </div>

                  {isExecuted ? (
                    <div style={{
                      background: 'rgba(16, 185, 129, 0.12)',
                      border: '1px solid rgba(16, 185, 129, 0.3)',
                      borderRadius: '8px',
                      padding: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      color: '#34d399',
                      fontWeight: '700',
                      fontSize: '0.85rem'
                    }}>
                      <CheckCircle2 size={16} />
                      <span>Campaign Active & Recovering Revenue</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => runPlaybook(playbookId)}
                      className="btn-start-recovery-big"
                      style={{ padding: '10px 16px', fontSize: '0.88rem' }}
                    >
                      <Send size={15} />
                      <span>Deploy AI Strategy ({formatINR(insight.estimatedRecovery)})</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
