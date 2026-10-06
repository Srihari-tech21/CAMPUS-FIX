import React, { useState } from 'react';
import { useCampus } from '../context/CampusContext';
import { BUILDINGS, CATEGORIES } from '../data/mockData';
import { calculateSmartPriority } from '../utils/smartPriority';
import { detectDuplicates } from '../utils/duplicateDetector';
import PhotoCaptureInput from './PhotoCaptureInput';
import { 
  Send, 
  AlertTriangle, 
  Sparkles, 
  Check, 
  ArrowRight,
  ThumbsUp
} from 'lucide-react';

export default function ReportIssue() {
  const { createIssue, issues, upvoteIssue, setActiveTab, setSelectedIssueId } = useCampus();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Electrical');
  const [building, setBuilding] = useState('ECE Block (Electronics & Communication)');
  const [floor, setFloor] = useState('2nd Floor');
  const [room, setRoom] = useState('Room 204');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);
  const [urgency, setUrgency] = useState('High');
  const [safetyRisk, setSafetyRisk] = useState(true);

  const [createdResult, setCreatedResult] = useState(null);

  // Live Smart Priority Calculation
  const smartPriorityPreview = calculateSmartPriority({
    category,
    building,
    room,
    description: title + ' ' + description,
    urgency,
    safetyRisk,
    peopleAffected: '30-100'
  });

  // Live Duplicate Detection
  const duplicateCheck = detectDuplicates(issues, {
    category,
    building,
    room,
    description: title + ' ' + description
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description.trim() && !title.trim()) return;

    const newTicket = createIssue({
      title: title || `${category} problem in ${building}`,
      category,
      building,
      floor,
      room,
      description,
      urgency,
      safetyRisk,
      image: photo, // Pass photo data URL
      peopleAffected: '30-100'
    });

    setCreatedResult(newTicket);
  };

  const selectedBuildingData = BUILDINGS.find(b => b.name === building) || BUILDINGS[0];

  return (
    <div style={{ maxWidth: '950px', margin: '0 auto' }}>
      
      {/* Confirmation View after Submission */}
      {createdResult ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
          <div style={styles.successIconBox}>
            <Check size={36} color="#ffffff" />
          </div>

          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '1rem 0 0.2rem', color: '#0f172a' }}>
            Your issue has been reported.
          </h2>
          <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '1.25rem' }}>
            Your issue has been sent to the appropriate SITE maintenance team.
          </p>

          <div style={styles.createdBox}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
              TICKET IDENTIFIER
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.6rem', fontWeight: 800, color: '#dc2626', margin: '0.2rem 0' }}>
              ID: {createdResult.id}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
              <span className="status-pill status-reported">Status: Reported</span>
              <span className={`badge badge-${createdResult.priority.toLowerCase()}`}>
                Priority: {createdResult.priority}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1.75rem' }}>
            <button
              onClick={() => {
                setSelectedIssueId(createdResult.id);
                setActiveTab('tracking');
              }}
              className="btn btn-primary btn-lg"
            >
              Track Issue ({createdResult.id}) <ArrowRight size={16} />
            </button>

            <button
              onClick={() => {
                setCreatedResult(null);
                setTitle('');
                setDescription('');
                setPhoto(null);
              }}
              className="btn btn-secondary btn-lg"
            >
              Report Another Issue
            </button>
          </div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '1.5rem' }}>
          
          {/* Left Form */}
          <div className="card">
            <div style={{ marginBottom: '1.25rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.85rem' }}>
              <h1 className="page-title" style={{ fontSize: '1.4rem' }}>
                Report an Issue
              </h1>
              <p className="page-subtitle">
                Tell us what's wrong and where it happened.
              </p>
            </div>

            {/* Duplicate Report Alert */}
            {duplicateCheck.hasDuplicates && (
              <div style={styles.duplicateAlertBox}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                  <AlertTriangle size={20} color="#ea580c" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.875rem', color: '#9a3412' }}>
                      Possible duplicate
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#c2410c', marginTop: '0.1rem' }}>
                      {duplicateCheck.count} similar report{duplicateCheck.count > 1 ? 's' : ''} were found for this location.
                    </div>

                    <div style={{ marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                      {duplicateCheck.matches.map(m => (
                        <div key={m.id} style={styles.dupMatchRow}>
                          <span style={{ fontWeight: 800, fontFamily: 'var(--font-mono)' }}>{m.id}:</span>
                          <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{m.title}</span>
                          <button
                            type="button"
                            onClick={() => {
                              upvoteIssue(m.id);
                              setSelectedIssueId(m.id);
                              setActiveTab('tracking');
                            }}
                            className="btn btn-secondary btn-sm"
                            style={{ padding: '0.15rem 0.45rem', fontSize: '0.7rem' }}
                          >
                            <ThumbsUp size={11} /> Upvote (+1)
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              
              {/* 1. What happened? */}
              <div className="form-group">
                <label className="form-label">1. What happened? *</label>
                <input
                  type="text"
                  placeholder="e.g. Ceiling fan not working, Water leakage near washroom..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="form-control"
                  required
                />
              </div>

              {/* 2. Where did it happen? (Category, Block, Floor, Room) */}
              <div className="form-group">
                <label className="form-label">Category *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="form-select"
                >
                  {CATEGORIES.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                <div className="form-group">
                  <label className="form-label">Block / Building *</label>
                  <select
                    value={building}
                    onChange={(e) => setBuilding(e.target.value)}
                    className="form-select"
                  >
                    {BUILDINGS.map(b => (
                      <option key={b.id} value={b.name}>{b.name}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Floor *</label>
                  <select
                    value={floor}
                    onChange={(e) => setFloor(e.target.value)}
                    className="form-select"
                  >
                    {selectedBuildingData.floors.map(f => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Room / Specific Location *</label>
                <input
                  type="text"
                  placeholder="e.g. Room 204, Seminar Hall 1, West Corridor..."
                  value={room}
                  onChange={(e) => setRoom(e.target.value)}
                  className="form-control"
                  required
                />
              </div>

              {/* 3. Take / Upload Photo */}
              <div className="form-group">
                <PhotoCaptureInput photo={photo} setPhoto={setPhoto} />
              </div>

              {/* 4. Description */}
              <div className="form-group">
                <label className="form-label">4. Short Description *</label>
                <textarea
                  rows={3}
                  placeholder="Describe the problem clearly..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="form-control"
                  required
                />
              </div>

              {/* Safety Check */}
              <div style={styles.safetyBox}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={safetyRisk}
                    onChange={(e) => setSafetyRisk(e.target.checked)}
                    style={{ width: '16px', height: '16px', accentColor: '#dc2626' }}
                  />
                  <div>
                    <span style={{ fontWeight: 700, fontSize: '0.825rem', color: '#991b1b' }}>
                      Possible safety risk or hazard
                    </span>
                    <div style={{ fontSize: '0.725rem', color: '#7f1d1d' }}>
                      Check if there are live wires, pipe leaks, or sharp broken parts.
                    </div>
                  </div>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-primary btn-lg"
                style={{ width: '100%', marginTop: '1rem' }}
              >
                <Send size={16} /> Submit Issue
              </button>

            </form>
          </div>

          {/* Right Smart Priority Panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="card" style={{ borderTop: '4px solid #dc2626' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.75rem' }}>
                <Sparkles size={18} color="#dc2626" />
                <h3 style={{ fontSize: '1rem', fontWeight: 800 }}>Smart Priority</h3>
              </div>

              <div style={{ textAlign: 'center', padding: '0.85rem', background: '#fef2f2', borderRadius: '8px', marginBottom: '1rem', border: '1px solid rgba(220, 38, 38, 0.2)' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#991b1b', textTransform: 'uppercase' }}>
                  PRIORITY ASSESSMENT
                </div>
                <div style={{ margin: '0.35rem 0' }}>
                  <span className={`badge badge-${smartPriorityPreview.priority.toLowerCase()}`} style={{ fontSize: '1rem', padding: '0.35rem 0.85rem' }}>
                    {smartPriorityPreview.priority}
                  </span>
                </div>
              </div>

              <div style={{ fontSize: '0.775rem', fontWeight: 700, color: '#475569', marginBottom: '0.35rem' }}>
                REASON:
              </div>

              <div style={{ fontSize: '0.825rem', color: '#334155', lineHeight: 1.5, background: '#ffffff', padding: '0.65rem 0.85rem', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                {safetyRisk ? (
                  <>Possible safety risk in an active classroom or lab environment.</>
                ) : (
                  <>Does not create an immediate safety risk. Scheduled for routine team response.</>
                )}
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}

const styles = {
  successIconBox: {
    width: '64px',
    height: '64px',
    borderRadius: '9999px',
    background: '#16a34a',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto'
  },
  createdBox: {
    backgroundColor: '#fafafa',
    border: '1px solid #e2e8f0',
    borderRadius: '10px',
    padding: '1rem',
    maxWidth: '420px',
    margin: '0 auto'
  },
  safetyBox: {
    backgroundColor: '#fef2f2',
    border: '1px solid rgba(220, 38, 38, 0.2)',
    borderRadius: '6px',
    padding: '0.65rem 0.85rem',
    marginTop: '0.5rem'
  },
  duplicateAlertBox: {
    backgroundColor: '#fff7ed',
    border: '1px solid #ffedd5',
    borderRadius: '6px',
    padding: '0.75rem 0.85rem',
    marginBottom: '1rem'
  },
  dupMatchRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.75rem',
    backgroundColor: '#ffffff',
    padding: '0.3rem 0.5rem',
    borderRadius: '4px',
    border: '1px solid #fed7aa'
  }
};
