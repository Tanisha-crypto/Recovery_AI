import React, { createContext, useContext, useState } from 'react';
import {
  INITIAL_METRICS,
  MOCK_CUSTOMERS,
  RECOVERY_PLAYBOOKS,
  AI_INSIGHT_CARDS,
  REVENUE_LOSS_BREAKDOWN,
  REVENUE_TREND_DATA
} from '../data/mockData';

const RecoveryContext = createContext(null);

export function RecoveryProvider({ children }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [metrics, setMetrics] = useState(INITIAL_METRICS);
  const [customers, setCustomers] = useState(MOCK_CUSTOMERS);
  const [playbooks, setPlaybooks] = useState(RECOVERY_PLAYBOOKS);
  const [insights, setInsights] = useState(AI_INSIGHT_CARDS);
  const [lossBreakdown, setLossBreakdown] = useState(REVENUE_LOSS_BREAKDOWN);
  const [trendData, setTrendData] = useState(REVENUE_TREND_DATA);
  
  // UI States
  const [isAnalyzeModalOpen, setIsAnalyzeModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const [recoveryLogs, setRecoveryLogs] = useState([
    { id: 1, text: 'AI Autonomous engine initialized.', time: '10 mins ago', type: 'system' },
    { id: 2, text: 'Detected 38 at-risk revenue vectors totalling ₹12.5 Lakhs.', time: '5 mins ago', type: 'alert' }
  ]);

  // Add Toast helper
  const addToast = (title, message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Recover an individual customer
  const recoverCustomer = (customerId) => {
    const target = customers.find(c => c.id === customerId);
    if (!target) return;

    if (target.status === 'recovered') {
      addToast('Already Recovered', `${target.name}'s revenue of ₹${target.amount.toLocaleString('en-IN')} has already been recovered.`, 'info');
      return;
    }

    // Update customer status
    setCustomers(prev =>
      prev.map(c =>
        c.id === customerId
          ? { ...c, status: 'recovered', recoveredAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
          : c
      )
    );

    // Update metrics
    setMetrics(prev => {
      const recoveredAmt = target.amount;
      const newRecovered = prev.revenueRecovered + recoveredAmt;
      const newAtRisk = Math.max(0, prev.revenueAtRisk - recoveredAmt);
      const newRecoverable = Math.max(0, prev.recoverableRevenue - Math.round(recoveredAmt * (target.recoveryChance / 100)));
      return {
        ...prev,
        revenueRecovered: newRecovered,
        revenueAtRisk: newAtRisk,
        recoverableRevenue: newRecoverable,
        atRiskCustomersCount: Math.max(0, prev.atRiskCustomersCount - 1),
        recoveryRate: Number(((newRecovered / (newRecovered + newAtRisk)) * 100).toFixed(1))
      };
    });

    // Add log
    setRecoveryLogs(prev => [
      {
        id: Date.now(),
        text: `Successfully executed recovery for ${target.name} (${target.id}) — ₹${target.amount.toLocaleString('en-IN')} recovered via ${target.recommendedChannel}.`,
        time: 'Just now',
        type: 'success'
      },
      ...prev
    ]);

    addToast(
      'Recovery Campaign Started!',
      `AI recovery workflow initiated for ${target.name}. ₹${target.amount.toLocaleString('en-IN')} is being recovered via ${target.recommendedChannel}.`,
      'success'
    );
  };

  // Run a bulk recovery playbook
  const runPlaybook = (playbookId) => {
    const playbook = playbooks.find(p => p.id === playbookId);
    if (!playbook) return;

    // Filter matching at-risk customers
    const eligibleCustomers = customers.filter(
      c => c.category === playbook.category && c.status !== 'recovered'
    );

    if (eligibleCustomers.length === 0) {
      addToast(
        'Campaign Notice',
        `All opportunities under "${playbook.title}" are already recovered or none pending.`,
        'info'
      );
      return;
    }

    const recoveredSum = eligibleCustomers.reduce((acc, curr) => acc + curr.amount, 0);

    // Update all matching customers to recovered
    setCustomers(prev =>
      prev.map(c =>
        c.category === playbook.category
          ? { ...c, status: 'recovered', recoveredAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
          : c
      )
    );

    // Update playbook status
    setPlaybooks(prev =>
      prev.map(p =>
        p.id === playbookId
          ? { ...p, status: 'Active (Running)' }
          : p
      )
    );

    // Update global metrics
    setMetrics(prev => {
      const newRecovered = prev.revenueRecovered + recoveredSum;
      const newAtRisk = Math.max(0, prev.revenueAtRisk - recoveredSum);
      const newRecoverable = Math.max(0, prev.recoverableRevenue - Math.round(recoveredSum * (playbook.confidence / 100)));
      return {
        ...prev,
        revenueRecovered: newRecovered,
        revenueAtRisk: newAtRisk,
        recoverableRevenue: newRecoverable,
        atRiskCustomersCount: Math.max(0, prev.atRiskCustomersCount - eligibleCustomers.length),
        recoveryRate: Number(((newRecovered / (newRecovered + newAtRisk)) * 100).toFixed(1))
      };
    });

    // Add log
    setRecoveryLogs(prev => [
      {
        id: Date.now(),
        text: `Playbook "${playbook.title}" launched across ${eligibleCustomers.length} accounts. Recovered ₹${recoveredSum.toLocaleString('en-IN')}.`,
        time: 'Just now',
        type: 'success'
      },
      ...prev
    ]);

    addToast(
      'Recovery campaign started successfully!',
      `AI automated campaign launched for ${eligibleCustomers.length} customers in "${playbook.title}". ₹${recoveredSum.toLocaleString('en-IN')} in motion.`,
      'success'
    );
  };

  // Finish Analysis scan
  const completeAnalysis = () => {
    setHasAnalyzed(true);
    setIsAnalyzeModalOpen(false);
    addToast(
      'AI Revenue Analysis Complete',
      'AI identified ₹7.8 Lakhs in high-confidence recoverable revenue across 4 playbooks.',
      'ai'
    );
  };

  const value = {
    activeTab,
    setActiveTab,
    metrics,
    customers,
    playbooks,
    insights,
    lossBreakdown,
    trendData,
    recoveryLogs,
    isAnalyzeModalOpen,
    setIsAnalyzeModalOpen,
    selectedCustomer,
    setSelectedCustomer,
    toasts,
    addToast,
    removeToast,
    categoryFilter,
    setCategoryFilter,
    searchQuery,
    setSearchQuery,
    hasAnalyzed,
    completeAnalysis,
    recoverCustomer,
    runPlaybook
  };

  return (
    <RecoveryContext.Provider value={value}>
      {children}
    </RecoveryContext.Provider>
  );
}

export function useRecovery() {
  const context = useContext(RecoveryContext);
  if (!context) {
    throw new Error('useRecovery must be used within a RecoveryProvider');
  }
  return context;
}
