import { BehavioralSignals, DimensionScores } from './types';
import { DIMENSION_WEIGHTS } from './constants';

export function computeDimensions(signals: BehavioralSignals): DimensionScores {
  const expression =
    signals.avgCastLength * DIMENSION_WEIGHTS.expression.avgCastLength +
    signals.emojiDensity * DIMENSION_WEIGHTS.expression.emojiDensity +
    signals.mediaRatio * DIMENSION_WEIGHTS.expression.mediaRatio;

  const social =
    signals.replyRatio * DIMENSION_WEIGHTS.social.replyRatio +
    signals.engagementRate * DIMENSION_WEIGHTS.social.engagementRate +
    signals.mentionRatio * DIMENSION_WEIGHTS.social.mentionRatio;

  const creative =
    signals.originalRatio * DIMENSION_WEIGHTS.creative.originalRatio +
    signals.mediaRatio * DIMENSION_WEIGHTS.creative.mediaRatio +
    signals.emojiDensity * DIMENSION_WEIGHTS.creative.emojiDensity;

  const analytical =
    signals.linkRatio * DIMENSION_WEIGHTS.analytical.linkRatio +
    signals.avgCastLength * DIMENSION_WEIGHTS.analytical.avgCastLength +
    signals.questionRatio * DIMENSION_WEIGHTS.analytical.questionRatio;

  return {
    expression: Math.max(0, Math.min(1, expression)),
    social: Math.max(0, Math.min(1, social)),
    creative: Math.max(0, Math.min(1, creative)),
    analytical: Math.max(0, Math.min(1, analytical)),
  };
}





