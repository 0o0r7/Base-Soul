import { Archetype, SoulResult } from './types';

export const ARCHETYPES: Archetype[] = [
  {
    id: 'builder',
    name: 'The Builder',
    description: 'You construct ideas with precision. Your words are blueprints.',
    colorBias: 'cyan',
    traits: ['Analytical', 'Original', 'Consistent']
  },
  {
    id: 'curator',
    name: 'The Curator',
    description: 'You find signal in noise. Your attention is a gift.',
    colorBias: 'forest',
    traits: ['Engaged', 'Taste-maker', 'Selective']
  },
  {
    id: 'flame',
    name: 'The Flame',
    description: 'Your energy is contagious. You ignite conversations.',
    colorBias: 'orange',
    traits: ['Expressive', 'Positive', 'Active']
  },
  {
    id: 'observer',
    name: 'The Observer',
    description: 'You watch, you learn, you speak only when it matters.',
    colorBias: 'silver',
    traits: ['Quiet', 'Deep', 'Analytical']
  },
  {
    id: 'connector',
    name: 'The Connector',
    description: 'You weave the social fabric. Communities form around you.',
    colorBias: 'yellow',
    traits: ['Social', 'Inclusive', 'Networker']
  },
  {
    id: 'creator',
    name: 'The Creator',
    description: 'You birth visions into pixels. Your canvas is the feed.',
    colorBias: 'violet',
    traits: ['Visual', 'Original', 'Creative']
  },
  {
    id: 'sage',
    name: 'The Sage',
    description: 'You share knowledge freely. Your threads are textbooks.',
    colorBias: 'indigo',
    traits: ['Educational', 'Long-form', 'Wise']
  },
  {
    id: 'jester',
    name: 'The Jester',
    description: 'You bring joy to timelines. Your humor is a superpower.',
    colorBias: 'lime',
    traits: ['Funny', 'Engaging', 'Punchy']
  },
  {
    id: 'guardian',
    name: 'The Guardian',
    description: 'You protect and uplift. Your replies are reassurance.',
    colorBias: 'amber',
    traits: ['Supportive', 'Community', 'Steady']
  },
  {
    id: 'pioneer',
    name: 'The Pioneer',
    description: 'You explore the frontier. Where you go, others follow.',
    colorBias: 'electric',
    traits: ['Experimental', 'Early', 'Brave']
  },
  {
    id: 'mystic',
    name: 'The Mystic',
    description: 'You speak in riddles that reveal truths. The feed is your oracle.',
    colorBias: 'purple',
    traits: ['Philosophical', 'Abstract', 'Deep']
  },
  {
    id: 'balanced',
    name: 'The Balanced',
    description: 'You contain multitudes. No single label can hold you.',
    colorBias: 'rainbow',
    traits: ['Well-rounded', 'Adaptable', 'Whole']
  }
];

export const NASCENT_SOUL: SoulResult = {
  color: { h: 0, s: 0, l: 50, hex: '#808080' },
  archetype: {
    id: 'nascent',
    name: 'Nascent Soul',
    description: 'Your soul is forming. Cast more to reveal your true colors.',
    colorBias: 'gray',
    traits: ['New', 'Forming', 'Unknown']
  },
  confidence: 'Low',
  reasoning: {
    short: 'Your digital footprint is still faint.',
    long: 'You are at the beginning of your journey. As you cast, interact, and create, your soul will take shape and reveal its true nature.'
  },
  signals: {
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
  },
  dimensions: {
    expression: 0,
    social: 0,
    creative: 0,
    analytical: 0
  }
};