import React, { useState } from 'react';
import { useRecovery } from '../context/RecoveryContext';
import { formatINR, getCategoryBadge, getRecoveryChanceColor } from '../utils/formatters';
import {
  Search,
  Filter,
  CheckCircle2,
  Zap,
  ArrowUpDown,
  UserCheck,
  AlertCircle,
  Clock,
  Sparkles
} from 'lucide-react';

export default function OpportunitiesPage() {
  const {
    customers,
    recoverCustomer,
    setSelectedCustomer,
    categoryFilter,
    setCategoryFilter,
    searchQuery,
    setSearchQuery
  } = useRecovery();

  const [sortBy, setSortBy] = useState('chance'); // 'chance' | 'amount' | 'name'

  const categories = [
    { id: 'all', label: 'All Opportunities' },
    { id: 'failed_payment', label: 'Failed Payment' },
    { id: 'abandoned_cart', label: 'Abandoned Cart' },
    { id: 'cancelled_subscription', label: 'Subscription Cancelled' },
    { id: 'expired_card', label: 'Expired Card' }
  ];

  // Filtering
  const filteredCustomers = customers.filter((c) => {
    const matchesCategory = categoryFilter === 'all' || c.category === categoryFilter;
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.problem.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sorting
  const sortedCustomers = [...filteredCustomers].sort((a, b) => {
    if (sortBy === 'chance') return b.recoveryChance - a.recoveryChance;
    if (sortBy === 'amount') return b.amount - a.amount;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return 0;
  });

  const totalAtRiskInFilter = filteredCustomers
    .filter(c => c.status !== 'recovered')
    .reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">
            <span>Revenue Recovery Opportunities</span>
            <span style={{
              fontSize: '0.8rem',
              padding: '3px 10px',
              borderRadius: '999px',
              background: 'rgba(59, 130, 246, 0.15)',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              color: '#60a5fa',
              fontWeight: '700'
            }}>
              {filteredCustomers.length} Records
            </span>
          </h1>
          <p className="page-subtitle">
            Explore identified at-risk customer transactions. Launch 1-click autonomous recovery campaigns or inspect AI recovery diagnosis.
          </p>
        </div>

        {/* Quick Filter Summary Pill */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.7)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '12px',
          padding: '10px 18px',
          display: 'flex',
          alignItems: 'center',
          gap: '14px'
        }}>
          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '600' }}>
              Pending In Filter
            </div>
            <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#f87171', fontFamily: 'var(--font-mono)' }}>
              {formatINR(totalAtRiskInFilter)}
            </div>
          </div>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="table-container">
        {/* Toolbar with Search and Filters */}
        <div className="table-toolbar">
          {/* Search Box */}
          <div className="search-input-wrapper">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search by customer name, city, transaction ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filter Pills */}
          <div className="filter-pills">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategoryFilter(cat.id)}
                className={`filter-pill ${categoryFilter === cat.id ? 'active' : ''}`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ArrowUpDown size={15} color="var(--text-muted)" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                background: 'rgba(15, 23, 42, 0.7)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '8px',
                padding: '6px 10px',
                fontSize: '0.8rem',
                outline: 'none',
                color: 'var(--text-primary)'
              }}
            >
              <option value="chance">Sort: Recovery Chance (%)</option>
              <option value="amount">Sort: Amount (High to Low)</option>
              <option value="name">Sort: Customer Name</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Problem Detected</th>
                <th>Amount</th>
                <th>Recovery Chance</th>
                <th>AI Recommended Action</th>
                <th>Date / Time</th>
                <th style={{ textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {sortedCustomers.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                    No opportunities match the selected filters.
                  </td>
                </tr>
              ) : (
                sortedCustomers.map((customer) => {
                  const badge = getCategoryBadge(customer.category);
                  const chance = getRecoveryChanceColor(customer.recoveryChance);
                  const isRecovered = customer.status === 'recovered';

                  return (
                    <tr
                      key={customer.id}
                      style={{ cursor: 'pointer' }}
                      onClick={() => setSelectedCustomer(customer)}
                    >
                      <td>
                        <div className="customer-cell">
                          <div className="customer-avatar">
                            {customer.name.charAt(0)}
                          </div>
                          <div className="customer-meta">
                            <span className="customer-name">{customer.name}</span>
                            <span className="customer-subtext">{customer.city} • {customer.id}</span>
                          </div>
                        </div>
                      </td>

                      <td>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          <span
                            className="category-badge"
                            style={{
                              background: badge.bg,
                              color: badge.text,
                              border: `1px solid ${badge.border}`,
                              alignSelf: 'flex-start'
                            }}
                          >
                            {customer.categoryLabel}
                          </span>
                          <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                            {customer.problem}
                          </span>
                        </div>
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
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                          <Sparkles size={13} color="var(--primary)" />
                          {customer.recommendedChannel}
                        </span>
                      </td>

                      <td>
                        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                          {customer.date.split(' ')[0]}
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
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
