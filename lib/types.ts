export type SoulColor = {
  h: number;
  s: number;
  l: number;
  hex: string;
};

export type Archetype = {
  id: string;
  name: string;
  description: string;
  colorBias: string;
  traits: string[];
};

export type BehavioralSignals = {
  castCount: number;
  avgCastLength: number;
  replyRatio: number;
  originalRatio: number;
  mediaRatio: number;
  linkRatio: number;
  emojiDensity: number;
  engagementRate: number;
  followerRatio: number;
  accountAgeDays: number;
};

export type DimensionScores = {
  expression: number;
  social: number;
  creative: number;
  analytical: number;
};

export type SoulResult = {
  color: SoulColor;
  archetype: Archetype;
  confidence: 'Low' | 'Medium' | 'High';
  reasoning: {
    short: string;
    long: string;
  };
  signals: BehavioralSignals;
  dimensions: DimensionScores;
};

export type NeynarUser = {
  fid: number;
  username: string;
  display_name: string;
  pfp_url: string;
  follower_count: number;
  following_count: number;
  profile: {
    bio: {
      text: string;
    };
  };
  active_status: 'active' | 'inactive';
};

export type NeynarCast = {
  hash: string;
  author: {
    fid: number;
  };
  text: string;
  timestamp: string;
  parent_hash: string | null;
  reactions: {
    likes_count: number;
    recasts_count: number;
  };
  replies: {
    count: number;
  };
  embeds: any[];
};

export type UserData = {
  profile: NeynarUser;
  casts: NeynarCast[];
  accountAgeDays: number;
};