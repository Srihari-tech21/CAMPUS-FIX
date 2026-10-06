import React, { useState } from 'react';
import { useCampus } from '../context/CampusContext';
import { TECHNICIANS } from '../data/mockData';
import { 
  Wrench, 
  MapPin, 
  ChevronRight,
  Camera,
  Eye
} from 'lucide-react';

export default function MaintenanceDashboard() {
  const { issues, updateIssueStatus, setSelectedIssueId, setActiveTab } = useCampus();

  const [priorityFilter, setPriorityFilter] = useState('All');
  const [activeModalImg, setActiveModalImg] = useState(null);

  const filtered = issues.filter(issue => {
    if (priorityFilter !== 'All' && issue.priority !== priorityFilter) return false;
    return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      
      {/* Lightbox Modal for reported photo thumbnail */}
      {activeModalImg && (
        <div style={styles.lightboxModal} onClick={() => setActiveModalImg(null)}>
          <div style={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', fontWeight: 800, color: '#dc2626', marginBottom: '0.5rem' }}>
              <Camera size={14} /> Reported Field Photo Evidence
            </div>
            <img src={activeModalImg} alt="Reported field photo" style={{ width: '100%', maxHeight: '75vh', objectFit: 'contain', borderRadius: '8px' }} />
            <button onClick={() => setActiveModalImg(null)} className="btn btn-secondary btn-sm" style={{ marginTop: '0.75rem', width: '100%' }}>
              Close Photo
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 className="page-title">
            <Wrench size={22} color="#dc2626" /> Maintenance Dispatch Center
          </h1>
          <p className="page-subtitle">
            SITE Campus Maintenance & Field Task Queue
          </p>
        </div>

        {/* Priority Filter */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {['All', 'Critical', 'High', 'Medium', 'Low'].map(p => (
            <button
              key={p}
              onClick={() => setPriorityFilter(p)}
              className="btn btn-secondary btn-sm"
              style={{
                ...(priorityFilter === p ? { backgroundColor: '#dc2626', color: '#ffffff', borderColor: '#dc2626' } : {})
              }}
            >
              {p === 'Critical' ? '🚨 Critical' : p === 'High' ? '⚠️ High' : p === 'Medium' ? 'ℹ️ Medium' : p === 'Low' ? '🌱 Low' : 'All Priority'}
            </button>
          ))}
        </div>
      </div>

      {/* Technician Quick Roster */}
      <div className="card">
        <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748b', marginBottom: '0.65rem', textTransform: 'uppercase' }}>
          SITE FIELD TECHNICIAN ROSTER
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '0.65rem' }}>
          {TECHNICIANS.map(tech => {
            const activeCount = issues.filter(i => i.assignedTechId === tech.id && i.status !== 'Verified').length;
            return (
              <div key={tech.id} style={styles.techRosterCard}>
                <div style={{ fontWeight: 800, fontSize: '0.825rem', color: '#0f172a' }}>{tech.name}</div>
                <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{tech.team}</div>
                <div style={{ fontSize: '0.725rem', color: activeCount > 2 ? '#dc2626' : '#16a34a', fontWeight: 700, marginTop: '0.35rem' }}>
                  {activeCount} Active Task{activeCount !== 1 ? 's' : ''}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Maintenance Queue */}
      <div className="card">
        <div className="card-title">
          <span>Active Maintenance Queue ({filtered.length})</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {filtered.map(issue => (
            <div key={issue.id} style={styles.maintenanceRowCard}>
              
              {/* Photo Thumbnail if attached */}
              {issue.image ? (
                <div
                  style={styles.thumbBox}
                  onClick={() => setActiveModalImg(issue.image)}
                  title="Click to expand reported photo"
                >
                  <img src={issue.image} alt="Reported photo thumbnail" style={styles.thumbImg} />
                  <div style={styles.thumbBadge}>
                    <Camera size={10} /> Reported photo
                  </div>
                </div>
              ) : (
                <div style={styles.noThumbBox}>
                  <Camera size={18} color="#94a3b8" />
                  <span style={{ fontSize: '0.65rem', color: '#94a3b8' }}>No photo</span>
                </div>
              )}

              {/* Issue Details */}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.25rem' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '0.85rem', color: '#dc2626' }}>
                    {issue.id}
                  </span>
                  <span className={`badge badge-${issue.priority.toLowerCase()}`}>
                    {issue.priority}
                  </span>
                  <span className={`status-pill status-${issue.status.toLowerCase().replace(' ', '-')}`}>
                    {issue.status}
                  </span>
                </div>

                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a' }}>
                  {issue.title}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.3rem', fontSize: '0.775rem', color: '#64748b' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <MapPin size={12} />
                    {issue.building} ({issue.room})
                  </span>
                  <span>Assigned: <strong style={{ color: '#0284c7' }}>{issue.assignedTo || 'SITE Electrical Team'}</strong></span>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                {issue.status === 'Reported' && (
                  <button onClick={() => updateIssueStatus(issue.id, 'Assigned')} className="btn btn-secondary btn-sm">
                    Assign Team
                  </button>
                )}
                {issue.status === 'Assigned' && (
                  <button onClick={() => updateIssueStatus(issue.id, 'In Progress')} className="btn btn-primary btn-sm">
                    Start Repair
                  </button>
                )}
                {issue.status === 'In Progress' && (
                  <button onClick={() => updateIssueStatus(issue.id, 'Resolved')} className="btn btn-success btn-sm">
                    Mark Resolved
                  </button>
                )}
                {issue.status === 'Resolved' && (
                  <span style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: 700 }}>
                    Awaiting Student Confirmation
                  </span>
                )}

                <button
                  onClick={() => {
                    setSelectedIssueId(issue.id);
                    setActiveTab('tracking');
                  }}
                  className="btn btn-secondary btn-sm"
                >
                  View Details <ChevronRight size={14} />
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

const styles = {
  techRosterCard: {
    backgroundColor: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
    padding: '0.65rem 0.75rem'
  },
  maintenanceRowCard: {
    backgroundColor: '#ffffff',
    border: '1px solid var(--border-light)',
    borderRadius: '8px',
    padding: '0.85rem 1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    flexWrap: 'wrap'
  },
  thumbBox: {
    width: '64px',
    height: '64px',
    borderRadius: '6px',
    overflow: 'hidden',
    position: 'relative',
    border: '1px solid #e2e8f0',
    cursor: 'pointer',
    flexShrink: 0
  },
  thumbImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  thumbBadge: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    background: 'rgba(15, 23, 42, 0.75)',
    color: '#ffffff',
    fontSize: '0.55rem',
    fontWeight: 700,
    textAlign: 'center',
    padding: '1px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '2px'
  },
  noThumbBox: {
    width: '64px',
    height: '64px',
    borderRadius: '6px',
    backgroundColor: '#f8fafc',
    border: '1px dashed #cbd5e1',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  lightboxModal: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    backdropFilter: 'blur(8px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    padding: '1.5rem'
  },
  lightboxContent: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '1rem',
    maxWidth: '650px',
    width: '100%'
  }
};
