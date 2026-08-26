import React from 'react';
import { useRecovery } from '../context/RecoveryContext';
import MetricCard from '../components/MetricCard';
import { formatINR, formatINRLakhs, getCategoryBadge, getRecoveryChanceColor } from '../utils/formatters';
import {
  DollarSign,
  AlertTriangle,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  Zap,
  Activity,
  Layers
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

export default function DashboardPage() {
  const {
    metrics,
    trendData,
    lossBreakdown,
    customers,
    setIsAnalyzeModalOpen,
    setSelectedCustomer,
    recoverCustomer,
    setActiveTab,
    hasAnalyzed
  } = useRecovery();

  const recentOpportunities = customers.slice(0, 6);

  // Tooltip formatters for charts
  const customTooltipFormatter = (value, name) => {
    return [`₹${value} Lakhs`, name === 'totalRevenue' ? 'Total Revenue' : name === 'atRisk' ? 'At Risk' : 'Recovered'];
  };

  return (
    <div>
      {/* Page Heading & AI Trigger Banner */}
      <div className="page-header">
        <div>
          <h1 className="page-title">
            <span>AI Revenue Recovery Dashboard</span>
            <span style={{
              fontSize: '0.75rem',
              padding: '3px 10px',
              borderRadius: '999px',
              background: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              color: '#34d399',
              fontWeight: '600'
            }}>
              Active Monitoring
            </span>
          </h1>
          <p className="page-subtitle">
            Autonomous AI engine tracking failed UPI/card transactions, abandoned carts, and subscription churn to automatically recover lost enterprise revenue.
          </p>
        </div>

        <button
          onClick={() => setIsAnalyzeModalOpen(true)}
          className="btn-analyze-ai"
          style={{ padding: '12px 24px', fontSize: '0.95rem' }}
        >
          <Sparkles size={18} />
          <span>Analyze Revenue with AI</span>
        </button>
      </div>

      {/* 4 Core Financial Metrics */}
      <div className="metrics-grid">
        <MetricCard
          label="Total Revenue"
          value={metrics.totalRevenue}
          subtitle={`₹${(metrics.totalRevenue / 100000).toFixed(1)} Lakhs tracked YTD`}
          icon={DollarSign}
          iconBg="rgba(59, 130, 246, 0.15)"
          iconColor="#60a5fa"
          trend="+14.2% MoM"
          trendPositive={true}
        />

        <MetricCard
          label="Revenue At Risk"
          value={metrics.revenueAtRisk}
          subtitle={`${metrics.atRiskCustomersCount} failed / dropped transactions`}
          icon={AlertTriangle}
          iconBg="rgba(239, 68, 68, 0.15)"
          iconColor="#f87171"
          highlight="risk"
          trend="Immediate Attention"
          trendPositive={false}
        />

        <MetricCard
          label="Recoverable Revenue"
          value={metrics.recoverableRevenue}
          subtitle={`AI Confidence: ${metrics.recoveryRate}%`}
          icon={Sparkles}
          iconBg="rgba(6, 182, 212, 0.15)"
          iconColor="#22d3ee"
          highlight="recoverable"
          trend="₹7.8L Potential"
          trendPositive={true}
        />

        <MetricCard
          label="Revenue Recovered"
          value={metrics.revenueRecovered}
          subtitle="Saved through autonomous workflows"
          icon={CheckCircle2}
          iconBg="rgba(16, 185, 129, 0.15)"
          iconColor="#34d399"
          highlight="recovered"
          trend="+₹4.2L Saved"
          trendPositive={true}
        />
      </div>

      {/* AI Quick Analysis Status Banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(6, 182, 212, 0.08) 100%)',
        border: '1px solid rgba(16, 185, 129, 0.25)',
        borderRadius: '16px',
        padding: '18px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '30px',
        gap: '16px',
        flexWrap: 'wrap'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#042f2e',
            flexShrink: 0
          }}>
            <Zap size={22} strokeWidth={2.5} />
          </div>
          <div>
            <div style={{ fontSize: '1rem', fontWeight: '800', color: '#ffffff' }}>
              {hasAnalyzed ? 'AI Analysis Active • 4 Playbooks Ready for Execution' : 'Autonomous AI Diagnosis Ready'}
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              AI has detected <strong>₹12.5 Lakhs at risk</strong> and identified <strong>₹7.8 Lakhs</strong> as immediately recoverable via 4 targeted channels.
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => setActiveTab('insights')}
            className="btn-secondary"
          >
            <span>Explore AI Insights</span>
            <ArrowRight size={15} />
          </button>
          <button
            onClick={() => setActiveTab('actions')}
            className="btn-analyze-ai"
            style={{ fontSize: '0.85rem', padding: '8px 16px' }}
          >
            <span>Launch Recovery Playbooks</span>
          </button>
        </div>
      </div>

      {/* Visual Analytics Grid: Area Chart + Donut Loss Breakdown */}
      <div className="charts-grid">
        {/* Trajectory Area Chart */}
        <div className="chart-card">
          <div className="chart-header">
            <div>
              <div className="chart-title">
                <TrendingUp size={18} color="var(--primary)" />
                <span>Revenue Recovery Trajectory</span>
              </div>
              <div className="chart-subtitle">
                Total Revenue vs At-Risk vs Recovered (in ₹ Lakhs)
              </div>
            </div>
            <div style={{ display: 'flex', gap: '14px', fontSize: '0.78rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#94a3b8' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#3b82f6' }} />
                Total
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#94a3b8' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} />
                At-Risk
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#94a3b8' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }} />
                Recovered
              </span>
            </div>
          </div>

          <div style={{ width: '100%', height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorRecovered" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.5}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" stroke="#64748b" tick={{ fontSize: 12 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 12 }} tickFormatter={(val) => `₹${val}L`} />
                <Tooltip
                  formatter={customTooltipFormatter}
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Area type="monotone" dataKey="totalRevenue" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorTotal)" />
                <Area type="monotone" dataKey="atRisk" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorRisk)" />
                <Area type="monotone" dataKey="recovered" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRecovered)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Donut Chart: Why Revenue is Lost */}
        <div className="chart-card">
          <div className="chart-header">
            <div>
              <div className="chart-title">
                <Layers size={18} color="var(--accent-cyan)" />
                <span>Why Revenue is Lost</span>
              </div>
              <div className="chart-subtitle">
                Breakdown of ₹12.5L At-Risk Revenue
              </div>
            </div>
          </div>

          <div style={{ width: '100%', height: 160 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={lossBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {lossBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [formatINR(value), 'At-Risk Amount']}
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="breakdown-list">
            {lossBreakdown.map((item, idx) => (
              <div key={idx} className="breakdown-item">
                <div className="breakdown-left">
                  <span className="breakdown-color-pill" style={{ background: item.color }} />
                  <span className="breakdown-name">{item.name}</span>
                </div>
                <div>
                  <span className="breakdown-amount">{formatINR(item.value, true)}</span>
                  <span className="breakdown-pct">({item.percentage}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Recovery Opportunities Section */}
      <div className="table-container">
        <div className="table-toolbar">
          <div>
            <div style={{ fontSize: '1.15rem', fontWeight: '800', color: '#ffffff' }}>
              Recent Recovery Opportunities
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              Top high-probability at-risk transactions queued for automated AI intervention
            </div>
          </div>

          <button
            onClick={() => setActiveTab('opportunities')}
            className="btn-secondary"
          >
            <span>View All ({customers.length})</span>
            <ArrowRight size={15} />
          </button>
        </div>

        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Problem / Vector</th>
                <th>Amount</th>
                <th>Recovery Chance</th>
                <th>Recommended Action</th>
                <th style={{ textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {recentOpportunities.map((customer) => {
                const badge = getCategoryBadge(customer.category);
                const chance = getRecoveryChanceColor(customer.recoveryChance);
                const isRecovered = customer.status === 'recovered';

                return (
                  <tr key={customer.id} style={{ cursor: 'pointer' }} onClick={() => setSelectedCustomer(customer)}>
                    <td>
                      <div className="customer-cell">
                        <div className="customer-avatar">
                          {customer.name.charAt(0)}
                        </div>
                        <div className="customer-meta">
                          <span className="customer-name">{customer.name}</span>
                          <span className="customer-subtext">{customer.city} • {customer.paymentMethod}</span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span
                        className="category-badge"
                        style={{
                          background: badge.bg,
                          color: badge.text,
                          border: `1px solid ${badge.border}`
                        }}
                      >
                        {customer.categoryLabel}
                      </span>
                    </td>

                    <td className="amount-cell">
                      {formatINR(customer.amount)}
                    </td>

                    <td>
                      <div className="chance-wrap">
                        <div className="chance-bar-bg">
                          <div
                            className="chance-bar-fill"
                            style={{
                              width: `${customer.recoveryChance}%`,
                              background: chance.barColor
                            }}
                          />
                        </div>
                        <span className="chance-number" style={{ color: chance.text }}>
                          {customer.recoveryChance}%
                        </span>
                      </div>
                    </td>

                    <td>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                        {customer.recommendedChannel}
                      </span>
                    </td>

                    <td style={{ textAlign: 'right' }} onClick={(e) => e.stopPropagation()}>
                      {isRecovered ? (
                        <span className="btn-recovered-tag">
                          <CheckCircle2 size={13} />
                          <span>Recovered</span>
                        </span>
                      ) : (
                        <button
                          onClick={() => recoverCustomer(customer.id)}
                          className="btn-recover-sm"
                        >
                          <Zap size={13} />
                          <span>Recover</span>
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
