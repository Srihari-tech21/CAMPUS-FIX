import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_ISSUES, TECHNICIANS } from '../data/mockData';
import { calculateSmartPriority } from '../utils/smartPriority';
import confetti from 'canvas-confetti';

const CampusContext = createContext();

export const CampusProvider = ({ children }) => {
  // Load issues from localStorage or fallback to INITIAL_ISSUES
  const [issues, setIssues] = useState(() => {
    const saved = localStorage.getItem('campusfix_issues');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_ISSUES;
  });

  const [activeRole, setActiveRole] = useState('Student / Faculty'); // 'Student / Faculty' | 'Maintenance Staff' | 'Campus Administration'
  const [activeTab, setActiveTab] = useState('home'); // Default to flagship SASI Homepage! ('home' | 'dashboard' | 'report' | 'tracking' | 'maintenance' | 'my_issues' | 'all_issues' | 'analytics' | 'notifications')
  const [selectedIssueId, setSelectedIssueId] = useState('CF-1024');
  
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Issue Assigned', text: 'CF-1024 has been assigned to K. Venkateswara Rao', time: '10 mins ago', unread: true },
    { id: 2, title: 'Resolution Ready for Verification', text: 'CF-1026 marked Resolved. Please confirm resolution.', time: '1 hour ago', unread: true }
  ]);

  const [toastMessage, setToastMessage] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('campusfix_issues', JSON.stringify(issues));
  }, [issues]);

  const showToast = (msg, type = 'info') => {
    setToastMessage({ msg, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Helper to get next CF-ID
  const getNextIssueId = () => {
    const maxNum = issues.reduce((max, issue) => {
      const match = issue.id.match(/CF-(\d+)/);
      if (match) {
        const num = parseInt(match[1], 10);
        return num > max ? num : max;
      }
      return max;
    }, 1027);
    return `CF-${maxNum + 1}`;
  };

  // Create new Issue
  const createIssue = (formData) => {
    const newId = getNextIssueId();
    
    // Calculate Smart Priority
    const priorityCalc = calculateSmartPriority({
      category: formData.category,
      building: formData.building,
      room: formData.room,
      description: formData.description,
      urgency: formData.urgency,
      safetyRisk: formData.safetyRisk,
      peopleAffected: formData.peopleAffected
    });

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newIssue = {
      id: newId,
      title: formData.title || `${formData.category} issue in ${formData.building}`,
      category: formData.category,
      building: formData.building,
      floor: formData.floor || 'Ground Floor',
      room: formData.room || 'General Area',
      description: formData.description,
      priority: priorityCalc.priority,
      priorityScore: priorityCalc.score,
      status: 'Reported',
      reportedBy: formData.reportedBy || (activeRole === 'Student / Faculty' ? 'Student / Faculty Member' : 'Campus User'),
      reporterEmail: formData.reporterEmail || 'user@sasi.ac.in',
      reportedTime: now.toISOString(),
      assignedTo: 'Unassigned',
      assignedTechId: null,
      safetyRisk: formData.safetyRisk,
      peopleAffected: formData.peopleAffected,
      urgency: formData.urgency,
      upvotes: 1,
      image: formData.image || null,
      activityLog: [
        { id: `act-${Date.now()}-1`, time: timeStr, text: `Issue submitted via CampusFix app`, author: 'System' },
        { id: `act-${Date.now()}-2`, time: timeStr, text: `Smart Priority calculated as ${priorityCalc.priority} (Score ${priorityCalc.score}/100)`, author: 'SmartPriority Engine' }
      ]
    };

    setIssues(prev => [newIssue, ...prev]);
    setSelectedIssueId(newId);

    // Push notification
    setNotifications(prev => [
      { id: Date.now(), title: 'New Ticket Created', text: `Issue ${newId} (${newIssue.priority} Priority) logged successfully.`, time: 'Just now', unread: true },
      ...prev
    ]);

    showToast(`Issue ${newId} created successfully! Smart Priority: ${priorityCalc.priority}`, 'success');

    return newIssue;
  };

  // Update Status
  const updateIssueStatus = (id, newStatus, note = '') => {
    setIssues(prev => prev.map(issue => {
      if (issue.id === id) {
        const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const updatedLog = [
          ...issue.activityLog,
          {
            id: `act-${Date.now()}`,
            time: timeStr,
            text: `Status updated to ${newStatus}. ${note}`.trim(),
            author: activeRole
          }
        ];
        return {
          ...issue,
          status: newStatus,
          resolvedTime: newStatus === 'Resolved' ? new Date().toISOString() : issue.resolvedTime,
          activityLog: updatedLog
        };
      }
      return issue;
    }));

    showToast(`Ticket ${id} status updated to ${newStatus}`, 'info');
  };

  // Assign Technician
  const assignTechnician = (id, techId) => {
    const tech = TECHNICIANS.find(t => t.id === techId);
    const techName = tech ? `${tech.name} (${tech.team})` : techId;

    setIssues(prev => prev.map(issue => {
      if (issue.id === id) {
        const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const updatedLog = [
          ...issue.activityLog,
          {
            id: `act-${Date.now()}`,
            time: timeStr,
            text: `Assigned to ${techName}`,
            author: activeRole
          }
        ];
        const nextStatus = issue.status === 'Reported' ? 'Assigned' : issue.status;
        return {
          ...issue,
          assignedTo: techName,
          assignedTechId: techId,
          status: nextStatus,
          activityLog: updatedLog
        };
      }
      return issue;
    }));

    showToast(`Technician assigned to ${id}`, 'success');
  };

  // Verify Resolution
  const verifyResolution = (id, isResolved, feedbackNote = '') => {
    if (isResolved) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });

      setIssues(prev => prev.map(issue => {
        if (issue.id === id) {
          const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          return {
            ...issue,
            status: 'Verified',
            verificationState: 'Verified',
            activityLog: [
              ...issue.activityLog,
              {
                id: `act-${Date.now()}`,
                time: timeStr,
                text: `✅ Reporter confirmed issue is completely resolved! ${feedbackNote ? `Feedback: "${feedbackNote}"` : ''}`,
                author: 'Reporter Verification'
              }
            ]
          };
        }
        return issue;
      }));

      showToast(`Thank you! Issue ${id} is verified as completely resolved.`, 'success');
    } else {
      setIssues(prev => prev.map(issue => {
        if (issue.id === id) {
          const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          return {
            ...issue,
            status: 'In Progress',
            priority: 'Critical',
            priorityScore: 95,
            verificationState: 'Reopened',
            activityLog: [
              ...issue.activityLog,
              {
                id: `act-${Date.now()}`,
                time: timeStr,
                text: `⚠️ Reporter flagged issue as NOT resolved. Escalated to CRITICAL priority! Reason: ${feedbackNote || 'Issue persists.'}`,
                author: 'Reporter Verification'
              }
            ]
          };
        }
        return issue;
      }));

      showToast(`Issue ${id} re-opened and escalated to CRITICAL priority.`, 'warning');
    }
  };

  // Upvote duplicate issue
  const upvoteIssue = (id) => {
    setIssues(prev => prev.map(issue => {
      if (issue.id === id) {
        return { ...issue, upvotes: (issue.upvotes || 1) + 1 };
      }
      return issue;
    }));
    showToast(`Added your report count (+1) to existing issue ${id}`, 'success');
  };

  // Reset Demo Data
  const resetDemoData = () => {
    setIssues(INITIAL_ISSUES);
    localStorage.removeItem('campusfix_issues');
    setSelectedIssueId('CF-1024');
    showToast('Demo data reset to initial benchmark dataset', 'info');
  };

  // Add random demo critical issue
  const addSeedCriticalIssue = () => {
    createIssue({
      title: 'Water pipe burst flooding Chem Lab 3',
      category: 'Water',
      building: 'Applied Sciences & Humanities (ASH Block)',
      floor: '2nd Floor',
      room: 'Chemistry Lab 302',
      description: 'Major valve rupture spilling water rapidly towards high-voltage centrifuges.',
      urgency: 'Critical',
      safetyRisk: true,
      peopleAffected: '30-100'
    });
  };

  const selectedIssue = issues.find(i => i.id === selectedIssueId) || issues[0];

  return (
    <CampusContext.Provider value={{
      issues,
      activeRole,
      setActiveRole,
      activeTab,
      setActiveTab,
      selectedIssueId,
      setSelectedIssueId,
      selectedIssue,
      notifications,
      setNotifications,
      createIssue,
      updateIssueStatus,
      assignTechnician,
      verifyResolution,
      upvoteIssue,
      resetDemoData,
      addSeedCriticalIssue,
      toastMessage,
      showToast
    }}>
      {children}
    </CampusContext.Provider>
  );
};

export const useCampus = () => useContext(CampusContext);
