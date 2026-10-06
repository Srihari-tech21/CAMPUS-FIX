import React from 'react';
import { useCampus } from '../context/CampusContext';
import { BarChart3, TrendingUp, ShieldCheck, Clock, Award, Building, CheckCircle2 } from 'lucide-react';

export default function Analytics() {
  const { issues } = useCampus();

  const total = issues.length;
  const verifiedCount = issues.filter(i => i.status === 'Verified' || i.status === 'Resolved').length;
  const resolutionRate = Math.round((verifiedCount / total) * 100);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      <div>
        <h1 className="page-title">
          <BarChart3 size={24} color="#2563eb" /> Campus Operational Analytics & SLA Report
        </h1>
        <p className="page-subtitle">
          Performance benchmarks, resolution rates, and building infrastructure risk hotspots
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid-stats">
        <div className="stat-card">
          <div className="stat-icon-wrapper" style={{ background: '#ecfdf5', color: '#10b981' }}>
            <ShieldCheck size={26} />
          </div>
          <div>
            <div className="stat-lbl">SLA Resolution Rate</div>
            <div className="stat-val" style={{ color: '#10b981' }}>{resolutionRate}%</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper" style={{ background: '#eff6ff', color: '#2563eb' }}>
            <Clock size={26} />
          </div>
          <div>
            <div className="stat-lbl">Avg Response Time</div>
            <div className="stat-val">14 Mins</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper" style={{ background: '#fef3c7', color: '#d97706' }}>
            <Award size={26} />
          </div>
          <div>
            <div className="stat-lbl">Reporter Satisfaction</div>
            <div className="stat-val">4.9 / 5.0</div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {/* Resolution Time by Category */}
        <div className="card">
          <div className="card-title">
            <span>Avg Resolution Time by Category</span>
            <TrendingUp size={18} color="#64748b" />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { cat: 'Electrical', avg: '1.8 Hours', pct: 85, color: '#eab308' },
              { cat: 'Water & Plumbing', avg: '2.4 Hours', pct: 70, color: '#06b6d4' },
              { cat: 'Classroom & AV', avg: '0.9 Hours', pct: 92, color: '#3b82f6' },
              { cat: 'Internet / Wi-Fi', avg: '1.1 Hours', pct: 88, color: '#6366f1' },
              { cat: 'Laboratory Equipment', avg: '3.2 Hours', pct: 60, color: '#a855f7' }
            ].map(item => (
              <div key={item.cat}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.25rem', fontWeight: 600 }}>
                  <span>{item.cat}</span>
                  <span style={{ color: '#2563eb', fontWeight: 700 }}>{item.avg}</span>
                </div>
                <div style={{ height: '8px', background: '#f1f5f9', borderRadius: '9999px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${item.pct}%`, background: item.color, borderRadius: '9999px' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hotspot Buildings */}
        <div className="card">
          <div className="card-title">
            <span>Campus Building Issue Density</span>
            <Building size={18} color="#64748b" />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {[
              { b: 'ECE Block', count: 4, status: 'High Density (Wiring Maintenance Required)' },
              { b: 'CSE Block', count: 2, status: 'Normal Operational Density' },
              { b: 'Main Administrative Block', count: 2, status: 'Normal Operational Density' },
              { b: 'Central Library', count: 1, status: 'Low Ticket Volume' },
              { b: 'Science & Biotech Tower', count: 1, status: 'Low Ticket Volume' }
            ].map(item => (
              <div key={item.b} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.65rem 0.85rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.875rem', color: '#0f172a' }}>{item.b}</div>
                  <div style={{ fontSize: '0.725rem', color: '#64748b' }}>{item.status}</div>
                </div>
                <span style={{ fontSize: '1rem', fontWeight: 800, color: '#2563eb', backgroundColor: '#eff6ff', padding: '0.2rem 0.6rem', borderRadius: '6px' }}>
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
