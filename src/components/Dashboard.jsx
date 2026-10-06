import React from 'react';
import { useCampus } from '../context/CampusContext';
import { 
  Plus, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  ListOrdered, 
  Wrench, 
  Sparkles, 
  ShieldCheck, 
  Monitor, 
  Zap, 
  Droplets, 
  Layers, 
  Compass, 
  ChevronRight,
  ThumbsUp,
  Building
} from 'lucide-react';

export default function Dashboard() {
  const { issues, setActiveTab, setSelectedIssueId, addSeedCriticalIssue, upvoteIssue } = useCampus();

  // Metrics
  const totalIssues = issues.length;
  const pendingCount = issues.filter(i => i.status === 'Reported' || i.status === 'Assigned').length;
  const inProgressCount = issues.filter(i => i.status === 'In Progress').length;
  const resolvedCount = issues.filter(i => i.status === 'Resolved' || i.status === 'Verified').length;
  const criticalCount = issues.filter(i => i.priority === 'Critical' && i.status !== 'Verified').length;

  const workflowSteps = [
    { num: '01', name: 'Report', text: 'Tell us what happened and where.', icon: Plus },
    { num: '02', name: 'Prioritize', text: 'Understand how important the issue is.', icon: Sparkles },
    { num: '03', name: 'Assign', text: 'Send it to the right team.', icon: Wrench },
    { num: '04', name: 'Resolve', text: 'Fix the problem and update the status.', icon: Clock },
    { num: '05', name: 'Confirm', text: 'Make sure the issue is actually solved.', icon: ShieldCheck }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* 1. HOMEPAGE HERO SECTION WITH SASI LOGO & REAL CAMPUS IMAGE */}
      <section style={styles.heroCard}>
        <div style={styles.heroOverlay}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.4rem' }}>
            <img src="/sasi-logo.png" alt="SASI Official Red Logo" style={{ width: '28px', height: '28px', objectFit: 'contain' }} />
            <div style={styles.sasiBadge}>SASI INSTITUTE OF TECHNOLOGY & ENGINEERING</div>
          </div>
          <div style={styles.brandTitle}>CampusFix</div>
          <h1 style={styles.heroHeading}>
            "Making Our Campus Better, <br />
            One Issue at a Time."
          </h1>
          <p style={styles.heroSubtitle}>
            Report campus problems, track their progress and help turn everyday issues into real improvements across SASI Institute of Technology & Engineering.
          </p>

          <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap', marginTop: '1.25rem' }}>
            <button
              onClick={() => setActiveTab('report')}
              className="btn btn-primary btn-lg"
              style={{ boxShadow: '0 4px 14px rgba(220, 38, 38, 0.4)' }}
            >
              <Plus size={18} /> Report an Issue
            </button>

            <button
              onClick={() => {
                const el = document.getElementById('how-it-works-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn btn-outline-red btn-lg"
              style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)' }}
            >
              Explore CampusFix <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* 2. DASHBOARD KPI METRICS */}
      <section>
        <div className="grid-stats">
          <div className="stat-card">
            <div className="stat-icon-wrapper" style={{ background: '#fef2f2', color: '#dc2626' }}>
              <ListOrdered size={24} />
            </div>
            <div>
              <div className="stat-lbl">Total Issues</div>
              <div className="stat-val">{totalIssues}</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper" style={{ background: '#fff7ed', color: '#ea580c' }}>
              <Clock size={24} />
            </div>
            <div>
              <div className="stat-lbl">Pending</div>
              <div className="stat-val" style={{ color: '#ea580c' }}>08</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper" style={{ background: '#eff6ff', color: '#2563eb' }}>
              <Wrench size={24} />
            </div>
            <div>
              <div className="stat-lbl">In Progress</div>
              <div className="stat-val" style={{ color: '#2563eb' }}>12</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper" style={{ background: '#f0fdf4', color: '#16a34a' }}>
              <CheckCircle2 size={24} />
            </div>
            <div>
              <div className="stat-lbl">Resolved</div>
              <div className="stat-val" style={{ color: '#16a34a' }}>22</div>
            </div>
          </div>

          <div className="stat-card" style={{ borderColor: '#fecaca' }}>
            <div className="stat-icon-wrapper" style={{ background: '#fef2f2', color: '#dc2626' }}>
              <AlertTriangle size={24} />
            </div>
            <div>
              <div className="stat-lbl">Critical Issues</div>
              <div className="stat-val" style={{ color: '#dc2626' }}>03</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. RECENT ISSUES LIST */}
      <section className="card">
        <div className="card-title">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ListOrdered size={20} color="#dc2626" />
            <span>Recent Campus Issues</span>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={addSeedCriticalIssue}
              className="btn btn-secondary btn-sm"
            >
              + Simulate Emergency Issue
            </button>
            <button
              onClick={() => setActiveTab('all_issues')}
              className="btn btn-secondary btn-sm"
            >
              View All <ChevronRight size={14} />
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {issues.slice(0, 4).map(issue => (
            <div
              key={issue.id}
              onClick={() => {
                setSelectedIssueId(issue.id);
                setActiveTab('tracking');
              }}
              style={styles.issueRow}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, color: '#dc2626', fontSize: '0.9rem' }}>
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
                <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0f172a' }}>{issue.title}</div>
                <div style={{ fontSize: '0.775rem', color: '#64748b' }}>{issue.building} • {issue.room}</div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    upvoteIssue(issue.id);
                  }}
                  className="btn btn-secondary btn-sm"
                  style={{ padding: '0.2rem 0.45rem', fontSize: '0.725rem' }}
                >
                  <ThumbsUp size={12} color="#dc2626" /> {issue.upvotes || 1}
                </button>
                <ChevronRight size={16} color="#64748b" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. SASI INTRODUCTION SECTION ("Built for the SASI Campus") */}
      <section className="card">
        <div style={styles.twoColGrid}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <img src="/sasi-logo.png" alt="SASI Logo" style={{ width: '22px', height: '22px', objectFit: 'contain' }} />
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#dc2626', letterSpacing: '0.05em' }}>
                CAMPUS FOCUS
              </span>
            </div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#991b1b', margin: '0.2rem 0 0.5rem' }}>
              Built for the SASI Campus
            </h2>
            <p style={{ fontSize: '0.925rem', color: '#334155', lineHeight: 1.6 }}>
              CampusFix is designed around the everyday needs of students, faculty and campus teams at SASI Institute of Technology & Engineering.
            </p>
          </div>

          <div style={styles.introImageFrame}>
            <img
              src="/sasi-campus-pascal.jpg"
              alt="SASI Institute 16 Pascal Building"
              style={styles.introImage}
            />
          </div>
        </div>
      </section>

      {/* 5. MAIN MESSAGE / MOTTO SECTION */}
      <section className="card" style={{ backgroundColor: '#fef2f2', borderColor: 'rgba(220, 38, 38, 0.2)', borderLeft: '4px solid #dc2626' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#dc2626', textTransform: 'uppercase' }}>
          INSTITUTIONAL THEME
        </div>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#991b1b', margin: '0.25rem 0 0.5rem' }}>
          "Education for Societal Transformation"
        </h2>
        <p style={{ fontSize: '0.925rem', color: '#450a0a', lineHeight: 1.6 }}>
          CampusFix brings this idea into everyday campus life — helping our community notice problems, take action and make our campus better.
        </p>
      </section>

      {/* 6. PROBLEM SECTION ("Small Problems Matter Too.") */}
      <section className="card">
        <div style={{ marginBottom: '1.25rem' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a' }}>
            Small Problems Matter Too.
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#475569', marginTop: '0.35rem', lineHeight: 1.6 }}>
            A broken classroom fan, a water leak, a damaged chair or a network problem may look small, but when these issues are not reported or followed up properly, they affect the everyday campus experience.
          </p>
        </div>

        {/* 5 Small Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
          {[
            { label: 'Electrical Issue', icon: Zap },
            { label: 'Classroom Problem', icon: Monitor },
            { label: 'Water / Maintenance', icon: Droplets },
            { label: 'Equipment Issue', icon: Wrench },
            { label: 'Campus Infrastructure', icon: Building }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} style={styles.probCardSmall}>
                <div style={{ width: '32px', height: '32px', borderRadius: '6px', background: '#fef2f2', color: '#dc2626', display: 'flex', alignItems: 'center', justifyCenter: 'center', marginBottom: '0.5rem' }}>
                  <Icon size={18} style={{ margin: 'auto' }} />
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0f172a' }}>{item.label}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. CAMPUS VISUAL SECTION ("Life at SASI") */}
      <section className="card">
        <div style={{ marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a' }}>Life at SASI Institute of Technology & Engineering</h2>
          <p style={{ fontSize: '0.875rem', color: '#64748b', marginTop: '0.2rem' }}>
            Learning, building, collaborating and growing.
          </p>
        </div>

        {/* 1 Large + 2 Smaller Images */}
        <div style={styles.visualGrid}>
          <div style={styles.largeImgBox}>
            <img src="/sasi-campus-pascal.jpg" alt="SASI Main Building" style={styles.fillImg} />
            <div style={styles.imgBadge}>SITE 16 Pascal Building</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={styles.smallImgBox}>
              <img src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80" alt="SASI Engineering Lab" style={styles.fillImg} />
              <div style={styles.imgBadge}>Engineering & Research Labs</div>
            </div>
            <div style={styles.smallImgBox}>
              <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80" alt="Students Collaborating" style={styles.fillImg} />
              <div style={styles.imgBadge}>Active Student Learning Spaces</div>
            </div>
          </div>
        </div>

        <p style={{ fontSize: '0.875rem', fontWeight: 700, color: '#dc2626', marginTop: '1rem' }}>
          And when something needs attention, CampusFix gives our community a simple way to act.
        </p>
      </section>

      {/* 8. HOW CAMPUSFIX WORKS */}
      <section id="how-it-works-section" className="card">
        <div className="card-title">
          <span>How CampusFix Works</span>
        </div>

        <div style={styles.workflowGrid}>
          {workflowSteps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.num} style={styles.workflowBox}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <span style={{ fontSize: '1.35rem', fontWeight: 900, color: '#dc2626', fontFamily: 'var(--font-mono)' }}>
                    {step.num}
                  </span>
                  <Icon size={16} color="#dc2626" />
                </div>
                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a' }}>{step.name}</div>
                <p style={{ fontSize: '0.775rem', color: '#64748b', marginTop: '0.2rem' }}>{step.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 9. PRODUCT PREVIEW ("From Report to Resolution") */}
      <section className="card">
        <div style={{ marginBottom: '1.25rem' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a' }}>
            From Report to Resolution
          </h2>
          <p style={{ fontSize: '0.875rem', color: '#64748b', marginTop: '0.2rem' }}>
            CampusFix doesn't stop at collecting complaints. It helps follow the issue until it is resolved.
          </p>
        </div>

        {/* Live Ticket Component Preview */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {issues.slice(0, 3).map(issue => (
            <div
              key={issue.id}
              onClick={() => {
                setSelectedIssueId(issue.id);
                setActiveTab('tracking');
              }}
              style={styles.previewCard}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, color: '#dc2626', fontSize: '0.9rem' }}>
                  {issue.id}
                </span>
                <span className={`badge badge-${issue.priority.toLowerCase()}`}>{issue.priority}</span>
                <span className={`status-pill status-${issue.status.toLowerCase().replace(' ', '-')}`}>{issue.status}</span>
              </div>

              <div style={{ flex: 1, margin: '0 1rem' }}>
                <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#0f172a' }}>{issue.title}</div>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{issue.building} • {issue.room}</div>
              </div>

              <button className="btn btn-secondary btn-sm">
                Track Ticket <ChevronRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 10. SMART FEATURES ("More Than a Complaint Box") */}
      <section className="card">
        <div style={{ marginBottom: '1.25rem' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a' }}>
            More Than a Complaint Box
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div style={styles.smartCard}>
            <Sparkles size={20} color="#dc2626" />
            <h3 style={{ fontSize: '0.95rem', fontWeight: 800, margin: '0.35rem 0 0.15rem' }}>Smart Priority</h3>
            <p style={{ fontSize: '0.775rem', color: '#64748b' }}>Identify urgent safety problems first.</p>
          </div>

          <div style={styles.smartCard}>
            <ListOrdered size={20} color="#dc2626" />
            <h3 style={{ fontSize: '0.95rem', fontWeight: 800, margin: '0.35rem 0 0.15rem' }}>Duplicate Reports</h3>
            <p style={{ fontSize: '0.775rem', color: '#64748b' }}>Find similar reports from the same location.</p>
          </div>

          <div style={styles.smartCard}>
            <Building size={20} color="#dc2626" />
            <h3 style={{ fontSize: '0.95rem', fontWeight: 800, margin: '0.35rem 0 0.15rem' }}>Location Based Issues</h3>
            <p style={{ fontSize: '0.775rem', color: '#64748b' }}>Know exactly where the problem is.</p>
          </div>

          <div style={styles.smartCard}>
            <ShieldCheck size={20} color="#dc2626" />
            <h3 style={{ fontSize: '0.95rem', fontWeight: 800, margin: '0.35rem 0 0.15rem' }}>Resolution Verification</h3>
            <p style={{ fontSize: '0.775rem', color: '#64748b' }}>Let the reporter confirm that the problem is actually fixed.</p>
          </div>
        </div>
      </section>

    </div>
  );
}

const styles = {
  heroCard: {
    borderRadius: '20px',
    overflow: 'hidden',
    backgroundImage: `linear-gradient(to right, rgba(15, 23, 42, 0.85), rgba(15, 23, 42, 0.58)), url("/sasi-campus-pascal.jpg")`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    boxShadow: 'var(--shadow-md)'
  },
  heroOverlay: {
    padding: '3.5rem 2.5rem',
    color: '#ffffff',
    maxWidth: '720px'
  },
  sasiBadge: {
    fontSize: '0.725rem',
    fontWeight: 800,
    color: '#fca5a5',
    letterSpacing: '0.08em'
  },
  brandTitle: {
    fontSize: '1.4rem',
    fontWeight: 900,
    color: '#ffffff',
    marginBottom: '0.5rem'
  },
  heroHeading: {
    fontSize: '2.3rem',
    fontWeight: 800,
    color: '#ffffff',
    lineHeight: 1.25,
    letterSpacing: '-0.02em'
  },
  heroSubtitle: {
    fontSize: '1rem',
    color: '#f1f5f9',
    marginTop: '0.75rem',
    lineHeight: 1.5
  },
  issueRow: {
    backgroundColor: '#ffffff',
    border: '1px solid var(--border-light)',
    borderRadius: '8px',
    padding: '0.85rem 1rem',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'background 0.15s ease'
  },
  twoColGrid: {
    display: 'grid',
    gridTemplateColumns: '1.2fr 1fr',
    gap: '1.5rem',
    alignItems: 'center'
  },
  introImageFrame: {
    borderRadius: '12px',
    overflow: 'hidden',
    height: '180px',
    border: '1px solid #e2e8f0'
  },
  introImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  probCardSmall: {
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    padding: '0.85rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  visualGrid: {
    display: 'grid',
    gridTemplateColumns: '1.4fr 1fr',
    gap: '0.75rem',
    marginTop: '0.5rem'
  },
  largeImgBox: {
    borderRadius: '10px',
    overflow: 'hidden',
    height: '240px',
    position: 'relative',
    border: '1px solid #e2e8f0'
  },
  smallImgBox: {
    borderRadius: '10px',
    overflow: 'hidden',
    height: '115px',
    position: 'relative',
    border: '1px solid #e2e8f0'
  },
  fillImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  imgBadge: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: '0.35rem 0.65rem',
    background: 'linear-gradient(to top, rgba(15,23,42,0.8), transparent)',
    color: '#ffffff',
    fontSize: '0.725rem',
    fontWeight: 700
  },
  workflowGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
    gap: '0.85rem'
  },
  workflowBox: {
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    padding: '0.85rem'
  },
  previewCard: {
    backgroundColor: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    padding: '0.75rem 1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'pointer'
  },
  smartCard: {
    backgroundColor: '#fef2f2',
    border: '1px solid rgba(220, 38, 38, 0.2)',
    borderRadius: '8px',
    padding: '0.85rem'
  }
};
