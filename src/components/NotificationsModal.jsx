import React from 'react';
import { useCampus } from '../context/CampusContext';
import { Bell, CheckCircle2, AlertTriangle, Clock } from 'lucide-react';

export default function NotificationsModal() {
  const { notifications, setNotifications } = useCampus();

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="page-title">
            <Bell size={24} color="#2563eb" /> Notifications & Dispatch Log
          </h1>
          <p className="page-subtitle">
            System alerts, technician assignments, and verification requests
          </p>
        </div>

        <button onClick={markAllRead} className="btn btn-secondary btn-sm">
          Mark All as Read
        </button>
      </div>

      <div className="card">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {notifications.map(n => (
            <div
              key={n.id}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.85rem',
                padding: '0.85rem 1rem',
                borderRadius: '8px',
                backgroundColor: n.unread ? '#eff6ff' : '#ffffff',
                border: `1px solid ${n.unread ? '#bfdbfe' : '#e2e8f0'}`
              }}
            >
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#dbeafe', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Bell size={18} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#0f172a' }}>{n.title}</div>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{n.time}</span>
                </div>
                <div style={{ fontSize: '0.825rem', color: '#475569', marginTop: '0.15rem' }}>{n.text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
