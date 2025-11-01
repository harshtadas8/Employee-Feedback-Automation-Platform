// Utility functions for vibemeter data
import { VibeZone } from '../types/employee';

/**
 * Get color based on vibe score
 * @param score - Vibe score (0-10)
 * @returns Color in hex format
 */
export const getVibeColor = (score: number): string => {
  // Red to green gradient based on score
  if (score < 3) {
    return '#f44336'; // Red - Critical
  } else if (score < 5) {
    return '#ff9800'; // Orange - Warning
  } else if (score < 7) {
    return '#ffc107'; // Amber - Average
  } else if (score < 9) {
    return '#4caf50'; // Light Green - Good
  } else {
    return '#2e7d32'; // Dark Green - Excellent
  }
};

/**
 * Get label based on vibe score
 * @param score - Vibe score (0-10)
 * @returns Text label
 */
export const getVibeLabel = (score: number): string => {
  if (score < 3) {
    return 'Critical';
  } else if (score < 5) {
    return 'Warning';
  } else if (score < 7) {
    return 'Average';
  } else if (score < 9) {
    return 'Good';
  } else {
    return 'Excellent';
  }
};

/**
 * Get color for a specific vibe zone
 * @param vibeZone - The vibe zone string
 * @returns Color in hex format
 */
export const getVibeZoneColor = (vibeZone?: VibeZone): string => {
  switch (vibeZone) {
    case 'Frustrated': return '#ff4d4f';
    case 'Sad': return '#faad14';
    case 'Okay': return '#1890ff';
    case 'Happy': return '#52c41a';
    case 'Excited': return '#722ed1';
    default: return '#d9d9d9';
  }
};

// Define the distribution zone types
type VibeDistributionZone = 'Critical' | 'Warning' | 'Average' | 'Good' | 'Excellent';

/**
 * Group vibe responses by their score range
 * @param vibeData - Array of vibe responses
 * @returns Object with counts for each vibe zone
 */
export const groupVibesByZone = (vibeData: any[]): Record<VibeDistributionZone, number> => {
  const zones: Record<VibeDistributionZone, number> = {
    'Critical': 0,
    'Warning': 0,
    'Average': 0,
    'Good': 0,
    'Excellent': 0
  };
  
  vibeData.forEach(vibe => {
    const score = vibe.score;
    const label = getVibeLabel(score) as VibeDistributionZone;
    zones[label]++;
  });
  
  return zones;
};

/**
 * Calculate the percentage of employees who are in warning or critical zones
 * @param vibeData - Array of vibe responses
 * @returns Percentage value
 */
export const calculateAtRiskPercentage = (vibeData: any[]): number => {
  if (vibeData.length === 0) return 0;
  
  const zones = groupVibesByZone(vibeData);
  const atRiskCount = zones['Critical'] + zones['Warning'];
  
  return (atRiskCount / vibeData.length) * 100;
};

/**
 * Format a date object to a readable string
 * @param date - Date object
 * @returns Formatted date string
 */
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

/**
 * Determine if a vibe response is positive based on score or vibe zone
 * @param vibe - The vibe response object
 * @returns Boolean indicating if the vibe is positive
 */
export const isPositiveVibe = (vibe: any): boolean => {
  if (vibe.vibeZone) {
    return ['Happy', 'Excited', 'Okay'].includes(vibe.vibeZone);
  }
  return vibe.score >= 6; // Scores 6 and above are considered positive
};

/**
 * Determine if a vibe response is negative based on score or vibe zone
 * @param vibe - The vibe response object
 * @returns Boolean indicating if the vibe is negative
 */
export const isNegativeVibe = (vibe: any): boolean => {
  if (vibe.vibeZone) {
    return ['Frustrated', 'Sad'].includes(vibe.vibeZone);
  }
  return vibe.score < 5; // Scores below 5 are considered negative
}; 