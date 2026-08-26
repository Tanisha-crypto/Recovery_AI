import React from 'react';
import { useRecovery } from '../context/RecoveryContext';
import { formatINR } from '../utils/formatters';
import { 
  Sparkles, 
  LayoutDashboard, 
  Users, 
  BrainCircuit, 
  Zap, 
  TrendingUp,
  ShieldAlert
} from 'lucide-react';

export default function Navbar() {
  const { 
    activeTab, 
    setActiveTab, 
    setIsAnalyzeModalOpen, 
    metrics 
  } = useRecovery();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'opportunities', label: 'Revenue Opportunities', icon: Users, badge: metrics.atRiskCustomersCount },
    { id: 'insights', label: 'AI Insights', icon: BrainCircuit, badge: '4 New' },
    { id: 'actions', label: 'Recovery Actions', icon: Zap }
  ];

  return (
    <header className="navbar">
      <div className="navbar-inner">
        {/* Brand */}
        <div className="brand-section">
          <div className="brand-logo">
            <TrendingUp size={22} color="#042f2e" strokeWidth={2.8} />
          </div>
          <div>
            <div className="brand-name">
              RecoverAI
              <span className="brand-badge">Track 3 • AI Recovery</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="nav-links">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`nav-item ${isActive ? 'active' : ''}`}
              >
                <Icon size={17} />
                <span>{item.label}</span>
                {item.badge && (
                  <span style={{
                    fontSize: '0.7rem',
                    padding: '1px 6px',
                    borderRadius: '10px',
                    background: isActive ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.08)',
                    color: isActive ? '#ffffff' : 'var(--text-secondary)'
                  }}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="nav-actions">
          <div className="live-indicator">
            <span className="pulse-dot"></span>
            <span>Live Monitor</span>
          </div>

          <button
            onClick={() => setIsAnalyzeModalOpen(true)}
            className="btn-analyze-ai"
          >
            <Sparkles size={17} />
            <span>Analyze Revenue</span>
          </button>
        </div>
      </div>
    </header>
  );
}
