// SASI Institute of Technology & Engineering (SITE) - Initial Seed Data & Campus Roster

export const INSTITUTION_INFO = {
  name: 'Sasi Institute of Technology & Engineering (SITE)',
  shortName: 'SITE SASI',
  location: 'Near Aerodrome, Tadepalligudem, West Godavari Dist, Andhra Pradesh 534101',
  established: 2002,
  type: 'Autonomous Engineering Institution',
  vision: 'To achieve excellence in education, research, and consultancy by creating a conducive environment that facilitates continuous improvement, creating technocrats who propel societal transformation through inventions and innovations.',
  distinctiveness: 'Education for Societal Transformation',
  mission: [
    'Technology-integrated active learning',
    'Technical and life skills development',
    'Research, innovation and entrepreneurship',
    'Sustainable environment and green campus practices',
    'Responsible citizenship and ethical standards'
  ]
};

export const BUILDINGS = [
  { id: 'ece', name: 'ECE Block (Electronics & Communication)', floors: ['Ground Floor', '1st Floor', '2nd Floor', '3rd Floor'] },
  { id: 'cse', name: 'CSE & AI/ML Block (Computer Science)', floors: ['Ground Floor', '1st Floor', '2nd Floor', '3rd Floor'] },
  { id: 'eee', name: 'EEE Block (Electrical & Electronics)', floors: ['Ground Floor', '1st Floor', '2nd Floor'] },
  { id: 'mech', name: 'Mechanical Engineering Complex', floors: ['Ground Floor', '1st Floor', '2nd Floor'] },
  { id: 'ce', name: 'Civil Engineering Block', floors: ['Ground Floor', '1st Floor'] },
  { id: 'ash', name: 'Applied Sciences & Humanities (ASH Block)', floors: ['Ground Floor', '1st Floor', '2nd Floor'] },
  { id: 'main', name: 'Main Administrative Block (SITE Block A)', floors: ['Ground Floor', '1st Floor', '2nd Floor'] },
  { id: 'lib', name: 'Central Library & Knowledge Resource Center', floors: ['Ground Floor', '1st Floor', '2nd Floor'] },
  { id: 'hostel_b', name: 'Boys Hostel Block', floors: ['Ground Floor', '1st Floor', '2nd Floor', '3rd Floor'] },
  { id: 'hostel_g', name: 'Girls Hostel Block', floors: ['Ground Floor', '1st Floor', '2nd Floor', '3rd Floor'] },
  { id: 'canteen', name: 'Campus Cafeteria & Student Activity Hub', floors: ['Ground Floor', '1st Floor'] },
  { id: 'sports', name: 'Sports Complex & Aerodrome Grounds', floors: ['Ground Floor'] }
];

export const CATEGORIES = [
  { id: 'Electrical', name: 'Electrical Systems', icon: 'Zap', color: '#eab308', defaultTeam: 'SITE Electrical Maintenance' },
  { id: 'Water', name: 'Water & Plumbing', icon: 'Droplets', color: '#06b6d4', defaultTeam: 'SITE Plumbing Services' },
  { id: 'Classroom', name: 'Classroom & AV Projectors', icon: 'Monitor', color: '#2563eb', defaultTeam: 'SITE IT & AV Support' },
  { id: 'Laboratory', name: 'Lab Equipment & Instrumentation', icon: 'FlaskConical', color: '#a855f7', defaultTeam: 'Lab Technical Staff' },
  { id: 'Cleanliness', name: 'Sanitation & Hygiene', icon: 'Sparkles', color: '#10b981', defaultTeam: 'SITE Housekeeping' },
  { id: 'Internet / Wi-Fi', name: 'Campus Network & Wi-Fi', icon: 'Wifi', color: '#6366f1', defaultTeam: 'SITE Network Operations' },
  { id: 'Infrastructure', name: 'Civil & Furniture', icon: 'Building2', color: '#f97316', defaultTeam: 'SITE Infrastructure Wing' },
  { id: 'Other', name: 'General / Other', icon: 'HelpCircle', color: '#64748b', defaultTeam: 'General Maintenance' }
];

export const TECHNICIANS = [
  { id: 'tech-1', name: 'K. Venkateswara Rao', team: 'SITE Electrical Maintenance', phone: '+91 94401 23456', activeTasks: 2, status: 'Available' },
  { id: 'tech-2', name: 'M. Subbaiah', team: 'SITE Plumbing Services', phone: '+91 94401 23457', activeTasks: 1, status: 'Available' },
  { id: 'tech-3', name: 'P. Satyanarayana', team: 'SITE IT & AV Support', phone: '+91 94401 23458', activeTasks: 3, status: 'On Field' },
  { id: 'tech-4', name: 'Ch. Rambabu', team: 'SITE Infrastructure Wing', phone: '+91 94401 23459', activeTasks: 0, status: 'Available' },
  { id: 'tech-5', name: 'G. Lakshmi', team: 'SITE Housekeeping', phone: '+91 94401 23460', activeTasks: 1, status: 'Available' }
];

export const INITIAL_ISSUES = [
  {
    id: 'CF-1024',
    title: 'Exposed high-voltage electrical cable in VLSI Lab',
    category: 'Electrical',
    building: 'ECE Block (Electronics & Communication)',
    floor: '2nd Floor',
    room: 'Room 204 (VLSI Design Lab)',
    description: 'Exposed copper power cable dangling near the main lecture whiteboard. Sparking observed during 10 AM class. Immediate safety concern.',
    priority: 'Critical',
    priorityScore: 94,
    status: 'In Progress',
    reportedBy: 'Dr. K. Srinivas (Faculty, ECE Dept)',
    reporterEmail: 'k.srinivas@sasi.ac.in',
    reportedTime: '2026-10-06T10:15:00',
    assignedTo: 'K. Venkateswara Rao (Electrical Maintenance)',
    assignedTechId: 'tech-1',
    safetyRisk: true,
    peopleAffected: '30-100',
    urgency: 'Critical',
    upvotes: 8,
    image: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&w=600&q=80',
    activityLog: [
      { id: 'act-1', time: '10:15 AM', text: 'Issue submitted by Dr. K. Srinivas', author: 'System' },
      { id: 'act-2', time: '10:16 AM', text: 'Smart Priority assigned status CRITICAL (Score 94/100). Auto-dispatched alert to SITE Electrical Team Lead.', author: 'SmartPriority Engine' },
      { id: 'act-3', time: '10:20 AM', text: 'Assigned to K. Venkateswara Rao (Senior Electrician)', author: 'SITE Admin' },
      { id: 'act-4', time: '10:30 AM', text: 'Status changed to In Progress. Technician arrived on scene with replacement insulation and safety gear.', author: 'K. Venkateswara Rao' }
    ]
  },
  {
    id: 'CF-1025',
    title: 'Digital projector lamp failure before presentation',
    category: 'Classroom',
    building: 'CSE & AI/ML Block (Computer Science)',
    floor: 'Ground Floor',
    room: 'Seminar Hall 1',
    description: 'Ceiling projector lamp light flashing red. HDMI port connection loose. Final year B.Tech capstone project presentations start in 45 minutes.',
    priority: 'High',
    priorityScore: 76,
    status: 'Assigned',
    reportedBy: 'B. Ananya (Student Council Vice-President)',
    reporterEmail: 'ananya.b@student.sasi.ac.in',
    reportedTime: '2026-10-06T09:45:00',
    assignedTo: 'P. Satyanarayana (SITE IT Support)',
    assignedTechId: 'tech-3',
    safetyRisk: false,
    peopleAffected: '30-100',
    urgency: 'High',
    upvotes: 5,
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80',
    activityLog: [
      { id: 'act-1', time: '09:45 AM', text: 'Issue submitted by B. Ananya', author: 'System' },
      { id: 'act-2', time: '09:46 AM', text: 'Smart Priority assigned status HIGH (Score 76/100).', author: 'SmartPriority Engine' },
      { id: 'act-3', time: '09:50 AM', text: 'Assigned to P. Satyanarayana (IT Support)', author: 'SITE Admin' }
    ]
  },
  {
    id: 'CF-1026',
    title: 'Water pipe leakage near West Restroom entrance',
    category: 'Water',
    building: 'Main Administrative Block (SITE Block A)',
    floor: 'Ground Floor',
    room: 'West Corridor near Dean Office',
    description: 'Pressurized water pipe joint leaking heavily. Accumulating water on marble corridor flooring creating slip hazard.',
    priority: 'High',
    priorityScore: 80,
    status: 'Resolved',
    reportedBy: 'SITE Security Desk',
    reporterEmail: 'security@sasi.ac.in',
    reportedTime: '2026-10-06T08:30:00',
    resolvedTime: '2026-10-06T10:30:00',
    assignedTo: 'M. Subbaiah (Plumbing Services)',
    assignedTechId: 'tech-2',
    safetyRisk: true,
    peopleAffected: '100+',
    urgency: 'High',
    upvotes: 14,
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80',
    verificationState: 'Pending',
    activityLog: [
      { id: 'act-1', time: '08:30 AM', text: 'Issue reported by SITE Security Desk', author: 'System' },
      { id: 'act-2', time: '08:35 AM', text: 'Assigned to M. Subbaiah', author: 'SITE Admin' },
      { id: 'act-3', time: '09:00 AM', text: 'Status changed to In Progress. Water main shutoff valve engaged.', author: 'M. Subbaiah' },
      { id: 'act-4', time: '10:30 AM', text: 'Marked as RESOLVED. Pipe coupling replaced and area dried. Awaiting reporter confirmation.', author: 'M. Subbaiah' }
    ]
  },
  {
    id: 'CF-1027',
    title: 'Broken desk chair armrest with sharp edge',
    category: 'Infrastructure',
    building: 'Mechanical Engineering Complex',
    floor: '1st Floor',
    room: 'CAD/CAM Lab Room 102',
    description: 'Wooden armrest detached on desk 14. Metal bracket exposed.',
    priority: 'Low',
    priorityScore: 30,
    status: 'Reported',
    reportedBy: 'Ch. Rahul (Student, Mech Dept)',
    reporterEmail: 'rahul.ch@student.sasi.ac.in',
    reportedTime: '2026-10-06T07:15:00',
    assignedTo: 'Unassigned',
    assignedTechId: null,
    safetyRisk: false,
    peopleAffected: '1-5',
    urgency: 'Low',
    upvotes: 2,
    image: null,
    activityLog: [
      { id: 'act-1', time: '07:15 AM', text: 'Issue submitted by Ch. Rahul', author: 'System' },
      { id: 'act-2', time: '07:16 AM', text: 'Smart Priority assigned status LOW (Score 30/100). Queued for routine maintenance batch.', author: 'SmartPriority Engine' }
    ]
  },
  {
    id: 'CF-1028',
    title: 'Wi-Fi Access Point resetting repeatedly',
    category: 'Internet / Wi-Fi',
    building: 'Central Library & Knowledge Resource Center',
    floor: '2nd Floor',
    room: 'Digital Reference Section',
    description: 'Wi-Fi access point AP-LIB-02 keeps rebooting every 10 minutes. 40+ students unable to access IEEE online databases.',
    priority: 'Medium',
    priorityScore: 58,
    status: 'In Progress',
    reportedBy: 'Mrs. V. Sujatha (Librarian)',
    reporterEmail: 'library@sasi.ac.in',
    reportedTime: '2026-10-06T09:10:00',
    assignedTo: 'SITE Network Operations',
    assignedTechId: 'tech-3',
    safetyRisk: false,
    peopleAffected: '30-100',
    urgency: 'Medium',
    upvotes: 11,
    image: null,
    activityLog: [
      { id: 'act-1', time: '09:10 AM', text: 'Issue reported by Mrs. V. Sujatha', author: 'System' },
      { id: 'act-2', time: '09:15 AM', text: 'Assigned to SITE Network Operations', author: 'SITE Admin' },
      { id: 'act-3', time: '09:40 AM', text: 'Technician reconfiguring AP firmware settings', author: 'Network Ops' }
    ]
  }
];
