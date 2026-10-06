import React from 'react';
import { useCampus } from '../context/CampusContext';
import { UserCheck, ShieldCheck, CheckCircle2, ChevronRight, Clock, AlertTriangle } from 'lucide-react';

export default function MyIssues() {
  const { issues, setSelectedIssueId, setActiveTab } = useCampus();

  // For prototype, simulate issues reported by current user session
  const myIssues = issues; // or filter by student email

  const pendingVerification = issues.filter(i => i.status === 'Resolved');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="page-title">
            <UserCheck size={24} color="#2563eb" /> My Reported Campus Issues
          </h1>
          <p className="page-subtitle">
            Track real-time resolution status for issues you've reported across campus
          </p>
        </div>

        <button
          onClick={() => setActiveTab('report')}
          className="btn btn-primary"
        >
          + Report Another Problem
        </button>
      </div>

      {/* Pending Resolution Verification Notification Banner */}
      {pendingVerification.length > 0 && (
        <div className="card" style={{ backgroundColor: '#ecfdf5', borderColor: '#a7f3d0' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <ShieldCheck size={26} color="#059669" />
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#065f46' }}>
                  {pendingVerification.length} Ticket{pendingVerification.length > 1 ? 's' : ''} Awaiting Your Verification!
                </h3>
                <p style={{ fontSize: '0.825rem', color: '#047857' }}>
                  Maintenance marked these issues as fixed. Please confirm if they are actually resolved.
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setSelectedIssueId(pendingVerification[0].id);
                setActiveTab('tracking');
              }}
              className="btn btn-success"
            >
              Verify Issue ({pendingVerification[0].id}) <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* My Issues Cards */}
      <div className="card">
        <div className="card-title">
          <span>All My Submitted Tickets ({myIssues.length})</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {myIssues.map(issue => (
            <div
              key={issue.id}
              onClick={() => {
                setSelectedIssueId(issue.id);
                setActiveTab('tracking');
              }}
              style={styles.ticketRow}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, color: '#2563eb', fontSize: '0.9rem' }}>
                  {issue.id}
                </span>
                <span className={`badge badge-${issue.priority.toLowerCase()}`}>
                  {issue.priority}
                </span>
                <span className={`status-pill status-${issue.status.toLowerCase().replace(' ', '-')}`}>
                  {issue.status}
                </span>
              </div>

              <div style={{ flex: 1, margin: '0 1rem' }}>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0f172a' }}>{issue.title}</div>
                <div style={{ fontSize: '0.775rem', color: '#64748b' }}>{issue.building} • {issue.room}</div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                  {new Date(issue.reportedTime).toLocaleDateString()}
                </span>
                <ChevronRight size={16} color="#94a3b8" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  ticketRow: {
    backgroundColor: '#ffffff',
    border: '1px solid var(--border-light)',
    borderRadius: '8px',
    padding: '0.85rem 1rem',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'background 0.15s ease'
  }
};
