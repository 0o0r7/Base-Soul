import { NeynarUser, NeynarCast, BehavioralSignals } from './types';

export function extractSignals(user: NeynarUser, casts: NeynarCast[]): BehavioralSignals {
  const castCount = casts.length;

  if (castCount === 0) {
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
      accountAgeDays: 0
    };
  }

  let totalChars = 0;
  let replyCount = 0;
  let mediaCount = 0;
  let linkCount = 0;
  let emojiCount = 0;
  let totalEngagement = 0;

  // Regex for emojis (simplified)
  const emojiRegex = /[\u{1F300}-\u{1F9FF}]/gu;
  
  casts.forEach(cast => {
    totalChars += cast.text.length;
    
    if (cast.parent_hash) {
      replyCount++;
    }
    
    if (cast.embeds && cast.embeds.length > 0) {
      // Very basic check for media/links in embeds
      const hasMedia = cast.embeds.some(e => e.url && (e.url.endsWith('.jpg') || e.url.endsWith('.png') || e.url.endsWith('.mp4')));
      if (hasMedia) mediaCount++;
      
      const hasLink = cast.embeds.some(e => e.url && !e.url.includes('imagedelivery')); // rough filter
      if (hasLink) linkCount++;
    }

    const emojis = cast.text.match(emojiRegex);
    if (emojis) {
      emojiCount += emojis.length;
    }

    totalEngagement += (cast.reactions.likes_count + cast.reactions.recasts_count);
  });

  const following = user.following_count || 1;
  const followers = user.follower_count || 1;

  // Normalize inputs to 0-1 range roughly
  return {
    castCount,
    avgCastLength: Math.min(totalChars / castCount / 320, 1), // Max 320 chars
    replyRatio: replyCount / castCount,
    originalRatio: (castCount - replyCount) / castCount,
    mediaRatio: mediaCount / castCount,
    linkRatio: linkCount / castCount,
    emojiDensity: Math.min((emojiCount / castCount) / 5, 1), // Cap at 5 emojis per cast avg
    engagementRate: Math.min((totalEngagement / castCount) / (followers > 0 ? Math.log(followers) * 2 : 1), 1), // Adjusted for follower count log
    followerRatio: Math.min(followers / (following * 5), 1), // Cap at 5x ratio
    accountAgeDays: 100 // Placeholder
  };
}