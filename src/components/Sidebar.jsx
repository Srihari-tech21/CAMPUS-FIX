import React from 'react';
import { useCampus } from '../context/CampusContext';
import { 
  LayoutDashboard, 
  PlusCircle, 
  UserCheck, 
  ListFilter, 
  Wrench, 
  BarChart3, 
  Bell, 
  Settings,
  CheckCircle2
} from 'lucide-react';

export default function Sidebar() {
  const { activeTab, setActiveTab, issues, notifications } = useCampus();

  const criticalCount = issues.filter(i => i.priority === 'Critical' && i.status !== 'Verified').length;
  const pendingVerifyCount = issues.filter(i => i.status === 'Resolved').length;
  const unreadNotifs = notifications.filter(n => n.unread).length;

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'report', label: 'Report Issue', icon: PlusCircle, highlight: true },
    { id: 'my_issues', label: 'My Issues', icon: UserCheck },
    { id: 'all_issues', label: 'All Issues', icon: ListFilter },
    { id: 'maintenance', label: 'Maintenance', icon: Wrench, badge: criticalCount > 0 ? `${criticalCount}` : null },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: unreadNotifs > 0 ? `${unreadNotifs}` : null },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <aside style={styles.glassSidebar}>
      {/* Brand Header with Official Red SASI Logo & Full Name */}
      <div style={styles.brandContainer} onClick={() => setActiveTab('dashboard')} role="button">
        <div style={styles.logoIcon}>
          <img src="/sasi-logo.png" alt="SASI Official Logo" style={{ width: '28px', height: '28px', objectFit: 'contain' }} />
        </div>
        <div>
          <div style={styles.brandTitle}>CampusFix</div>
          <div style={styles.brandSubtitle}>SASI Institute of Technology & Engineering</div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav style={styles.navMenu}>
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                ...styles.navButton,
                ...(isActive ? styles.navButtonActive : {}),
                ...(item.highlight && !isActive ? styles.navButtonHighlight : {})
              }}
            >
              <Icon size={18} style={{ color: isActive ? '#dc2626' : '#64748b' }} />
              <span style={{ flex: 1, textAlign: 'left' }}>{item.label}</span>
              {item.badge && (
                <span style={{
                  ...styles.badge,
                  background: item.id === 'maintenance' && criticalCount > 0 ? '#dc2626' : '#991b1b'
                }}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Verification Prompt Banner */}
      {pendingVerifyCount > 0 && (
        <div style={styles.verifyBox} onClick={() => setActiveTab('my_issues')}>
          <CheckCircle2 size={16} color="#16a34a" />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.775rem', fontWeight: 800, color: '#14532d' }}>
              {pendingVerifyCount} Ticket{pendingVerifyCount > 1 ? 's' : ''} to Confirm
            </div>
            <div style={{ fontSize: '0.7rem', color: '#166534' }}>Click to verify resolution</div>
          </div>
        </div>
      )}

      {/* Footer Institution Label with Full Name */}
      <div style={styles.sidebarFooter}>
        <div style={styles.footerCollegeName}>SASI Institute of Technology & Engineering</div>
        <div style={styles.footerLocation}>Tadepalligudem, AP</div>
      </div>
    </aside>
  );
}

const styles = {
  glassSidebar: {
    position: 'fixed',
    top: '1rem',
    left: '1rem',
    bottom: '1rem',
    width: '260px',
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    border: '1px solid rgba(220, 38, 38, 0.18)',
    borderRadius: '16px',
    boxShadow: '0 8px 32px 0 rgba(185, 28, 28, 0.08)',
    display: 'flex',
    flexDirection: 'column',
    padding: '1.25rem 0.85rem',
    zIndex: 500,
    color: '#0f172a'
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.25rem 0.5rem 1rem',
    borderBottom: '1px solid rgba(220, 38, 38, 0.12)',
    marginBottom: '1rem',
    cursor: 'pointer'
  },
  logoIcon: {
    width: '38px',
    height: '38px',
    borderRadius: '10px',
    background: '#ffffff',
    border: '1px solid rgba(220, 38, 38, 0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 8px rgba(220, 38, 38, 0.15)',
    flexShrink: 0
  },
  brandTitle: {
    fontSize: '1.2rem',
    fontWeight: 800,
    color: '#991b1b',
    letterSpacing: '-0.02em',
    lineHeight: 1.1
  },
  brandSubtitle: {
    fontSize: '0.675rem',
    color: '#64748b',
    fontWeight: 700,
    marginTop: '0.15rem',
    lineHeight: 1.2
  },
  navMenu: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.35rem',
    flex: 1
  },
  navButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.65rem 0.85rem',
    borderRadius: '10px',
    border: '1px solid transparent',
    background: 'transparent',
    color: '#334155',
    fontSize: '0.85rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.15s ease'
  },
  navButtonActive: {
    backgroundColor: 'rgba(220, 38, 38, 0.1)',
    borderColor: 'rgba(220, 38, 38, 0.25)',
    color: '#991b1b',
    fontWeight: 800,
    borderLeft: '4px solid #dc2626'
  },
  navButtonHighlight: {
    background: 'rgba(254, 242, 242, 0.8)',
    color: '#dc2626'
  },
  badge: {
    padding: '0.15rem 0.45rem',
    borderRadius: '9999px',
    fontSize: '0.675rem',
    fontWeight: 800,
    color: '#ffffff'
  },
  verifyBox: {
    backgroundColor: '#f0fdf4',
    border: '1px solid #bbf7d0',
    borderRadius: '10px',
    padding: '0.65rem 0.75rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    cursor: 'pointer',
    marginBottom: '0.85rem'
  },
  sidebarFooter: {
    paddingTop: '0.85rem',
    borderTop: '1px solid rgba(220, 38, 38, 0.12)',
    textAlign: 'center'
  },
  footerCollegeName: {
    fontSize: '0.7rem',
    fontWeight: 800,
    color: '#991b1b',
    lineHeight: 1.2
  },
  footerLocation: {
    fontSize: '0.65rem',
    color: '#64748b',
    marginTop: '0.1rem'
  }
};
