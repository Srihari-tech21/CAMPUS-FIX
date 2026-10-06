import React, { useState } from 'react';
import { useCampus } from '../context/CampusContext';
import { Search, Bell, Plus, GraduationCap, Wrench, Shield, ChevronDown } from 'lucide-react';

export default function Navbar() {
  const { 
    activeRole, 
    setActiveRole, 
    setActiveTab, 
    setSelectedIssueId, 
    issues, 
    notifications,
    toastMessage 
  } = useCampus();

  const [searchQuery, setSearchQuery] = useState('');
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (e) => {
    const q = e.target.value;
    setSearchQuery(q);

    if (q.trim().length > 1) {
      const matches = issues.filter(i => 
        i.id.toLowerCase().includes(q.toLowerCase()) ||
        i.building.toLowerCase().includes(q.toLowerCase()) ||
        i.category.toLowerCase().includes(q.toLowerCase()) ||
        i.description.toLowerCase().includes(q.toLowerCase())
      );
      setSearchResults(matches.slice(0, 5));
    } else {
      setSearchResults([]);
    }
  };

  const handleSelectSearchResult = (id) => {
    setSelectedIssueId(id);
    setActiveTab('tracking');
    setSearchQuery('');
    setSearchResults([]);
  };

  const roles = [
    { name: 'Student / Faculty', icon: GraduationCap, desc: 'Report issues & confirm resolutions' },
    { name: 'Maintenance Staff', icon: Wrench, desc: 'View dispatch tasks & update repair progress' },
    { name: 'Campus Administration', icon: Shield, desc: 'High priority overview & SLA analytics' }
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header style={styles.header}>
      {/* Toast Alert popup if active */}
      {toastMessage && (
        <div style={{
          ...styles.toast,
          background: toastMessage.type === 'success' ? '#059669' : toastMessage.type === 'warning' ? '#d97706' : '#0f172a'
        }}>
          {toastMessage.msg}
        </div>
      )}

      {/* Global Search */}
      <div style={styles.searchContainer}>
        <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
        <input
          type="text"
          placeholder="Search issue ID (e.g. CF-1024), room, category..."
          value={searchQuery}
          onChange={handleSearch}
          style={styles.searchInput}
        />

        {/* Live Search dropdown */}
        {searchResults.length > 0 && (
          <div style={styles.searchResultsBox}>
            {searchResults.map(issue => (
              <div
                key={issue.id}
                onClick={() => handleSelectSearchResult(issue.id)}
                style={styles.searchResultItem}
              >
                <div style={{ fontWeight: 800, fontSize: '0.825rem', color: '#2563eb' }}>{issue.id}</div>
                <div style={{ fontSize: '0.8rem', color: '#0f172a', fontWeight: 600 }}>{issue.title}</div>
                <div style={{ fontSize: '0.725rem', color: '#64748b' }}>{issue.building} • {issue.priority} Priority</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Controls */}
      <div style={styles.rightControls}>
        {/* Quick Report Button */}
        <button
          onClick={() => setActiveTab('report')}
          className="btn btn-primary btn-sm"
        >
          <Plus size={16} />
          <span>Report Issue</span>
        </button>

        {/* Notifications Icon */}
        <button
          onClick={() => setActiveTab('notifications')}
          style={styles.iconBtn}
          title="Notifications"
        >
          <Bell size={18} color="#475569" />
          {unreadCount > 0 && <span style={styles.notifBadge}>{unreadCount}</span>}
        </button>

        {/* User Role Switcher Dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowRoleMenu(!showRoleMenu)}
            style={styles.roleDropdownBtn}
          >
            <div style={styles.roleAvatar}>
              {activeRole === 'Student / Faculty' ? <GraduationCap size={16} /> : activeRole === 'Maintenance Staff' ? <Wrench size={16} /> : <Shield size={16} />}
            </div>
            <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.65rem', color: '#64748b', fontWeight: 700 }}>PERSPECTIVE</span>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a' }}>{activeRole}</span>
            </div>
            <ChevronDown size={14} color="#64748b" />
          </button>

          {showRoleMenu && (
            <div style={styles.roleMenuModal}>
              <div style={styles.roleMenuHeader}>Select Demo Perspective</div>
              {roles.map(r => {
                const Icon = r.icon;
                const isSelected = activeRole === r.name;
                return (
                  <div
                    key={r.name}
                    onClick={() => {
                      setActiveRole(r.name);
                      setShowRoleMenu(false);
                    }}
                    style={{
                      ...styles.roleMenuItem,
                      ...(isSelected ? styles.roleMenuItemActive : {})
                    }}
                  >
                    <Icon size={18} color={isSelected ? '#2563eb' : '#64748b'} />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.825rem', color: isSelected ? '#1d4ed8' : '#0f172a' }}>{r.name}</div>
                      <div style={{ fontSize: '0.725rem', color: '#64748b' }}>{r.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

const styles = {
  header: {
    height: '60px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(8px)',
    borderBottom: '1px solid var(--border-light)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 2rem',
    position: 'sticky',
    top: 0,
    zIndex: 100
  },
  searchContainer: {
    position: 'relative',
    width: '360px'
  },
  searchInput: {
    width: '100%',
    padding: '0.45rem 1rem 0.45rem 2.25rem',
    borderRadius: '8px',
    border: '1px solid var(--border-light)',
    fontSize: '0.825rem',
    outline: 'none',
    backgroundColor: '#f1f5f9'
  },
  searchResultsBox: {
    position: 'absolute',
    top: '110%',
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: 'var(--shadow-lg)',
    border: '1px solid var(--border-light)',
    overflow: 'hidden',
    zIndex: 200
  },
  searchResultItem: {
    padding: '0.6rem 0.85rem',
    borderBottom: '1px solid #f1f5f9',
    cursor: 'pointer'
  },
  rightControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.85rem'
  },
  iconBtn: {
    width: '36px',
    height: '36px',
    borderRadius: '8px',
    border: '1px solid var(--border-light)',
    backgroundColor: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    cursor: 'pointer'
  },
  notifBadge: {
    position: 'absolute',
    top: '-4px',
    right: '-4px',
    backgroundColor: '#ef4444',
    color: '#ffffff',
    borderRadius: '9999px',
    width: '16px',
    height: '16px',
    fontSize: '0.625rem',
    fontWeight: 800,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  roleDropdownBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.3rem 0.65rem',
    borderRadius: '8px',
    border: '1px solid var(--border-light)',
    backgroundColor: '#ffffff',
    cursor: 'pointer'
  },
  roleAvatar: {
    width: '26px',
    height: '26px',
    borderRadius: '6px',
    backgroundColor: '#eff6ff',
    color: '#2563eb',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  roleMenuModal: {
    position: 'absolute',
    top: '115%',
    right: 0,
    width: '270px',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    boxShadow: 'var(--shadow-lg)',
    border: '1px solid var(--border-light)',
    padding: '0.5rem',
    zIndex: 300
  },
  roleMenuHeader: {
    fontSize: '0.7rem',
    fontWeight: 700,
    color: '#64748b',
    padding: '0.4rem 0.65rem',
    textTransform: 'uppercase'
  },
  roleMenuItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.65rem',
    padding: '0.5rem 0.65rem',
    borderRadius: '6px',
    cursor: 'pointer'
  },
  roleMenuItemActive: {
    backgroundColor: '#eff6ff',
    border: '1px solid #bfdbfe'
  },
  toast: {
    position: 'fixed',
    top: '1.25rem',
    left: '50%',
    transform: 'translateX(-50%)',
    color: '#ffffff',
    padding: '0.6rem 1.2rem',
    borderRadius: '9999px',
    fontSize: '0.825rem',
    fontWeight: 700,
    boxShadow: 'var(--shadow-lg)',
    zIndex: 9999
  }
};
