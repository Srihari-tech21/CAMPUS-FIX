import React, { useState } from 'react';
import { useCampus } from '../context/CampusContext';
import { CATEGORIES, BUILDINGS } from '../data/mockData';
import { ListFilter, Search, MapPin, Wrench, ChevronRight } from 'lucide-react';

export default function AllIssues() {
  const { issues, setSelectedIssueId, setActiveTab } = useCampus();
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('All');
  const [buildingFilter, setBuildingFilter] = useState('All');

  const filtered = issues.filter(issue => {
    if (catFilter !== 'All' && issue.category !== catFilter) return false;
    if (buildingFilter !== 'All' && issue.building !== buildingFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return issue.id.toLowerCase().includes(q) ||
        issue.title.toLowerCase().includes(q) ||
        issue.building.toLowerCase().includes(q) ||
        issue.description.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h1 className="page-title">
          <ListFilter size={24} color="#2563eb" /> All Campus Issues Directory
        </h1>
        <p className="page-subtitle">
          Searchable master repository of all registered campus infrastructure and equipment tickets
        </p>
      </div>

      {/* Controls Bar */}
      <div className="card" style={{ padding: '1rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '1rem' }}>
          <div style={{ position: 'relative' }}>
            <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Filter by keyword, room, or ticket ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="form-control"
              style={{ paddingLeft: '2.25rem' }}
            />
          </div>

          <select
            value={catFilter}
            onChange={(e) => setCatFilter(e.target.value)}
            className="form-select"
          >
            <option value="All">All Categories</option>
            {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>

          <select
            value={buildingFilter}
            onChange={(e) => setBuildingFilter(e.target.value)}
            className="form-select"
          >
            <option value="All">All Buildings</option>
            {BUILDINGS.map(b => <option key={b.id} value={b.name}>{b.name}</option>)}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontWeight: 700 }}>
              <th style={{ padding: '0.85rem 1rem' }}>TICKET ID</th>
              <th style={{ padding: '0.85rem 1rem' }}>TITLE / DESCRIPTION</th>
              <th style={{ padding: '0.85rem 1rem' }}>LOCATION</th>
              <th style={{ padding: '0.85rem 1rem' }}>PRIORITY</th>
              <th style={{ padding: '0.85rem 1rem' }}>STATUS</th>
              <th style={{ padding: '0.85rem 1rem' }}>ASSIGNED TECH</th>
              <th style={{ padding: '0.85rem 1rem' }}>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(issue => (
              <tr key={issue.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '0.85rem 1rem', fontFamily: 'var(--font-mono)', fontWeight: 800, color: '#2563eb' }}>
                  {issue.id}
                </td>
                <td style={{ padding: '0.85rem 1rem' }}>
                  <div style={{ fontWeight: 700, color: '#0f172a' }}>{issue.title}</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Category: {issue.category}</div>
                </td>
                <td style={{ padding: '0.85rem 1rem', color: '#475569' }}>
                  {issue.building} • {issue.room}
                </td>
                <td style={{ padding: '0.85rem 1rem' }}>
                  <span className={`badge badge-${issue.priority.toLowerCase()}`}>
                    {issue.priority}
                  </span>
                </td>
                <td style={{ padding: '0.85rem 1rem' }}>
                  <span className={`status-pill status-${issue.status.toLowerCase().replace(' ', '-')}`}>
                    {issue.status}
                  </span>
                </td>
                <td style={{ padding: '0.85rem 1rem', color: '#0284c7', fontWeight: 600 }}>
                  {issue.assignedTo}
                </td>
                <td style={{ padding: '0.85rem 1rem' }}>
                  <button
                    onClick={() => {
                      setSelectedIssueId(issue.id);
                      setActiveTab('tracking');
                    }}
                    className="btn btn-secondary btn-sm"
                  >
                    View <ChevronRight size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
