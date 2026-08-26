import React from 'react';
import { useRecovery } from '../context/RecoveryContext';
import { formatINR, getCategoryBadge, getRecoveryChanceColor } from '../utils/formatters';
import { 
  X, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  CreditCard, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingUp, 
  Send,
  Clock,
  ShieldAlert
} from 'lucide-react';

export default function CustomerModal() {
  const { selectedCustomer, setSelectedCustomer, recoverCustomer } = useRecovery();

  if (!selectedCustomer) return null;

  const categoryBadge = getCategoryBadge(selectedCustomer.category);
  const chanceColor = getRecoveryChanceColor(selectedCustomer.recoveryChance);
  const isRecovered = selectedCustomer.status === 'recovered';

  const handleStartRecovery = () => {
    recoverCustomer(selectedCustomer.id);
  };

  return (
    <div className="modal-overlay" onClick={() => setSelectedCustomer(null)}>
      <div className="modal-card" style={{ maxWidth: '650px' }} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className="customer-avatar" style={{ width: '42px', height: '42px', fontSize: '1rem' }}>
              {selectedCustomer.name.charAt(0)}
            </div>
            <div>
              <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#fff' }}>
                {selectedCustomer.name}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                ID: {selectedCustomer.id} • {selectedCustomer.city}
              </div>
            </div>
          </div>

          <button className="btn-close-modal" onClick={() => setSelectedCustomer(null)}>
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          {/* Top Status Banner */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'rgba(15, 23, 42, 0.6)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '12px',
            padding: '14px 18px',
            marginBottom: '20px'
          }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '600' }}>
                At-Risk Revenue Amount
              </div>
              <div style={{ fontSize: '1.6rem', fontWeight: '800', color: '#fff', fontFamily: 'var(--font-mono)' }}>
                {formatINR(selectedCustomer.amount)}
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '600' }}>
                Recovery Probability
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                <span style={{
                  fontSize: '1.2rem',
                  fontWeight: '800',
                  color: chanceColor.text,
                  fontFamily: 'var(--font-mono)'
                }}>
                  {selectedCustomer.recoveryChance}%
                </span>
                <span style={{
                  fontSize: '0.72rem',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  background: chanceColor.bg,
                  color: chanceColor.text,
                  border: `1px solid ${chanceColor.border}`,
                  fontWeight: '700'
                }}>
                  {chanceColor.label}
                </span>
              </div>
            </div>
          </div>

          {/* Problem Diagnosis */}
          <div style={{
            background: 'rgba(239, 68, 68, 0.06)',
            border: '1px solid rgba(239, 68, 68, 0.25)',
            borderRadius: '12px',
            padding: '14px 16px',
            marginBottom: '20px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f87171', fontWeight: '700', fontSize: '0.88rem' }}>
              <AlertTriangle size={17} />
              <span>Problem Detected: {selectedCustomer.categoryLabel}</span>
            </div>
            <p style={{ color: '#e2e8f0', fontSize: '0.85rem', marginTop: '6px' }}>
              {selectedCustomer.problem}
            </p>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '6px' }}>
              Event Log: {selectedCustomer.triggerLog}
            </div>
          </div>

          {/* AI Recommended Strategy */}
          <div style={{
            background: 'rgba(16, 185, 129, 0.08)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '20px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#34d399', fontWeight: '700', fontSize: '0.88rem' }}>
              <Sparkles size={17} />
              <span>AI Autonomous Strategy</span>
            </div>
            <p style={{ color: '#ffffff', fontSize: '0.88rem', marginTop: '8px', lineHeight: '1.5' }}>
              {selectedCustomer.aiStrategy}
            </p>

            <div style={{ display: 'flex', gap: '16px', marginTop: '12px', paddingTop: '12px', borderTop: '1px solid rgba(16, 185, 129, 0.15)', fontSize: '0.8rem' }}>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Channel: </span>
                <span style={{ color: '#fff', fontWeight: '600' }}>{selectedCustomer.recommendedChannel}</span>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Past Success Rate: </span>
                <span style={{ color: '#34d399', fontWeight: '600' }}>{selectedCustomer.pastSuccessRate}</span>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Customer LTV: </span>
                <span style={{ color: '#fff', fontWeight: '600' }}>{selectedCustomer.customerLTV}</span>
              </div>
            </div>
          </div>

          {/* Customer Metadata Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '12px',
            marginBottom: '24px',
            fontSize: '0.82rem',
            color: 'var(--text-secondary)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.02)', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
              <Mail size={14} color="var(--text-muted)" />
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{selectedCustomer.email}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.02)', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
              <Phone size={14} color="var(--text-muted)" />
              <span>{selectedCustomer.phone}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.02)', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
              <CreditCard size={14} color="var(--text-muted)" />
              <span>{selectedCustomer.paymentMethod}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.02)', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
              <Clock size={14} color="var(--text-muted)" />
              <span>{selectedCustomer.date}</span>
            </div>
          </div>

          {/* Action Trigger */}
          {isRecovered ? (
            <div style={{
              background: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: '10px',
              padding: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              color: '#34d399',
              fontWeight: '700'
            }}>
              <CheckCircle2 size={20} />
              <span>Recovery Campaign Running / Successfully Recovered</span>
            </div>
          ) : (
            <button
              onClick={handleStartRecovery}
              className="btn-start-recovery-big"
            >
              <Send size={18} />
              <span>Start Recovery Campaign (₹{selectedCustomer.amount.toLocaleString('en-IN')})</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
