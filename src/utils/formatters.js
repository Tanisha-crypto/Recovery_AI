// Formatting utilities for Indian Currency (₹ Lakhs, ₹ Thousands), dates, and status helpers

export function formatINR(amount, compact = false) {
  if (amount === undefined || amount === null) return '₹0';
  
  if (compact) {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(1)} Cr`;
    }
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)} L`;
    }
    if (amount >= 1000) {
      return `₹${(amount / 1000).toFixed(1)} k`;
    }
  }

  // Full Indian numbering format (e.g. ₹1,25,000)
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatINRLakhs(amount) {
  if (!amount) return '₹0 Lakhs';
  const lakhs = (amount / 100000).toFixed(1);
  return `₹${lakhs} Lakhs`;
}

export function getCategoryBadge(category) {
  switch (category) {
    case 'failed_payment':
      return {
        label: 'Failed Payment',
        bg: 'rgba(239, 68, 68, 0.15)',
        text: '#f87171',
        border: 'rgba(239, 68, 68, 0.3)',
        iconName: 'AlertCircle'
      };
    case 'abandoned_cart':
      return {
        label: 'Abandoned Cart',
        bg: 'rgba(245, 158, 11, 0.15)',
        text: '#fbbf24',
        border: 'rgba(245, 158, 11, 0.3)',
        iconName: 'ShoppingCart'
      };
    case 'cancelled_subscription':
      return {
        label: 'Subscription Cancelled',
        bg: 'rgba(139, 92, 246, 0.15)',
        text: '#c084fc',
        border: 'rgba(139, 92, 246, 0.3)',
        iconName: 'UserX'
      };
    case 'expired_card':
      return {
        label: 'Expired Card',
        bg: 'rgba(6, 182, 212, 0.15)',
        text: '#22d3ee',
        border: 'rgba(6, 182, 212, 0.3)',
        iconName: 'CreditCard'
      };
    default:
      return {
        label: 'Unknown',
        bg: 'rgba(148, 163, 184, 0.15)',
        text: '#cbd5e1',
        border: 'rgba(148, 163, 184, 0.3)',
        iconName: 'HelpCircle'
      };
  }
}

export function getRecoveryChanceColor(chance) {
  if (chance >= 85) {
    return {
      text: '#34d399',
      bg: 'rgba(16, 185, 129, 0.15)',
      border: 'rgba(16, 185, 129, 0.3)',
      barColor: '#10b981',
      label: 'Very High'
    };
  }
  if (chance >= 75) {
    return {
      text: '#60a5fa',
      bg: 'rgba(59, 130, 246, 0.15)',
      border: 'rgba(59, 130, 246, 0.3)',
      barColor: '#3b82f6',
      label: 'High'
    };
  }
  return {
    text: '#fbbf24',
    bg: 'rgba(245, 158, 11, 0.15)',
    border: 'rgba(245, 158, 11, 0.3)',
    barColor: '#f59e0b',
    label: 'Moderate'
  };
}
