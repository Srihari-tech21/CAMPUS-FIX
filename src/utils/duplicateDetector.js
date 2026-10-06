/**
 * Duplicate Issue Detector for CampusFix
 * Checks proposed issue against active database to prevent redundant tickets
 */

export function detectDuplicates(existingIssues, newIssue) {
  if (!newIssue.building || !existingIssues || existingIssues.length === 0) {
    return { hasDuplicates: false, matches: [] };
  }

  const targetBuilding = newIssue.building.toLowerCase();
  const targetRoom = (newIssue.room || '').toLowerCase().trim();
  const targetCat = (newIssue.category || '').toLowerCase();
  const targetDesc = (newIssue.description || '').toLowerCase();

  const matches = existingIssues.filter(issue => {
    // Ignore resolved/closed issues over 3 days old
    if (issue.status === 'Verified') return false;

    const bMatch = issue.building.toLowerCase() === targetBuilding;
    const catMatch = issue.category.toLowerCase() === targetCat;
    
    // Check room string overlap
    const existingRoom = (issue.room || '').toLowerCase();
    const roomMatch = targetRoom.length > 2 && (existingRoom.includes(targetRoom) || targetRoom.includes(existingRoom));

    // Check key phrases in description
    const descWords = targetDesc.split(/\s+/).filter(w => w.length > 3);
    const wordMatches = descWords.filter(w => issue.description.toLowerCase().includes(w)).length;

    // Duplicate condition: same building & room, OR same building + category + keyword overlap
    if (bMatch && roomMatch) return true;
    if (bMatch && catMatch && wordMatches >= 2) return true;

    return false;
  });

  return {
    hasDuplicates: matches.length > 0,
    count: matches.length,
    matches
  };
}
