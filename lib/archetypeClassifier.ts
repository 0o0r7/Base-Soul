import { DimensionScores, BehavioralSignals, Archetype } from './types';
import { ARCHETYPES } from './constants';

export function classifyArchetype(dims: DimensionScores, signals: BehavioralSignals): Archetype {
  // Find top 2 dimensions
  const sorted = Object.entries(dims).sort((a, b) => b[1] - a[1]);
  const d1 = sorted[0][0];
  const d2 = sorted[1][0];
  const d1Score = sorted[0][1];
  const d2Score = sorted[1][1];

  let id = 'balanced';

  // Difference check for Balanced
  if (d1Score - sorted[3][1] < 0.15) {
    id = 'balanced';
  } else {
    // Combinations
    if (d1 === 'creative' && d2 === 'expression') id = 'creator';
    else if (d1 === 'creative' && d2 === 'analytical') id = 'builder';
    else if (d1 === 'creative' && d2 === 'social') id = 'pioneer';
    
    else if (d1 === 'analytical' && d2 === 'expression') id = 'mystic'; // Rare/Deep
    else if (d1 === 'analytical' && d2 === 'social') id = 'curator';
    else if (d1 === 'analytical' && d2 === 'creative') id = 'sage';

    else if (d1 === 'social' && d2 === 'expression') id = 'flame';
    else if (d1 === 'social' && d2 === 'analytical') id = 'connector';
    else if (d1 === 'social' && d2 === 'creative') id = 'guardian';

    else if (d1 === 'expression' && d2 === 'social') id = 'jester';
    else if (d1 === 'expression' && d2 === 'analytical') id = 'observer';
    else if (d1 === 'expression' && d2 === 'creative') id = 'creator';
    
    // Fallback based on dominant if combo missed
    else if (d1 === 'analytical') id = 'observer';
    else if (d1 === 'social') id = 'connector';
    else if (d1 === 'expression') id = 'flame';
    else if (d1 === 'creative') id = 'creator';
  }

  return ARCHETYPES.find(a => a.id === id) || ARCHETYPES[11]; // Default Balanced
}