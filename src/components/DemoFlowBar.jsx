import React, { useState } from 'react';
import { useCampus } from '../context/CampusContext';
import { ChevronRight, Sparkles, RefreshCw } from 'lucide-react';

export default function DemoFlowBar() {
  const { 
    setActiveTab, 
    setSelectedIssueId, 
    setActiveRole, 
    updateIssueStatus, 
    resetDemoData
  } = useCampus();

  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { title: '1. Dashboard', tab: 'dashboard', role: 'Student / Faculty', action: null },
    { title: '2. Report Issue', tab: 'report', role: 'Student / Faculty', action: null },
    { title: '3. Smart Priority & Submit', tab: 'report', role: 'Student / Faculty', action: null },
    { title: '4. Track Issue (CF-1024)', tab: 'tracking', issueId: 'CF-1024', role: 'Student / Faculty', action: null },
    { title: '5. Maintenance View', tab: 'maintenance', role: 'Maintenance Staff', action: null },
    { title: '6. Mark Resolved (CF-1026)', tab: 'tracking', issueId: 'CF-1026', role: 'Maintenance Staff', action: () => updateIssueStatus('CF-1026', 'Resolved', 'Pipe coupling repaired by M. Subbaiah.') },
    { title: '7. Confirm Resolution', tab: 'tracking', issueId: 'CF-1026', role: 'Student / Faculty', action: null }
  ];

  const handleStepClick = (index) => {
    const s = steps[index];
    setCurrentStep(index);
    if (s.role) setActiveRole(s.role);
    if (s.issueId) setSelectedIssueId(s.issueId);
    if (s.action) s.action();
    setActiveTab(s.tab);
  };

  const handleNext = () => {
    const nextIdx = (currentStep + 1) % steps.length;
    handleStepClick(nextIdx);
  };

  return (
    <div style={styles.floatingBar}>
      <div style={styles.innerContainer}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Sparkles size={15} color="#38bdf8" />
          <span style={{ fontSize: '0.725rem', fontWeight: 800, color: '#f8fafc', letterSpacing: '0.04em' }}>
            DEMO WALKTHROUGH:
          </span>
        </div>

        {/* Step Buttons */}
        <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
          {steps.map((s, idx) => (
            <button
              key={idx}
              onClick={() => handleStepClick(idx)}
              style={{
                ...styles.stepBtn,
                ...(currentStep === idx ? styles.stepBtnActive : {})
              }}
            >
              {s.title}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <button
            onClick={handleNext}
            className="btn btn-primary btn-sm"
            style={{ padding: '0.3rem 0.65rem', fontSize: '0.75rem' }}
          >
            Next Step <ChevronRight size={13} />
          </button>
          <button
            onClick={resetDemoData}
            style={styles.resetBtn}
            title="Reset dataset to initial state"
          >
            <RefreshCw size={11} /> Reset
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  floatingBar: {
    position: 'fixed',
    bottom: '0.85rem',
    left: 'calc(50% + 125px)',
    transform: 'translateX(-50%)',
    zIndex: 900,
    width: 'calc(100% - 310px)',
    maxWidth: '1150px'
  },
  innerContainer: {
    backgroundColor: 'rgba(15, 23, 42, 0.92)',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    borderRadius: '12px',
    padding: '0.55rem 0.85rem',
    boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '0.75rem',
    backdropFilter: 'blur(12px)'
  },
  stepBtn: {
    padding: '0.25rem 0.55rem',
    borderRadius: '6px',
    border: '1px solid #334155',
    backgroundColor: '#1e293b',
    color: '#cbd5e1',
    fontSize: '0.7rem',
    fontWeight: 700,
    cursor: 'pointer',
    transition: 'all 0.15s ease'
  },
  stepBtnActive: {
    backgroundColor: '#2563eb',
    borderColor: '#3b82f6',
    color: '#ffffff',
    boxShadow: '0 0 8px rgba(37, 99, 235, 0.4)'
  },
  resetBtn: {
    padding: '0.3rem 0.45rem',
    borderRadius: '6px',
    border: '1px solid #334155',
    backgroundColor: 'transparent',
    color: '#94a3b8',
    fontSize: '0.7rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.2rem'
  }
};
