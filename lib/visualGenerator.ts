import { DimensionScores, Archetype, SoulColor, SoulVisual } from './types';
import { ARCHETYPE_VISUALS } from './constants';

function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function generateSignature(fid: number, color: SoulColor): string {
  // Deterministic signature based on FID and color
  const seed = (fid * 1000 + color.hue * 10 + color.saturation) % 10000;
  return seed.toString(16).toUpperCase().padStart(4, '0');
}

export function generateSoulVisual(
  color: SoulColor,
  archetype: Archetype,
  dimensions: DimensionScores,
  fid: number
): SoulVisual {
  const archetypeVisual = ARCHETYPE_VISUALS[archetype.id] || ARCHETYPE_VISUALS.balanced;

  // Generate secondary color (shift hue by 60 degrees)
  const secondaryHue = (color.hue + 60) % 360;
  const secondaryColor = hslToHex(secondaryHue, color.saturation, color.lightness);

  // Generate accent color (shift hue by 120 degrees)
  const accentHue = (color.hue + 120) % 360;
  const accentColor = hslToHex(accentHue, Math.min(90, color.saturation + 10), Math.min(70, color.lightness + 5));

  // Glow intensity from expression
  const glowIntensity = 0.4 + (dimensions.expression * 0.4);

  // Speed from analytical dimension (inverse)
  const speedValue = dimensions.analytical;
  let speed: 'calm' | 'balanced' | 'energetic' | 'chaotic';
  if (speedValue < 0.25) speed = 'calm';
  else if (speedValue < 0.5) speed = 'balanced';
  else if (speedValue < 0.75) speed = 'energetic';
  else speed = 'chaotic';

  // Blob count from creative dimension
  const blobCount = Math.max(2, Math.min(5, Math.round(2 + dimensions.creative * 3)));

  const signature = generateSignature(fid, color);

  return {
    primaryColor: color.hex,
    secondaryColor,
    accentColor,
    glowIntensity,
    glowSpread: 50 + (dimensions.expression * 30),
    speed,
    pulseRate: 6 - (dimensions.expression * 3.5),
    blobCount,
    blobComplexity: archetypeVisual.blobComplexity,
    sigil: archetypeVisual.sigil,
    sigilOpacity: 0.12 + (dimensions.analytical * 0.18),
    hasParticles: archetypeVisual.hasParticles,
    hasRing: archetypeVisual.hasRing,
    noiseOpacity: 0.025 + (dimensions.creative * 0.035),
    soulSignature: signature,
  };
}









