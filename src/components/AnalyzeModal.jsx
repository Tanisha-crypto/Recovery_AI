import React, { useState, useEffect } from 'react';
import { useRecovery } from '../context/RecoveryContext';
import { AI_SCAN_STAGES } from '../data/mockData';
import { 
  Sparkles, 
  CheckCircle2, 
  Loader2, 
  Activity, 
  Search, 
  Cpu, 
  X, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export default function AnalyzeModal() {
  const { 
    isAnalyzeModalOpen, 
    setIsAnalyzeModalOpen, 
    completeAnalysis,
    setActiveTab 
  } = useRecovery();

  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (!isAnalyzeModalOpen) {
      setCurrentStageIndex(0);
      setIsCompleted(false);
      return;
    }

    let timeoutId;
    
    // Step progression timer
    if (currentStageIndex < AI_SCAN_STAGES.length) {
      const stageDuration = AI_SCAN_STAGES[currentStageIndex].duration;
      timeoutId = setTimeout(() => {
        if (currentStageIndex < AI_SCAN_STAGES.length - 1) {
          setCurrentStageIndex(prev => prev + 1);
        } else {
          setIsCompleted(true);
        }
      }, stageDuration);
    }

    return () => clearTimeout(timeoutId);
  }, [isAnalyzeModalOpen, currentStageIndex]);

  if (!isAnalyzeModalOpen) return null;

  const handleFinishAndExplore = () => {
    completeAnalysis();
    setActiveTab('insights');
  };

  const getStageIcon = (iconName, active, completed) => {
    if (completed) return <CheckCircle2 size={16} color="#10b981" />;
    if (active) return <Loader2 size={16} className="animate-spin" color="#10b981" />;
    
    switch (iconName) {
      case 'activity': return <Activity size={16} />;
      case 'search': return <Search size={16} />;
      case 'cpu': return <Cpu size={16} />;
      case 'sparkles': return <Sparkles size={16} />;
      default: return <Activity size={16} />;
    }
  };

  return (
    <div className="modal-overlay" onClick={() => setIsAnalyzeModalOpen(false)}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title">
            <div style={{
              background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
              padding: '6px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Sparkles size={18} color="#042f2e" />
            </div>
            <span>AI Autonomous Revenue Analysis</span>
          </div>
          <button 
            className="btn-close-modal" 
            onClick={() => setIsAnalyzeModalOpen(false)}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '16px' }}>
            {isCompleted 
              ? 'AI analysis complete! Found ₹7.8 Lakhs in high-confidence recoverable revenue.' 
              : 'Scanning payment gateways, drop-off vectors, and customer behavioral signals in real-time...'}
          </p>

          {/* Progress Bar */}
          <div style={{
            height: '6px',
            background: 'rgba(255,255,255,0.08)',
            borderRadius: '10px',
            overflow: 'hidden',
            marginBottom: '20px'
          }}>
            <div style={{
              height: '100%',
              width: `${isCompleted ? 100 : ((currentStageIndex + 1) / AI_SCAN_STAGES.length) * 85}%`,
              background: 'linear-gradient(90deg, #10b981, #06b6d4)',
              transition: 'width 0.6s ease'
            }} />
          </div>

          {/* Scan Stages Sequence */}
          <div className="ai-scan-stages">
            {AI_SCAN_STAGES.map((stage, idx) => {
              const isActive = idx === currentStageIndex && !isCompleted;
              const isDone = idx < currentStageIndex || isCompleted;

              return (
                <div 
                  key={stage.stage}
                  className={`scan-stage-row ${isActive ? 'active' : ''} ${isDone ? 'completed' : ''}`}
                >
                  <div className="scan-stage-indicator">
                    {getStageIcon(stage.icon, isActive, isDone)}
                  </div>
                  <div className="scan-stage-text">
                    <span className="scan-stage-title">
                      {stage.stage}. {stage.title}
                    </span>
                    <span className="scan-stage-desc">
                      {stage.subtitle}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Completed Footer Action */}
          {isCompleted ? (
            <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                padding: '14px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <ShieldCheck size={26} color="#10b981" />
                <div style={{ fontSize: '0.85rem' }}>
                  <div style={{ fontWeight: '700', color: '#ffffff' }}>4 Actionable AI Playbooks Generated</div>
                  <div style={{ color: 'var(--text-secondary)' }}>Estimated recovery potential: ₹7.8 Lakhs (62.4% success confidence)</div>
                </div>
              </div>

              <button 
                onClick={handleFinishAndExplore}
                className="btn-start-recovery-big"
                style={{ marginTop: '8px' }}
              >
                <span>View AI Insights & Recommendations</span>
                <ArrowRight size={18} />
              </button>
            </div>
          ) : (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '12px',
              color: 'var(--text-muted)',
              fontSize: '0.85rem'
            }}>
              <Loader2 size={16} className="animate-spin" color="var(--primary)" />
              <span>Processing stage {currentStageIndex + 1} of 4...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
