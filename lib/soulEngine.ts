import { UserData, SoulResult } from './types';
import { NASCENT_SOUL } from './constants';
import { extractSignals } from './signals';
import { computeDimensions } from './dimensions';
import { computeSoulColor } from './colorMapper';
import { classifyArchetype } from './archetypeClassifier';
import { generateReasoning } from './reasoningGenerator';

export function computeSoul(userData: UserData): SoulResult {
  if (userData.casts.length < 5) {
    return NASCENT_SOUL;
  }

  const signals = extractSignals(userData.profile, userData.casts);
  const dimensions = computeDimensions(signals);
  const color = computeSoulColor(dimensions);
  const archetype = classifyArchetype(dimensions, signals);
  const reasoning = generateReasoning(archetype, signals, dimensions);

  let confidence: 'Low' | 'Medium' | 'High' = 'Low';
  if (userData.casts.length > 50) confidence = 'High';
  else if (userData.casts.length > 20) confidence = 'Medium';

  return {
    color,
    archetype,
    confidence,
    reasoning,
    signals,
    dimensions
  };
}