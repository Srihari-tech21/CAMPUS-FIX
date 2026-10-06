import React, { useState } from 'react';
import { useCampus } from '../context/CampusContext';
import { INSTITUTION_INFO, BUILDINGS } from '../data/mockData';
import { 
  School, 
  MapPin, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Wrench, 
  Zap, 
  Droplets, 
  Monitor, 
  FlaskConical, 
  Layers, 
  FileText, 
  Users, 
  Leaf, 
  Compass, 
  ChevronRight,
  ExternalLink,
  Play,
  Copy,
  Plus
} from 'lucide-react';

export default function SasiHomepage() {
  const { setActiveTab, setSelectedIssueId, issues, upvoteIssue } = useCampus();

  const [activeWorkflowStep, setActiveWorkflowStep] = useState(1);

  const workflowSteps = [
    {
      num: '01',
      title: 'REPORT',
      subtitle: 'Capture the Issue',
      desc: 'Students and faculty capture problems instantly with precise building location, room number, category, description, and photo evidence.',
      icon: Plus,
      color: '#2563eb'
    },
    {
      num: '02',
      title: 'PRIORITIZE',
      subtitle: 'Smart Urgency Evaluation',
      desc: 'Rule-based prioritization evaluates safety hazards, affected room capacity, and category SLAs to surface critical hazards ahead of routine requests.',
      icon: Sparkles,
      color: '#ef4444'
    },
    {
      num: '03',
      title: 'ASSIGN',
      subtitle: 'Automated Team Routing',
      desc: 'Routes tickets directly to the responsible SASI maintenance unit (Electrical, Plumbing, IT & AV Support, Civil & Furniture).',
      icon: Wrench,
      color: '#f97316'
    },
    {
      num: '04',
      title: 'RESOLVE',
      subtitle: 'Record Field Work',
      desc: 'Technicians log arrival times, attach repair notes, order parts, and mark issues as resolved in real-time.',
      icon: CheckCircle2,
      color: '#3b82f6'
    },
    {
      num: '05',
      title: 'VERIFY',
      subtitle: 'Reporter Outcome Confirmation',
      desc: 'The original reporter receives a prompt asking "Is the issue actually resolved?" — closing the loop with verified accountability.',
      icon: ShieldCheck,
      color: '#10b981'
    }
  ];

  return (
    <div style={styles.pageContainer}>
      {/* 1. CINEMATIC HERO SECTION */}
      <section style={styles.heroSection}>
        <div style={styles.heroContainer}>
          <div style={styles.heroLeft}>
            {/* Institution Eyebrow */}
            <div style={styles.eyebrowBadge}>
              <School size={14} color="#38bdf8" />
              <span>SASI INSTITUTE OF TECHNOLOGY & ENGINEERING</span>
            </div>

            {/* Main Heading */}
            <h1 style={styles.heroTitle}>
              Making Our Campus Better, <br />
              <span style={styles.heroGradientText}>One Issue at a Time.</span>
            </h1>

            {/* Supporting Subheading */}
            <p style={styles.heroSubtitle}>
              CampusFix gives every student and faculty member a simple way to report, track, and resolve everyday campus problems across SASI Tadepalligudem.
            </p>

            {/* CTAs */}
            <div style={styles.heroCtaGroup}>
              <button
                onClick={() => setActiveTab('report')}
                className="btn btn-primary btn-lg"
                style={{ boxShadow: '0 10px 25px rgba(37, 99, 235, 0.4)' }}
              >
                <Plus size={20} /> Report an Issue
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('workflow-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn btn-secondary btn-lg"
                style={{ background: 'rgba(255,255,255,0.08)', color: '#ffffff', borderColor: '#334155' }}
              >
                Explore CampusFix <ArrowRight size={18} />
              </button>
            </div>

            {/* Location Sub-tag */}
            <div style={styles.heroLocationTag}>
              <MapPin size={14} color="#38bdf8" />
              <span>Built for SASI • Tadepalligudem, Andhra Pradesh</span>
            </div>
          </div>

          {/* Hero Right: Interactive SASI Campus Live Twin Card */}
          <div style={styles.heroRightCard}>
            <div style={styles.heroCardHeader}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={styles.pulseDot} />
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#f8fafc', letterSpacing: '0.04em' }}>
                  SITE CAMPUS LIVE MATRIX
                </span>
              </div>
              <span style={{ fontSize: '0.725rem', color: '#38bdf8', fontWeight: 700 }}>
                Tadepalligudem AP
              </span>
            </div>

            {/* Active Ticket Card Preview */}
            <div style={styles.heroPreviewTicket}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, color: '#60a5fa', fontSize: '0.85rem' }}>
                  CF-1024
                </span>
                <span className="badge badge-critical">🚨 CRITICAL</span>
              </div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#ffffff', marginBottom: '0.35rem' }}>
                Exposed high-voltage cable in VLSI Lab
              </div>
              <div style={{ fontSize: '0.775rem', color: '#94a3b8' }}>
                ECE Block • Room 204 • SLA: &lt; 2 Hours
              </div>
              <div style={styles.heroTicketProgress}>
                <div style={styles.heroProgressBar}>
                  <div style={{ width: '65%', height: '100%', background: '#3b82f6', borderRadius: '9999px' }} />
                </div>
                <span style={{ fontSize: '0.725rem', color: '#60a5fa', fontWeight: 700 }}>In Progress</span>
              </div>
            </div>

            {/* Quick SASI Blocks Indicator */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginTop: '1rem' }}>
              <div style={styles.miniBlockBox}>
                <div style={{ fontWeight: 700, color: '#ffffff', fontSize: '0.8rem' }}>ECE & CSE Blocks</div>
                <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Active Priority Monitoring</div>
              </div>
              <div style={styles.miniBlockBox}>
                <div style={{ fontWeight: 700, color: '#ffffff', fontSize: '0.8rem' }}>Central Library</div>
                <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Digital Infrastructure</div>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('dashboard')}
              style={styles.heroCardBtn}
            >
              Launch Campus Command Center <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* 2. MOTTO / INSTITUTIONAL PURPOSE SECTION */}
      <section style={styles.visionSection}>
        <div style={styles.sectionContainer}>
          <div style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto' }}>
            <div style={styles.sectionEyebrow}>INSTITUTIONAL DISTINCTIVENESS</div>
            <h2 style={styles.visionTitle}>
              "EDUCATION FOR SOCIETAL TRANSFORMATION"
            </h2>
            <p style={styles.visionDescription}>
              CampusFix brings that spirit into everyday campus life — turning observations into action and small problems into measurable improvements.
            </p>
            <div style={styles.visionQuoteBox}>
              <p style={{ fontStyle: 'italic', color: '#475569', fontSize: '0.95rem', lineHeight: 1.6 }}>
                "Centered on creating technocrats who propel societal transformation through inventions and innovations, SASI integrates active learning, research, green campus sustainability, and ethical community standards."
              </p>
              <div style={{ marginTop: '0.75rem', fontWeight: 800, fontSize: '0.8rem', color: '#0f172a' }}>
                — SASI Institute of Technology & Engineering, Tadepalligudem
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CAMPUS VIDEO / VISUAL MEDIA SECTION ("Life at SASI") */}
      <section style={styles.mediaSection}>
        <div style={styles.sectionContainer}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={styles.sectionEyebrow}>INSIDE OUR CAMPUS</div>
            <h2 style={styles.sectionHeading}>Life at SASI Institute of Technology</h2>
          </div>

          {/* Horizontal Media Showcase */}
          <div style={styles.mediaCardWrapper}>
            <div style={styles.mediaBackdrop}>
              <div style={styles.mediaOverlayContent}>
                <div style={styles.mediaEyebrow}>SASI AERODROME CAMPUS • TADEPALLIGUDEM</div>
                <h3 style={styles.mediaTextQuote}>
                  "Every day, thousands of small moments make up campus life."
                </h3>
                <div style={styles.mediaSubPill}>
                  Learning • Building • Collaborating • Growing
                </div>
                <p style={styles.mediaConnectorText}>
                  And every day, small problems appear too. <br />
                  <strong>CampusFix gives our community a way to act on them.</strong>
                </p>
              </div>
            </div>

            {/* Campus Photo Gallery Grid */}
            <div style={styles.galleryGrid}>
              <div style={styles.galleryCard}>
                <img
                  src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=600&q=80"
                  alt="SASI Academic Complex"
                  style={styles.galleryImg}
                />
                <div style={styles.galleryCaption}>Academic Blocks & Aerodrome Campus</div>
              </div>

              <div style={styles.galleryCard}>
                <img
                  src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80"
                  alt="VLSI & Engineering Labs"
                  style={styles.galleryImg}
                />
                <div style={styles.galleryCaption}>Engineering Laboratories & Research</div>
              </div>

              <div style={styles.galleryCard}>
                <img
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80"
                  alt="Students Collaborating"
                  style={styles.galleryImg}
                />
                <div style={styles.galleryCaption}>Active Student Learning & Innovation</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE PROBLEM SECTION */}
      <section style={styles.problemSection}>
        <div style={styles.sectionContainer}>
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 2.5rem' }}>
            <div style={styles.sectionEyebrow}>THE CHALLENGE ON CAMPUS</div>
            <h2 style={styles.sectionHeading}>
              Small Problems Shouldn't Become Permanent Problems.
            </h2>
            <p style={styles.sectionSubtext}>
              Across a busy engineering campus, small issues can easily get lost between verbal complaints, informal messages, and manual follow-ups. CampusFix creates one transparent path from reporting to resolution.
            </p>
          </div>

          {/* SASI Problem Examples Grid */}
          <div style={styles.problemGrid}>
            {[
              { title: 'Classroom Equipment', desc: 'Projector bulb flash or HDMI port failures in seminar halls before lectures.', icon: Monitor, color: '#3b82f6' },
              { title: 'Electrical Concerns', desc: 'Exposed wiring dangling near whiteboards or lab socket tripping.', icon: Zap, color: '#eab308' },
              { title: 'Water Leakage', desc: 'Pressurized pipe joint leaks creating slippery corridor hazards.', icon: Droplets, color: '#06b6d4' },
              { title: 'Damaged Furniture', desc: 'Broken desk chair armrests with sharp brackets in CAD/CAM labs.', icon: Layers, color: '#f97316' },
              { title: 'Lab Equipment', desc: 'Power supply trips on oscilloscopes or high-voltage centrifuges.', icon: FlaskConical, color: '#a855f7' },
              { title: 'Sanitation & Cleanliness', desc: 'Restroom hygiene or garbage buildup in common academic wings.', icon: Sparkles, color: '#10b981' },
              { title: 'Wi-Fi & Connectivity', desc: 'Access point reboots dropping connections in Central Library.', icon: Compass, color: '#6366f1' },
              { title: 'Infrastructure Fixtures', desc: 'Pavement tile cracks or door latch damage across campus blocks.', icon: School, color: '#64748b' }
            ].map((prob, idx) => {
              const Icon = prob.icon;
              return (
                <div key={idx} style={styles.probCard}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: `${prob.color}15`, color: prob.color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.85rem' }}>
                    <Icon size={22} />
                  </div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.35rem' }}>{prob.title}</h3>
                  <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.5 }}>{prob.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. THE CAMPUSFIX 5-STEP WORKFLOW */}
      <section id="workflow-section" style={styles.workflowSection}>
        <div style={styles.sectionContainer}>
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 3rem' }}>
            <div style={styles.sectionEyebrow}>TRANSPARENT RESOLUTION LIFECYCLE</div>
            <h2 style={styles.sectionHeading}>The CampusFix Workflow</h2>
            <p style={styles.sectionSubtext}>
              A single unified pipeline linking reporters directly to field maintenance technicians and resolution verification.
            </p>
          </div>

          {/* Stepper Cards Horizontal */}
          <div style={styles.workflowGrid}>
            {workflowSteps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.num} style={styles.workflowCard}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '1.5rem', fontWeight: 900, color: step.color, fontFamily: 'var(--font-mono)' }}>
                      {step.num}
                    </span>
                    <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: `${step.color}15`, color: step.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon size={18} />
                    </div>
                  </div>

                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>{step.title}</h3>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: step.color, marginBottom: '0.5rem' }}>{step.subtitle}</div>
                  <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.5 }}>{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. LIVE PRODUCT PREVIEW */}
      <section style={styles.previewSection}>
        <div style={styles.sectionContainer}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={styles.sectionEyebrow}>PROTOTYPE DEMONSTRATION</div>
              <h2 style={styles.sectionHeading}>See CampusFix in Action</h2>
              <p style={styles.sectionSubtext}>
                Live prototype dataset logged across SASI Institute of Technology & Engineering blocks.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('dashboard')}
              className="btn btn-primary"
            >
              Open Full Interactive App <ArrowRight size={18} />
            </button>
          </div>

          {/* Sample Ticket Row Previews */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {issues.slice(0, 3).map(issue => (
              <div
                key={issue.id}
                onClick={() => {
                  setSelectedIssueId(issue.id);
                  setActiveTab('tracking');
                }}
                style={styles.previewTicketCard}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, color: '#2563eb', fontSize: '0.95rem' }}>
                    {issue.id}
                  </span>
                  <span className={`badge badge-${issue.priority.toLowerCase()}`}>
                    {issue.priority}
                  </span>
                  <span className={`status-pill status-${issue.status.toLowerCase().replace(' ', '-')}`}>
                    {issue.status}
                  </span>
                </div>

                <div style={{ flex: 1, margin: '0 1.25rem' }}>
                  <div style={{ fontWeight: 800, fontSize: '1rem', color: '#0f172a' }}>{issue.title}</div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.1rem' }}>
                    {issue.building} • {issue.room} • Reported by: {issue.reportedBy}
                  </div>
                </div>

                <button className="btn btn-secondary btn-sm">
                  Track Ticket <ChevronRight size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. SMART TECHNOLOGY SECTION */}
      <section style={styles.techSection}>
        <div style={styles.sectionContainer}>
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 2.5rem' }}>
            <div style={styles.sectionEyebrow}>INTELLIGENT WORKFLOW ENGINE</div>
            <h2 style={styles.sectionHeading}>More Than a Complaint Box.</h2>
            <p style={styles.sectionSubtext}>
              CampusFix adds transparent priority scoring, duplicate detection, and reporter verification to campus issue management.
            </p>
          </div>

          <div style={styles.techGrid}>
            <div style={styles.techCard}>
              <div style={styles.techBadge}>FEATURE 01</div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', margin: '0.5rem 0' }}>SMART PRIORITIZATION</h3>
              <p style={{ fontSize: '0.875rem', color: '#475569', lineHeight: 1.5 }}>
                Potential safety-critical issues (exposed live wiring, heavy leaks) are automatically surfaced ahead of routine maintenance requests.
              </p>
            </div>

            <div style={styles.techCard}>
              <div style={styles.techBadge}>FEATURE 02</div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', margin: '0.5rem 0' }}>DUPLICATE DETECTION</h3>
              <p style={{ fontSize: '0.875rem', color: '#475569', lineHeight: 1.5 }}>
                Similar reports from multiple users in the same lab or room are grouped automatically to reveal recurring infrastructure problems.
              </p>
            </div>

            <div style={styles.techCard}>
              <div style={styles.techBadge}>FEATURE 03</div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', margin: '0.5rem 0' }}>LOCATION-AWARE REPORTING</h3>
              <p style={{ fontSize: '0.875rem', color: '#475569', lineHeight: 1.5 }}>
                Every issue is mapped precisely to specific SASI campus blocks, floor numbers, and room designations for quick technician dispatch.
              </p>
            </div>

            <div style={styles.techCard}>
              <div style={styles.techBadge}>FEATURE 04</div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', margin: '0.5rem 0' }}>RESOLUTION VERIFICATION</h3>
              <p style={{ fontSize: '0.875rem', color: '#475569', lineHeight: 1.5 }}>
                An issue is not simply marked complete by staff — the reporter must confirm the outcome with a 1-click verification prompt.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. SASI CAMPUS CONNECTION */}
      <section style={styles.sasiPillarsSection}>
        <div style={styles.sectionContainer}>
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 2.5rem' }}>
            <div style={styles.sectionEyebrow}>INSTITUTIONAL ALIGNMENT</div>
            <h2 style={styles.sectionHeading}>Built Around the SASI Community</h2>
            <p style={styles.sectionSubtext}>
              Connecting everyday campus operations directly to SASI's core mission of engineering, innovation, and active learning.
            </p>
          </div>

          <div style={styles.pillarsGrid}>
            <div style={styles.pillarCard}>
              <div style={{ fontWeight: 900, color: '#2563eb', fontSize: '1.25rem', marginBottom: '0.35rem' }}>INNOVATION</div>
              <p style={{ fontSize: '0.85rem', color: '#475569' }}>Technology applied to solve an everyday campus operational challenge.</p>
            </div>

            <div style={styles.pillarCard}>
              <div style={{ fontWeight: 900, color: '#ef4444', fontSize: '1.25rem', marginBottom: '0.35rem' }}>RESPONSIBILITY</div>
              <p style={{ fontSize: '0.85rem', color: '#475569' }}>Giving every student and faculty member an active channel to act.</p>
            </div>

            <div style={styles.pillarCard}>
              <div style={{ fontWeight: 900, color: '#10b981', fontSize: '1.25rem', marginBottom: '0.35rem' }}>SUSTAINABILITY</div>
              <p style={{ fontSize: '0.85rem', color: '#475569' }}>Helping identify recurring water leaks, energy waste, and equipment strain.</p>
            </div>

            <div style={styles.pillarCard}>
              <div style={{ fontWeight: 900, color: '#a855f7', fontSize: '1.25rem', marginBottom: '0.35rem' }}>COMMUNITY</div>
              <p style={{ fontSize: '0.85rem', color: '#475569' }}>Students, faculty, and campus maintenance teams working in transparent unison.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. IMPACT SECTION */}
      <section style={styles.impactSection}>
        <div style={styles.sectionContainer}>
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 2.5rem' }}>
            <div style={styles.sectionEyebrow}>QUALITATIVE OUTCOMES</div>
            <h2 style={styles.sectionHeading}>Measurable Value for SASI Campus</h2>
          </div>

          <div style={styles.impactGrid}>
            <div style={styles.impactCard}>
              <div style={{ fontWeight: 800, fontSize: '1rem', color: '#0f172a' }}>FASTER REPORTING</div>
              <p style={{ fontSize: '0.825rem', color: '#64748b', marginTop: '0.25rem' }}>Reduce dependence on informal verbal complaints and WhatsApp messages.</p>
            </div>

            <div style={styles.impactCard}>
              <div style={{ fontWeight: 800, fontSize: '1rem', color: '#0f172a' }}>BETTER VISIBILITY</div>
              <p style={{ fontSize: '0.825rem', color: '#64748b', marginTop: '0.25rem' }}>Give campus leadership a clear real-time view of pending issues across blocks.</p>
            </div>

            <div style={styles.impactCard}>
              <div style={{ fontWeight: 800, fontSize: '1rem', color: '#0f172a' }}>SMARTER PRIORITIZATION</div>
              <p style={{ fontSize: '0.825rem', color: '#64748b', marginTop: '0.25rem' }}>Surface issues automatically according to urgency and safety impact.</p>
            </div>

            <div style={styles.impactCard}>
              <div style={{ fontWeight: 800, fontSize: '1rem', color: '#0f172a' }}>ACCOUNTABILITY</div>
              <p style={{ fontSize: '0.825rem', color: '#64748b', marginTop: '0.25rem' }}>Make progress visible step-by-step from initial report to final confirmation.</p>
            </div>

            <div style={styles.impactCard}>
              <div style={{ fontWeight: 800, fontSize: '1rem', color: '#0f172a' }}>BETTER CAMPUS EXPERIENCE</div>
              <p style={{ fontSize: '0.825rem', color: '#64748b', marginTop: '0.25rem' }}>Turn everyday observations into structured, campus-wide improvements.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 10. OFFICIAL FOOTER */}
      <footer style={styles.footer}>
        <div style={styles.sectionContainer}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '2rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.5rem' }}>
                <School size={22} color="#38bdf8" />
                <span style={{ fontWeight: 800, fontSize: '1.25rem', color: '#ffffff' }}>CampusFix</span>
              </div>
              <div style={{ fontSize: '0.85rem', color: '#94a3b8', fontStyle: 'italic', marginBottom: '0.75rem' }}>
                "From Reporting Problems to Actually Resolving Them."
              </div>
              <div style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>
                <strong>Sasi Institute of Technology & Engineering (SITE)</strong><br />
                Near Aerodrome, Tadepalligudem, West Godavari Dist, AP 534101
              </div>
            </div>

            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#ffffff', marginBottom: '0.5rem' }}>NAVIGATION</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.8rem', color: '#94a3b8' }}>
                  <a onClick={() => setActiveTab('home')} style={{ cursor: 'pointer' }}>Homepage</a>
                  <a onClick={() => setActiveTab('dashboard')} style={{ cursor: 'pointer' }}>Campus Dashboard</a>
                  <a onClick={() => setActiveTab('report')} style={{ cursor: 'pointer' }}>Report an Issue</a>
                  <a onClick={() => setActiveTab('maintenance')} style={{ cursor: 'pointer' }}>Maintenance Hub</a>
                </div>
              </div>

              <div>
                <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#ffffff', marginBottom: '0.5rem' }}>COLLEGE WEBSITE</div>
                <a href="https://sasi.ac.in" target="_blank" rel="noreferrer" style={{ fontSize: '0.8rem', color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  Official SASI Portal (sasi.ac.in) <ExternalLink size={12} />
                </a>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '2.5rem', paddingTop: '1.25rem', borderTop: '1px solid #1e293b', textAlign: 'center', fontSize: '0.75rem', color: '#64748b' }}>
            CampusFix is a <strong>Student Innovation Prototype</strong> developed for SASI Institute of Technology & Engineering, Tadepalligudem.
          </div>
        </div>
      </footer>
    </div>
  );
}

const styles = {
  pageContainer: {
    backgroundColor: '#ffffff',
    color: '#0f172a',
    margin: '-2rem' // Negate main content padding for full span
  },
  heroSection: {
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #0a2540 100%)',
    color: '#ffffff',
    padding: '4rem 2rem 5rem',
    position: 'relative',
    overflow: 'hidden'
  },
  heroContainer: {
    maxWidth: '1300px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: '1.2fr 1fr',
    gap: '3rem',
    alignItems: 'center'
  },
  eyebrowBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.4rem 0.85rem',
    borderRadius: '9999px',
    backgroundColor: 'rgba(56, 189, 248, 0.12)',
    border: '1px solid rgba(56, 189, 248, 0.3)',
    color: '#38bdf8',
    fontSize: '0.75rem',
    fontWeight: 800,
    letterSpacing: '0.05em',
    marginBottom: '1.25rem'
  },
  heroTitle: {
    fontSize: '2.8rem',
    fontWeight: 800,
    lineHeight: 1.15,
    letterSpacing: '-0.03em',
    color: '#ffffff'
  },
  heroGradientText: {
    background: 'linear-gradient(90deg, #60a5fa 0%, #38bdf8 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },
  heroSubtitle: {
    fontSize: '1.1rem',
    color: '#cbd5e1',
    margin: '1.25rem 0 2rem',
    lineHeight: 1.6,
    maxWidth: '600px'
  },
  heroCtaGroup: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap'
  },
  heroLocationTag: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    fontSize: '0.8rem',
    color: '#94a3b8',
    marginTop: '2rem',
    fontWeight: 600
  },
  heroRightCard: {
    backgroundColor: 'rgba(30, 41, 59, 0.75)',
    backdropFilter: 'blur(16px)',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    borderRadius: '16px',
    padding: '1.5rem',
    boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
  },
  heroCardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '0.85rem',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
    marginBottom: '1rem'
  },
  pulseDot: {
    width: '8px',
    height: '8px',
    borderRadius: '9999px',
    backgroundColor: '#10b981',
    boxShadow: '0 0 10px #10b981'
  },
  heroPreviewTicket: {
    backgroundColor: '#0f172a',
    border: '1px solid #334155',
    borderRadius: '12px',
    padding: '1rem'
  },
  heroTicketProgress: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    marginTop: '0.75rem'
  },
  heroProgressBar: {
    flex: 1,
    height: '6px',
    backgroundColor: '#1e293b',
    borderRadius: '9999px',
    overflow: 'hidden'
  },
  miniBlockBox: {
    backgroundColor: '#1e293b',
    padding: '0.65rem 0.85rem',
    borderRadius: '8px',
    border: '1px solid #334155'
  },
  heroCardBtn: {
    width: '100%',
    marginTop: '1.25rem',
    padding: '0.75rem',
    borderRadius: '8px',
    backgroundColor: '#2563eb',
    color: '#ffffff',
    border: 'none',
    fontWeight: 700,
    fontSize: '0.85rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem'
  },
  sectionContainer: {
    maxWidth: '1250px',
    margin: '0 auto',
    padding: '0 1.5rem'
  },
  visionSection: {
    padding: '4rem 0',
    backgroundColor: '#f8fafc',
    borderBottom: '1px solid #e2e8f0'
  },
  sectionEyebrow: {
    fontSize: '0.75rem',
    fontWeight: 800,
    color: '#2563eb',
    letterSpacing: '0.08em',
    marginBottom: '0.5rem',
    textTransform: 'uppercase'
  },
  visionTitle: {
    fontSize: '2rem',
    fontWeight: 900,
    color: '#0f172a',
    letterSpacing: '-0.02em',
    marginBottom: '1rem'
  },
  visionDescription: {
    fontSize: '1.1rem',
    color: '#475569',
    lineHeight: 1.6,
    marginBottom: '1.5rem'
  },
  visionQuoteBox: {
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: 'var(--shadow-sm)'
  },
  mediaSection: {
    padding: '4.5rem 0',
    backgroundColor: '#ffffff'
  },
  sectionHeading: {
    fontSize: '2.1rem',
    fontWeight: 800,
    color: '#0f172a',
    letterSpacing: '-0.02em'
  },
  sectionSubtext: {
    fontSize: '1rem',
    color: '#64748b',
    marginTop: '0.5rem',
    lineHeight: 1.6
  },
  mediaCardWrapper: {
    borderRadius: '20px',
    overflow: 'hidden',
    border: '1px solid #e2e8f0',
    boxShadow: 'var(--shadow-lg)'
  },
  mediaBackdrop: {
    background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)',
    color: '#ffffff',
    padding: '3.5rem 2.5rem',
    textAlign: 'center'
  },
  mediaOverlayContent: {
    maxWidth: '800px',
    margin: '0 auto'
  },
  mediaEyebrow: {
    fontSize: '0.75rem',
    fontWeight: 800,
    color: '#38bdf8',
    letterSpacing: '0.08em',
    marginBottom: '0.75rem'
  },
  mediaTextQuote: {
    fontSize: '1.85rem',
    fontWeight: 800,
    lineHeight: 1.3,
    marginBottom: '0.75rem'
  },
  mediaSubPill: {
    display: 'inline-block',
    padding: '0.35rem 1rem',
    borderRadius: '9999px',
    backgroundColor: 'rgba(255,255,255,0.12)',
    fontSize: '0.85rem',
    fontWeight: 700,
    color: '#93c5fd',
    marginBottom: '1.25rem'
  },
  mediaConnectorText: {
    fontSize: '1rem',
    color: '#cbd5e1',
    lineHeight: 1.6
  },
  galleryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1px',
    backgroundColor: '#e2e8f0'
  },
  galleryCard: {
    position: 'relative',
    height: '220px',
    overflow: 'hidden'
  },
  galleryImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  galleryCaption: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: '0.75rem 1rem',
    background: 'linear-gradient(to top, rgba(15,23,42,0.9), transparent)',
    color: '#ffffff',
    fontSize: '0.8rem',
    fontWeight: 700
  },
  problemSection: {
    padding: '4.5rem 0',
    backgroundColor: '#f8fafc',
    borderTop: '1px solid #e2e8f0'
  },
  problemGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: '1.25rem'
  },
  probCard: {
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    padding: '1.25rem',
    boxShadow: 'var(--shadow-sm)'
  },
  workflowSection: {
    padding: '4.5rem 0',
    backgroundColor: '#ffffff'
  },
  workflowGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '1.25rem'
  },
  workflowCard: {
    backgroundColor: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    padding: '1.25rem',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
  },
  previewSection: {
    padding: '4.5rem 0',
    backgroundColor: '#f8fafc',
    borderTop: '1px solid #e2e8f0'
  },
  previewTicketCard: {
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '10px',
    padding: '1rem 1.25rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'pointer'
  },
  techSection: {
    padding: '4.5rem 0',
    backgroundColor: '#ffffff'
  },
  techGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: '1.25rem'
  },
  techCard: {
    backgroundColor: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    padding: '1.5rem'
  },
  techBadge: {
    fontSize: '0.7rem',
    fontWeight: 800,
    color: '#2563eb',
    letterSpacing: '0.05em'
  },
  sasiPillarsSection: {
    padding: '4.5rem 0',
    backgroundColor: '#f8fafc',
    borderTop: '1px solid #e2e8f0'
  },
  pillarsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '1.25rem'
  },
  pillarCard: {
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    padding: '1.25rem'
  },
  impactSection: {
    padding: '4.5rem 0',
    backgroundColor: '#ffffff'
  },
  impactGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '1.25rem'
  },
  impactCard: {
    backgroundColor: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: '10px',
    padding: '1.25rem'
  },
  footer: {
    backgroundColor: '#0f172a',
    color: '#ffffff',
    padding: '4rem 0 2rem',
    borderTop: '1px solid #1e293b'
  }
};
