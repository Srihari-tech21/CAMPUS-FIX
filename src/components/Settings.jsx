import React from 'react';
import { useCampus } from '../context/CampusContext';
import { Settings as SettingsIcon, GraduationCap, Wrench, Shield, RefreshCw, Bell } from 'lucide-react';

export default function Settings() {
  const { activeRole, setActiveRole, resetDemoData } = useCampus();

  const roles = [
    { name: 'Student / Faculty', icon: GraduationCap, desc: 'Report campus issues & confirm resolutions' },
    { name: 'Maintenance Staff', icon: Wrench, desc: 'View field dispatch tasks & update repair progress' },
    { name: 'Campus Administration', icon: Shield, desc: 'Overview, analytics & high priority dispatch' }
  ];

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div>
        <h1 className="page-title">
          <SettingsIcon size={22} color="#2563eb" /> System & Demo Settings
        </h1>
        <p className="page-subtitle">
          Configure demo perspective role and application preferences
        </p>
      </div>

      <div className="card">
        <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.85rem' }}>Select Demo Perspective Role</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          {roles.map(r => {
            const Icon = r.icon;
            const isSelected = activeRole === r.name;
            return (
              <div
                key={r.name}
                onClick={() => setActiveRole(r.name)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.85rem',
                  padding: '0.75rem 1rem',
                  borderRadius: '8px',
                  border: `1px solid ${isSelected ? '#3b82f6' : '#e2e8f0'}`,
                  backgroundColor: isSelected ? '#eff6ff' : '#ffffff',
                  cursor: 'pointer'
                }}
              >
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: isSelected ? '#2563eb' : '#f1f5f9', color: isSelected ? '#ffffff' : '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={18} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 800, fontSize: '0.9rem', color: isSelected ? '#1d4ed8' : '#0f172a' }}>{r.name}</div>
                  <div style={{ fontSize: '0.775rem', color: '#64748b' }}>{r.desc}</div>
                </div>
                {isSelected && <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#2563eb' }}>ACTIVE</span>}
              </div>
            );
          })}
        </div>
      </div>

      <div className="card">
        <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.85rem' }}>Reset Prototype State</h3>
        <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1rem' }}>
          Reset all issues and activity logs back to the initial SASI campus benchmark dataset.
        </p>
        <button onClick={resetDemoData} className="btn btn-secondary btn-sm" style={{ width: 'fit-content' }}>
          <RefreshCw size={14} /> Reset Demo Dataset
        </button>
      </div>
    </div>
  );
}
