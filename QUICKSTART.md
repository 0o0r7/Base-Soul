# Quick Start Guide

## Installation

```bash
cd base-soul
pnpm install
```

## Development

1. **Create `.env.local`**:
   ```env
   NEYNAR_API_KEY=your_key_here
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

2. **Run dev server**:
   ```bash
   pnpm dev
   ```

3. **Open browser**:
   Navigate to `http://localhost:3000`

## Testing

1. Enter a Farcaster username (e.g., `vitalik`)
2. Wait for soul analysis
3. View your soul orb and archetype
4. Test share functionality

## Required Assets

Before deploying, you need to add:
- `public/icon.png` (512x512px) - App icon
- `public/splash.png` (1200x630px) - Splash screen

These can be simple placeholders for now, but should be branded for production.

## Next Steps

1. Get a Neynar API key from [neynar.com](https://neynar.com)
2. Test locally with real Farcaster usernames
3. Deploy to Vercel (see DEPLOYMENT.md)
4. Sign the Farcaster manifest
5. Share your Mini App!





