import { BehavioralSignals, DimensionScores } from './types';

export function computeDimensions(signals: BehavioralSignals): DimensionScores {
  // Expression: Lengthy, Emojis, Media
  const expression = (
    (signals.avgCastLength * 0.3) + 
    (signals.emojiDensity * 0.4) + 
    (signals.mediaRatio * 0.3)
  );

  // Social: Replies, Engagement, Follower Ratio
  const social = (
    (signals.replyRatio * 0.5) + 
    (signals.engagementRate * 0.3) + 
    (signals.followerRatio * 0.2)
  );

  // Creative: Original posts, Media
  const creative = (
    (signals.originalRatio * 0.5) + 
    (signals.mediaRatio * 0.5)
  );

  // Analytical: Links, Length, Low Emojis
  const analytical = (
    (signals.linkRatio * 0.4) + 
    (signals.avgCastLength * 0.4) + 
    ((1 - signals.emojiDensity) * 0.2)
  );

  return {
    expression: Math.min(Math.max(expression, 0), 1),
    social: Math.min(Math.max(social, 0), 1),
    creative: Math.min(Math.max(creative, 0), 1),
    analytical: Math.min(Math.max(analytical, 0), 1)
  };
}