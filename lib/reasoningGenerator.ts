import { Archetype, BehavioralSignals, DimensionScores } from './types';

export function generateReasoning(archetype: Archetype, signals: BehavioralSignals, dims: DimensionScores): { short: string, long: string } {
  const highExpression = dims.expression > 0.6;
  const highSocial = dims.social > 0.6;
  const highCreative = dims.creative > 0.6;
  const highAnalytical = dims.analytical > 0.6;

  let signalReason = "";
  if (highExpression) signalReason = "your expressive use of language and media";
  else if (highSocial) signalReason = "your constant engagement with the community";
  else if (highAnalytical) signalReason = "your thoughtful, structured approach to casting";
  else if (highCreative) signalReason = "your original and visually rich content";
  else signalReason = "your balanced activity across the network";

  const short = `Your ${archetype.name} soul is defined by ${signalReason}.`;
  
  const long = `We analyzed ${signals.castCount} of your recent interactions. You scored high in ${highExpression ? 'Expression' : ''} ${highSocial ? 'Social Connection' : ''} ${highCreative ? 'Creativity' : ''} ${highAnalytical ? 'Analysis' : ''}. ${archetype.description} This manifests in your ${Math.round(signals.replyRatio * 100)}% reply rate and distinct posting style.`;

  return { short, long };
}