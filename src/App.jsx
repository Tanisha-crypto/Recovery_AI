import React from 'react';
import { RecoveryProvider, useRecovery } from './context/RecoveryContext';
import Navbar from './components/Navbar';
import DashboardPage from './pages/DashboardPage';
import OpportunitiesPage from './pages/OpportunitiesPage';
import AIInsightsPage from './pages/AIInsightsPage';
import ActionsPage from './pages/ActionsPage';
import AnalyzeModal from './components/AnalyzeModal';
import CustomerModal from './components/CustomerModal';
import Toast from './components/Toast';

function AppContent() {
  const { activeTab } = useRecovery();

  const renderActivePage = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardPage />;
      case 'opportunities':
        return <OpportunitiesPage />;
      case 'insights':
        return <AIInsightsPage />;
      case 'actions':
        return <ActionsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="app-container">
      <Navbar />

      <main className="main-content">
        {renderActivePage()}
      </main>

      {/* Modals & Overlays */}
      <AnalyzeModal />
      <CustomerModal />
      <Toast />

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--border-subtle)',
        padding: '24px 28px',
        textAlign: 'center',
        color: 'var(--text-muted)',
        fontSize: '0.82rem',
        marginTop: 'auto'
      }}>
        <div style={{ maxWidth: '1380px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <strong style={{ color: '#fff' }}>RecoverAI</strong> — Track 3: AI Revenue Recovery MVP
          </div>
          <div>
            Built with React, Vite, Recharts, and Lucide React • Simulated AI Heuristic Engine
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <RecoveryProvider>
      <AppContent />
    </RecoveryProvider>
  );
}
