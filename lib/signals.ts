import { NeynarUser, NeynarCast, BehavioralSignals } from './types';
import { SIGNAL_BOUNDS } from './constants';

// Count emojis in text
function countEmojis(text: string): number {
  const emojiRegex = /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu;
  const matches = text.match(emojiRegex);
  return matches ? matches.length : 0;
}

// Check if cast has media
function hasMedia(cast: NeynarCast): boolean {
  return cast.embeds.some(embed =>
    embed.url && (
      embed.url.includes('imgur') ||
      embed.url.includes('imagedelivery') ||
      embed.url.match(/\.(jpg|jpeg|png|gif|webp|mp4|webm)$/i)
    )
  );
}

// Check if cast has link
function hasLink(cast: NeynarCast): boolean {
  return cast.embeds.some(embed =>
    embed.url && !hasMedia({ ...cast, embeds: [embed] })
  );
}

// Check if cast is a question
function isQuestion(text: string): boolean {
  return /[?？]/.test(text) || text.toLowerCase().startsWith('why') || text.toLowerCase().startsWith('how');
}

// Normalize a value to 0-1 range
function normalize(value: number, min: number, max: number): number {
  if (max === min) return 0;
  return Math.max(0, Math.min(1, (value - min) / (max - min)));
}

export function extractSignals(user: NeynarUser, casts: NeynarCast[]): BehavioralSignals {
  if (casts.length === 0) {
    return {
      castCount: 0,
      avgCastLength: 0,
      replyRatio: 0,
      originalRatio: 0,
      mediaRatio: 0,
      linkRatio: 0,
      emojiDensity: 0,
      engagementRate: 0,
      followerRatio: 0,
      accountAgeDays: 0,
      mentionRatio: 0,
      questionRatio: 0,
    };
  }

  const castCount = casts.length;
  const totalLength = casts.reduce((sum, cast) => sum + cast.text.length, 0);
  const avgCastLength = totalLength / castCount;

  const replyCount = casts.filter(cast => cast.parent_hash !== null).length;
  const replyRatio = replyCount / castCount;

  const originalCount = casts.filter(cast => cast.parent_hash === null).length;
  const originalRatio = originalCount / castCount;

  const mediaCount = casts.filter(hasMedia).length;
  const mediaRatio = mediaCount / castCount;

  const linkCount = casts.filter(hasLink).length;
  const linkRatio = linkCount / castCount;

  const totalEmojis = casts.reduce((sum, cast) => sum + countEmojis(cast.text), 0);
  const emojiDensity = totalEmojis / castCount;

  const totalEngagement = casts.reduce((sum, cast) =>
    sum + cast.reactions.likes_count + cast.reactions.recasts_count + cast.replies.count, 0
  );
  const engagementRate = totalEngagement / (castCount * 100); // Normalize by 100

  const followerRatio = user.follower_count > 0
    ? user.following_count / user.follower_count
    : 0;

  // Estimate account age (simplified - would need actual account creation date)
  const oldestCast = casts.reduce((oldest, cast) => {
    const castTime = new Date(cast.timestamp).getTime();
    return castTime < oldest ? castTime : oldest;
  }, Date.now());
  const accountAgeDays = (Date.now() - oldestCast) / (1000 * 60 * 60 * 24);
  const normalizedAccountAge = normalize(accountAgeDays, SIGNAL_BOUNDS.accountAgeDays.min, SIGNAL_BOUNDS.accountAgeDays.max);

  const mentionCount = casts.filter(cast => cast.mentioned_profiles.length > 0).length;
  const mentionRatio = mentionCount / castCount;

  const questionCount = casts.filter(cast => isQuestion(cast.text)).length;
  const questionRatio = questionCount / castCount;

  return {
    castCount: normalize(castCount, SIGNAL_BOUNDS.castCount.min, SIGNAL_BOUNDS.castCount.max),
    avgCastLength: normalize(avgCastLength, SIGNAL_BOUNDS.avgCastLength.min, SIGNAL_BOUNDS.avgCastLength.max),
    replyRatio,
    originalRatio,
    mediaRatio: normalize(mediaRatio, SIGNAL_BOUNDS.mediaRatio.min, SIGNAL_BOUNDS.mediaRatio.max),
    linkRatio: normalize(linkRatio, SIGNAL_BOUNDS.linkRatio.min, SIGNAL_BOUNDS.linkRatio.max),
    emojiDensity: normalize(emojiDensity, SIGNAL_BOUNDS.emojiDensity.min, SIGNAL_BOUNDS.emojiDensity.max),
    engagementRate: normalize(engagementRate, SIGNAL_BOUNDS.engagementRate.min, SIGNAL_BOUNDS.engagementRate.max),
    followerRatio: normalize(followerRatio, SIGNAL_BOUNDS.followerRatio.min, SIGNAL_BOUNDS.followerRatio.max),
    accountAgeDays: normalizedAccountAge,
    mentionRatio: normalize(mentionRatio, SIGNAL_BOUNDS.mentionRatio.min, SIGNAL_BOUNDS.mentionRatio.max),
    questionRatio: normalize(questionRatio, SIGNAL_BOUNDS.questionRatio.min, SIGNAL_BOUNDS.questionRatio.max),
  };
}

