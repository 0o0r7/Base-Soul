import { DimensionScores, SoulColor } from './types';

function hslToHex(h: number, s: number, l: number): string {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

export function computeSoulColor(dims: DimensionScores): SoulColor {
  // Determine dominant trait for base hue
  let hue = 0;
  
  const entries = Object.entries(dims);
  entries.sort((a, b) => b[1] - a[1]);
  const dominant = entries[0][0];
  const secondary = entries[1][0];

  // Base ranges
  // Analytical: Blue (200-240)
  // Creative: Purple (260-310)
  // Social: Yellow/Orange (30-60)
  // Expression: Red/Magenta (330-30)

  if (dominant === 'analytical') {
    hue = 220 + (dims.analytical * 20); // 220-240
    if (secondary === 'creative') hue += 20; // push towards purple
    if (secondary === 'social') hue -= 20; // push towards cyan
  } else if (dominant === 'creative') {
    hue = 280 + (dims.creative * 30); // 280-310
    if (secondary === 'expression') hue += 20; // push towards pink
  } else if (dominant === 'social') {
    hue = 45 + (dims.social * 15); // 45-60
    if (secondary === 'expression') hue -= 15; // push orange
  } else { // expression
    hue = 340 + (dims.expression * 40); // 340-380 (wrap)
    if (hue > 360) hue -= 360;
  }

  // Saturation: High expression = high saturation
  const saturation = Math.min(50 + (dims.expression * 40), 90);

  // Lightness: Social = Lighter, Analytical = Darker/Richer
  const lightness = Math.min(Math.max(45 + (dims.social * 15), 45), 65);

  return {
    h: Math.round(hue),
    s: Math.round(saturation),
    l: Math.round(lightness),
    hex: hslToHex(hue, saturation, lightness)
  };
}