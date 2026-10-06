import React, { useState } from 'react';
import { useCampus } from '../context/CampusContext';
import { 
  CheckCircle2, 
  Wrench, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  XCircle, 
  Send, 
  ArrowLeft,
  ThumbsUp,
  MessageSquare,
  Camera
} from 'lucide-react';

export default function IssueDetail() {
  const { 
    selectedIssue, 
    updateIssueStatus, 
    verifyResolution, 
    activeRole, 
    setActiveTab,
    upvoteIssue
  } = useCampus();

  const [feedbackNote, setFeedbackNote] = useState('');
  const [commentText, setCommentText] = useState('');
  const [showFullImgModal, setShowFullImgModal] = useState(false);

  if (!selectedIssue) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
        No issue selected. Return to <button onClick={() => setActiveTab('dashboard')} className="btn btn-primary btn-sm">Dashboard</button>
      </div>
    );
  }

  // Simple timeline steps:
  // Reported ✓ -> Reviewed ✓ -> Assigned ✓ -> In Progress ● -> Resolved ○ -> Confirmed ○
  const timelineSteps = [
    { key: 'Reported', label: 'Reported' },
    { key: 'Reviewed', label: 'Reviewed' },
    { key: 'Assigned', label: 'Assigned' },
    { key: 'In Progress', label: 'In Progress' },
    { key: 'Resolved', label: 'Resolved' },
    { key: 'Verified', label: 'Confirmed' }
  ];

  const getCurrentStepIndex = () => {
    switch (selectedIssue.status) {
      case 'Reported': return 0;
      case 'Reviewed': return 1;
      case 'Assigned': return 2;
      case 'In Progress': return 3;
      case 'Resolved': return 4;
      case 'Verified': return 5;
      default: return 0;
    }
  };

  const currentIndex = getCurrentStepIndex();

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    updateIssueStatus(selectedIssue.id, selectedIssue.status, `Note: "${commentText}"`);
    setCommentText('');
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      
      {/* Lightbox Modal for enlarged photo */}
      {showFullImgModal && selectedIssue.image && (
        <div style={styles.lightboxModal} onClick={() => setShowFullImgModal(false)}>
          <div style={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <img src={selectedIssue.image} alt="Reported photo full" style={{ width: '100%', maxHeight: '80vh', objectFit: 'contain', borderRadius: '8px' }} />
            <button onClick={() => setShowFullImgModal(false)} className="btn btn-secondary btn-sm" style={{ marginTop: '0.75rem', width: '100%' }}>
              Close Photo
            </button>
          </div>
        </div>
      )}

      {/* Back Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button
          onClick={() => setActiveTab('dashboard')}
          className="btn btn-secondary btn-sm"
        >
          <ArrowLeft size={14} /> Back to Dashboard
        </button>

        <button
          onClick={() => upvoteIssue(selectedIssue.id)}
          className="btn btn-secondary btn-sm"
        >
          <ThumbsUp size={14} color="#dc2626" /> {selectedIssue.upvotes || 1} Reports Logged
        </button>
      </div>

      {/* Main Issue Card */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.35rem' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', fontWeight: 800, color: '#dc2626' }}>
                {selectedIssue.id}
              </span>
              <span className={`badge badge-${selectedIssue.priority.toLowerCase()}`}>
                {selectedIssue.priority} Priority
              </span>
              <span className={`status-pill status-${selectedIssue.status.toLowerCase().replace(' ', '-')}`}>
                {selectedIssue.status}
              </span>
            </div>

            <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a' }}>
              {selectedIssue.title}
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginTop: '0.4rem', fontSize: '0.825rem', color: '#64748b', flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <MapPin size={14} color="#dc2626" />
                <strong>{selectedIssue.building}</strong> • {selectedIssue.room}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Calendar size={14} />
                Reported: {selectedIssue.reportedTime ? new Date(selectedIssue.reportedTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Today'}
              </span>
            </div>
          </div>

          {/* Maintenance quick status controls */}
          {(activeRole === 'Maintenance Staff' || activeRole === 'Campus Administration') && (
            <div style={styles.adminControlBox}>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748b', marginBottom: '0.35rem' }}>
                MAINTENANCE PROGRESSION
              </div>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                {selectedIssue.status === 'Reported' && (
                  <button onClick={() => updateIssueStatus(selectedIssue.id, 'Assigned')} className="btn btn-primary btn-sm">
                    Assign Team
                  </button>
                )}
                {selectedIssue.status === 'Assigned' && (
                  <button onClick={() => updateIssueStatus(selectedIssue.id, 'In Progress')} className="btn btn-primary btn-sm">
                    Start Work
                  </button>
                )}
                {selectedIssue.status === 'In Progress' && (
                  <button onClick={() => updateIssueStatus(selectedIssue.id, 'Resolved')} className="btn btn-success btn-sm">
                    <CheckCircle2 size={14} /> Mark Resolved
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Visual Timeline Stepper */}
        <div style={styles.timelineWrapper}>
          <div style={styles.timelineTrack}>
            {timelineSteps.map((step, idx) => {
              const isCompleted = idx <= currentIndex;
              const isCurrent = idx === currentIndex;
              return (
                <div key={step.key} style={styles.timelineStep}>
                  <div style={{
                    ...styles.stepNode,
                    ...(isCompleted ? styles.stepNodeCompleted : {}),
                    ...(isCurrent ? styles.stepNodeCurrent : {})
                  }}>
                    {isCompleted ? '✓' : '○'}
                  </div>
                  <div style={{
                    ...styles.stepLabel,
                    ...(isCompleted ? { color: '#0f172a', fontWeight: 700 } : {})
                  }}>
                    {step.label} {isCompleted ? '✓' : '○'}
                  </div>
                  {idx < timelineSteps.length - 1 && (
                    <div style={{
                      ...styles.stepLine,
                      ...(idx < currentIndex ? { backgroundColor: '#dc2626' } : {})
                    }} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* RESOLUTION VERIFICATION PROMPT CARD */}
      {selectedIssue.status === 'Resolved' && (
        <div className="card" style={styles.verificationCard}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.5rem' }}>
            <ShieldCheck size={24} color="#16a34a" />
            <div>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#14532d' }}>
                Is the issue actually resolved?
              </h2>
              <p style={{ fontSize: '0.825rem', color: '#166534' }}>
                Maintenance marked this ticket as RESOLVED. Please confirm if the problem is fixed.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
            <button
              onClick={() => verifyResolution(selectedIssue.id, true, feedbackNote)}
              className="btn btn-success btn-lg"
              style={{ flex: 1 }}
            >
              <CheckCircle2 size={18} /> ✓ Confirm Resolution
            </button>
            <button
              onClick={() => verifyResolution(selectedIssue.id, false, feedbackNote)}
              className="btn btn-danger btn-lg"
              style={{ flex: 1 }}
            >
              <XCircle size={18} /> ✕ Still an Issue (Re-open)
            </button>
          </div>
        </div>
      )}

      {/* Confirmed Banner */}
      {selectedIssue.status === 'Verified' && (
        <div className="card" style={{ backgroundColor: '#f0fdf4', borderColor: '#bbf7d0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <CheckCircle2 size={24} color="#16a34a" />
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#14532d' }}>
                ✅ Confirmed Resolved & Closed
              </h3>
              <p style={{ fontSize: '0.825rem', color: '#166534' }}>
                The reporter confirmed that this campus issue was successfully fixed.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Grid: Description & Photo + Activity Feed */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.25rem' }}>
        
        {/* Description & Photo */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="card">
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.5rem' }}>Description</h3>
            <p style={{ fontSize: '0.9rem', color: '#334155', lineHeight: 1.6 }}>
              {selectedIssue.description}
            </p>

            {/* Display Attached Photo */}
            {selectedIssue.image && (
              <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid #f1f5f9' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', fontWeight: 800, color: '#dc2626', marginBottom: '0.5rem' }}>
                  <Camera size={14} /> PHOTO ATTACHED
                </div>
                <div
                  style={styles.issueImageCard}
                  onClick={() => setShowFullImgModal(true)}
                  title="Click to view full size photo"
                >
                  <img src={selectedIssue.image} alt="Reported issue evidence" style={styles.issueImg} />
                  <div style={styles.zoomHoverTag}>Click to Enlarge</div>
                </div>
              </div>
            )}
          </div>

          <div className="card">
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Wrench size={16} color="#dc2626" /> Assigned Team
            </h3>
            <div style={{ padding: '0.65rem 0.85rem', backgroundColor: '#f8fafc', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '0.875rem', fontWeight: 700, color: '#0f172a' }}>
              {selectedIssue.assignedTo || 'SITE Electrical Maintenance'}
            </div>
          </div>
        </div>

        {/* Activity Log */}
        <div className="card">
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <MessageSquare size={16} color="#dc2626" /> Activity Log
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '250px', overflowY: 'auto' }}>
            {selectedIssue.activityLog.map(act => (
              <div key={act.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.8rem' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '9999px', backgroundColor: '#dc2626', marginTop: '4px', flexShrink: 0 }} />
                <div>
                  <div style={{ color: '#0f172a', fontWeight: 600 }}>{act.text}</div>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{act.time} • {act.author}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Add note form */}
          <form onSubmit={handleAddComment} style={{ marginTop: '0.85rem', paddingTop: '0.75rem', borderTop: '1px solid #f1f5f9' }}>
            <input
              type="text"
              placeholder="Add update note..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="form-control"
              style={{ fontSize: '0.8rem', marginBottom: '0.5rem' }}
            />
            <button type="submit" className="btn btn-secondary btn-sm" style={{ width: '100%' }}>
              <Send size={12} /> Add Note
            </button>
          </form>
        </div>

      </div>

    </div>
  );
}

const styles = {
  adminControlBox: {
    backgroundColor: '#f8fafc',
    padding: '0.5rem 0.75rem',
    borderRadius: '6px',
    border: '1px solid #e2e8f0'
  },
  timelineWrapper: {
    marginTop: '1.25rem',
    paddingTop: '1rem',
    borderTop: '1px solid #f1f5f9'
  },
  timelineTrack: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative'
  },
  timelineStep: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    flex: 1
  },
  stepNode: {
    width: '28px',
    height: '28px',
    borderRadius: '9999px',
    backgroundColor: '#ffffff',
    border: '2px solid #cbd5e1',
    color: '#64748b',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.75rem',
    fontWeight: 800,
    zIndex: 2
  },
  stepNodeCompleted: {
    backgroundColor: '#dc2626',
    borderColor: '#dc2626',
    color: '#ffffff'
  },
  stepNodeCurrent: {
    borderColor: '#dc2626',
    color: '#dc2626',
    boxShadow: '0 0 0 3px rgba(220, 38, 38, 0.2)'
  },
  stepLabel: {
    fontSize: '0.725rem',
    color: '#94a3b8',
    marginTop: '0.35rem',
    textAlign: 'center'
  },
  stepLine: {
    position: 'absolute',
    top: '14px',
    left: '50%',
    width: '100%',
    height: '2px',
    backgroundColor: '#e2e8f0',
    zIndex: 1
  },
  verificationCard: {
    backgroundColor: '#f0fdf4',
    borderColor: '#bbf7d0',
    borderWidth: '2px'
  },
  issueImageCard: {
    position: 'relative',
    borderRadius: '8px',
    overflow: 'hidden',
    border: '1px solid #e2e8f0',
    cursor: 'pointer',
    maxHeight: '220px'
  },
  issueImg: {
    width: '100%',
    maxHeight: '220px',
    objectFit: 'cover'
  },
  zoomHoverTag: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    background: 'rgba(15, 23, 42, 0.75)',
    color: '#ffffff',
    fontSize: '0.7rem',
    fontWeight: 700,
    textAlign: 'center',
    padding: '0.25rem'
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
    maxWidth: '700px',
    width: '100%'
  }
};
