import React from 'react';
import { formatINR, formatINRLakhs } from '../utils/formatters';

export default function MetricCard({
  label,
  value,
  subtitle,
  icon: Icon,
  iconBg,
  iconColor,
  highlight,
  trend,
  trendPositive
}) {
  const getHighlightClass = () => {
    if (highlight === 'risk') return 'highlight-risk';
    if (highlight === 'recoverable') return 'highlight-recoverable';
    if (highlight === 'recovered') return 'highlight-recovered';
    return '';
  };

  return (
    <div className={`metric-card ${getHighlightClass()}`}>
      <div className="metric-card-top">
        <span className="metric-label">{label}</span>
        <div 
          className="metric-icon-wrap" 
          style={{ background: iconBg || 'rgba(255, 255, 255, 0.05)', color: iconColor || '#fff' }}
        >
          {Icon && <Icon size={20} />}
        </div>
      </div>

      <div className="metric-value">
        {formatINRLakhs(value)}
      </div>

      <div className="metric-footer">
        <span>{subtitle || formatINR(value)}</span>
        {trend && (
          <span className="metric-trend" style={{ color: trendPositive ? '#34d399' : '#f87171' }}>
            {trend}
          </span>
        )}
      </div>
    </div>
  );
}
