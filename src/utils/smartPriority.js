/**
 * Smart Priority Assessment Engine for CampusFix
 * Uses rule-based scoring parameters to calculate priority level (Critical, High, Medium, Low)
 * and generates a transparent breakdown explanation for hackathon demo.
 */

export function calculateSmartPriority({ category, building, room, description = '', urgency = 'Medium', safetyRisk = false, peopleAffected = '5-30' }) {
  let score = 20; // Base score
  const breakdown = [];

  // 1. Safety Risk Check (Highest Weight)
  if (safetyRisk) {
    score += 35;
    breakdown.push({ factor: 'Safety Hazard', delta: '+35 pts', reason: 'High risk of electrical, water, or physical injury' });
  } else if (/wire|spark|fire|smoke|shock|leak|blade|glass|hazard|danger|trap/i.test(description)) {
    score += 25;
    safetyRisk = true;
    breakdown.push({ factor: 'Keyword Safety Trigger', delta: '+25 pts', reason: 'Safety-critical keywords detected in description' });
  }

  // 2. Category Weighting
  switch (category) {
    case 'Electrical':
      score += 25;
      breakdown.push({ factor: 'Category Weight', delta: '+25 pts', reason: 'Electrical infrastructure carries high priority SLA' });
      break;
    case 'Water':
      score += 20;
      breakdown.push({ factor: 'Category Weight', delta: '+20 pts', reason: 'Plumbing & water leakage can cause campus asset damage' });
      break;
    case 'Laboratory':
      score += 18;
      breakdown.push({ factor: 'Category Weight', delta: '+18 pts', reason: 'Lab equipment directly impacts research and experiments' });
      break;
    case 'Classroom':
      score += 15;
      breakdown.push({ factor: 'Category Weight', delta: '+15 pts', reason: 'Classroom & AV failure halts active lectures' });
      break;
    case 'Internet / Wi-Fi':
      score += 12;
      breakdown.push({ factor: 'Category Weight', delta: '+12 pts', reason: 'Connectivity affects online exams & research' });
      break;
    default:
      score += 8;
      breakdown.push({ factor: 'Category Weight', delta: '+8 pts', reason: 'Standard campus maintenance category' });
      break;
  }

  // 3. Location Multiplier
  const locationText = `${building} ${room}`.toLowerCase();
  if (/seminar|auditorium|exam|hall 1|main block|lab/i.test(locationText)) {
    score += 15;
    breakdown.push({ factor: 'Critical Location', delta: '+15 pts', reason: 'High-density or key academic venue' });
  } else if (/classroom|lecture|room 204|room 105/i.test(locationText)) {
    score += 10;
    breakdown.push({ factor: 'Academic Location', delta: '+10 pts', reason: 'Active teaching space' });
  }

  // 4. People Affected
  switch (peopleAffected) {
    case '100+':
      score += 20;
      breakdown.push({ factor: 'People Impact', delta: '+20 pts', reason: 'Affecting over 100 students & staff members' });
      break;
    case '30-100':
      score += 15;
      breakdown.push({ factor: 'People Impact', delta: '+15 pts', reason: 'Affecting an entire batch/classroom (30-100 people)' });
      break;
    case '5-30':
      score += 10;
      breakdown.push({ factor: 'People Impact', delta: '+10 pts', reason: 'Affecting a small lab group (5-30 people)' });
      break;
    default:
      score += 5;
      breakdown.push({ factor: 'People Impact', delta: '+5 pts', reason: 'Individual desk or low density impact' });
      break;
  }

  // 5. User Reported Urgency
  if (urgency === 'Critical') {
    score += 15;
    breakdown.push({ factor: 'User Urgency', delta: '+15 pts', reason: 'Flagged as Critical by reporter' });
  } else if (urgency === 'High') {
    score += 10;
    breakdown.push({ factor: 'User Urgency', delta: '+10 pts', reason: 'Flagged as High by reporter' });
  }

  // Cap score at 99 max
  const finalScore = Math.min(99, Math.max(15, score));

  // Determine Level
  let priority = 'Low';
  let badgeColor = '#10b981';
  let slaTime = '24-48 Hours';
  let recommendation = 'Queued for standard maintenance batch.';

  if (finalScore >= 75) {
    priority = 'Critical';
    badgeColor = '#ef4444';
    slaTime = '< 2 Hours (Immediate Response)';
    recommendation = '🚨 Auto-routed as Emergency SMS alert to On-Duty Maintenance Manager.';
  } else if (finalScore >= 55) {
    priority = 'High';
    badgeColor = '#f97316';
    slaTime = '< 4 Hours';
    recommendation = '⚠️ High priority ticket created. Technician assigned with priority dispatch.';
  } else if (finalScore >= 35) {
    priority = 'Medium';
    badgeColor = '#3b82f6';
    slaTime = '< 12 Hours';
    recommendation = 'ℹ️ Scheduled for today\'s maintenance cycle.';
  }

  return {
    priority,
    score: finalScore,
    badgeColor,
    slaTime,
    recommendation,
    breakdown
  };
}
